'use client'

import { Header } from '@/components/layout/header'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { useAuthStore } from '@/store/auth-store'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { User, Settings, Shield, Trophy } from 'lucide-react'

const sidebarLinks = [
  { label: 'Profile', href: '/user', icon: User },
  { label: 'Settings', href: '/user/settings', icon: Settings },
  { label: 'Achievements', href: '/user/achievements', icon: Trophy },
  { label: 'Privacy', href: '/user/privacy', icon: Shield },
]

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const hydrated = useAuthStore((state) => state._hydrated)
  const pathname = usePathname()

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      redirect('/login')
    }
  }, [isAuthenticated, hydrated])

  if (hydrated && !isAuthenticated) {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-56 shrink-0">
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-2.5 rounded-xl font-nunito text-sm font-semibold transition-all duration-200 whitespace-nowrap',
                        isActive
                          ? 'bg-white/10 text-white shadow-sm'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </aside>
            <div className="flex-1 min-w-0">
              <PageWrapper animation="fade">{children}</PageWrapper>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
