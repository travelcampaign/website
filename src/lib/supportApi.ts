const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export async function startChat(visitorName: string, contact: string, message: string) {
  const res = await fetch(`${BASE}/api/public/support/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ visitorName, contact, message }),
  })
  const json = await res.json()
  return json.data as { ticketId: string; ticketNumber: string }
}

export async function pollMessages(ticketId: string, after?: string) {
  const url = `${BASE}/api/public/support/${ticketId}/messages${after ? `?after=${encodeURIComponent(after)}` : ''}`
  const res = await fetch(url, { cache: 'no-store' })
  const json = await res.json()
  return json.data as Array<{ id: string; senderRole: string; message: string; createdAt: string }>
}

export async function sendVisitorMessage(ticketId: string, message: string) {
  const res = await fetch(`${BASE}/api/public/support/${ticketId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  const json = await res.json()
  return json.data
}
