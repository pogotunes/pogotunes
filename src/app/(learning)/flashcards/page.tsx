'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, staggerItem } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Layers, BookOpen, Eye, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { Flashcard } from '@/types'

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/flashcards')
      .then((res) => res.json())
      .then((res) => setFlashcards(res.data || []))
      .catch(() => setFlashcards([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-yellow/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Flashcards' }]}
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
              Flashcard Sets
            </h1>
            <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
              Boost your memory with flashcards. Review and master any subject.
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
            ) : flashcards.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <Layers className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/40 font-nunito text-lg">No flashcards yet. Check back soon!</p>
              </div>
            ) : (
              flashcards.map((set) => (
                <Link key={set.id} href={`/flashcards/${set.slug}`}>
                  <motion.div variants={staggerItem}>
                    <Card variant="glass" className="h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple to-purple-light flex items-center justify-center shadow-lg mb-3">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-white">{set.title}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-2">
                        {set.description || 'Review and learn with flashcards'}
                      </CardDescription>
                      <div className="mt-3 flex items-center gap-2 flex-wrap">
                        {set.tags?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="white" size="sm">
                            {tag}
                          </Badge>
                        ))}
                        <Badge variant="sky" size="sm">
                          <Eye className="w-3 h-3" />
                          {set.viewCount || 0}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-white/50 font-nunito">
                        <Sparkles className="w-4 h-4" />
                        Start reviewing
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
