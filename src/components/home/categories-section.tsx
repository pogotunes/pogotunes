'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen, Calculator, FlaskConical, Palette, Music,
  Puzzle, Brain, Globe, Languages, Sparkles,
  PawPrint, Apple, Heart, TreePine, Rocket,
  Sigma, Hash, Shapes, Smile, Users,
  Lightbulb, Target, Code, Monitor, Leaf,
  type LucideIcon,
} from 'lucide-react'

const categories = [
  { name: 'Alphabet', icon: Sigma, color: '#FF6B6B', desc: 'Learn A to Z with fun activities' },
  { name: 'Numbers', icon: Hash, color: '#FFD93D', desc: 'Count, add, subtract & more' },
  { name: 'Shapes', icon: Shapes, color: '#6BCBFF', desc: 'Discover circles, squares & stars' },
  { name: 'Colors', icon: Palette, color: '#6C63FF', desc: 'Explore the rainbow of colors' },
  { name: 'Animals', icon: PawPrint, color: '#51CF66', desc: 'Meet animals from around the world' },
  { name: 'Birds', icon: TreePine, color: '#FF6B6B', desc: 'Learn about our feathered friends' },
  { name: 'Fruits', icon: Apple, color: '#FFD93D', desc: 'Yummy fruits & their names' },
  { name: 'Vegetables', icon: Leaf, color: '#6BCBFF', desc: 'Healthy veggies for strong kids' },
  { name: 'Vehicles', icon: Rocket, color: '#6C63FF', desc: 'Cars, planes, trains & boats' },
  { name: 'Body Parts', icon: Heart, color: '#51CF66', desc: 'Learn about your amazing body' },
  { name: 'Weather', icon: Sparkles, color: '#FF6B6B', desc: 'Sun, rain, snow & storms' },
  { name: 'Seasons', icon: TreePine, color: '#FFD93D', desc: 'Spring, summer, fall & winter' },
  { name: 'Days', icon: BookOpen, color: '#6BCBFF', desc: 'Monday to Sunday fun facts' },
  { name: 'Months', icon: BookOpen, color: '#6C63FF', desc: 'January through December' },
  { name: 'Clock', icon: Puzzle, color: '#51CF66', desc: 'Tell time like a pro' },
  { name: 'Math', icon: Calculator, color: '#FF6B6B', desc: 'Addition, subtraction & beyond' },
  { name: 'Science', icon: FlaskConical, color: '#FFD93D', desc: 'Experiments & discoveries' },
  { name: 'GK', icon: Globe, color: '#6BCBFF', desc: 'General knowledge for kids' },
  { name: 'Phonics', icon: Languages, color: '#6C63FF', desc: 'Sounds of letters & words' },
  { name: 'Rhymes', icon: Music, color: '#51CF66', desc: 'Fun nursery rhymes & songs' },
  { name: 'Stories', icon: BookOpen, color: '#FF6B6B', desc: 'Magical tales & adventures' },
  { name: 'Hindi', icon: Languages, color: '#FFD93D', desc: 'Learn Hindi language' },
  { name: 'English', icon: BookOpen, color: '#6BCBFF', desc: 'Read, write & speak English' },
  { name: 'Tracing', icon: Sigma, color: '#6C63FF', desc: 'Trace letters & numbers' },
  { name: 'Writing', icon: BookOpen, color: '#51CF66', desc: 'Practice handwriting skills' },
  { name: 'Drawing', icon: Palette, color: '#FF6B6B', desc: 'Draw & color creativity' },
  { name: 'Moral Stories', icon: Heart, color: '#FFD93D', desc: 'Values & life lessons' },
  { name: 'Community Helpers', icon: Users, color: '#6BCBFF', desc: 'Doctors, teachers & more' },
  { name: 'Brain Games', icon: Brain, color: '#6C63FF', desc: 'Puzzles & memory games' },
  { name: 'Tech Skills', icon: Monitor, color: '#51CF66', desc: 'Computers & coding basics' },
]

function CategoryCard({ name, icon: Icon, color, desc, index }: {
  name: string; icon: LucideIcon; color: string; desc: string; index: number
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl p-0.5 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.03, ease: 'easeOut' }}
    >
      <div
        className="relative rounded-2xl p-5 h-full backdrop-blur-xl transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}08, ${color}02)`,
          border: `1px solid ${color}20`,
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          }}
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
            {name}
          </h3>
          <p className="text-xs text-white/40 font-nunito leading-relaxed line-clamp-2">{desc}</p>
        </div>
        <motion.div
          className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
        />
      </div>
    </motion.div>
  )
}

const slugOverrides: Record<string, string> = {
  Alphabet: 'alphabet',
  Numbers: 'numbers',
  Shapes: 'colors-shapes',
  Colors: 'colors-shapes',
  Animals: 'animals',
  'Body Parts': 'body-health',
  Phonics: 'phonics',
  Math: 'mathematics',
  Science: 'science',
  Writing: 'writing',
  'Tech Skills': 'technology',
  Hindi: 'foreign-languages',
  English: 'english-language',
}

export function CategoriesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <Link href={slugOverrides[cat.name] ? `/categories/${slugOverrides[cat.name]}` : '/learn'}>
                <CategoryCard {...cat} index={i} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

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
