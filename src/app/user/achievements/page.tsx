'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/animations'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Lock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ACHIEVEMENTS } from '@/lib/constants'

interface UserAchievement {
  id: string
  achievementId: string
  unlockedAt: string
}

export default function AchievementsPage() {
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/achievements/user')
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setUserAchievements(res.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const unlockedIds = new Set(userAchievements.map((ua) => ua.achievementId))

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-2xl font-baloo font-bold text-white">Achievements</h1>
        <p className="text-white/50 font-nunito text-sm mt-1">
          Complete tasks to earn achievements and rewards
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner label="Loading achievements..." />
        </div>
      ) : (
        <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = unlockedIds.has(achievement.id)

            return (
              <Card
                key={achievement.id}
                variant="glass"
                className={cn('p-4 transition-all', unlocked ? 'opacity-100' : 'opacity-50')}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0',
                    unlocked ? 'bg-white/10' : 'bg-white/5'
                  )}>
                    {unlocked ? achievement.icon : <Lock className="w-5 h-5 text-white/30" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-baloo font-bold text-white">{achievement.name}</h3>
                      {unlocked && <Sparkles className="w-4 h-4 text-yellow" />}
                    </div>
                    <p className="text-xs text-white/50 font-nunito mt-0.5">{achievement.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="coral" size="sm">+{achievement.xpReward} XP</Badge>
                      <Badge variant="yellow" size="sm">+{achievement.coinReward} Coins</Badge>
                      <Badge variant="purple" size="sm">+{achievement.starsReward} Stars</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </motion.div>
      )}
    </motion.div>
  )
}
