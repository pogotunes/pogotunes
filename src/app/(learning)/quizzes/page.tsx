'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, staggerItem } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HelpCircle, Star, Brain, FileQuestion, CheckCheck, GripVertical, Image, Timer } from 'lucide-react'
import Link from 'next/link'
import type { Quiz } from '@/types'

const typeIcons: Record<string, typeof HelpCircle> = {
  MULTIPLE_CHOICE: FileQuestion,
  TRUE_FALSE: CheckCheck,
  MATCH: GripVertical,
  FILL_BLANKS: Brain,
  DRAG_DROP: GripVertical,
  MEMORY: Brain,
  IMAGE_QUIZ: Image,
  TIMED: Timer,
}

const difficultyConfig: Record<string, { label: string; variant: 'green' | 'sky' | 'yellow' | 'coral' | 'purple' }> = {
  BEGINNER: { label: 'Beginner', variant: 'green' },
  EASY: { label: 'Easy', variant: 'sky' },
  MEDIUM: { label: 'Medium', variant: 'yellow' },
  HARD: { label: 'Hard', variant: 'coral' },
  EXPERT: { label: 'Expert', variant: 'purple' },
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/quizzes')
      .then((res) => res.json())
      .then((res) => setQuizzes(res.data || []))
      .catch(() => setQuizzes([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-yellow/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Quizzes' }]}
          className="mb-8"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h1 className="text-4xl md:text-5xl font-baloo font-bold text-white mb-4">
              Challenge Yourself
            </h1>
            <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
              Test your knowledge with fun quizzes across every subject.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 glass border border-white/10 animate-pulse"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 mb-4" />
                  <div className="h-6 w-3/4 bg-white/10 rounded mb-2" />
                  <div className="h-4 w-full bg-white/10 rounded mb-3" />
                  <div className="h-5 w-20 bg-white/10 rounded-full" />
                </div>
              ))
            ) : quizzes.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <HelpCircle className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/40 font-nunito text-lg">No quizzes yet. Check back soon!</p>
              </div>
            ) : (
              quizzes.map((quiz) => {
                const TypeIcon = typeIcons[quiz.type] || HelpCircle
                const diff = difficultyConfig[quiz.difficulty] || difficultyConfig.BEGINNER

                return (
                  <Link key={quiz.id} href={`/quiz/${quiz.slug}`}>
                    <motion.div variants={staggerItem}>
                      <Card variant="glass" className="h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow to-yellow-light flex items-center justify-center shadow-lg">
                            <TypeIcon className="w-6 h-6 text-white" />
                          </div>
                          <Badge variant={diff.variant} size="sm">
                            {diff.label}
                          </Badge>
                        </div>
                        <CardTitle className="text-white">{quiz.title}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {quiz.description || 'Test your knowledge'}
                        </CardDescription>
                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                          <Badge variant="white" size="sm">
                            <Star className="w-3 h-3" />
                            {quiz.type.replace(/_/g, ' ')}
                          </Badge>
                          {quiz.passingScore && (
                            <Badge variant="green" size="sm">
                              Pass: {quiz.passingScore}%
                            </Badge>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  </Link>
                )
              })
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
