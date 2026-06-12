'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Clock,
  Star,
  BookOpen,
  CheckCircle,
  Sparkles,
} from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { StepProgress } from '@/components/learning/progress-bar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { Lesson } from '@/types'

const difficultyStars: Record<string, number> = {
  BEGINNER: 1,
  EASY: 2,
  MEDIUM: 3,
  HARD: 4,
  EXPERT: 5,
}

const difficultyLabels: Record<string, string> = {
  BEGINNER: 'Beginner',
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
  EXPERT: 'Expert',
}

const steps = [
  { id: 'start', label: 'Start' },
  { id: 'learn', label: 'Learn' },
  { id: 'review', label: 'Review' },
  { id: 'complete', label: 'Complete' },
]

export default function LessonPage() {
  const params = useParams()
  const slug = params.slug as string
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    fetch(`/api/lessons/${slug}`)
      .then((r) => r.json())
      .then((res) => {
        if (!res.success) {
          setError(res.error || 'Lesson not found')
          return
        }
        setLesson(res.data)
      })
      .catch(() => setError('Failed to load lesson'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" label="Loading lesson..." />
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">📖</span>
        <h1 className="text-2xl font-baloo font-bold text-white">{error || 'Lesson not found'}</h1>
        <Link href="/learn">
          <Button variant="coral">Browse Lessons</Button>
        </Link>
      </div>
    )
  }

  const category = lesson.category
  const accentColor = '#6BCBFF'

  return (
    <div className="min-h-screen">
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${accentColor}15 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
            style={{ background: accentColor }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <Breadcrumb
            items={[
              { label: 'Categories', href: '/categories' },
              { label: category?.name || 'Lessons', href: `/categories/${category?.slug}` },
              { label: lesson.title },
            ]}
            className="mb-8"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <Badge
                variant="sky"
                size="md"
                className="mb-4"
              >
                <BookOpen className="w-4 h-4" />
                {lesson.type}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-baloo font-bold text-white mb-3">
                {lesson.title}
              </h1>
              <p className="text-white/60 font-nunito max-w-2xl mx-auto mb-4">
                {lesson.description}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-white/50 font-nunito">
                {lesson.duration && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration} min</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: difficultyStars[lesson.difficulty] || 1 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
                  ))}
                  <span className="ml-1">{difficultyLabels[lesson.difficulty] || lesson.difficulty}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <StepProgress
                steps={steps}
                currentStep={currentStep}
                className="max-w-2xl mx-auto"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <Card variant="glass" className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                      'bg-gradient-to-br'
                    )}
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
                    }}
                  >
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-baloo font-bold text-white mb-3">
                      {lesson.title}
                    </h3>
                    <p className="text-white/70 font-nunito leading-relaxed">
                      {lesson.content || lesson.description || 'No content available for this lesson.'}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between pt-4"
            >
              <Button
                variant="glass"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              <div className="flex items-center gap-2 text-white/40 text-sm font-nunito">
                <Sparkles className="w-4 h-4" />
                Step {currentStep + 1} of {steps.length}
              </div>

              {currentStep < steps.length - 1 ? (
                <Button
                  variant="coral"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button variant="green">
                  Complete Lesson
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
