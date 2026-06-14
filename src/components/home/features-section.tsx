'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, BookOpen, Video, GraduationCap, BarChart3, Award, Sparkles } from 'lucide-react'

const features = [
  {
    icon: BookOpen, title: 'Interactive Lessons',
    desc: 'Fun, animated lessons that keep kids engaged and excited to learn every single day.',
    color: '#FF6B6B', gradient: 'from-coral to-coral-dark',
  },
  {
    icon: Gamepad2, title: 'Fun Games',
    desc: 'Educational games that make learning feel like playtime. Kids won\'t even realize they\'re learning!',
    color: '#FFD93D', gradient: 'from-yellow to-yellow-dark',
  },
  {
    icon: Video, title: 'Video Library',
    desc: 'Hundreds of educational videos covering ABCs, numbers, science, stories and much more.',
    color: '#6BCBFF', gradient: 'from-sky-blue to-sky-blue-dark',
  },
  {
    icon: GraduationCap, title: 'Quizzes & Tests',
    desc: 'Fun assessments that track understanding and boost confidence with every correct answer.',
    color: '#6C63FF', gradient: 'from-purple to-purple-dark',
  },
  {
    icon: BarChart3, title: 'Progress Tracking',
    desc: 'Detailed progress reports for parents. See exactly what your child is learning and achieving.',
    color: '#51CF66', gradient: 'from-green to-green-dark',
  },
  {
    icon: Award, title: 'Certificates',
    desc: 'Celebrate achievements with beautiful certificates that motivate kids to keep learning.',
    color: '#FF6B6B', gradient: 'from-coral to-purple',
  },
]

function FeatureCard({ icon: Icon, title, desc, color, index }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>
  title: string; desc: string; color: string; index: number
}) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div
        className="relative h-full rounded-2xl p-0.5 overflow-hidden backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2"
        style={{
          background: `linear-gradient(135deg, ${color}30, transparent, ${color}10)`,
        }}
      >
        <div
          className="relative h-full rounded-2xl p-6 sm:p-8 backdrop-blur-xl"
          style={{ background: `linear-gradient(135deg, ${color}05, transparent)` }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: `linear-gradient(135deg, ${color}30, ${color}10)`,
              boxShadow: `0 4px 20px ${color}20`,
            }}
          >
            <Icon size={28} style={{ color }} />
          </div>

          <h3
            className="text-xl font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            {title}
          </h3>

          <p className="text-white/50 text-sm leading-relaxed font-nunito">
            {desc}
          </p>

          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles size={16} style={{ color }} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-purple blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-coral blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass text-purple mb-4">
            ⚡ Amazing Features
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Everything Your Child{' '}
            <span className="bg-gradient-to-r from-purple to-sky-blue bg-clip-text text-transparent">
              Needs to Succeed
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-nunito">
            We combine education with entertainment to create the ultimate learning experience
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feat, i) => (
            <FeatureCard key={feat.title} {...feat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
