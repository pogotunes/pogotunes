'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Trophy, Star, Flame, Medal, ArrowRight } from 'lucide-react'

const badges = [
  { emoji: '🎯', name: 'First Steps', desc: 'Complete 1 lesson', color: '#FF6B6B' },
  { emoji: '⚡', name: 'Quick Learner', desc: 'Complete 5 lessons', color: '#FFD93D' },
  { emoji: '📚', name: 'Knowledge Seeker', desc: 'Complete 25 lessons', color: '#6BCBFF' },
  { emoji: '🏆', name: 'Quiz Master', desc: '100% on any quiz', color: '#6C63FF' },
  { emoji: '🔥', name: 'On a Roll', desc: '3-day streak', color: '#51CF66' },
  { emoji: '💪', name: 'Week Warrior', desc: '7-day streak', color: '#FF6B6B' },
]

const leaderboardPreview = [
  { rank: 1, name: 'Luna Star', avatar: '👧', xp: 15420, level: 35 },
  { rank: 2, name: 'Max Power', avatar: '👦', xp: 12890, level: 28 },
  { rank: 3, name: 'Ella Bright', avatar: '🧒', xp: 11230, level: 24 },
  { rank: 4, name: 'Leo Smart', avatar: '👦', xp: 9870, level: 22 },
  { rank: 5, name: 'Zara Spark', avatar: '👧', xp: 8540, level: 19 },
]

function BadgeCard({ emoji, name, desc, color, index }: {
  emoji: string; name: string; desc: string; color: string; index: number
}) {
  return (
    <motion.div
      className="group text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <motion.div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-2 cursor-pointer transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${color}25, ${color}08)`,
          border: `1px solid ${color}25`,
        }}
        whileHover={{ scale: 1.12, y: -4, rotate: [0, -5, 5, 0] }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {emoji}
      </motion.div>
      <p className="text-xs font-semibold text-white/80" style={{ fontFamily: 'var(--font-baloo)' }}>{name}</p>
      <p className="text-[10px] text-white/40 font-nunito">{desc}</p>
    </motion.div>
  )
}

export function AchievementsSection() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-yellow blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass text-yellow mb-4">
            🏅 Achievements
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Earn Badges, Unlock{' '}
            <span className="bg-gradient-to-r from-yellow to-coral bg-clip-text text-transparent">
              Rewards
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-nunito">
            Every lesson completed earns XP, coins, and badges. Watch your child&apos;s confidence grow!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Trophy size={20} className="text-yellow" />
              <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-baloo)' }}>
                Achievement Badges
              </h3>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {badges.map((badge, i) => (
                <BadgeCard key={badge.name} {...badge} index={i} />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <div className="glass rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow" fill="currentColor" />
                    <span className="text-white/70 text-sm font-nunito">XP: <strong className="text-white">12,450</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Medal size={16} className="text-coral" />
                    <span className="text-white/70 text-sm font-nunito">Coins: <strong className="text-white">3,200</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame size={16} className="text-orange-400" />
                    <span className="text-white/70 text-sm font-nunito">Streak: <strong className="text-white">12 days</strong></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-yellow" />
                <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-baloo)' }}>
                  Leaderboard
                </h3>
              </div>
              <Link
                href="/leaderboard"
                className="text-sm text-white/40 hover:text-white transition-colors font-nunito flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div
              className="rounded-2xl overflow-hidden backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {leaderboardPreview.map((player, i) => (
                <motion.div
                  key={player.rank}
                  className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        player.rank <= 3 ? 'text-white' : 'text-white/40'
                      }`}
                      style={{
                        background: player.rank === 1 ? 'linear-gradient(135deg, #FFD93D, #F0C000)' :
                          player.rank === 2 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' :
                          player.rank === 3 ? 'linear-gradient(135deg, #CD7F32, #B8652A)' :
                          'rgba(255,255,255,0.05)',
                      }}
                    >
                      {player.rank}
                    </span>
                    <span className="text-lg">{player.avatar}</span>
                    <span className="text-white/80 text-sm font-semibold font-nunito">{player.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white/60 text-xs font-nunito">{player.xp.toLocaleString()} XP</span>
                    <div className="text-[10px] text-white/30 font-nunito">Lvl {player.level}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
