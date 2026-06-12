'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className={cn('h-10 w-10 rounded-xl bg-white/10 dark:bg-black/10', className)} />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'relative h-10 w-10 overflow-hidden rounded-xl',
        'bg-white/70 dark:bg-white/10',
        'backdrop-blur-md border border-white/20',
        'shadow-lg shadow-black/5',
        'flex items-center justify-center',
        'hover:bg-white/90 dark:hover:bg-white/20',
        'transition-colors duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/50',
        className,
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isDark ? (
            <Moon className="h-5 w-5 text-[#6BCBFF]" />
          ) : (
            <Sun className="h-5 w-5 text-[#FFD93D]" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
