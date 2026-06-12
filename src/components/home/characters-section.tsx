'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const characters = [
  {
    name: 'Pogo', emoji: '🦊', color: '#FF6B6B',
    title: 'The Brave Leader',
    desc: 'Pogo is a clever fox who loves solving puzzles and leading adventures. He always encourages kids to try their best and never give up!',
    fact: 'Loves to eat apples 🍎',
    personality: ['Brave', 'Clever', 'Helpful'],
  },
  {
    name: 'Tuni', emoji: '🐰', color: '#6BCBFF',
    title: 'The Smart Bunny',
    desc: 'Tuni is a brilliant bunny who knows everything about numbers and letters. She makes learning feel like magic with her fun teaching style!',
    fact: 'Favorite subject: Math 🔢',
    personality: ['Smart', 'Kind', 'Patient'],
  },
  {
    name: 'Bobo', emoji: '🐻', color: '#51CF66',
    title: 'The Funny Bear',
    desc: 'Bobo is a silly bear who loves to make everyone laugh. He may be goofy, but he always remembers important lessons and shares them with joy!',
    fact: 'Loves to dance 💃',
    personality: ['Funny', 'Loyal', 'Creative'],
  },
]

function CharacterCard({ name, emoji, color, title, desc, fact, personality, delay }: {
  name: string; emoji: string; color: string; title: string; desc: string; fact: string; personality: string[]; delay: number
}) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className="relative rounded-2xl p-0.5 overflow-hidden backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 h-full"
        style={{ background: `linear-gradient(135deg, ${color}40, transparent, ${color}20)` }}
      >
        <div
          className="relative rounded-2xl p-6 sm:p-8 h-full text-center backdrop-blur-xl"
          style={{ background: `linear-gradient(135deg, ${color}08, transparent)` }}
        >
          <motion.div
            className="relative mx-auto mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, delay: delay * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto flex items-center justify-center text-5xl sm:text-6xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                border: `3px solid ${color}30`,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: `radial-gradient(circle at 40% 40%, ${color}, transparent 70%)` }}
                animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="relative z-10">{emoji}</span>
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-baloo)' }}>
            {name}
          </h3>
          <p className="text-sm font-semibold mb-3" style={{ color, fontFamily: 'var(--font-nunito)' }}>
            {title}
          </p>
          <p className="text-white/50 text-sm leading-relaxed mb-4 font-nunito">{desc}</p>

          <div className="flex items-center justify-center gap-1.5 mb-4">
            {personality.map((trait, i) => (
              <span
                key={trait}
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{
                  background: `${color}20`,
                  color,
                  border: `1px solid ${color}30`,
                }}
              >
                {trait}
              </span>
            ))}
          </div>

          <div className="glass rounded-xl px-4 py-2.5 inline-flex items-center gap-2">
            <Sparkles size={14} style={{ color }} />
            <span className="text-xs text-white/60 font-nunito">{fact}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function CharactersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute top-10 left-10 w-[300px] h-[300px] rounded-full bg-coral blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-green blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass text-green mb-4">
            🎭 Meet the Characters
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Your Child&apos;s{' '}
            <span className="bg-gradient-to-r from-green via-sky-blue to-coral bg-clip-text text-transparent">
              Learning Friends
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-nunito">
            Pogo, Tuni, and Bobo make every lesson an adventure filled with laughter and discovery
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {characters.map((char, i) => (
            <CharacterCard key={char.name} {...char} delay={0.2 + i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
