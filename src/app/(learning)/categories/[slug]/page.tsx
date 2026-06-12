'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Brain,
  Gamepad2,
  Play,
  Sparkles,
  Video,
} from 'lucide-react'
import { CATEGORIES, LESSON_TYPES } from '@/lib/constants'
import type { Lesson } from '@/types'
import { staggerContainer, staggerItem, fadeInUp } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { CategoryCard } from '@/components/learning/category-card'
import { LessonCard } from '@/components/learning/lesson-card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

function getMockLessons(categoryName: string, categorySlug: string, categoryIcon?: string, categoryColor?: string): Lesson[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `lesson-${i + 1}`,
    title: `Lesson ${i + 1}: ${['Introduction', 'Basics', 'Practice', 'Advanced', 'Review', 'Challenge', 'Fun Activity', 'Quiz Prep', 'Deep Dive', 'Mastery', 'Creative Project', 'Final Test'][i]}`,
    slug: `lesson-${i + 1}`,
    description: 'Learn through interactive activities and fun challenges designed for young minds.',
    categoryId: 'cat-1',
    category: { id: 'cat-1', name: categoryName, slug: categorySlug, icon: categoryIcon, color: categoryColor, order: 0, children: [], isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    duration: (i + 1) * 5 + 5,
    difficulty: (['BEGINNER', 'BEGINNER', 'EASY', 'EASY', 'MEDIUM', 'MEDIUM', 'HARD', 'HARD', 'EXPERT', 'EXPERT', 'BEGINNER', 'MEDIUM'] as const)[i],
    type: (['VIDEO', 'ARTICLE', 'QUIZ', 'GAME', 'FLASHCARD', 'PRACTICE', 'VIDEO', 'ARTICLE', 'QUIZ', 'GAME', 'FLASHCARD', 'PRACTICE'] as const)[i],
    status: 'PUBLISHED' as const,
    order: i + 1,
    isFree: true,
    tags: [],
    viewCount: Math.floor(Math.random() * 1000),
    likeCount: Math.floor(Math.random() * 100),
    commentCount: Math.floor(Math.random() * 20),
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }))
}

const sectionIcons = {
  VIDEO: Video,
  ARTICLE: BookOpen,
  QUIZ: Brain,
  GAME: Gamepad2,
  FLASHCARD: Sparkles,
  PRACTICE: Play,
}

const sectionLabels: Record<string, string> = {
  VIDEO: 'Videos',
  ARTICLE: 'Articles',
  QUIZ: 'Quizzes',
  GAME: 'Games',
  FLASHCARD: 'Flashcards',
  PRACTICE: 'Practice',
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  const category = useMemo(
    () => CATEGORIES.find((c) => c.slug === slug),
    [slug]
  )

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="text-6xl">🔍</span>
        <h1 className="text-2xl font-baloo font-bold text-white">Category not found</h1>
        <p className="text-white/60 font-nunito">The category you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/categories">
          <Button variant="coral">Browse Categories</Button>
        </Link>
      </div>
    )
  }

  const mockLessons = useMemo(
    () => getMockLessons(category.name, category.slug, category.icon, category.color),
    [category]
  )

  const groupedLessons = LESSON_TYPES.map((type) => ({
    type,
    label: sectionLabels[type],
    Icon: sectionIcons[type],
    lessons: mockLessons.filter((l) => l.type === type),
  }))

  return (
    <div className="min-h-screen">
      <div
        className="relative overflow-hidden pb-16"
        style={{
          background: `linear-gradient(180deg, ${category.color}20 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: category.color }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: category.color }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <Breadcrumb
            items={[
              { label: 'Categories', href: '/categories' },
              { label: category.name },
            ]}
            className="mb-8"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <h1 className="text-4xl md:text-5xl font-baloo font-bold text-white mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
                Explore lessons, quizzes, games and more in {category.name.toLowerCase()}.
              </p>
            </motion.div>

            {groupedLessons.map(({ type, label, Icon, lessons }) =>
              lessons.length > 0 ? (
                <motion.section key={type} variants={fadeInUp}>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        'bg-gradient-to-br opacity-90'
                      )}
                      style={{
                        background: `linear-gradient(135deg, ${category.color}, ${category.color}88)`,
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-baloo font-bold text-white">{label}</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {lessons.slice(0, 4).map((lesson) => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        progress={Math.random() > 0.5 ? Math.floor(Math.random() * 100) : 0}
                      />
                    ))}
                  </div>
                </motion.section>
              ) : null
            )}

            <motion.section variants={fadeInUp}>
              <h2 className="text-2xl font-baloo font-bold text-white mb-6">Related Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORIES.filter((c) => c.slug !== slug)
                  .slice(0, 4)
                  .map((cat) => (
                    <Link key={cat.slug} href={`/categories/${cat.slug}`}>
                      <CategoryCard category={cat} />
                    </Link>
                  ))}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
