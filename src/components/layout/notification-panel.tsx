'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Bell,
  X,
  CheckCheck,
  Trash2,
  Trophy,
  Star,
  Heart,
  Info,
  Clock,
} from 'lucide-react'
import { useUIStore } from '@/store/ui-store'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

interface Notification {
  id: string
  title: string
  message: string
  type: 'achievement' | 'milestone' | 'reminder' | 'system' | 'social'
  read: boolean
  link?: string
  createdAt: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Congratulations!',
    message: 'You earned the "Quick Learner" achievement for completing 5 lessons!',
    type: 'achievement',
    read: false,
    link: '/achievements',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: '2',
    title: '7-Day Streak!',
    message: 'Amazing! You\'ve been learning for 7 days in a row. Keep it up!',
    type: 'milestone',
    read: false,
    link: '/profile',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: '3',
    title: 'New Lesson Available',
    message: 'Check out the new "Solar System Explorers" lesson in Science!',
    type: 'system',
    read: false,
    link: '/learn/solar-system',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: '4',
    title: 'Math Master!',
    message: 'You scored 100% on the Multiplication Challenge quiz!',
    type: 'achievement',
    read: true,
    link: '/quizzes/multiplication-challenge',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '5',
    title: 'Weekly Progress',
    message: 'You completed 12 lessons this week. That\'s a new personal record!',
    type: 'milestone',
    read: true,
    link: '/profile',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
]

const typeConfig = {
  achievement: { icon: Trophy, color: '#FFD93D', bg: '#FFD93D15' },
  milestone: { icon: Star, color: '#6C63FF', bg: '#6C63FF15' },
  reminder: { icon: Clock, color: '#6BCBFF', bg: '#6BCBFF15' },
  system: { icon: Info, color: '#51CF66', bg: '#51CF6615' },
  social: { icon: Heart, color: '#FF6B6B', bg: '#FF6B6B15' },
}

const panelVariants: Variants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.03, duration: 0.25 },
  }),
}

export function NotificationPanel() {
  const { notificationsPanelOpen, setNotificationsPanelOpen } = useUIStore()
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    )
  }

  return (
    <AnimatePresence>
      {notificationsPanelOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setNotificationsPanelOpen(false)}
          />

          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-white/20 dark:border-gray-700/20 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#FF6B6B]" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Notifications
                </h2>
                {unreadCount > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF6B6B]/80 px-1.5 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-medium text-[#6C63FF] dark:text-[#6BCBFF] hover:bg-[#6C63FF]/10 transition-colors"
                  >
                    <CheckCheck className="h-4 w-4" />
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setNotificationsPanelOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close notifications"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#6BCBFF]/20 to-[#6C63FF]/20">
                    <Bell className="h-10 w-10 text-[#6BCBFF]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    All caught up!
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You have no new notifications. Keep learning and earning achievements!
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {notifications.map((notification, i) => {
                    const config = typeConfig[notification.type]
                    const Icon = config.icon
                    const timeAgo = (() => {
                      try {
                        return formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })
                      } catch {
                        return 'recently'
                      }
                    })()

                    return (
                      <motion.div
                        key={notification.id}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className={cn(
                          'relative flex gap-3 px-4 py-4 transition-colors cursor-pointer',
                          !notification.read
                            ? 'bg-[#6C63FF]/5 dark:bg-[#6BCBFF]/5'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
                        )}
                        onClick={() => {
                          markAsRead(notification.id)
                          if (notification.link) {
                            setNotificationsPanelOpen(false)
                          }
                        }}
                      >
                        {!notification.read && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#6C63FF] dark:bg-[#6BCBFF]" />
                        )}
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: config.bg }}
                        >
                          <Icon className="h-5 w-5" style={{ color: config.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={cn(
                                'text-sm',
                                notification.read
                                  ? 'text-gray-600 dark:text-gray-400'
                                  : 'font-semibold text-gray-900 dark:text-gray-100',
                              )}
                            >
                              {notification.title}
                            </p>
                            <span className="shrink-0 text-[10px] text-gray-400">
                              {timeAgo}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {notification.message}
                          </p>
                          {notification.link && (
                            <Link
                              href={notification.link}
                              className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#6C63FF] dark:text-[#6BCBFF] hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View details
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 p-4">
                <button
                  onClick={clearAll}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
