'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/animations'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useAuthStore } from '@/store/auth-store'
import { Spinner } from '@/components/ui/spinner'
import {
  BookOpen, Award, Zap, Star, TrendingUp,
  Clock, Target, Trophy, Sparkles, Gamepad2,
  Video, Brain
} from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

interface ComputedStats {
  lessonsCompleted: number
  quizScore: number
  quizTotal: number
  totalPoints: number
  achievements: number
}

export default function UserProfilePage() {
  const user = useAuthStore((state) => state.user)
  const profile = user?.profile
  const [computedStats, setComputedStats] = useState<ComputedStats | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/progress').then(r => r.json()),
      fetch('/api/achievements/user').then(r => r.json()),
    ])
      .then(([progressRes, achievementsRes]) => {
        const progress = progressRes.success ? progressRes.data : []
        const achievements = achievementsRes.success ? achievementsRes.data : []
        const completed = progress.filter((p: any) => p.completed)
        setComputedStats({
          lessonsCompleted: completed.length,
          quizScore: progress.reduce((sum: number, p: any) => sum + (p.score || 0), 0),
          quizTotal: progress.length,
          totalPoints: progress.reduce((sum: number, p: any) => sum + (p.score || 0), 0),
          achievements: achievements.length,
        })
      })
      .catch(() => {})
  }, [])

  const cs = computedStats
  const lessonsDone = cs?.lessonsCompleted ?? 0
  const totalPoints = cs?.totalPoints ?? 0
  const accuracy = cs && cs.quizTotal > 0 ? Math.round((cs.quizScore / cs.quizTotal) * 100) : 0
  const xp = profile?.xp ?? totalPoints
  const level = Math.floor(xp / 100) + 1

  const stats = [
    { label: 'Lessons', value: lessonsDone, icon: BookOpen, color: 'from-coral to-coral-light' },
    { label: 'Quizzes', value: cs?.quizTotal ?? 0, icon: Brain, color: 'from-purple to-purple-light' },
    { label: 'Games', value: 0, icon: Gamepad2, color: 'from-yellow to-yellow-light' },
    { label: 'Videos', value: 0, icon: Video, color: 'from-sky-blue to-sky-blue-light' },
    { label: 'XP Total', value: totalPoints, icon: Zap, color: 'from-green to-green-light' },
    { label: 'Accuracy', value: `${accuracy}%`, icon: Target, color: 'from-coral to-purple' },
  ]

  const levelInfo = {
    level,
    xp,
    title: level <= 5 ? 'Beginner'
      : level <= 10 ? 'Curious Mind'
      : level <= 15 ? 'Eager Learner'
      : level <= 20 ? 'Knowledge Builder'
      : level <= 25 ? 'Smart Thinker'
      : level <= 30 ? 'Rising Star'
      : level <= 35 ? 'Bright Spark'
      : level <= 40 ? 'Wise Owl'
      : 'Knowledge Master',
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <Card variant="glass" className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Avatar
              name={user?.name ?? 'User'}
              size="2xl"
              ringColor="coral"
              src={user?.avatar ?? undefined}
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-baloo font-bold text-white">
                {user?.name ?? 'User'}
              </h1>
              <p className="text-white/50 font-nunito text-sm">{user?.email}</p>
              {profile?.bio && (
                <p className="text-white/60 font-nunito text-sm mt-2">{profile.bio}</p>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <Badge variant="coral" size="sm">
                  Level {levelInfo.level}
                </Badge>
                <Badge variant="sky" size="sm">
                  {levelInfo.title}
                </Badge>
                {profile?.grade && (
                  <Badge variant="purple" size="sm">
                    Grade {profile.grade}
                  </Badge>
                )}
              </div>
            </div>
            <Link href="/user/settings">
              <Button variant="glass" size="sm">
                <Sparkles className="w-4 h-4" /> Edit Profile
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl font-baloo font-bold text-yellow">{profile?.coins ?? 0}</div>
              <div className="text-xs text-white/40 font-nunito mt-0.5">Coins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-baloo font-bold text-purple">{profile?.stars ?? 0}</div>
              <div className="text-xs text-white/40 font-nunito mt-0.5">Stars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-baloo font-bold text-green">{profile?.streak ?? 0}🔥</div>
              <div className="text-xs text-white/40 font-nunito mt-0.5">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-baloo font-bold text-coral">{profile?.longestStreak ?? 0}</div>
              <div className="text-xs text-white/40 font-nunito mt-0.5">Best Streak</div>
            </div>
          </div>
        </Card>
      </motion.div>

      <Tabs defaultValue="stats" variant="glass">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="stats" icon={<TrendingUp className="w-4 h-4" />}>Stats</TabsTrigger>
          <TabsTrigger value="progress" icon={<Target className="w-4 h-4" />}>Learning</TabsTrigger>
          <TabsTrigger value="account" icon={<Award className="w-4 h-4" />}>Account</TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div key={stat.label} variants={fadeInUp}>
                  <Card variant="glass" className="p-4 text-center">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xl font-baloo font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/50 font-nunito mt-1">{stat.label}</div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </TabsContent>

        <TabsContent value="progress">
          <Card variant="glass" className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-coral" /> Learning Progress
              </CardTitle>
              <CardDescription>Your journey through categories and subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-purple flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-baloo font-bold text-white">Total Lessons</div>
                    <div className="text-xs text-white/40 font-nunito">{lessonsDone} completed</div>
                  </div>
                </div>
                <div className="text-2xl font-baloo font-bold text-white">{lessonsDone}</div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green to-yellow flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-baloo font-bold text-white">Total Points</div>
                    <div className="text-xs text-white/40 font-nunito">{totalPoints} XP earned</div>
                  </div>
                </div>
                <div className="text-2xl font-baloo font-bold text-white">{totalPoints}</div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-blue to-purple flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-baloo font-bold text-white">Accuracy Rate</div>
                    <div className="text-xs text-white/40 font-nunito">Across all quizzes & games</div>
                  </div>
                </div>
                <div className="text-2xl font-baloo font-bold text-white">{accuracy}%</div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/categories" className="w-full">
                <Button variant="coral" fullWidth>
                  <Trophy className="w-4 h-4" /> Continue Learning
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card variant="glass" className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-coral" /> Account Details
              </CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/40 font-nunito uppercase tracking-wider">Name</label>
                  <p className="text-white font-nunito mt-1">{user?.name ?? '—'}</p>
                </div>
                <div>
                  <label className="text-xs text-white/40 font-nunito uppercase tracking-wider">Email</label>
                  <p className="text-white font-nunito mt-1">{user?.email ?? '—'}</p>
                </div>
                <div>
                  <label className="text-xs text-white/40 font-nunito uppercase tracking-wider">Role</label>
                  <p className="text-white font-nunito mt-1">{user?.role ?? 'USER'}</p>
                </div>
                <div>
                  <label className="text-xs text-white/40 font-nunito uppercase tracking-wider">Member Since</label>
                  <p className="text-white font-nunito mt-1">
                    {user?.createdAt ? format(new Date(user.createdAt), 'MMM d, yyyy') : '—'}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-white/40 font-nunito uppercase tracking-wider">Grade</label>
                  <p className="text-white font-nunito mt-1">{profile?.grade ?? '—'}</p>
                </div>
                <div>
                  <label className="text-xs text-white/40 font-nunito uppercase tracking-wider">Language</label>
                  <p className="text-white font-nunito mt-1">{profile?.language ?? 'en'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
