'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, Calculator, FlaskConical, Book, Edit, Type, BookMarked,
  PencilLine, Languages, Globe, Landmark, Palette, Music, Code,
  Puzzle, Brain, Shapes, Hash, Sigma, PawPrint,   Trees, Rocket,
  Heart, Apple, Users, Smile, Sparkles, Globe2, Leaf, Monitor,
  Lightbulb, Target, LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  'book-open': BookOpen,
  flask: FlaskConical,
  book: Book,
  edit: Edit,
  type: Type,
  'book-marked': BookMarked,
  'pencil-line': PencilLine,
  languages: Languages,
  globe: Globe,
  landmark: Landmark,
  palette: Palette,
  music: Music,
  code: Code,
  puzzle: Puzzle,
  brain: Brain,
  shapes: Shapes,
  hash: Hash,
  sigma: Sigma,
  'paw-print': PawPrint,
  tree: Trees,
  rocket: Rocket,
  heart: Heart,
  apple: Apple,
  users: Users,
  smile: Smile,
  sparkles: Sparkles,
  'globe-2': Globe2,
  leaf: Leaf,
  monitor: Monitor,
  lightbulb: Lightbulb,
  target: Target,
}

interface CategoryItem {
  id: string
  name: string
  slug: string
  icon?: string
  color?: string
}

export function CategoriesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(r => setCategories(r.data || []))
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  const COLORS = ['#FF6B6B', '#FFD93D', '#6BCBFF', '#6C63FF', '#51CF66']

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle at 20% 30%, #FF6B6B, transparent 50%), radial-gradient(circle at 80% 70%, #6C63FF, transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass text-coral mb-4">
            ✨ Explore & Learn
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Choose Your{' '}
            <span className="bg-gradient-to-r from-coral via-yellow to-purple bg-clip-text text-transparent">
              Learning Adventure
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-nunito">
            From ABCs to advanced math, we have everything your child needs to learn and grow
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 border-coral border-t-transparent animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/40 font-nunito text-lg">No categories available yet.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
            }}
          >
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon || ''] || BookOpen
              const color = cat.color || COLORS[i % COLORS.length]
              return (
                <motion.div
                  key={cat.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <Link href={`/categories/${cat.slug}`}>
                    <div className="group relative overflow-hidden rounded-2xl p-0.5 cursor-pointer">
                      <div
                        className="relative rounded-2xl p-5 h-full backdrop-blur-xl transition-all duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${color}08, ${color}02)`,
                          border: `1px solid ${color}20`,
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                          style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)` }}
                        />
                        <div className="relative z-10 flex flex-col items-center text-center gap-3">
                          <motion.div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                            style={{
                              background: `linear-gradient(135deg, ${color}30, ${color}10)`,
                              boxShadow: `0 4px 15px ${color}20`,
                            }}
                          >
                            <Icon size={26} style={{ color }} />
                          </motion.div>
                          <h3
                            className="font-bold text-base text-white/90 transition-colors duration-300 group-hover:text-white"
                            style={{ fontFamily: 'var(--font-baloo)' }}
                          >
                            {cat.name}
                          </h3>
                        </div>
                        <motion.div
                          className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                          style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/learn"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full glass text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
          >
            View All Categories
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
