'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Menu,
  Search,
  Bell,
  User,
  ChevronDown,
  LogIn,
  UserPlus,
  Sparkles,
  Home,
  Settings,
  HelpCircle,
  LogOut,
  Award,
  Heart,
  Bookmark,
  BookOpen,
  Gamepad2,
  Layers,
  Video,
  Trophy,
  Newspaper,
  ChevronRight,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useIsScrolled } from '@/hooks/use-scroll-position'
import { useAuthStore } from '@/store/auth-store'
import { useUIStore } from '@/store/ui-store'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { ThemeToggle } from './theme-toggle'
import { MegaMenu } from './mega-menu'
import { MobileNav } from './mobile-nav'
import { SearchBar } from './search-bar'
import { NotificationPanel } from './notification-panel'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Learn', href: '/learn', icon: BookOpen },
  { label: 'Games', href: '/games', icon: Gamepad2 },
  { label: 'Flashcards', href: '/flashcards', icon: Layers },
  { label: 'Videos', href: '/videos', icon: Video },
  { label: 'Quizzes', href: '/quizzes', icon: HelpCircle },
  { label: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  { label: 'Blog', href: '/blog', icon: Newspaper },
]

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
]

const userDropdownItems = [
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Achievements', href: '/achievements', icon: Award },
  { label: 'Favorites', href: '/favorites', icon: Heart },
  { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Help Center', href: '/help', icon: HelpCircle },
]

const dropdownVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -4,
    transition: { duration: 0.1 },
  },
}

export function Header() {
  const pathname = usePathname()
  const isScrolled = useIsScrolled(20)
  const { user, isAuthenticated, logout } = useAuthStore()
  const {
    searchOpen,
    setSearchOpen,
    setMobileMenuOpen,
    notificationsPanelOpen,
    setNotificationsPanelOpen,
  } = useUIStore()

  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState(languages[0])

  const megaMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const userMenuRef = useOnClickOutside<HTMLDivElement>(() => setUserMenuOpen(false))
  const langMenuRef = useOnClickOutside<HTMLDivElement>(() => setLangMenuOpen(false))

  const handleMegaMenuEnter = () => {
    if (megaMenuTimer.current) clearTimeout(megaMenuTimer.current)
    setMegaMenuOpen(true)
  }

  const handleMegaMenuLeave = () => {
    megaMenuTimer.current = setTimeout(() => setMegaMenuOpen(false), 150)
  }

  const handleLogout = async () => {
    await logout()
    setUserMenuOpen(false)
  }

  return (
    <>
      <SearchBar />
      <NotificationPanel />
      <MobileNav />

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-500',
          isScrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg shadow-black/5'
            : 'bg-transparent',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2.5 group">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -5 }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B6B] via-[#6C63FF] to-[#6BCBFF] shadow-lg shadow-[#6C63FF]/20"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#6C63FF] to-[#6BCBFF] bg-clip-text text-transparent">
                  Pogo Tunes
                </span>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {navItems.slice(0, 4).map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'text-[#6C63FF] dark:text-[#6BCBFF]'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-indicator"
                          className="absolute -bottom-1 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#6C63FF]"
                        />
                      )}
                    </Link>
                  )
                })}

                <div
                  className="relative"
                  onMouseEnter={handleMegaMenuEnter}
                  onMouseLeave={handleMegaMenuLeave}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-200',
                      megaMenuOpen
                        ? 'text-[#6C63FF] dark:text-[#6BCBFF] bg-gray-100 dark:bg-white/10'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10',
                    )}
                  >
                    More
                    <motion.div
                      animate={{ rotate: megaMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {megaMenuOpen && (
                      <div onMouseEnter={handleMegaMenuEnter} onMouseLeave={handleMegaMenuLeave}>
                        <MegaMenu />
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200',
                  'bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5',
                  'text-gray-500 dark:text-gray-400',
                  'hover:bg-white dark:hover:bg-white/20 hover:text-gray-700 dark:hover:text-gray-200',
                )}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotificationsPanelOpen(!notificationsPanelOpen)}
                className={cn(
                  'relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200',
                  'bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5',
                  'text-gray-500 dark:text-gray-400',
                  'hover:bg-white dark:hover:bg-white/20 hover:text-gray-700 dark:hover:text-gray-200',
                )}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#6C63FF] text-[8px] font-bold text-white">
                  3
                </span>
              </motion.button>

              <ThemeToggle />

              <div className="hidden sm:block relative" ref={langMenuRef}>
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200',
                    'bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5',
                    'hover:bg-white dark:hover:bg-white/20',
                  )}
                  aria-label="Language selector"
                >
                  <span className="text-base leading-none">{selectedLang.flag}</span>
                </button>
                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-xl"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLang(lang)
                            setLangMenuOpen(false)
                          }}
                          className={cn(
                            'flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors',
                            selectedLang.code === lang.code
                              ? 'bg-[#6C63FF]/10 text-[#6C63FF] dark:text-[#6BCBFF] font-medium'
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                          )}
                        >
                          <span>{lang.flag}</span>
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={cn(
                      'flex items-center gap-2 rounded-xl p-1.5 pr-3 transition-all duration-200',
                      'bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5',
                      'hover:bg-white dark:hover:bg-white/20',
                      userMenuOpen && 'bg-white dark:bg-white/20',
                    )}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#6BCBFF] text-white text-xs font-bold">
                      {(user.name || user.email || 'U')[0].toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                      {user.name || 'User'}
                    </span>
                    <motion.div
                      animate={{ rotate: userMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-xl"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                            {user.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="p-1.5">
                          {userDropdownItems.map((item) => {
                            const Icon = item.icon
                            return (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setUserMenuOpen(false)}
                              >
                                <Icon className="h-4 w-4" />
                                {item.label}
                              </Link>
                            )
                          })}
                        </div>
                        <div className="border-t border-gray-100 dark:border-gray-800 p-1.5">
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#FF6B6B] hover:bg-[#FF6B6B]/10 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Log Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
                  >
                    <LogIn className="h-4 w-4" />
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#6C63FF] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#FF6B6B]/20 hover:shadow-xl hover:shadow-[#FF6B6B]/30 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(true)}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl lg:hidden transition-all duration-200',
                  'bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5',
                  'text-gray-600 dark:text-gray-400',
                  'hover:bg-white dark:hover:bg-white/20',
                )}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
