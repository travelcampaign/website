'use client'

import { useEffect, useState, use, FormEvent } from 'react'

interface Ticket {
  id: string
  ticketNumber?: string
  subject?: string
  category?: string
  description?: string
  status?: string
  priority?: string
  assignee?: string
  reporterName?: string
  reporterPhone?: string
  createdAt?: string
}

interface Message {
  id: string
  content?: string
  senderType?: 'ADMIN' | 'USER'
  senderName?: string
  sentAt?: string
  createdAt?: string
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']
const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH', 'URGENT']

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  OPEN: { bg: '#22c55e1a', text: '#22c55e' },
  IN_PROGRESS: { bg: '#F973161a', text: '#F97316' },
  RESOLVED: { bg: '#9ca3af1a', text: '#9ca3af' },
  CLOSED: { bg: '#9ca3af1a', text: '#9ca3af' },
}

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

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)

  // Ticket meta edits
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [assignee, setAssignee] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`${BASE}/api/admin/support/tickets/${id}`, { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
      fetch(`${BASE}/api/admin/support/tickets/${id}/messages`, { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
    ]).then(([t, m]) => {
      setTicket(t)
      setMessages(Array.isArray(m) ? m : m?.content ?? [])
      if (t) {
        setStatus(t.status ?? '')
        setPriority(t.priority ?? '')
        setAssignee(t.assignee ?? '')
      }
      setLoading(false)
    })
  }, [id])

  async function sendReply(e: FormEvent) {
    e.preventDefault()
    if (!reply.trim()) return
    setSending(true)
    try {
      const res = await fetch(`${BASE}/api/admin/support/tickets/${id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: reply.trim(), senderType: 'ADMIN' }),
      })
      if (res.ok) {
        const msg = await res.json()
        setMessages((prev) => [...prev, msg])
        setReply('')
      }
    } finally {
      setSending(false)
    }
  }

  async function updateTicket() {
    try {
      const res = await fetch(`${BASE}/api/admin/support/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, priority, assignee }),
      })
      if (res.ok) {
        const updated = await res.json()
        setTicket(updated)
      }
    } catch {
      // silent — backend may be offline
    }
  }

  async function addNote(e: FormEvent) {
    e.preventDefault()
    if (!noteText.trim()) return
    setSavingNote(true)
    try {
      await fetch(`${BASE}/api/admin/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType: 'TICKET', entityId: id, content: noteText.trim() }),
      })
      setNoteText('')
    } finally {
      setSavingNote(false)
    }
  }

  if (loading) {
    return (
      <div className="text-sm py-10 text-center" style={{ color: '#7A8A85' }}>
        Loading…
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="text-sm py-10 text-center" style={{ color: '#F97316' }}>
        Ticket not found or backend is offline.
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <a href="/admin/support" className="text-sm hover:underline" style={{ color: '#568F7A' }}>
        ← Back to tickets
      </a>

      {/* Ticket header */}
      <div
        className="rounded-2xl border p-6"
        style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs" style={{ color: '#568F7A' }}>
                {ticket.ticketNumber ?? ticket.id?.slice(0, 8)}
              </span>
              <StatusBadge status={ticket.status} />
            </div>
            <h2 className="text-lg font-semibold" style={{ color: '#2C3A3A' }}>
              {ticket.subject ?? 'No subject'}
            </h2>
            <p className="text-sm mt-1" style={{ color: '#7A8A85' }}>
              {ticket.category} · {ticket.reporterName} ·{' '}
              {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString('en-IN') : ''}
            </p>
          </div>
        </div>
        {ticket.description && (
          <p className="mt-4 text-sm" style={{ color: '#2C3A3A' }}>
            {ticket.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Messages (takes 2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: '#e5e7eb' }}
            >
              <h3 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>
                Message Thread
              </h3>
            </div>

            {/* Messages */}
            <div className="px-5 py-4 space-y-4 min-h-[200px]">
              {messages.length === 0 ? (
                <p className="text-sm text-center py-4" style={{ color: '#7A8A85' }}>
                  No messages yet.
                </p>
              ) : (
                messages.map((msg) => {
                  const isAdmin = msg.senderType === 'ADMIN'
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className="max-w-[75%] px-4 py-2.5 rounded-2xl text-sm"
                        style={{
                          background: isAdmin ? '#2C3A3A' : '#F7F6F4',
                          color: isAdmin ? '#ffffff' : '#2C3A3A',
                          borderRadius: isAdmin
                            ? '18px 18px 4px 18px'
                            : '18px 18px 18px 4px',
                        }}
                      >
                        <p>{msg.content}</p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: isAdmin ? '#a0b0ad' : '#7A8A85' }}
                        >
                          {msg.senderName ?? (isAdmin ? 'Admin' : 'User')} ·{' '}
                          {(msg.sentAt ?? msg.createdAt)
                            ? new Date(msg.sentAt ?? msg.createdAt ?? '').toLocaleTimeString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : ''}
                        </p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Reply form */}
            <form
              onSubmit={sendReply}
              className="px-5 py-4 border-t flex gap-3"
              style={{ borderColor: '#e5e7eb' }}
            >
              <input
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write a reply…"
                className="flex-1 px-3 py-2.5 rounded-xl text-sm border outline-none"
                style={{ background: '#F7F6F4', borderColor: '#e5e7eb', color: '#2C3A3A' }}
                onFocus={(e) => (e.target.style.borderColor = '#568F7A')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
              <button
                type="submit"
                disabled={sending || !reply.trim()}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 shrink-0"
                style={{ background: '#568F7A' }}
              >
                {sending ? '…' : 'Send'}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar: meta + notes (1/3) */}
        <div className="space-y-4">
          {/* Ticket meta */}
          <div
            className="rounded-2xl border p-4 space-y-3"
            style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
          >
            <h3 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>
              Ticket Details
            </h3>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#7A8A85' }}>
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
                style={{ background: '#F7F6F4', borderColor: '#e5e7eb', color: '#2C3A3A' }}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#7A8A85' }}>
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
                style={{ background: '#F7F6F4', borderColor: '#e5e7eb', color: '#2C3A3A' }}
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: '#7A8A85' }}>
                Assignee
              </label>
              <input
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Username"
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
                style={{ background: '#F7F6F4', borderColor: '#e5e7eb', color: '#2C3A3A' }}
                onFocus={(e) => (e.target.style.borderColor = '#568F7A')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>

            <button
              onClick={updateTicket}
              className="w-full py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#2C3A3A' }}
            >
              Save Changes
            </button>
          </div>

          {/* Admin note */}
          <div
            className="rounded-2xl border p-4 space-y-3"
            style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
          >
            <h3 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>
              Admin Note
            </h3>
            <form onSubmit={addNote} className="space-y-2">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Internal note…"
                rows={3}
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none resize-none"
                style={{ background: '#F7F6F4', borderColor: '#e5e7eb', color: '#2C3A3A' }}
                onFocus={(e) => (e.target.style.borderColor = '#568F7A')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
              <button
                type="submit"
                disabled={savingNote || !noteText.trim()}
                className="w-full py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: '#568F7A1a', color: '#568F7A' }}
              >
                {savingNote ? 'Saving…' : 'Add Note'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
