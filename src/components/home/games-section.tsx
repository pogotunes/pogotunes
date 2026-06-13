'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Gamepad2, Sparkles, ArrowRight, Puzzle, Brain, Shapes, Palette, Target, Zap } from 'lucide-react'
import type { Game } from '@/types'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  'memory-match': Brain,
  'shape-sorter': Shapes,
  'color-match': Palette,
  'number-jump': Target,
  'word-match': Gamepad2,
  'quick-math': Zap,
  puzzle: Puzzle,
}

const gameColors = ['#FF6B6B', '#FFD93D', '#6BCBFF', '#6C63FF', '#51CF66', '#FF6B6B']

function GameCard({ title, description, difficulty, color, index, slug }: {
  title: string; description?: string; difficulty: string; color: string; index: number; slug: string
}) {
  const Icon = iconMap[slug] || Gamepad2
  return (
    <Link href={`/games/${slug}`}>
      <motion.div
        className="group"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
      >
        <div
          className="relative rounded-2xl overflow-hidden backdrop-blur-xl h-full transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
          style={{
            background: `linear-gradient(135deg, ${color}08, ${color}02)`,
            border: `1px solid ${color}20`,
          }}
        >
          <div
            className="h-32 sm:h-36 flex items-center justify-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)` }}
          >
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{ background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)` }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Icon size={48} style={{ color: `${color}99` }} />
            </motion.div>

            <span
              className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
              style={{
                background: `${color}30`,
                color,
                border: `1px solid ${color}40`,
              }}
            >
              {difficulty}
            </span>
          </div>

          <div className="p-4 sm:p-5">
            <h3
              className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all"
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              {title}
            </h3>
            <p className="text-xs text-white/40 font-nunito mb-3 line-clamp-2">{description || 'Fun educational game for kids'}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-white/30 font-nunito">🎮 Interactive</span>
              <motion.span
                className="px-4 py-1.5 rounded-full text-xs font-bold text-white inline-block"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}CC)` }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Now
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export function GamesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('/api/games')
      .then(r => r.json())
      .then(r => setGames(r.data || []))
      .catch(() => setGames([]))
  }, [])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-green blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass text-green mb-4">
              🎮 Fun & Games
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              Learn Through{' '}
              <span className="bg-gradient-to-r from-green to-yellow bg-clip-text text-transparent">
                Play
              </span>
            </h2>
          </div>
          <Link
            href="/games"
            className="hidden sm:flex items-center gap-2 text-white/40 hover:text-white transition-colors font-nunito"
          >
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {games.slice(0, 6).map((game, i) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description || undefined}
              difficulty={game.difficulty?.toLowerCase() || 'easy'}
              color={gameColors[i % gameColors.length]}
              slug={game.slug}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 sm:hidden"
        >
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-white font-semibold"
          >
            View All Games <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
