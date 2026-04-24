'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface User {
  id: string
  fullName?: string
  name?: string
  phone?: string
  maskedPhone?: string
  createdAt?: string
  status?: string
  kycStatus?: string
}

interface PageData {
  content?: User[]
  totalPages?: number
  number?: number
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

async function fetchUsers(page: number): Promise<PageData> {
  const res = await fetch(`${BASE}/api/admin/users?page=${page}&size=20`, { cache: 'no-store' })
  if (!res.ok) return {}
  return res.json()
}

async function searchUsers(q: string): Promise<User[]> {
  const res = await fetch(`${BASE}/api/admin/users/search?q=${encodeURIComponent(q)}`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data) ? data : data?.content ?? []
}

function StatusBadge({ status }: { status?: string }) {
  const ok = status === 'ACTIVE' || status === 'VERIFIED'
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{
        background: ok ? '#568F7A1a' : '#9ca3af1a',
        color: ok ? '#568F7A' : '#9ca3af',
      }}
    >
      {status ?? 'UNKNOWN'}
    </span>
  )
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      if (query.trim().length >= 2) {
        const results = await searchUsers(query.trim())
        setUsers(results)
        setTotalPages(1)
      } else {
        const data = await fetchUsers(page)
        setUsers(data.content ?? [])
        setTotalPages(data.totalPages ?? 1)
      }
    } catch {
      setError('Could not load users — backend may be offline.')
    } finally {
      setLoading(false)
    }
  }, [page, query])

  useEffect(() => {
    const t = setTimeout(load, query ? 400 : 0)
    return () => clearTimeout(t)
  }, [load, query])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold" style={{ color: '#2C3A3A' }}>
            Users
          </h2>
          <p className="text-sm mt-0.5" style={{ color: '#7A8A85' }}>
            All registered members
          </p>
        </div>
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="Search by name or phone…"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setPage(0) }}
        className="w-full max-w-sm px-4 py-2.5 rounded-xl text-sm border outline-none"
        style={{
          background: '#ffffff',
          borderColor: '#e5e7eb',
          color: '#2C3A3A',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#568F7A')}
        onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
      />

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
        ) : users.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm" style={{ color: '#7A8A85' }}>
            No users found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                {['Name', 'Phone', 'Joined', 'Status'].map((h) => (
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
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="transition-colors hover:bg-gray-50 cursor-pointer"
                  style={{ borderBottom: '1px solid #f3f4f6' }}
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="font-medium hover:underline"
                      style={{ color: '#2C3A3A' }}
                    >
                      {u.fullName ?? u.name ?? '—'}
                    </Link>
                  </td>
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: '#7A8A85' }}>
                    {u.maskedPhone ?? u.phone ?? '—'}
                  </td>
                  <td className="px-5 py-3 text-xs" style={{ color: '#7A8A85' }}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={u.kycStatus ?? u.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!query && totalPages > 1 && (
        <div className="flex items-center gap-2 text-sm">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-40"
            style={{ borderColor: '#e5e7eb', color: '#2C3A3A' }}
          >
            ← Prev
          </button>
          <span style={{ color: '#7A8A85' }}>
            Page {page + 1} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-40"
            style={{ borderColor: '#e5e7eb', color: '#2C3A3A' }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
