'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { Card } from '@/components/ui/card'
import { Trophy, Medal, Sparkles, Timer, Star, Users } from 'lucide-react'

const topUsers = [
  { rank: 1, name: 'Alex Star', xp: 15420, level: 42, streak: 15, avatar: '⭐' },
  { rank: 2, name: 'Maya Code', xp: 12850, level: 38, streak: 12, avatar: '🚀' },
  { rank: 3, name: 'Leo Math', xp: 11200, level: 35, streak: 10, avatar: '💡' },
  { rank: 4, name: 'Zara Read', xp: 9800, level: 31, streak: 8, avatar: '📚' },
  { rank: 5, name: 'Max Explore', xp: 8750, level: 28, streak: 7, avatar: '🌍' },
]

const rankColors = ['from-yellow to-yellow-light', 'from-gray-300 to-gray-400', 'from-amber to-amber-light']
const rankMedals = ['🥇', '🥈', '🥉']

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-yellow/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Leaderboard' }]}
          className="mb-8"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-white/70 font-nunito mb-6">
              <Trophy className="w-4 h-4 text-yellow" />
              Top Learners This Week
            </div>
            <h1 className="text-4xl md:text-5xl font-baloo font-bold text-white mb-4">
              Leaderboard
            </h1>
            <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
              See how you rank against other learners. Complete lessons, ace quizzes, and climb the ranks!
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {[
              { icon: Star, label: 'Total XP', value: 'Earn XP from lessons' },
              { icon: Timer, label: 'Streaks', value: 'Daily consistency' },
              { icon: Users, label: 'Learners', value: 'Join the community' },
            ].map((stat) => (
              <Card key={stat.label} variant="glass" className="text-center">
                <stat.icon className="w-8 h-8 text-yellow mx-auto mb-2" />
                <h3 className="text-lg font-baloo font-bold text-white">{stat.label}</h3>
                <p className="text-sm text-white/50 font-nunito">{stat.value}</p>
              </Card>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card variant="glass" className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Medal className="w-6 h-6 text-yellow" />
                <h2 className="text-2xl font-baloo font-bold text-white">Top Learners</h2>
              </div>

              <div className="space-y-3">
                {topUsers.map((user) => (
                  <div
                    key={user.rank}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 text-center">
                      {user.rank <= 3 ? (
                        <span className="text-2xl">{rankMedals[user.rank - 1]}</span>
                      ) : (
                        <span className="text-white/40 font-bold font-nunito">#{user.rank}</span>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                      {user.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-baloo font-bold truncate">{user.name}</p>
                      <p className="text-xs text-white/50 font-nunito">Level {user.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow font-baloo font-bold">{user.xp.toLocaleString()}</p>
                      <p className="text-xs text-white/40 font-nunito">🔥 {user.streak} day streak</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <Card variant="glass" className="max-w-md mx-auto">
              <Sparkles className="w-10 h-10 text-yellow mx-auto mb-3" />
              <h3 className="text-xl font-baloo font-bold text-white mb-2">More Coming Soon!</h3>
              <p className="text-sm text-white/60 font-nunito">
                We&apos;re building a full leaderboard experience with weekly challenges,
                achievement badges, and special rewards for top learners. Stay tuned!
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
