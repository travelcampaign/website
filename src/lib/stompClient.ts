import { Client } from '@stomp/stompjs'

// SockJS does not have a default export in all module resolution modes
// eslint-disable-next-line @typescript-eslint/no-require-imports
const SockJS = require('sockjs-client') as new (url: string) => WebSocket

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

// Strip /api suffix — WebSocket endpoint lives at the root (e.g. /ws)
const WS_BASE = BASE.replace(/\/api$/, '')

function getAdminToken(): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(/adminToken=([^;]+)/)
  return match ? match[1] : ''
}

export interface SupportMessage {
  id: string
  senderRole: string
  message: string
  createdAt: string
}

export function createSupportStompClient(
  ticketId: string,
  onMessage: (msg: SupportMessage) => void,
  onStatusChange: (status: string) => void,
  onConnect?: () => void,
  onDisconnect?: () => void,
): Client {
  const client = new Client({
    webSocketFactory: () => new SockJS(`${WS_BASE}/ws`),
    connectHeaders: {
      Authorization: `Bearer ${getAdminToken()}`,
    },
    reconnectDelay: 3000,
    onConnect: () => {
      onConnect?.()

      client.subscribe(`/topic/support/${ticketId}`, (frame) => {
        try {
          const msg: SupportMessage = JSON.parse(frame.body)
          onMessage(msg)
        } catch {
          // Malformed frame — ignore silently
        }
      })

      client.subscribe(`/topic/support/${ticketId}/status`, (frame) => {
        try {
          const data: { status: string } = JSON.parse(frame.body)
          onStatusChange(data.status)
        } catch {
          // Malformed frame — ignore silently
        }
      })
    },
    onDisconnect: () => onDisconnect?.(),
    onStompError: (frame) => {
      console.error('[STOMP] error', frame)
    },
  })

  return client
}
