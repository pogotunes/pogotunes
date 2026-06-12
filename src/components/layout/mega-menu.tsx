'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  BookOpen,
  Gamepad2,
  Layers,
  Video,
  HelpCircle,
  Trophy,
  Sparkles,
  Calculator,
  FlaskConical,
  Book,
  Code,
  Globe,
  Landmark,
  Palette,
  Music,
  Puzzle,
  Brain,
  Shapes,
  Rocket,
  Heart,
  Smile,
  Leaf,
  Monitor,
  Lightbulb,
  Target,
  ArrowRight,
  Star,
  Flame,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = [
  {
    title: 'Core Subjects',
    items: [
      { name: 'Mathematics', slug: '/learn?category=mathematics', icon: Calculator, color: '#FF6B6B' },
      { name: 'English', slug: '/learn?category=english-language', icon: BookOpen, color: '#6BCBFF' },
      { name: 'Science', slug: '/learn?category=science', icon: FlaskConical, color: '#51CF66' },
      { name: 'Reading', slug: '/learn?category=reading', icon: Book, color: '#6C63FF' },
      { name: 'Coding', slug: '/learn?category=coding', icon: Code, color: '#FFD93D' },
    ],
  },
  {
    title: 'Creative & Fun',
    items: [
      { name: 'Art', slug: '/learn?category=art', icon: Palette, color: '#6BCBFF' },
      { name: 'Music', slug: '/learn?category=music', icon: Music, color: '#51CF66' },
      { name: 'Geography', slug: '/learn?category=geography', icon: Globe, color: '#FFD93D' },
      { name: 'History', slug: '/learn?category=history', icon: Landmark, color: '#FF6B6B' },
    ],
  },
  {
    title: 'Brain Boosters',
    items: [
      { name: 'Logic & Puzzles', slug: '/learn?category=logic-puzzles', icon: Puzzle, color: '#FFD93D' },
      { name: 'Memory', slug: '/learn?category=memory', icon: Brain, color: '#FF6B6B' },
      { name: 'Critical Thinking', slug: '/learn?category=critical-thinking', icon: Lightbulb, color: '#6BCBFF' },
      { name: 'Problem Solving', slug: '/learn?category=problem-solving', icon: Target, color: '#51CF66' },
    ],
  },
  {
    title: 'Life & World',
    items: [
      { name: 'Animals', slug: '/learn?category=animals', icon: Heart, color: '#FFD93D' },
      { name: 'Space', slug: '/learn?category=space', icon: Rocket, color: '#6BCBFF' },
      { name: 'Nature', slug: '/learn?category=nature', icon: Leaf, color: '#51CF66' },
      { name: 'Emotions', slug: '/learn?category=emotions', icon: Smile, color: '#FF6B6B' },
    ],
  },
]

const quickLinks = [
  { name: 'All Lessons', href: '/learn', icon: BookOpen },
  { name: 'Games', href: '/games', icon: Gamepad2 },
  { name: 'Flashcards', href: '/flashcards', icon: Layers },
  { name: 'Videos', href: '/videos', icon: Video },
  { name: 'Quizzes', href: '/quizzes', icon: HelpCircle },
  { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
]

const featured = [
  {
    title: 'New: Space Explorer',
    description: 'Blast off into learning!',
    color: '#6BCBFF',
    href: '/learn/space',
    icon: Rocket,
  },
  {
    title: 'Math Challenge',
    description: 'Test your skills!',
    color: '#FF6B6B',
    href: '/quizzes/math-challenge',
    icon: Calculator,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, staggerChildren: 0.03 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0 },
}

export function MegaMenu() {
  const [activeColumn, setActiveColumn] = useState<string | null>(null)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute left-1/2 top-full mt-2 w-screen max-w-6xl -translate-x-1/2 px-4"
    >
      <div className="overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-2xl shadow-black/10">
        <div className="grid grid-cols-4 gap-px bg-white/10 dark:bg-gray-800/10">
          {categories.map((group) => (
            <div
              key={group.title}
              className="p-5"
              onMouseEnter={() => setActiveColumn(group.title)}
              onMouseLeave={() => setActiveColumn(null)}
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.li key={item.name} variants={itemVariants}>
                      <Link
                        href={item.slug}
                        className={cn(
                          'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium',
                          'text-gray-700 dark:text-gray-300',
                          'hover:bg-white/70 dark:hover:bg-white/10',
                          'transition-all duration-200',
                        )}
                      >
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
                          style={{ backgroundColor: `${item.color}20` }}
                        >
                          <Icon className="h-4 w-4" style={{ color: item.color }} />
                        </span>
                        <span>{item.name}</span>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/20 dark:border-gray-700/20 bg-white/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-6 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#FFD93D]" />
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Quick Links
              </span>
            </div>
            <div className="flex items-center gap-2">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-white/70 dark:hover:bg-white/10 transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {link.name}
                  </Link>
                )
              })}
            </div>
            <div className="ml-auto flex items-center gap-3">
              {featured.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: item.color }} />
                    <div>
                      <div
                        className="text-xs font-semibold"
                        style={{ color: item.color }}
                      >
                        {item.title}
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                    <ArrowRight className="h-3 w-3 text-gray-400 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
