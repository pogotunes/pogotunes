'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Play, Sparkles, ArrowRight, Star, BookOpen, Palette, Music, Cloud, Sun, MoonStar } from 'lucide-react'

const floatingElements = [
  { Icon: Star, color: '#FFD93D', size: 24, delay: 0, x: '10%', y: '15%', duration: 3 },
  { Icon: Cloud, color: '#6BCBFF', size: 48, delay: 0.5, x: '80%', y: '10%', duration: 4 },
  { Icon: BookOpen, color: '#6C63FF', size: 28, delay: 1, x: '15%', y: '70%', duration: 3.5 },
  { Icon: Palette, color: '#FF6B6B', size: 22, delay: 1.5, x: '75%', y: '75%', duration: 3 },
  { Icon: Music, color: '#51CF66', size: 26, delay: 2, x: '50%', y: '20%', duration: 4 },
  { Icon: Sparkles, color: '#FFD93D', size: 20, delay: 0.8, x: '25%', y: '50%', duration: 2.5 },
  { Icon: Star, color: '#6BCBFF', size: 18, delay: 1.2, x: '65%', y: '40%', duration: 3.2 },
  { Icon: Sun, color: '#FFD93D', size: 36, delay: 0.3, x: '85%', y: '55%', duration: 5 },
]

function useMousePosition() {
  const ref = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      ref.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return ref
}

function ParticleBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
      color: [ '#FF6B6B', '#FFD93D', '#6BCBFF', '#6C63FF', '#51CF66' ][Math.floor(Math.random() * 5)],
    })), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-30"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function FloatingElement({ Icon, color, size, delay, x, y, duration }: {
  Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  color: string; size: number; delay: number; x: string; y: string; duration: number
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
        y: [0, -15, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.2, 0.8, 1],
      }}
    >
      <div
        className="rounded-full p-2 backdrop-blur-md"
        style={{ background: `${color}20`, border: `1px solid ${color}40` }}
      >
        <Icon size={size} style={{ color }} />
      </div>
    </motion.div>
  )
}

function CharacterCard({ name, emoji, color, delay, label }: {
  name: string; emoji: string; color: string; delay: number; label: string
}) {
  return (
    <motion.div
      className="relative select-none"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="relative flex flex-col items-center gap-2"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, delay: delay * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center text-5xl sm:text-6xl shadow-lg relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}30, ${color}10)`,
            border: `3px solid ${color}50`,
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle at 30% 30%, ${color}, transparent)` }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="relative z-10">{emoji}</span>
        </div>
        <span
          className="text-sm sm:text-base font-bold tracking-wide"
          style={{ fontFamily: 'var(--font-baloo)', color }}
        >
          {name}
        </span>
        <span className="text-[10px] sm:text-xs text-white/60 font-nunito -mt-1">{label}</span>
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mouseRef = useMousePosition()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  const [vidModal, setVidModal] = useState(false)

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f0f1a 0%, #1a1a3e 30%, #2d1b69 60%, #0f0f1a 100%)' }}
    >
      <ParticleBackground />

      <motion.div className="absolute inset-0 opacity-10" style={{ y: bgY }} aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-coral blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-purple blur-[100px]" />
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-sky-blue blur-[80px]" />
      </motion.div>

      {floatingElements.map((el, i) => (
        <FloatingElement key={i} {...el} />
      ))}

      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.15 }} aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        style={{ y: textY, opacity, scale }}
      >
        <div className="flex-1 text-center lg:text-left pt-20 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles size={16} className="text-yellow" />
            <span className="text-sm font-semibold text-white/80" style={{ fontFamily: 'var(--font-nunito)' }}>
              World&apos;s #1 Kids Learning Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            <span className="bg-gradient-to-r from-coral via-yellow to-purple bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]">
              Learn & Play
            </span>
            <br />
            <span className="text-white">with Pogo Tunes!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-8 font-nunito leading-relaxed"
          >
            The most fun way for kids to learn ABCs, numbers, shapes, and more!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/learn"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,107,0.4)]"
              aria-label="Start learning free"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-coral to-purple opacity-100 group-hover:opacity-90 transition-opacity" />
              <span className="absolute inset-0 bg-gradient-to-r from-coral via-yellow to-purple opacity-0 group-hover:opacity-100 transition-opacity bg-[length:200%_auto] animate-[gradient-shift_3s_ease_infinite]" />
              <span className="relative z-10 flex items-center gap-3">
                Start Learning Free
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </span>
            </Link>

            <button
              onClick={() => setVidModal(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg glass hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(107,203,255,0.3)]"
              aria-label="Watch video"
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors"
              >
                <Play size={18} className="ml-0.5" />
              </motion.span>
              Watch Video
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center gap-6 mt-8 justify-center lg:justify-start"
          >
            <div className="flex -space-x-2">
              {['👧', '👦', '🧒', '👶'].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center text-sm bg-zinc-800"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
            <div className="text-white/60 text-sm font-nunito">
              <span className="text-white font-bold">1M+</span> Happy Learners
            </div>
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-4 sm:gap-6 pt-8 lg:pt-0">
          <CharacterCard name="Pogo" emoji="🦊" color="#FF6B6B" delay={0.6} label="The Leader" />
          <CharacterCard name="Tuni" emoji="🐰" color="#6BCBFF" delay={0.9} label="The Smart One" />
          <CharacterCard name="Bobo" emoji="🐻" color="#51CF66" delay={1.2} label="The Funny One" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-3 rounded-full bg-gradient-to-b from-coral to-purple"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {vidModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setVidModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-purple/20 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors"
                  >
                    <Play size={36} className="text-white ml-1" />
                  </motion.div>
                  <p className="text-white/80 text-lg font-nunito">Pogo Tunes Promo Video</p>
                </div>
              </div>
              <button
                onClick={() => setVidModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close video modal"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
