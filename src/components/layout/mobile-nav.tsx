'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'
import {
  Home,
  BookOpen,
  Gamepad2,
  Layers,
  Video,
  HelpCircle,
  Trophy,
  Newspaper,
  User,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
  Heart,
  Sparkles,
  X,
  Award,
  Shield,
  Mail,
} from 'lucide-react'
import { useUIStore } from '@/store/ui-store'
import { useAuthStore } from '@/store/auth-store'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Learn', href: '/learn', icon: BookOpen },
  { label: 'Games', href: '/games', icon: Gamepad2 },
  { label: 'Flashcards', href: '/flashcards', icon: Layers },
  { label: 'Videos', href: '/videos', icon: Video },
  { label: 'Quizzes', href: '/quizzes', icon: HelpCircle },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { label: 'Blog', href: '/blog', icon: Newspaper },
]

const accountLinks = [
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Achievements', href: '/achievements', icon: Award },
  { label: 'Settings', href: '/settings', icon: Settings },
]

const sidebarVariants: Variants = {
  hidden: { x: '-100%' },
  visible: {
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.04 },
  },
  exit: {
    x: '-100%',
    transition: { duration: 0.2 },
  },
}

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export function MobileNav() {
  const pathname = usePathname()
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore()
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname, setMobileMenuOpen])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <motion.nav
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-white/20 dark:border-gray-700/20 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#6C63FF]">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-[#FF6B6B] via-[#6C63FF] to-[#6BCBFF] bg-clip-text text-transparent">
                  Pogo Tunes
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {links.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <motion.div key={link.href} variants={linkVariants}>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-gradient-to-r from-[#FF6B6B]/10 to-[#6C63FF]/10 text-[#6C63FF] dark:text-[#6BCBFF]'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                      )}
                    >
                      <Icon className={cn('h-5 w-5', isActive ? 'text-[#6C63FF] dark:text-[#6BCBFF]' : '')} />
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-active-indicator"
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-[#6C63FF] dark:bg-[#6BCBFF]"
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}

              <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

              <div className="px-4 py-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Quick Actions
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 px-2">
                {[
                  { label: 'Favorites', icon: Heart, href: '/favorites', color: '#FF6B6B' },
                  { label: 'Achievements', icon: Award, href: '/achievements', color: '#FFD93D' },
                  { label: 'Leaderboard', icon: Trophy, href: '/leaderboard', color: '#6BCBFF' },
                  { label: 'Support', icon: Mail, href: '/contact', color: '#51CF66' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Icon className="h-4 w-4" style={{ color: item.color }} />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 p-4 space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                  Theme
                </span>
                <ThemeToggle />
              </div>

              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#6C63FF] to-[#6BCBFF] text-white text-sm font-bold">
                      {(user.name || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {user.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  {accountLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    )
                  })}
                  <button
                    onClick={() => logout()}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[#FF6B6B] hover:bg-[#FF6B6B]/10 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#6C63FF] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#FF6B6B]/20 hover:shadow-xl hover:shadow-[#FF6B6B]/30 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <LogIn className="h-4 w-4" />
                    Log In
                  </Link>
                  <Link
                    href="/auth/register"
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
