'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { authHeaders } from '@/lib/adminApi'

type StatusFilter = 'ALL' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'

interface Ticket {
  id: string
  ticketNumber?: string
  category?: string
  subject?: string
  priority?: string
  status?: string
  createdAt?: string
}

const STATUS_TABS: StatusFilter[] = ['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  OPEN: { bg: '#22c55e1a', text: '#22c55e' },
  IN_PROGRESS: { bg: '#F973161a', text: '#F97316' },
  RESOLVED: { bg: '#9ca3af1a', text: '#9ca3af' },
  CLOSED: { bg: '#9ca3af1a', text: '#9ca3af' },
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

function StatusBadge({ status }: { status?: string }) {
  const style = STATUS_COLORS[status ?? ''] ?? { bg: '#9ca3af1a', text: '#9ca3af' }
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: style.bg, color: style.text }}
    >
      {(status ?? '—').replace('_', ' ')}
    </span>
  )
}

export default function SupportPage() {
  const [tab, setTab] = useState<StatusFilter>('ALL')
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const url =
        tab === 'ALL'
          ? `${BASE}/api/admin/support/tickets?page=0&size=50`
          : `${BASE}/api/admin/support/tickets?page=0&size=50&status=${tab}`
      const res = await fetch(url, { cache: 'no-store', headers: authHeaders() })
      if (!res.ok) throw new Error('fetch failed')
      const json = await res.json()
      // Unwrap ApiResponse envelope: { success, data: [...] }
      const data = json?.data ?? json
      setTickets(Array.isArray(data) ? data : data?.content ?? [])
    } catch {
      setError('Could not load tickets — backend may be offline.')
    } finally {
      setLoading(false)
    }
  }, [tab])

  useEffect(() => { load() }, [load])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold" style={{ color: '#2C3A3A' }}>
          Support Tickets
        </h2>
        <p className="text-sm mt-0.5" style={{ color: '#7A8A85' }}>
          Manage user support requests
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 border-b" style={{ borderColor: '#e5e7eb' }}>
        {STATUS_TABS.map((s) => (
          <button
            key={s}
            onClick={() => setTab(s)}
            className="px-4 py-2 text-sm font-medium transition-colors border-b-2"
            style={{
              borderColor: tab === s ? '#568F7A' : 'transparent',
              color: tab === s ? '#568F7A' : '#7A8A85',
            }}
          >
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Table */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
      >
        {loading ? (
          <div className="px-5 py-10 text-center text-sm" style={{ color: '#7A8A85' }}>
            Loading…
          </div>
        ) : error ? (
          <div className="px-5 py-10 text-center text-sm" style={{ color: '#F97316' }}>
            {error}
          </div>
        ) : tickets.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm" style={{ color: '#7A8A85' }}>
            No tickets found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                {['Ticket #', 'Category', 'Subject', 'Priority', 'Status', 'Created'].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-medium"
                    style={{ color: '#7A8A85' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr
                  key={t.id}
                  className="transition-colors hover:bg-gray-50 cursor-pointer"
                  style={{ borderBottom: '1px solid #f3f4f6' }}
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/support/${t.id}`}
                      className="font-mono text-xs hover:underline"
                      style={{ color: '#568F7A' }}
                    >
                      {t.ticketNumber ?? t.id?.slice(0, 8) ?? '—'}
                    </Link>
                  </td>
                  <td className="px-5 py-3" style={{ color: '#2C3A3A' }}>
                    {t.category ?? '—'}
                  </td>
                  <td className="px-5 py-3 max-w-[220px] truncate" style={{ color: '#2C3A3A' }}>
                    {t.subject ?? '—'}
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: '#7A8A85' }}>
                    {t.priority ?? '—'}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: '#7A8A85' }}>
                    {t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-IN') : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
