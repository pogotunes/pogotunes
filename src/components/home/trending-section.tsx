'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Clock, Star, Sparkles, Play, BookOpen, Music, Palette, Calculator, Brain, Shapes } from 'lucide-react'
import type { Lesson } from '@/types'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  phonics: Music,
  math: Calculator,
  geometry: Palette,
  science: Play,
  art: Palette,
  reading: BookOpen,
  music: Music,
  coding: Brain,
  vocabulary: BookOpen,
  memory: Brain,
  'logic-puzzles': Shapes,
}

const colors = ['#FF6B6B', '#FFD93D', '#6BCBFF', '#6C63FF', '#51CF66']

export function TrendingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [lessons, setLessons] = useState<Lesson[]>([])

  useEffect(() => {
    fetch('/api/lessons')
      .then(r => r.json())
      .then(r => setLessons(r.data || []))
      .catch(() => setLessons([]))
  }, [])

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll)
    return () => el.removeEventListener('scroll', checkScroll)
  }, [checkScroll])

  useEffect(() => {
    if (isPaused || !scrollRef.current) return
    const interval = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      const maxScroll = el.scrollWidth - el.clientWidth
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 320, behavior: 'smooth' })
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [isPaused])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -320 : 320,
      behavior: 'smooth',
    })
  }

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ background: 'radial-gradient(circle at 70% 20%, #6BCBFF, transparent 50%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass text-sky-blue mb-4">
              🔥 Trending Now
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              Popular{' '}
              <span className="bg-gradient-to-r from-sky-blue to-purple bg-clip-text text-transparent">
                Lessons
              </span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {lessons.slice(0, 8).map((lesson, i) => {
            const color = colors[i % colors.length]
            const catName = (lesson as any).category?.name || ''
            const Icon = iconMap[catName.toLowerCase().replace(/\s+/g, '-')] || BookOpen
            const difficulty = lesson.difficulty?.toLowerCase() || 'beginner'
            return (
              <motion.div
                key={lesson.id}
                className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start group"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/lessons/${lesson.slug}`}>
                  <div
                    className="relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 h-full"
                    style={{
                      background: `linear-gradient(135deg, ${color}10, ${color}05)`,
                      border: `1px solid ${color}20`,
                    }}
                  >
                    <div
                      className="h-40 flex items-center justify-center relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${color}20, ${color}05)` }}
                    >
                      <motion.div
                        className="absolute inset-0 opacity-10"
                        style={{ background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)` }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      />

                      <Icon size={56} style={{ color, opacity: 0.6 }} />

                      <span
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: `${color}30`,
                          color,
                          border: `1px solid ${color}40`,
                        }}
                      >
                        {catName || 'General'}
                      </span>

                      <span
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 glass"
                      >
                        <Clock size={12} />
                        {lesson.duration ? `${Math.round(lesson.duration / 60)} min` : '~5 min'}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} size={14} className={s < 4 ? 'text-yellow' : 'text-white/20'} fill={s < 4 ? 'currentColor' : 'none'} />
                        ))}
                        <span className="text-xs text-white/50 ml-1 font-nunito">4.8</span>
                      </div>

                      <h3
                        className="font-bold text-lg text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text transition-all"
                        style={{ fontFamily: 'var(--font-baloo)' }}
                      >
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-white/40 font-nunito mb-4 line-clamp-2">{lesson.description || 'Fun and interactive lesson for kids'}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs px-3 py-1 rounded-full glass text-white/60 font-nunito">
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </span>
                        <motion.span
                          className="px-4 py-2 rounded-full text-xs font-bold text-white inline-block"
                          style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Start Now
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/learn"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full glass text-white font-bold text-lg hover:bg-white/10 transition-all"
          >
            View All Lessons
            <Sparkles size={18} className="text-yellow" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
