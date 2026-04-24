'use client'

import { useState, useEffect } from 'react'
import { adminGet, adminPost, adminPut, authHeaders } from '@/lib/adminApi'
import { Pencil, Trash2, Check, X, Plus } from 'lucide-react'

interface FeatureFlag {
  key: string
  enabled: boolean
  description?: string
  updatedAt?: string
}

interface RolloutConfig {
  strategy?: string
  activeCities?: string | string[]
  activePincodes?: string | string[]
  maxUsersPerCity?: number
  maxCampaignsPerUser?: number
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

async function adminDelete(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'DELETE',
    headers: authHeaders(),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Delete failed ${res.status}`)
  return res.json()
}

function Toggle({
  enabled,
  onChange,
  loading,
}: {
  enabled: boolean
  onChange: () => void
  loading: boolean
}) {
  return (
    <button
      onClick={onChange}
      disabled={loading}
      aria-pressed={enabled}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50"
      style={{ background: enabled ? '#568F7A' : '#d1d5db' }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
        style={{ transform: enabled ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  )
}

export default function FeaturesPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([])
  const [rollout, setRollout] = useState<RolloutConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toggling, setToggling] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editDesc, setEditDesc] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [newKey, setNewKey] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newEnabled, setNewEnabled] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([
      adminGet('/api/admin/config/flags'),
      fetch(`${BASE}/api/config`, { cache: 'no-store' }).then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([adminJson, publicJson]) => {
        setFlags(adminJson?.data ?? [])
        setRollout(publicJson?.data?.rollout ?? publicJson?.rollout ?? null)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load config — backend may be offline.')
        setLoading(false)
      })
  }, [])

  async function toggleFlag(key: string, current: boolean) {
    setToggling(key)
    try {
      await adminPut(`/api/admin/config/flags/${key}`, { enabled: !current })
      setFlags((prev) =>
        prev.map((f) => (f.key === key ? { ...f, enabled: !current } : f))
      )
    } finally {
      setToggling(null)
    }
  }

  function startEdit(flag: FeatureFlag) {
    setEditingKey(flag.key)
    setEditDesc(flag.description ?? '')
    setConfirmDelete(null)
  }

  function cancelEdit() {
    setEditingKey(null)
    setEditDesc('')
  }

  async function saveEdit(key: string) {
    setSaving(true)
    try {
      await adminPut(`/api/admin/config/flags/${key}`, { description: editDesc })
      setFlags((prev) =>
        prev.map((f) => (f.key === key ? { ...f, description: editDesc } : f))
      )
      setEditingKey(null)
      setEditDesc('')
    } finally {
      setSaving(false)
    }
  }

  async function confirmAndDelete(key: string) {
    setDeleting(key)
    try {
      await adminDelete(`/api/admin/config/flags/${key}`)
      setFlags((prev) => prev.filter((f) => f.key !== key))
      setConfirmDelete(null)
    } finally {
      setDeleting(null)
    }
  }

  async function createFlag() {
    if (!newKey.trim()) return
    setSaving(true)
    try {
      const json = await adminPost('/api/admin/config/flags', {
        key: newKey.trim(),
        enabled: newEnabled,
        description: newDesc.trim() || undefined,
      })
      const created: FeatureFlag = json?.data ?? { key: newKey.trim(), enabled: newEnabled, description: newDesc.trim() || undefined }
      setFlags((prev) => [created, ...prev])
      setShowCreate(false)
      setNewKey('')
      setNewDesc('')
      setNewEnabled(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8" style={{ maxWidth: '860px' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold" style={{ color: '#2C3A3A' }}>
            Feature Flags
          </h2>
          <p className="text-sm mt-0.5" style={{ color: '#7A8A85' }}>
            Toggle features, edit descriptions, or create new flags
          </p>
        </div>
        <button
          onClick={() => { setShowCreate((v) => !v); setConfirmDelete(null); setEditingKey(null) }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: '#568F7A', color: '#ffffff' }}
        >
          <Plus size={15} />
          New Flag
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div
          className="rounded-2xl border p-5 space-y-4"
          style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
        >
          <h3 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>Create Flag</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#7A8A85' }}>
                Key
              </label>
              <input
                type="text"
                value={newKey}
                placeholder="IS_MY_FEATURE_ENABLED"
                onChange={(e) =>
                  setNewKey(e.target.value.toUpperCase().replace(/\s+/g, '_'))
                }
                className="w-full px-3 py-2 rounded-xl border text-sm font-mono outline-none"
                style={{ borderColor: '#e5e7eb', color: '#2C3A3A', background: '#F7F6F4' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#7A8A85' }}>
                Description
              </label>
              <input
                type="text"
                value={newDesc}
                placeholder="What this flag controls"
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                style={{ borderColor: '#e5e7eb', color: '#2C3A3A', background: '#F7F6F4' }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium" style={{ color: '#7A8A85' }}>Enabled by default</span>
            <Toggle enabled={newEnabled} loading={false} onChange={() => setNewEnabled((v) => !v)} />
            <span className="text-xs font-medium" style={{ color: newEnabled ? '#568F7A' : '#9ca3af' }}>
              {newEnabled ? 'ON' : 'OFF'}
            </span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={createFlag}
              disabled={saving || !newKey.trim()}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-opacity disabled:opacity-50 hover:opacity-80"
              style={{ background: '#568F7A', color: '#ffffff' }}
            >
              {saving ? 'Creating…' : 'Create Flag'}
            </button>
            <button
              onClick={() => { setShowCreate(false); setNewKey(''); setNewDesc(''); setNewEnabled(false) }}
              className="px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: '#F7F6F4', color: '#2C3A3A', border: '1px solid #e5e7eb' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-sm py-10 text-center" style={{ color: '#7A8A85' }}>
          Loading…
        </div>
      ) : error ? (
        <div className="text-sm py-10 text-center" style={{ color: '#F97316' }}>
          {error}
        </div>
      ) : (
        <>
          {/* Flags table */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
          >
            <div className="px-5 py-4 border-b" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>Flags</h3>
            </div>

            {flags.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm" style={{ color: '#7A8A85' }}>
                No feature flags found.
              </div>
            ) : (
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                    {['Key', 'Description', 'Status', 'Toggle', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-xs font-semibold"
                        style={{ color: '#7A8A85' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {flags.map((flag) => {
                    const isEditing = editingKey === flag.key
                    const isConfirmingDelete = confirmDelete === flag.key
                    const isDeletingThis = deleting === flag.key

                    return (
                      <tr
                        key={flag.key}
                        style={{ borderBottom: '1px solid #f9fafb' }}
                      >
                        {/* Key */}
                        <td className="px-5 py-4 align-top">
                          <span
                            className="font-mono text-sm font-medium"
                            style={{ color: '#568F7A' }}
                          >
                            {flag.key}
                          </span>
                          {flag.updatedAt && (
                            <div className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
                              {new Date(flag.updatedAt).toLocaleDateString('en-IN', {
                                day: '2-digit', month: 'short', year: '2-digit',
                              })}
                            </div>
                          )}
                        </td>

                        {/* Description (inline editable) */}
                        <td className="px-5 py-4 align-top" style={{ maxWidth: '280px' }}>
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={editDesc}
                                autoFocus
                                onChange={(e) => setEditDesc(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveEdit(flag.key)
                                  if (e.key === 'Escape') cancelEdit()
                                }}
                                className="flex-1 px-2.5 py-1.5 rounded-lg border text-sm outline-none"
                                style={{ borderColor: '#568F7A', color: '#2C3A3A', background: '#F7F6F4', minWidth: 0 }}
                              />
                              <button
                                onClick={() => saveEdit(flag.key)}
                                disabled={saving}
                                title="Save"
                                className="p-1 rounded-lg hover:opacity-80 disabled:opacity-40"
                                style={{ color: '#568F7A' }}
                              >
                                <Check size={15} />
                              </button>
                              <button
                                onClick={cancelEdit}
                                title="Cancel"
                                className="p-1 rounded-lg hover:opacity-80"
                                style={{ color: '#9ca3af' }}
                              >
                                <X size={15} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-sm" style={{ color: '#7A8A85' }}>
                              {flag.description || <span style={{ color: '#d1d5db', fontStyle: 'italic' }}>No description</span>}
                            </span>
                          )}
                        </td>

                        {/* Status label */}
                        <td className="px-5 py-4 align-top">
                          <span
                            className="text-xs font-semibold"
                            style={{ color: flag.enabled ? '#568F7A' : '#9ca3af' }}
                          >
                            {flag.enabled ? 'ON' : 'OFF'}
                          </span>
                        </td>

                        {/* Toggle */}
                        <td className="px-5 py-4 align-top">
                          <Toggle
                            enabled={flag.enabled}
                            loading={toggling === flag.key}
                            onChange={() => toggleFlag(flag.key, flag.enabled)}
                          />
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 align-top">
                          {isConfirmingDelete ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs" style={{ color: '#F97316' }}>Delete?</span>
                              <button
                                onClick={() => confirmAndDelete(flag.key)}
                                disabled={isDeletingThis}
                                className="text-xs px-2 py-1 rounded-lg font-medium disabled:opacity-50"
                                style={{ background: '#F97316', color: '#ffffff' }}
                              >
                                {isDeletingThis ? '…' : 'Confirm'}
                              </button>
                              <button
                                onClick={() => setConfirmDelete(null)}
                                className="text-xs px-2 py-1 rounded-lg font-medium"
                                style={{ background: '#F7F6F4', color: '#2C3A3A', border: '1px solid #e5e7eb' }}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => startEdit(flag)}
                                title="Edit description"
                                className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                                style={{ color: '#7A8A85' }}
                              >
                                <Pencil size={14} />
                              </button>
                              <button
                                onClick={() => { setConfirmDelete(flag.key); setEditingKey(null) }}
                                title="Delete flag"
                                className="p-1.5 rounded-lg hover:opacity-70 transition-opacity"
                                style={{ color: '#F97316' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Rollout config */}
          {rollout && (
            <div
              className="rounded-2xl border p-5 space-y-5"
              style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
            >
              <h3 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>
                Rollout Configuration
              </h3>

              <div>
                <div className="text-xs font-medium mb-1" style={{ color: '#7A8A85' }}>Strategy</div>
                <span
                  className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold font-mono"
                  style={{ background: 'rgba(86,143,122,0.12)', color: '#568F7A' }}
                >
                  {rollout.strategy ?? '—'}
                </span>
              </div>

              <div>
                <div className="text-xs font-medium mb-2" style={{ color: '#7A8A85' }}>Active Cities</div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(rollout.activeCities)
                    ? rollout.activeCities
                    : rollout.activeCities?.split(',') ?? []
                  ).map((city) => (
                    <span
                      key={city}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: '#F7F6F4', color: '#2C3A3A', border: '1px solid #e5e7eb' }}
                    >
                      {city.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-medium mb-2" style={{ color: '#7A8A85' }}>Active Pincodes</div>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(rollout.activePincodes)
                    ? rollout.activePincodes
                    : rollout.activePincodes?.split(',') ?? []
                  ).map((pin) => (
                    <span
                      key={pin}
                      className="px-2 py-0.5 rounded-md text-xs font-mono"
                      style={{ background: '#F7F6F4', color: '#2C3A3A', border: '1px solid #e5e7eb' }}
                    >
                      {pin.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                {[
                  ['Max Users / City', rollout.maxUsersPerCity],
                  ['Max Campaigns / User', rollout.maxCampaignsPerUser],
                ].map(([label, value]) => (
                  <div key={String(label)}>
                    <div className="text-xs font-medium" style={{ color: '#7A8A85' }}>{label}</div>
                    <div className="text-sm font-semibold mt-0.5" style={{ color: '#2C3A3A' }}>
                      {value ?? '—'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
