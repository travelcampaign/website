'use client'

import { useState, useEffect, useCallback } from 'react'
import { adminGet, adminPost, adminPut, adminDelete, getAdminRole } from '@/lib/adminApi'
import { Pencil, Trash2, Plus, X, Check, AlertTriangle } from 'lucide-react'

/**
 * Fuel prices.
 *
 * These numbers drive every savings figure the app shows a rider, so the app
 * no longer carries its own copy: an unpriced city simply shows no cost rather
 * than a guess. Which means a city with nothing here is a city where riders
 * see no savings at all.
 */

interface FuelPrice {
  id: string
  city: string
  fuelType: string
  pricePerLitre: number
  effectiveDate: string
  source?: string | null
  updatedAt?: string
}

const FUEL_TYPES = ['PETROL', 'DIESEL', 'CNG', 'ELECTRIC'] as const

/**
 * The app stops using a price once it is older than this and shows riders no
 * cost at all, which is deliberate: a stale price produces the same false
 * savings as a hardcoded one. Keep in step with
 * app.cost.fuel-price-max-age-days on the backend.
 */
const MAX_AGE_DAYS = 45

function ageInDays(date: string): number {
  const then = new Date(date + 'T00:00:00')
  return Math.floor((Date.now() - then.getTime()) / 86_400_000)
}

const emptyDraft = {
  city: '',
  fuelType: 'PETROL',
  pricePerLitre: '',
  effectiveDate: new Date().toISOString().slice(0, 10),
  source: '',
}

export default function PricingPage() {
  const [prices, setPrices] = useState<FuelPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [forbidden, setForbidden] = useState(false)

  const [draft, setDraft] = useState({ ...emptyDraft })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const json = await adminGet('/api/admin/fuel-prices')
      setPrices(json.data ?? [])
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong'
      // The backend restricts this to ADMIN. An agent landing here gets a
      // clear explanation rather than a raw status code.
      if (msg.includes('403')) setForbidden(true)
      else setError('Could not load fuel prices. Try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (getAdminRole() === 'AGENT') {
      setForbidden(true)
      setLoading(false)
      return
    }
    load()
  }, [load])

  function startEdit(p: FuelPrice) {
    setEditingId(p.id)
    setFormError(null)
    setDraft({
      city: p.city,
      fuelType: p.fuelType,
      pricePerLitre: String(p.pricePerLitre),
      effectiveDate: p.effectiveDate,
      source: p.source ?? '',
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setFormError(null)
    setDraft({ ...emptyDraft })
  }

  async function save() {
    setFormError(null)
    const price = Number(draft.pricePerLitre)
    if (!draft.city.trim()) return setFormError('City is required.')
    if (!Number.isFinite(price) || price <= 0) return setFormError('Enter a price above zero.')
    if (!draft.effectiveDate) return setFormError('Pick the date this price applies from.')

    setSaving(true)
    try {
      const body = {
        city: draft.city.trim(),
        fuelType: draft.fuelType,
        pricePerLitre: price,
        effectiveDate: draft.effectiveDate,
        source: draft.source.trim() || null,
      }
      if (editingId) await adminPut(`/api/admin/fuel-prices/${editingId}`, body)
      else await adminPost('/api/admin/fuel-prices', body)
      cancelEdit()
      await load()
    } catch {
      // The backend rejects duplicates for the same city, fuel and date, and
      // prices outside a sane range, with a sentence worth showing.
      setFormError('Could not save. Check the values, or a price may already exist for that city, fuel and date.')
    } finally {
      setSaving(false)
    }
  }

  async function remove(p: FuelPrice) {
    if (!confirm(`Delete the ${p.fuelType.toLowerCase()} price for ${p.city} dated ${p.effectiveDate}?`)) return
    try {
      await adminDelete(`/api/admin/fuel-prices/${p.id}`)
      await load()
    } catch {
      setError('Could not delete that price. Try again.')
    }
  }

  if (forbidden) {
    return (
      <div className="max-w-lg">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <AlertTriangle size={18} className="mt-0.5 flex-none text-amber-600" />
          <div>
            <h2 className="text-sm font-semibold text-neutral-900">Admins only</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Fuel prices change what every rider is told they saved, so only an
              admin account can edit them. Support accounts do not have access.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const grouped = prices.reduce<Record<string, FuelPrice[]>>((acc, p) => {
    ;(acc[p.city] ??= []).push(p)
    return acc
  }, {})

  return (
    <div className="max-w-4xl">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-neutral-900">Fuel prices</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Used to work out what riders save by sharing. A city with no price
          here shows riders no cost at all, rather than an estimate.
        </p>
      </header>

      {/* Add / edit */}
      <section className="mb-8 rounded-xl border border-neutral-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-neutral-900">
          {editingId ? 'Edit price' : 'Add a price'}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="text-xs text-neutral-600">
            City
            <input
              value={draft.city}
              onChange={(e) => setDraft({ ...draft, city: e.target.value })}
              placeholder="Hyderabad"
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900"
            />
          </label>
          <label className="text-xs text-neutral-600">
            Fuel
            <select
              value={draft.fuelType}
              onChange={(e) => setDraft({ ...draft, fuelType: e.target.value })}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900"
            >
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f.charAt(0) + f.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </label>
          <label className="text-xs text-neutral-600">
            Price per unit (₹)
            <input
              value={draft.pricePerLitre}
              onChange={(e) => setDraft({ ...draft, pricePerLitre: e.target.value })}
              inputMode="decimal"
              placeholder="105.00"
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900"
            />
          </label>
          <label className="text-xs text-neutral-600">
            Applies from
            <input
              type="date"
              value={draft.effectiveDate}
              onChange={(e) => setDraft({ ...draft, effectiveDate: e.target.value })}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900"
            />
          </label>
          <label className="text-xs text-neutral-600">
            Source (optional)
            <input
              value={draft.source}
              onChange={(e) => setDraft({ ...draft, source: e.target.value })}
              placeholder="IOCL"
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900"
            />
          </label>
        </div>

        {formError && (
          <p className="mt-3 text-sm text-red-600">{formError}</p>
        )}

        <div className="mt-4 flex gap-2">
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            style={{ background: '#568F7A' }}
          >
            {editingId ? <Check size={15} /> : <Plus size={15} />}
            {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add price'}
          </button>
          {editingId && (
            <button
              onClick={cancelEdit}
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700"
            >
              <X size={15} /> Cancel
            </button>
          )}
        </div>
      </section>

      {/* Existing */}
      {loading ? (
        <p className="text-sm text-neutral-500">Loading…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : prices.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <p className="text-sm font-medium text-neutral-900">No prices yet</p>
          <p className="mt-1 text-sm text-neutral-600">
            Until a city has a price, riders there see no cost or savings
            figures anywhere in the app.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([city, rows]) => (
            <section key={city}>
              <h3 className="mb-2 text-sm font-semibold capitalize text-neutral-900">{city}</h3>
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 text-xs text-neutral-500">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Fuel</th>
                      <th className="px-4 py-2 text-right font-medium">Price</th>
                      <th className="px-4 py-2 text-left font-medium">Applies from</th>
                      <th className="px-4 py-2 text-left font-medium">Source</th>
                      <th className="px-4 py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((p, i) => (
                      <tr key={p.id} className={i > 0 ? 'border-t border-neutral-100' : ''}>
                        <td className="px-4 py-2.5 capitalize text-neutral-900">
                          {p.fuelType.toLowerCase()}
                          {i === 0 && (
                            <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                              in use
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-neutral-900">
                          ₹{Number(p.pricePerLitre).toFixed(2)}
                        </td>
                        <td className="px-4 py-2.5 text-neutral-600">
                          {p.effectiveDate}
                          {i === 0 && ageInDays(p.effectiveDate) > MAX_AGE_DAYS && (
                            <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                              too old to use
                            </span>
                          )}
                          {i === 0 && ageInDays(p.effectiveDate) > MAX_AGE_DAYS - 14
                            && ageInDays(p.effectiveDate) <= MAX_AGE_DAYS && (
                            <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                              {ageInDays(p.effectiveDate)} days old
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-neutral-500">{p.source || '—'}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => startEdit(p)}
                              aria-label={`Edit ${p.fuelType} price for ${p.city}`}
                              className="rounded p-1.5 text-neutral-500 hover:bg-neutral-100"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => remove(p)}
                              aria-label={`Delete ${p.fuelType} price for ${p.city}`}
                              className="rounded p-1.5 text-neutral-500 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-1.5 text-xs text-neutral-500">
                The newest date for each fuel is the one the app uses, and only
                while it is under {MAX_AGE_DAYS} days old. After that riders see
                no cost rather than a stale one.
              </p>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
