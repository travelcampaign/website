'use client'

import { useState, useEffect } from 'react'

interface FeatureFlag {
  key: string
  enabled: boolean
  description?: string
}

interface RolloutConfig {
  strategy?: string
  activeCities?: string
  activePincodes?: string
  maxUsersPerCity?: number
  maxCampaignsPerUser?: number
}

interface AppConfig {
  features?: FeatureFlag[]
  rollout?: RolloutConfig
}

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

function Toggle({
  enabled,
  onChange,
  loading,
}: {
  enabled: boolean
  onChange: () => void
  loading: boolean
}) {
  return (
    <button
      onClick={onChange}
      disabled={loading}
      aria-pressed={enabled}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50"
      style={{ background: enabled ? '#568F7A' : '#d1d5db' }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
        style={{ transform: enabled ? 'translateX(22px)' : 'translateX(2px)' }}
      />
    </button>
  )
}

export default function FeaturesPage() {
  const [config, setConfig] = useState<AppConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [toggling, setToggling] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${BASE}/api/config`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setConfig(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load config — backend may be offline.')
        setLoading(false)
      })
  }, [])

  async function toggleFlag(key: string, current: boolean) {
    setToggling(key)
    try {
      const res = await fetch(`${BASE}/api/admin/config/features/${key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !current }),
      })
      if (res.ok) {
        setConfig((prev) => {
          if (!prev?.features) return prev
          return {
            ...prev,
            features: prev.features.map((f) =>
              f.key === key ? { ...f, enabled: !current } : f
            ),
          }
        })
      }
    } finally {
      setToggling(null)
    }
  }

  const rollout = config?.rollout
  const flags = config?.features ?? []

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold" style={{ color: '#2C3A3A' }}>
          Feature Flags
        </h2>
        <p className="text-sm mt-0.5" style={{ color: '#7A8A85' }}>
          Toggle features on or off in real-time
        </p>
      </div>

      {loading ? (
        <div className="text-sm py-10 text-center" style={{ color: '#7A8A85' }}>
          Loading…
        </div>
      ) : error ? (
        <div className="text-sm py-10 text-center" style={{ color: '#F97316' }}>
          {error}
        </div>
      ) : (
        <>
          {/* Flags */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: '#e5e7eb' }}
            >
              <h3 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>
                Flags
              </h3>
            </div>

            {flags.length === 0 ? (
              <div className="px-5 py-10 text-center text-sm" style={{ color: '#7A8A85' }}>
                No feature flags returned by backend.
              </div>
            ) : (
              <ul className="divide-y" style={{ borderColor: '#f3f4f6' }}>
                {flags.map((flag) => (
                  <li key={flag.key} className="flex items-center justify-between px-5 py-4">
                    <div className="flex-1 min-w-0 mr-4">
                      <div className="text-sm font-medium font-mono" style={{ color: '#2C3A3A' }}>
                        {flag.key}
                      </div>
                      {flag.description && (
                        <div className="text-xs mt-0.5" style={{ color: '#7A8A85' }}>
                          {flag.description}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="text-xs font-medium"
                        style={{ color: flag.enabled ? '#568F7A' : '#9ca3af' }}
                      >
                        {flag.enabled ? 'ON' : 'OFF'}
                      </span>
                      <Toggle
                        enabled={flag.enabled}
                        loading={toggling === flag.key}
                        onChange={() => toggleFlag(flag.key, flag.enabled)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Rollout config */}
          {rollout && (
            <div
              className="rounded-2xl border p-5 space-y-4"
              style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
            >
              <h3 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>
                Rollout Configuration
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[
                  ['Strategy', rollout.strategy],
                  ['Active Cities', rollout.activeCities],
                  ['Active Pincodes', rollout.activePincodes],
                  ['Max Users / City', rollout.maxUsersPerCity?.toString()],
                  ['Max Campaigns / User', rollout.maxCampaignsPerUser?.toString()],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="text-xs font-medium" style={{ color: '#7A8A85' }}>
                      {label}
                    </div>
                    <div className="text-sm mt-0.5 font-mono" style={{ color: '#2C3A3A' }}>
                      {value ?? '—'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
