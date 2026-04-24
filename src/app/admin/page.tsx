import { adminGet } from '@/lib/adminApi'

interface Summary {
  totalUsers?: number
  activeCampaigns?: number
  openTickets?: number
  resolvedTickets?: number
}

interface Ticket {
  id: string
  ticketNumber?: string
  category?: string
  subject?: string
  priority?: string
  status?: string
  createdAt?: string
}

async function getSummary(): Promise<Summary> {
  try {
    return await adminGet('/api/admin/analytics/summary')
  } catch {
    return {}
  }
}

async function getRecentTickets(): Promise<Ticket[]> {
  try {
    const data = await adminGet('/api/admin/support/tickets?page=0&size=10&status=OPEN')
    return data?.content ?? data ?? []
  } catch {
    return []
  }
}

const STATUS_COLORS: Record<string, string> = {
  OPEN: '#22c55e',
  IN_PROGRESS: '#F97316',
  RESOLVED: '#9ca3af',
  CLOSED: '#9ca3af',
}

function StatusBadge({ status }: { status?: string }) {
  const color = STATUS_COLORS[status ?? ''] ?? '#9ca3af'
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: color + '1a', color }}
    >
      {status ?? '—'}
    </span>
  )
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string
  value: number | undefined
  accent?: string
}) {
  return (
    <div
      className="rounded-2xl p-5 border"
      style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
    >
      <div className="text-xs font-medium mb-2" style={{ color: '#7A8A85' }}>
        {label}
      </div>
      <div
        className="text-3xl font-semibold tabular-nums"
        style={{ color: accent ?? '#2C3A3A' }}
      >
        {value ?? '—'}
      </div>
    </div>
  )
}

export default async function DashboardPage() {
  const [summary, tickets] = await Promise.all([getSummary(), getRecentTickets()])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold" style={{ color: '#2C3A3A' }}>
          Dashboard
        </h2>
        <p className="text-sm mt-0.5" style={{ color: '#7A8A85' }}>
          Platform overview
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard label="Total Users" value={summary.totalUsers} />
        <SummaryCard label="Active Campaigns" value={summary.activeCampaigns} accent="#568F7A" />
        <SummaryCard label="Open Tickets" value={summary.openTickets} accent="#F97316" />
        <SummaryCard label="Resolved Tickets" value={summary.resolvedTickets} />
      </div>

      {/* Recent tickets */}
      <div
        className="rounded-2xl border overflow-hidden"
        style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
      >
        <div
          className="px-5 py-4 border-b flex items-center justify-between"
          style={{ borderColor: '#e5e7eb' }}
        >
          <h3 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>
            Recent Open Tickets
          </h3>
          <a
            href="/admin/support"
            className="text-xs font-medium hover:underline"
            style={{ color: '#568F7A' }}
          >
            View all →
          </a>
        </div>

        {tickets.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm" style={{ color: '#7A8A85' }}>
            No open tickets — backend may be offline.
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
                  className="transition-colors hover:bg-gray-50"
                  style={{ borderBottom: '1px solid #f3f4f6' }}
                >
                  <td className="px-5 py-3 font-mono text-xs" style={{ color: '#568F7A' }}>
                    {t.ticketNumber ?? t.id?.slice(0, 8) ?? '—'}
                  </td>
                  <td className="px-5 py-3" style={{ color: '#2C3A3A' }}>
                    {t.category ?? '—'}
                  </td>
                  <td className="px-5 py-3 max-w-[200px] truncate" style={{ color: '#2C3A3A' }}>
                    {t.subject ?? '—'}
                  </td>
                  <td className="px-5 py-3" style={{ color: '#7A8A85' }}>
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
