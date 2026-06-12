'use client'

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/animations'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Lock, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ACHIEVEMENTS } from '@/lib/constants'

export default function AchievementsPage() {
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

      <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ACHIEVEMENTS.map((achievement) => (
          <Card key={achievement.id} variant="glass" className="p-4">
            <div className="flex items-start gap-4">
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0',
                'bg-white/10'
              )}>
                {achievement.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-baloo font-bold text-white">{achievement.name}</h3>
                <p className="text-xs text-white/50 font-nunito mt-0.5">{achievement.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="coral" size="sm">+{achievement.xpReward} XP</Badge>
                  <Badge variant="yellow" size="sm">+{achievement.coinReward} Coins</Badge>
                  <Badge variant="purple" size="sm">+{achievement.starsReward} Stars</Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  )
}
