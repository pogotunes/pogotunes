'use client'

import { motion } from 'framer-motion'
import { CATEGORIES } from '@/lib/constants'
import { staggerContainer, fadeInUp } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { CategoryCard } from '@/components/learning/category-card'
import Link from 'next/link'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-coral/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-sky-blue/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Categories' }]}
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
              Explore Categories
            </h1>
            <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
              Choose a subject to start learning. Each category has lessons, quizzes, games, and more!
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
