'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/animations'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const quickActions = [
  { label: 'Browse Categories', href: '/categories', emoji: '📚' },
  { label: 'Continue Learning', href: '/lessons', emoji: '📖' },
  { label: 'Play Games', href: '/games', emoji: '🎮' },
  { label: 'Take a Quiz', href: '/quiz', emoji: '🧠' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-coral/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-3xl md:text-4xl font-baloo font-bold text-white mb-2">
              Welcome Back! 👋
            </h1>
            <p className="text-white/60 font-nunito">
              Keep up the great work! You&apos;re doing amazing.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Lessons Done', value: '0', color: 'from-coral to-coral-light' },
              { label: 'Days Streak', value: '0', color: 'from-yellow to-yellow-light' },
              { label: 'Total Points', value: '0', color: 'from-sky-blue to-sky-blue-light' },
              { label: 'Achievements', value: '0', color: 'from-green to-green-light' },
            ].map((stat) => (
              <Card key={stat.label} variant="glass" className="p-5 text-center">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-white font-bold font-baloo">{stat.label[0]}</span>
                </div>
                <div className="text-2xl font-baloo font-bold text-white">{stat.value}</div>
                <div className="text-xs text-white/50 font-nunito mt-1">{stat.label}</div>
              </Card>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-xl font-baloo font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href}>
                  <Card variant="glass" className="p-4 text-center cursor-pointer hover:bg-white/5 transition-all">
                    <span className="text-3xl block mb-2">{action.emoji}</span>
                    <span className="text-sm font-nunito text-white/70">{action.label}</span>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <p className="text-white/40 text-sm font-nunito">
              Start learning to see your progress here!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
