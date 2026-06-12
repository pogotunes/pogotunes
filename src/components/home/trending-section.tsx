'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Clock, Star, Sparkles, Play, BookOpen, Music, Palette, Calculator } from 'lucide-react'

const lessons = [
  {
    id: 1, title: 'ABC Phonics Song', category: 'Phonics', duration: '5 min',
    rating: 4.9, difficulty: 'Beginner', color: '#FF6B6B', Icon: Music,
    desc: 'Sing along and learn letter sounds!',
  },
  {
    id: 2, title: 'Count 1 to 100', category: 'Math', duration: '8 min',
    rating: 4.8, difficulty: 'Beginner', color: '#FFD93D', Icon: Calculator,
    desc: 'Master counting from 1 to 100',
  },
  {
    id: 3, title: 'Fun with Shapes', category: 'Geometry', duration: '6 min',
    rating: 4.7, difficulty: 'Easy', color: '#6BCBFF', Icon: Palette,
    desc: 'Explore circles, squares & triangles',
  },
  {
    id: 4, title: 'Animal Sounds', category: 'Science', duration: '4 min',
    rating: 4.9, difficulty: 'Beginner', color: '#51CF66', Icon: Play,
    desc: 'Learn what animals say',
  },
  {
    id: 5, title: 'Color Rainbow', category: 'Art', duration: '7 min',
    rating: 4.8, difficulty: 'Easy', color: '#6C63FF', Icon: Palette,
    desc: 'Mix colors to make a rainbow',
  },
  {
    id: 6, title: 'Days of the Week', category: 'GK', duration: '3 min',
    rating: 4.6, difficulty: 'Beginner', color: '#FF6B6B', Icon: BookOpen,
    desc: 'Learn all 7 days with a song',
  },
  {
    id: 7, title: 'Fruits Names', category: 'Vocabulary', duration: '5 min',
    rating: 4.7, difficulty: 'Beginner', color: '#FFD93D', Icon: Play,
    desc: 'Identify yummy fruits',
  },
  {
    id: 8, title: 'Solar System', category: 'Science', duration: '10 min',
    rating: 4.9, difficulty: 'Medium', color: '#6BCBFF', Icon: Play,
    desc: 'Journey through the planets',
  },
]

export function TrendingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

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
          {lessons.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start group"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div
                className="relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 h-full"
                style={{
                  background: `linear-gradient(135deg, ${lesson.color}10, ${lesson.color}05)`,
                  border: `1px solid ${lesson.color}20`,
                }}
              >
                <div
                  className="h-40 flex items-center justify-center relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${lesson.color}20, ${lesson.color}05)` }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${lesson.color}, transparent 70%)` }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  <lesson.Icon size={56} style={{ color: lesson.color, opacity: 0.6 }} />

                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: `${lesson.color}30`,
                      color: lesson.color,
                      border: `1px solid ${lesson.color}40`,
                    }}
                  >
                    {lesson.category}
                  </span>

                  <span
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 glass"
                  >
                    <Clock size={12} />
                    {lesson.duration}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={14} className={s < Math.floor(lesson.rating) ? 'text-yellow' : 'text-white/20'} fill={s < Math.floor(lesson.rating) ? 'currentColor' : 'none'} />
                    ))}
                    <span className="text-xs text-white/50 ml-1 font-nunito">{lesson.rating}</span>
                  </div>

                  <h3
                    className="font-bold text-lg text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text transition-all"
                    style={{ fontFamily: 'var(--font-baloo)' }}
                  >
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-white/40 font-nunito mb-4 line-clamp-2">{lesson.desc}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs px-3 py-1 rounded-full glass text-white/60 font-nunito">
                      {lesson.difficulty}
                    </span>
                    <motion.button
                      className="px-4 py-2 rounded-full text-xs font-bold text-white transition-all"
                      style={{ background: `linear-gradient(135deg, ${lesson.color}, ${lesson.color}CC)` }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
