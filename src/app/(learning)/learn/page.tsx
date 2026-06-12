'use client'

import { motion } from 'framer-motion'
import { CATEGORIES } from '@/lib/constants'
import { staggerContainer, fadeInUp, staggerItem } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { CategoryCard } from '@/components/learning/category-card'
import { BookOpen, Sparkles, Target, Zap } from 'lucide-react'
import Link from 'next/link'

export default function LearnPage() {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-coral/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-sky-blue/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Learn' }]}
          className="mb-8"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-white/70 font-nunito mb-6">
              <Sparkles className="w-4 h-4 text-yellow" />
              Discover something new every day
            </div>
            <h1 className="text-5xl md:text-7xl font-baloo font-bold text-white mb-6 leading-tight">
              What do you want to{' '}
              <span className="bg-gradient-to-r from-coral via-yellow to-sky-blue bg-clip-text text-transparent">
                learn today?
              </span>
            </h1>
            <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
              Explore our interactive lessons, fun games, and engaging quizzes across 32 exciting subjects.
              There&apos;s something for every curious mind!
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { icon: BookOpen, label: 'Interactive Lessons', desc: 'Learn at your own pace', color: 'from-coral to-coral-light' },
              { icon: Zap, label: 'Fun Games', desc: 'Play while you learn', color: 'from-yellow to-yellow-light' },
              { icon: Target, label: 'Smart Quizzes', desc: 'Test your knowledge', color: 'from-sky-blue to-sky-blue-light' },
              { icon: Sparkles, label: 'Earn Rewards', desc: 'Collect stars and coins', color: 'from-purple to-purple-light' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-5 glass border border-white/10 text-center"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-baloo font-bold text-white">{item.label}</h3>
                <p className="text-sm text-white/50 font-nunito mt-1">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-3xl md:text-4xl font-baloo font-bold text-white mb-2">
              Explore Subjects
            </h2>
            <p className="text-white/60 font-nunito">
              Choose a category to start your learning journey
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {CATEGORIES.map((category) => (
              <Link key={category.slug} href={`/categories/${category.slug}`}>
                <CategoryCard category={category} lessonCount={12} />
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
