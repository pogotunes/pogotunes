'use client'

import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { BookOpen, Gamepad2, Users, Grid3X3, Sparkles } from 'lucide-react'

function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 50 })
  const rounded = useTransform(springValue, (v) => Math.round(v))

  if (isInView) {
    motionValue.set(end)
  }

  return (
    <motion.div ref={ref} className="text-4xl sm:text-5xl md:text-6xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-baloo)' }}>
      {prefix}
      <motion.span className="bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">
        {rounded}
      </motion.span>
      {suffix}
    </motion.div>
  )
}

const stats = [
  { icon: BookOpen, end: 1000, suffix: '+', label: 'Lessons', color: '#FF6B6B' },
  { icon: Gamepad2, end: 500, suffix: '+', label: 'Games', color: '#FFD93D' },
  { icon: Users, end: 1, suffix: 'M+', label: 'Students', color: '#6BCBFF', prefix: '' },
  { icon: Grid3X3, end: 50, suffix: '+', label: 'Categories', color: '#6C63FF' },
]

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.05) 0%, rgba(255,107,107,0.05) 50%, rgba(107,203,255,0.05) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass text-green mb-4">
            📊 By the Numbers
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Trusted by{' '}
            <span className="bg-gradient-to-r from-green to-sky-blue bg-clip-text text-transparent">
              Millions Worldwide
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative"
            >
              <div
                className="relative rounded-2xl p-6 sm:p-8 text-center backdrop-blur-xl overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}08, ${stat.color}02)`,
                  border: `1px solid ${stat.color}20`,
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${stat.color}15, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}30, ${stat.color}10)`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <stat.icon size={24} style={{ color: stat.color }} />
                  </motion.div>

                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />

                  <p
                    className="text-white/50 text-sm mt-2 font-nunito"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
