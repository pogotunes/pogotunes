'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Clock,
  Star,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'
import { staggerContainer, fadeInUp, fadeInLeft } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { StepProgress } from '@/components/learning/progress-bar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const lessonContent = {
  title: 'Introduction to Numbers',
  description: 'Learn to count from 1 to 10 with fun activities and colorful animations.',
  category: 'Mathematics',
  difficulty: 'BEGINNER' as const,
  type: 'VIDEO' as const,
  duration: 15,
  steps: [
    { id: 'warmup', label: 'Warm Up' },
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practice' },
    { id: 'quiz', label: 'Quick Quiz' },
    { id: 'complete', label: 'Complete' },
  ],
  sections: [
    {
      title: 'Counting 1 to 5',
      content:
        'Let\'s start with the first five numbers! Watch the video below and try to count along. Numbers are everywhere around us - on clocks, in books, and on our fingers!',
      type: 'video',
    },
    {
      title: 'Counting 6 to 10',
      content:
        'Great job! Now let\'s learn numbers 6 through 10. Practice saying each number out loud as you see them appear on screen.',
      type: 'text',
    },
    {
      title: 'Practice Time',
      content:
        'Try counting the objects shown in each picture. How many apples do you see? How many stars? Count carefully and check your answers!',
      type: 'activity',
    },
  ],
}

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

export default function LessonPage() {
  const params = useParams()
  const slug = params.slug as string
  const [currentStep, setCurrentStep] = useState(0)

  const category = CATEGORIES.find((c) =>
    c.slug === slug.split('-').slice(0, -1).join('-') ||
    c.name.toLowerCase().includes('math')
  )

  const accentColor = category?.color ?? '#6BCBFF'

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
              { label: lessonContent.category, href: `/categories/${slug}` },
              { label: lessonContent.title },
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
                variant={
                  accentColor === '#FF6B6B' ? 'coral' :
                  accentColor === '#6BCBFF' ? 'sky' :
                  accentColor === '#6C63FF' ? 'purple' :
                  accentColor === '#51CF66' ? 'green' : 'yellow'
                }
                size="md"
                className="mb-4"
              >
                <BookOpen className="w-4 h-4" />
                {lessonContent.type}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-baloo font-bold text-white mb-3">
                {lessonContent.title}
              </h1>
              <p className="text-white/60 font-nunito max-w-2xl mx-auto mb-4">
                {lessonContent.description}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-white/50 font-nunito">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{lessonContent.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: difficultyStars[lessonContent.difficulty] }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow text-yellow" />
                  ))}
                  <span className="ml-1">{difficultyLabels[lessonContent.difficulty]}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <StepProgress
                steps={lessonContent.steps}
                currentStep={currentStep}
                className="max-w-2xl mx-auto"
              />
            </motion.div>

            <motion.div variants={fadeInLeft} className="space-y-6">
              {lessonContent.sections.map((section, index) => (
                <Card key={index} variant="glass" className="p-6 sm:p-8">
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
                        {index + 1}. {section.title}
                      </h3>
                      <p className="text-white/70 font-nunito leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between pt-4"
            >
              <Button
                variant="glass"
                icon={<ChevronLeft className="w-4 h-4" />}
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>

              <div className="flex items-center gap-2 text-white/40 text-sm font-nunito">
                <Sparkles className="w-4 h-4" />
                Step {currentStep + 1} of {lessonContent.steps.length}
              </div>

              {currentStep < lessonContent.steps.length - 1 ? (
                <Button
                  variant="coral"
                  icon={<ChevronRight className="w-4 h-4" />}
                  iconPosition="right"
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="green"
                  icon={<Sparkles className="w-4 h-4" />}
                >
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
