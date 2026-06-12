'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles, Star, Heart, Rocket } from 'lucide-react'

const floatingDecorations = [
  { Icon: Star, color: '#FFD93D', x: '10%', y: '15%', size: 20, delay: 0 },
  { Icon: Heart, color: '#FF6B6B', x: '85%', y: '20%', size: 24, delay: 0.5 },
  { Icon: Sparkles, color: '#6BCBFF', x: '15%', y: '75%', size: 18, delay: 1 },
  { Icon: Rocket, color: '#51CF66', x: '80%', y: '80%', size: 28, delay: 1.5 },
  { Icon: Star, color: '#6C63FF', x: '50%', y: '10%', size: 16, delay: 0.8 },
]

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 25%, #6C63FF 50%, #8B85FF 75%, #FF6B6B 100%)',
          backgroundSize: '300% 300%',
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />

      {floatingDecorations.map(({ Icon, color, x, y, size, delay }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: x, top: y }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + delay }}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon size={size} style={{ color: 'white', opacity: 0.3 }} />
          </motion.div>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-white/15 text-white/90 backdrop-blur-sm mb-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            🚀 Start Today
          </motion.span>

          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Start Your Learning
            <br />
            Adventure Today!
          </h2>

          <p className="text-xl sm:text-2xl text-white/80 mb-10 font-nunito max-w-2xl mx-auto">
            Join millions of happy learners worldwide
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/learn"
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-coral font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              aria-label="Get started free"
            >
              <span className="absolute inset-0 bg-white group-hover:bg-white/90 transition-colors" />
              <span className="relative z-10 flex items-center gap-3">
                Get Started Free
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </span>
            </Link>

            <motion.button
              className="group inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-bold text-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Watch demo"
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20"
              >
                <Play size={18} className="ml-0.5" />
              </motion.span>
              Watch Demo
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-6 mt-10"
          >
            {['👧', '👦', '🧒', '👶', '👦'].map((emoji, i) => (
              <motion.div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-sm bg-white/10"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
              >
                {emoji}
              </motion.div>
            ))}
            <span className="text-white/60 text-sm font-nunito">
              <span className="text-white font-bold">Free</span> for a limited time!
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
