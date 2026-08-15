const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export function getAdminToken(): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(/adminToken=([^;]+)/)
  return match ? match[1] : ''
}

export function authHeaders(): Record<string, string> {
  return { Authorization: `Bearer ${getAdminToken()}` }
}

export async function adminGet(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${getAdminToken()}`,
    },
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export async function adminPost(path: string, body: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAdminToken()}`,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export async function adminPut(path: string, body: unknown) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAdminToken()}`,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

export async function adminDelete(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getAdminToken()}` },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`API error ${res.status}`)
  return res.json()
}

/** The signed-in admin's role. Pricing is ADMIN-only; agents handle tickets. */
export function getAdminRole(): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(/adminRole=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}
