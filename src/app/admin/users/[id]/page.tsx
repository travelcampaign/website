'use client'

import { useEffect, useState, use, FormEvent } from 'react'

interface UserDetail {
  id: string
  fullName?: string
  name?: string
  phone?: string
  maskedPhone?: string
  email?: string
  createdAt?: string
  kycStatus?: string
  status?: string
  trustScore?: number
  membershipTier?: string
}

interface AdminNote {
  id: string
  content?: string
  flagged?: boolean
  adminUsername?: string
  createdAt?: string
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [user, setUser] = useState<UserDetail | null>(null)
  const [notes, setNotes] = useState<AdminNote[]>([])
  const [noteText, setNoteText] = useState('')
  const [flagged, setFlagged] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${BASE}/api/admin/users/${id}`, { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch(`${BASE}/api/admin/notes?entityType=USER&entityId=${id}`, { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
    ]).then(([u, n]) => {
      setUser(u)
      setNotes(Array.isArray(n) ? n : n?.content ?? [])
      setLoadingUser(false)
    })
  }, [id])

  async function addNote(e: FormEvent) {
    e.preventDefault()
    if (!noteText.trim()) return
    setSaving(true)
    try {
      const res = await fetch(`${BASE}/api/admin/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType: 'USER',
          entityId: id,
          content: noteText.trim(),
          flagged,
        }),
      })
      if (res.ok) {
        const newNote = await res.json()
        setNotes((prev) => [newNote, ...prev])
        setNoteText('')
        setFlagged(false)
      }
    } finally {
      setSaving(false)
    }
  }

  if (loadingUser) {
    return (
      <div className="text-sm py-10 text-center" style={{ color: '#7A8A85' }}>
        Loading…
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-sm py-10 text-center" style={{ color: '#F97316' }}>
        User not found or backend is offline.
      </div>
    )
  }

  const fields: [string, string | undefined][] = [
    ['Full Name', user.fullName ?? user.name],
    ['Phone', user.maskedPhone ?? user.phone],
    ['Email', user.email],
    ['Joined', user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : undefined],
    ['KYC Status', user.kycStatus],
    ['Membership', user.membershipTier],
    ['Trust Score', user.trustScore?.toString()],
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Back */}
      <a href="/admin/users" className="text-sm hover:underline" style={{ color: '#568F7A' }}>
        ← Back to users
      </a>

      {/* Profile card */}
      <div
        className="rounded-2xl border p-6 space-y-4"
        style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
      >
        <h2 className="text-lg font-semibold" style={{ color: '#2C3A3A' }}>
          {user.fullName ?? user.name ?? 'User'}
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {fields.map(([label, value]) => (
            <div key={label}>
              <div className="text-xs font-medium" style={{ color: '#7A8A85' }}>
                {label}
              </div>
              <div className="text-sm mt-0.5" style={{ color: '#2C3A3A' }}>
                {value ?? '—'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin notes */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
      >
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: '#e5e7eb' }}
        >
          <h3 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>
            Admin Notes
          </h3>
        </div>

        {/* Add note form */}
        <form onSubmit={addNote} className="px-5 py-4 border-b space-y-3" style={{ borderColor: '#e5e7eb' }}>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write a note…"
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none resize-none"
            style={{ background: '#F7F6F4', borderColor: '#e5e7eb', color: '#2C3A3A' }}
            onFocus={(e) => (e.target.style.borderColor = '#568F7A')}
            onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: '#2C3A3A' }}>
              <input
                type="checkbox"
                checked={flagged}
                onChange={(e) => setFlagged(e.target.checked)}
                className="rounded"
              />
              <span style={{ color: flagged ? '#F97316' : '#7A8A85' }}>
                Flag this note
              </span>
            </label>
            <button
              type="submit"
              disabled={saving || !noteText.trim()}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ background: '#2C3A3A' }}
            >
              {saving ? 'Saving…' : 'Add Note'}
            </button>
          </div>
        </form>

        {/* Notes list */}
        {notes.length === 0 ? (
          <div className="px-5 py-8 text-sm text-center" style={{ color: '#7A8A85' }}>
            No notes yet.
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: '#f3f4f6' }}>
            {notes.map((note) => (
              <li key={note.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm flex-1" style={{ color: '#2C3A3A' }}>
                    {note.content}
                  </p>
                  {note.flagged && (
                    <span
                      className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ background: '#F973161a', color: '#F97316' }}
                    >
                      Flagged
                    </span>
                  )}
                </div>
                <div className="mt-1 text-xs" style={{ color: '#7A8A85' }}>
                  {note.adminUsername ?? 'admin'} ·{' '}
                  {note.createdAt ? new Date(note.createdAt).toLocaleString('en-IN') : ''}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
