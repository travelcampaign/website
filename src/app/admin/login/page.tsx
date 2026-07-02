'use client'

import { useState, FormEvent } from 'react'
import { NexstoppWordmark } from '@/components/NexstoppWordmark'

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${BASE}/api/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        setError('Invalid username or password')
        return
      }
      const json = await res.json()
      const data = json.data
      document.cookie = `adminToken=${data.token}; path=/; max-age=86400`
      document.cookie = `adminRole=${data.role}; path=/; max-age=86400`
      // Full reload so the middleware reads the cookie from the actual HTTP request
      window.location.href = '/admin'
    } catch {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#F7F6F4' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 shadow-sm border"
        style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
      >
        {/* Logo — Nexstopp wordmark (charcoal on white card) */}
        <div className="mb-8">
          <NexstoppWordmark variant="charcoal" className="h-8 w-auto" />
          <div className="text-xs mt-2" style={{ color: '#7A8A85' }}>
            Admin Panel — sign in to continue
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-medium mb-1.5"
              style={{ color: '#2C3A3A' }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors"
              style={{
                background: '#F7F6F4',
                borderColor: '#e5e7eb',
                color: '#2C3A3A',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#568F7A')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium mb-1.5"
              style={{ color: '#2C3A3A' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none transition-colors"
              style={{
                background: '#F7F6F4',
                borderColor: '#e5e7eb',
                color: '#2C3A3A',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#568F7A')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: '#F97316' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 mt-2"
            style={{ background: '#2C3A3A' }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
