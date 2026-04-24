'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (username === 'admin' && password === 'tc-admin-2026') {
      document.cookie = 'adminToken=tc-admin-2026; path=/; max-age=86400'
      router.push('/admin')
    } else {
      setError('Invalid credentials')
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
        {/* Logo */}
        <div className="mb-8">
          <div className="text-lg font-semibold" style={{ color: '#2C3A3A' }}>
            Travel Campaign
          </div>
          <div className="text-sm mt-0.5" style={{ color: '#7A8A85' }}>
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
