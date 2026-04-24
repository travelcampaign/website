'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Flag,
  LogOut,
} from 'lucide-react'

const NAV = [
  { href: '/admin',          label: 'Dashboard',    Icon: LayoutDashboard },
  { href: '/admin/users',    label: 'Users',         Icon: Users },
  { href: '/admin/support',  label: 'Support',       Icon: MessageSquare },
  { href: '/admin/features', label: 'Feature Flags', Icon: Flag },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Login page gets no chrome
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  function handleLogout() {
    document.cookie = 'adminToken=; path=/; max-age=0'
    document.cookie = 'adminRole=; path=/; max-age=0'
    router.push('/admin/login')
  }

  return (
    // min-w-[900px] prevents layout collapse — admin panel is desktop-only
    <div className="flex h-screen overflow-hidden min-w-[900px]" style={{ background: '#F7F6F4' }}>

      {/* Sidebar — fixed 220px, never shrinks */}
      <aside
        className="flex flex-col shrink-0 h-full overflow-y-auto"
        style={{ width: 220, background: '#2C3A3A' }}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <span className="text-white font-semibold text-sm tracking-wide">Travel Campaign</span>
          <div className="text-xs mt-0.5" style={{ color: '#568F7A' }}>Admin Panel</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(({ href, label, Icon }) => {
            const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  color: isActive ? '#ffffff' : '#a0b0ad',
                  background: isActive ? 'rgba(86,143,122,0.25)' : 'transparent',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 1.8} />
                {label}
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
            <LogOut size={16} strokeWidth={1.8} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 shrink-0"
          style={{ height: 52, background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}
        >
          <span className="text-sm font-semibold" style={{ color: '#2C3A3A' }}>
            Travel Campaign Admin
          </span>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: 'rgba(86,143,122,0.12)', color: '#568F7A' }}
          >
            Admin
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
