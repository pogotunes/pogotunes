'use client'

import { useState, useEffect } from 'react'
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
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import Link from 'next/link'

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

interface CategoryData {
  name: string
  slug: string
  icon?: string
  color?: string
  lessons: Lesson[]
  quizzes: any[]
  games: any[]
  videos: any[]
  flashcards: any[]
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [category, setCategory] = useState<CategoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/categories/${slug}`)
      .then((r) => r.json())
      .then((res) => {
        if (!res.success) {
          setError(res.error || 'Category not found')
          return
        }
        setCategory(res.data)
      })
      .catch(() => setError('Failed to load category'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" label="Loading category..." />
      </div>
    )
  }

  if (error || !category) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="text-6xl">🔍</span>
        <h1 className="text-2xl font-baloo font-bold text-white">{error || 'Category not found'}</h1>
        <p className="text-white/60 font-nunito">The category you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/categories">
          <Button variant="coral">Browse Categories</Button>
        </Link>
      </div>
    )
  }

  const accentColor = category.color || '#6BCBFF'

  const groupedLessons = LESSON_TYPES.map((type) => ({
    type,
    label: sectionLabels[type],
    Icon: sectionIcons[type],
    items: [
      ...(type === 'VIDEO' ? (category.videos || []) : []),
      ...(type === 'QUIZ' ? (category.quizzes || []) : []),
      ...(type === 'GAME' ? (category.games || []) : []),
      ...(type === 'FLASHCARD' ? (category.flashcards || []) : []),
      ...(type === 'ARTICLE' || type === 'PRACTICE'
        ? (category.lessons || []).filter((l) => l.type === type)
        : []),
    ],
  })).filter((g) => g.items.length > 0)

  return (
    <div className="min-h-screen">
      <div
        className="relative overflow-hidden pb-16"
        style={{
          background: `linear-gradient(180deg, ${accentColor}20 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: accentColor }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: accentColor }}
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

            {groupedLessons.length === 0 && (
              <motion.div variants={fadeInUp} className="text-center">
                <p className="text-white/40 font-nunito">No content available in this category yet.</p>
              </motion.div>
            )}

            {groupedLessons.map(({ type, label, Icon, items }) =>
              items.length > 0 ? (
                <motion.section key={type} variants={fadeInUp}>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-xl flex items-center justify-center',
                        'bg-gradient-to-br opacity-90'
                      )}
                      style={{
                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-baloo font-bold text-white">{label}</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {items.slice(0, 4).map((item: any) => {
                      const itemSlug = item.slug || ''
                      const href =
                        type === 'VIDEO' ? `/videos/${itemSlug}` :
                        type === 'QUIZ' ? `/quiz/${itemSlug}` :
                        type === 'GAME' ? `/games/${itemSlug}` :
                        type === 'FLASHCARD' ? `/flashcards/${itemSlug}` :
                        `/lessons/${itemSlug}`

                      return (
                        <Link key={item.id} href={href}>
                          <LessonCard
                            lesson={{
                              id: item.id,
                              title: item.title,
                              slug: itemSlug,
                              description: item.description || '',
                              categoryId: category.slug,
                              category: { id: category.slug, name: category.name, slug: category.slug, icon: category.icon || '', color: accentColor, order: 0, children: [], isActive: true, createdAt: '', updatedAt: '' },
                              duration: item.duration || 0,
                              difficulty: item.difficulty || 'BEGINNER',
                              type: item.type || type,
                              status: 'PUBLISHED',
                              order: item.order || 0,
                              isFree: true,
                              tags: item.tags || [],
                              viewCount: item.viewCount || 0,
                              likeCount: item.likeCount || 0,
                              commentCount: item.commentCount || 0,
                              publishedAt: item.publishedAt || new Date().toISOString(),
                              createdAt: item.createdAt || new Date().toISOString(),
                              updatedAt: item.updatedAt || new Date().toISOString(),
                            }}
                            progress={Math.random() > 0.5 ? Math.floor(Math.random() * 100) : 0}
                          />
                        </Link>
                      )
                    })}
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
