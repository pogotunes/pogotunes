'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import {
  Globe,
  MessageCircle,
  Camera,
  Video,
  Bookmark,
  Newspaper,
  Heart,
  ArrowUp,
  Sparkles,
  Mail,
  MapPin,
  Phone,
  ChevronRight,
  Loader2,
} from 'lucide-react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { cn } from '@/lib/utils'
import { FOOTER_LINKS, SOCIAL_LINKS, SITE_NAME } from '@/lib/constants'
import toast from 'react-hot-toast'

const footerCategories = [
  { name: 'Math', href: '/learn?category=mathematics', color: '#FF6B6B' },
  { name: 'Science', href: '/learn?category=science', color: '#51CF66' },
  { name: 'English', href: '/learn?category=english-language', color: '#6BCBFF' },
  { name: 'Coding', href: '/learn?category=coding', color: '#6C63FF' },
  { name: 'Reading', href: '/learn?category=reading', color: '#FFD93D' },
  { name: 'Art', href: '/learn?category=art', color: '#6BCBFF' },
  { name: 'Music', href: '/learn?category=music', color: '#51CF66' },
  { name: 'Games', href: '/games', color: '#FF6B6B' },
]

const socialIconMap: Record<string, { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string }> = {
  Facebook: { icon: Globe, color: '#1877F2' },
  'X (Twitter)': { icon: MessageCircle, color: '#1DA1F2' },
  Instagram: { icon: Camera, color: '#E4405F' },
  YouTube: { icon: Video, color: '#FF0000' },
  Pinterest: { icon: Bookmark, color: '#E60023' },
  Blog: { icon: Newspaper, color: '#6C63FF' },
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [ref, isVisible] = useIntersectionObserver({ triggerOnce: true, threshold: 0.05 })

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubscribing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success('Subscribed! Check your email for confirmation.')
    setIsSubscribing(false)
    setEmail('')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={ref} className="relative mt-auto overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#FF6B6B]/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#6C63FF]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#6BCBFF]/5 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8"
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -5 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B6B] via-[#6C63FF] to-[#6BCBFF] shadow-lg shadow-[#6C63FF]/20"
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#6C63FF] to-[#6BCBFF] bg-clip-text text-transparent">
                Pogo Tunes
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Fun learning songs, videos, and activities for toddlers and young children — alphabets, numbers, colors, phonics, Hindi, and more!
            </p>
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              {SOCIAL_LINKS.map((social) => {
                const mapped = socialIconMap[social.name]
                if (!mapped) return null
                const Icon = mapped.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" style={{ color: mapped.color }} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {Object.values(FOOTER_LINKS).map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-[#6C63FF] dark:hover:text-[#6BCBFF] transition-colors"
                    >
                      <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                Popular Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {footerCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    className="group inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: `${cat.color}12`, color: cat.color }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                Stay Updated
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF] transition-all"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubscribing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#6C63FF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#FF6B6B]/20 hover:shadow-xl hover:shadow-[#FF6B6B]/30 transition-all duration-200 disabled:opacity-70"
                >
                  {isSubscribing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Heart className="h-4 w-4" />
                  )}
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <Link href="/privacy" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/dmca" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                DMCA
              </Link>
              <Link href="/cookies" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                Cookie Policy
              </Link>
              <a href="mailto:support@pogotunes.com" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                Contact Us
              </a>
            </div>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved. Made with{' '}
              <Heart className="inline h-3 w-3 text-[#FF6B6B]" /> for young learners.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#6BCBFF] text-white shadow-xl shadow-[#6C63FF]/30 hover:shadow-2xl hover:shadow-[#6C63FF]/40 transition-all duration-300"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  )
}
