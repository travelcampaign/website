'use client'

import { useEffect, useRef, useState, useCallback, FormEvent } from 'react'
import { startChat, pollMessages, sendVisitorMessage } from '@/lib/supportApi'

type ChatState = 'closed' | 'prechat' | 'active' | 'resolved'

interface StoredChat {
  ticketId: string
  ticketNumber: string
  visitorName: string
}

interface ChatMessage {
  id: string
  senderRole: string
  message: string
  createdAt: string
  failed?: boolean
  optimistic?: boolean
}

const STORAGE_KEY = 'tc_support_chat'

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

export default function SupportChatWidget() {
  const [chatState, setChatState] = useState<ChatState>('closed')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [ticketId, setTicketId] = useState('')
  const [ticketNumber, setTicketNumber] = useState('')
  const [visitorName, setVisitorName] = useState('')

  // Pre-chat form state
  const [nameInput, setNameInput] = useState('')
  const [contactInput, setContactInput] = useState('')
  const [startError, setStartError] = useState('')
  const [starting, setStarting] = useState(false)

  // Message input state
  const [inputText, setInputText] = useState('')
  const [sending, setSending] = useState(false)

  // Unread indicator
  const [unreadCount, setUnreadCount] = useState(0)
  const [hasUnread, setHasUnread] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastFetchRef = useRef<string | undefined>(undefined)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isOpenRef = useRef(false)

  // Keep isOpenRef in sync with chatState
  useEffect(() => {
    isOpenRef.current = chatState !== 'closed'
  }, [chatState])

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatState === 'active' || chatState === 'resolved') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, chatState])

  // On mount: restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const stored: StoredChat = JSON.parse(raw)
      if (!stored.ticketId) return
      setTicketId(stored.ticketId)
      setTicketNumber(stored.ticketNumber)
      setVisitorName(stored.visitorName)
      // Load all messages and go active
      pollMessages(stored.ticketId)
        .then((msgs) => {
          if (!msgs || msgs.length === 0) {
            setChatState('active')
            return
          }
          setMessages(msgs)
          const last = msgs[msgs.length - 1]
          lastFetchRef.current = last.createdAt
          // Check if ticket resolved by looking at messages
          setChatState('active')
        })
        .catch(() => {
          // Backend offline — still go active so they see previous messages
          setChatState('active')
        })
    } catch {
      // Corrupted storage — ignore
    }
  }, [])

  // Start polling when active
  const startPolling = useCallback((tid: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current)
    pollingRef.current = setInterval(async () => {
      try {
        const newMsgs = await pollMessages(tid, lastFetchRef.current)
        if (!newMsgs || newMsgs.length === 0) return
        setMessages((prev) => {
          // Deduplicate by id
          const existingIds = new Set(prev.map((m) => m.id))
          const fresh = newMsgs.filter((m) => !existingIds.has(m.id))
          if (fresh.length === 0) return prev
          // Check for agent messages when panel is closed
          const agentMsgs = fresh.filter((m) => m.senderRole === 'ADMIN')
          if (agentMsgs.length > 0 && !isOpenRef.current) {
            setHasUnread(true)
            setUnreadCount((c) => c + agentMsgs.length)
          }
          const last = fresh[fresh.length - 1]
          lastFetchRef.current = last.createdAt
          return [...prev, ...fresh]
        })
      } catch {
        // Silent retry
      }
    }, 3000)
  }, [])

  // Stop polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [])

  // Start polling when ticketId is set and state is active
  useEffect(() => {
    if (chatState === 'active' && ticketId) {
      startPolling(ticketId)
    } else {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
        pollingRef.current = null
      }
    }
  }, [chatState, ticketId, startPolling])

  function openWidget() {
    if (chatState === 'closed') {
      if (ticketId) {
        setChatState('active')
      } else {
        setChatState('prechat')
      }
      setHasUnread(false)
      setUnreadCount(0)
    }
  }

  function closeWidget() {
    setChatState('closed')
  }

  async function handleStartChat(e: FormEvent) {
    e.preventDefault()
    if (!nameInput.trim() || !contactInput.trim()) return
    setStarting(true)
    setStartError('')
    try {
      const result = await startChat(nameInput.trim(), contactInput.trim(), 'Chat started')
      const stored: StoredChat = {
        ticketId: result.ticketId,
        ticketNumber: result.ticketNumber,
        visitorName: nameInput.trim(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
      setTicketId(result.ticketId)
      setTicketNumber(result.ticketNumber)
      setVisitorName(nameInput.trim())
      const systemMsg: ChatMessage = {
        id: `sys-${Date.now()}`,
        senderRole: 'SYSTEM',
        message: `Hi ${nameInput.trim()}! You're chatting with Travel Campaign Support. Ticket #${result.ticketNumber} has been created. An agent will be with you shortly.`,
        createdAt: new Date().toISOString(),
      }
      setMessages([systemMsg])
      lastFetchRef.current = systemMsg.createdAt
      setChatState('active')
    } catch {
      setStartError('Unable to connect. Please try again.')
    } finally {
      setStarting(false)
    }
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault()
    const text = inputText.trim()
    if (!text || !ticketId) return
    const optimisticId = `opt-${Date.now()}`
    const optimisticMsg: ChatMessage = {
      id: optimisticId,
      senderRole: 'VISITOR',
      message: text,
      createdAt: new Date().toISOString(),
      optimistic: true,
    }
    setMessages((prev) => [...prev, optimisticMsg])
    setInputText('')
    setSending(true)
    try {
      await sendVisitorMessage(ticketId, text)
      // Remove optimistic flag — polling will confirm, or we just leave it
      setMessages((prev) =>
        prev.map((m) => (m.id === optimisticId ? { ...m, optimistic: false } : m))
      )
    } catch {
      setMessages((prev) =>
        prev.map((m) => (m.id === optimisticId ? { ...m, failed: true, optimistic: false } : m))
      )
    } finally {
      setSending(false)
    }
  }

  async function retryMessage(msg: ChatMessage) {
    if (!ticketId) return
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, failed: false, optimistic: true } : m))
    )
    try {
      await sendVisitorMessage(ticketId, msg.message)
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, optimistic: false } : m))
      )
    } catch {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, failed: true, optimistic: false } : m))
      )
    }
  }

  function startNewConversation() {
    localStorage.removeItem(STORAGE_KEY)
    setTicketId('')
    setTicketNumber('')
    setVisitorName('')
    setMessages([])
    setNameInput('')
    setContactInput('')
    lastFetchRef.current = undefined
    setChatState('prechat')
  }

  const isAdmin = (role: string) => role === 'ADMIN'
  const isSystem = (role: string) => role === 'SYSTEM'
  const isVisitor = (role: string) => role === 'VISITOR'

  return (
    <>
      {/* Floating button */}
      {chatState === 'closed' && (
        <button
          onClick={openWidget}
          aria-label="Open support chat"
          className="fixed z-50"
          style={{
            right: '24px',
            bottom: '24px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#2C3A3A',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(44,58,58,0.35)',
            animation: hasUnread ? 'tc-pulse 1.8s ease-in-out infinite' : 'none',
          }}
        >
          {/* Chat bubble icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
              fill="white"
            />
          </svg>
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#F97316',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '11px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat panel */}
      {chatState !== 'closed' && (
        <div
          className="fixed z-50"
          style={{
            right: '24px',
            bottom: '24px',
            width: '384px',
            maxWidth: 'calc(100vw - 48px)',
            height: '520px',
            maxHeight: 'calc(100vh - 80px)',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 8px 40px rgba(44,58,58,0.22)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#2C3A3A',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#568F7A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <p style={{ color: '#ffffff', fontWeight: '600', fontSize: '14px', margin: 0 }}>
                  Travel Campaign Support
                </p>
                <p style={{ color: '#a0b4b4', fontSize: '12px', margin: 0 }}>
                  Typically replies in a few minutes
                </p>
              </div>
            </div>
            <button
              onClick={closeWidget}
              aria-label="Close chat"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#a0b4b4',
                padding: '4px',
                lineHeight: 1,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Pre-chat form */}
          {chatState === 'prechat' && (
            <form
              onSubmit={handleStartChat}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '24px 20px',
                gap: '16px',
                overflowY: 'auto',
              }}
            >
              <div>
                <p style={{ color: '#2C3A3A', fontWeight: '600', fontSize: '15px', margin: '0 0 4px' }}>
                  Start a conversation
                </p>
                <p style={{ color: '#7A8A85', fontSize: '13px', margin: 0 }}>
                  Fill in your details and we&apos;ll get back to you shortly.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label
                    htmlFor="tc-chat-name"
                    style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#7A8A85', marginBottom: '6px' }}
                  >
                    Your name
                  </label>
                  <input
                    id="tc-chat-name"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1px solid #EAE7E1',
                      background: '#F7F6F4',
                      fontSize: '14px',
                      color: '#2C3A3A',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#568F7A')}
                    onBlur={(e) => (e.target.style.borderColor = '#EAE7E1')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="tc-chat-contact"
                    style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#7A8A85', marginBottom: '6px' }}
                  >
                    Phone or email
                  </label>
                  <input
                    id="tc-chat-contact"
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder="e.g. 9876543210"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1px solid #EAE7E1',
                      background: '#F7F6F4',
                      fontSize: '14px',
                      color: '#2C3A3A',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#568F7A')}
                    onBlur={(e) => (e.target.style.borderColor = '#EAE7E1')}
                  />
                </div>
              </div>

              {startError && (
                <p style={{ color: '#F97316', fontSize: '13px', margin: 0 }}>{startError}</p>
              )}

              <button
                type="submit"
                disabled={starting || !nameInput.trim() || !contactInput.trim()}
                style={{
                  marginTop: 'auto',
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#568F7A',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: starting ? 'wait' : 'pointer',
                  opacity: !nameInput.trim() || !contactInput.trim() ? 0.4 : 1,
                  transition: 'opacity 0.15s',
                }}
              >
                {starting ? 'Connecting…' : 'Start Chat'}
              </button>
            </form>
          )}

          {/* Active / Resolved — message thread */}
          {(chatState === 'active' || chatState === 'resolved') && (
            <>
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '16px 16px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {messages.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#7A8A85', fontSize: '13px', margin: 'auto 0' }}>
                    No messages yet. Say hello!
                  </p>
                )}
                {messages.map((msg) => {
                  if (isSystem(msg.senderRole)) {
                    return (
                      <div key={msg.id} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                          style={{
                            background: '#EAE7E1',
                            borderRadius: '12px',
                            padding: '8px 14px',
                            maxWidth: '85%',
                            textAlign: 'center',
                          }}
                        >
                          <p style={{ fontSize: '12px', color: '#7A8A85', margin: 0 }}>{msg.message}</p>
                        </div>
                      </div>
                    )
                  }

                  if (isAdmin(msg.senderRole)) {
                    return (
                      <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <div style={{ maxWidth: '75%' }}>
                          <div
                            style={{
                              background: '#EAE7E1',
                              borderRadius: '18px 18px 18px 4px',
                              padding: '10px 14px',
                            }}
                          >
                            <p style={{ fontSize: '14px', color: '#2C3A3A', margin: 0 }}>{msg.message}</p>
                          </div>
                          <p style={{ fontSize: '11px', color: '#7A8A85', margin: '4px 4px 0', textAlign: 'left' }}>
                            Agent · {formatTime(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    )
                  }

                  if (isVisitor(msg.senderRole)) {
                    return (
                      <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ maxWidth: '75%' }}>
                          <div
                            style={{
                              background: msg.failed ? '#FEE2E2' : '#2C3A3A',
                              borderRadius: '18px 18px 4px 18px',
                              padding: '10px 14px',
                              opacity: msg.optimistic ? 0.7 : 1,
                            }}
                          >
                            <p style={{ fontSize: '14px', color: msg.failed ? '#991b1b' : '#ffffff', margin: 0 }}>
                              {msg.message}
                            </p>
                          </div>
                          {msg.failed ? (
                            <button
                              onClick={() => retryMessage(msg)}
                              style={{
                                display: 'block',
                                marginLeft: 'auto',
                                marginTop: '4px',
                                fontSize: '11px',
                                color: '#F97316',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                              }}
                            >
                              Message failed to send. Tap to retry.
                            </button>
                          ) : (
                            <p style={{ fontSize: '11px', color: '#7A8A85', margin: '4px 4px 0', textAlign: 'right' }}>
                              {formatTime(msg.createdAt)}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  }

                  return null
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area or resolved CTA */}
              {chatState === 'resolved' ? (
                <div
                  style={{
                    padding: '16px',
                    borderTop: '1px solid #EAE7E1',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  <p style={{ fontSize: '13px', color: '#7A8A85', margin: '0 0 10px' }}>
                    This conversation is resolved.
                  </p>
                  <button
                    onClick={startNewConversation}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '12px',
                      border: 'none',
                      background: '#568F7A',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Start a new conversation
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSend}
                  style={{
                    padding: '12px 16px',
                    borderTop: '1px solid #EAE7E1',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message…"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1px solid #EAE7E1',
                      background: '#F7F6F4',
                      fontSize: '14px',
                      color: '#2C3A3A',
                      outline: 'none',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#568F7A')}
                    onBlur={(e) => (e.target.style.borderColor = '#EAE7E1')}
                  />
                  <button
                    type="submit"
                    disabled={sending || !inputText.trim()}
                    aria-label="Send message"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: 'none',
                      background: '#568F7A',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: sending || !inputText.trim() ? 'not-allowed' : 'pointer',
                      opacity: !inputText.trim() ? 0.4 : 1,
                      flexShrink: 0,
                      transition: 'opacity 0.15s',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      )}

      {/* Pulse keyframe */}
      <style>{`
        @keyframes tc-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(44,58,58,0.35), 0 0 0 0 rgba(86,143,122,0.6); }
          50% { box-shadow: 0 4px 20px rgba(44,58,58,0.35), 0 0 0 10px rgba(86,143,122,0); }
        }
      `}</style>
    </>
  )
}
