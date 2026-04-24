'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/users', label: 'Users', icon: '👤' },
  { href: '/admin/support', label: 'Support', icon: '💬' },
  { href: '/admin/features', label: 'Feature Flags', icon: '⚑' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    document.cookie = 'adminToken=; path=/; max-age=0'
    router.push('/admin/login')
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F7F6F4' }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col w-56 shrink-0 h-full overflow-y-auto"
        style={{ background: '#2C3A3A' }}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <span className="text-white font-semibold text-sm tracking-wide">
            Travel Campaign
          </span>
          <div className="text-xs mt-0.5" style={{ color: '#568F7A' }}>
            Admin Panel
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  color: isActive ? '#ffffff' : '#a0b0ad',
                  background: isActive ? 'rgba(86,143,122,0.25)' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <span className="text-base leading-none">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-white/10"
            style={{ color: '#a0b0ad' }}
          >
            <span className="text-base leading-none">↩</span>
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-3 border-b shrink-0"
          style={{ background: '#ffffff', borderColor: '#e5e7eb' }}
        >
          <h1 className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>
            Travel Campaign Admin
          </h1>
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: '#568F7A1A', color: '#568F7A' }}>
            Admin
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
