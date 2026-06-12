'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Shield, GraduationCap, BarChart3, DollarSign, ArrowRight, Heart, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: Shield, title: 'Safe & Ad-Free',
    desc: '100% safe environment with no ads, no tracking, and COPPA-compliant privacy protection for your child.',
    color: '#FF6B6B',
  },
  {
    icon: GraduationCap, title: 'Educational',
    desc: 'Curriculum designed by early childhood education experts. Aligned with preschool and kindergarten standards.',
    color: '#6BCBFF',
  },
  {
    icon: BarChart3, title: 'Track Progress',
    desc: 'Detailed reports show exactly what your child is learning, their strengths, and areas for improvement.',
    color: '#51CF66',
  },
  {
    icon: DollarSign, title: 'Affordable',
    desc: 'Premium quality education at a fraction of the cost. Start free with no credit card required!',
    color: '#FFD93D',
  },
]

function BenefitCard({ icon: Icon, title, desc, color, index }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>
  title: string; desc: string; color: string; index: number
}) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
    >
      <div
        className="relative rounded-2xl p-6 h-full backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1"
        style={{
          background: `linear-gradient(135deg, ${color}08, ${color}02)`,
          border: `1px solid ${color}20`,
        }}
      >
        <div className="flex items-start gap-4">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${color}30, ${color}10)`,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon size={24} style={{ color }} />
          </motion.div>
          <div>
            <h3
              className="text-lg font-bold text-white mb-1.5"
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              {title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed font-nunito">{desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ParentsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full bg-sky-blue blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass text-sky-blue mb-4">
                👨‍👩‍👧 For Parents
              </span>
              <h2
                className="text-4xl sm:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: 'var(--font-baloo)' }}
              >
                Peace of Mind While{' '}
                <span className="bg-gradient-to-r from-sky-blue to-green bg-clip-text text-transparent">
                  They Learn
                </span>
              </h2>
              <p className="text-white/50 text-lg mb-10 font-nunito max-w-lg">
                We believe in creating a safe, educational, and fun environment where your child can thrive
                independently.
              </p>
            </motion.div>

            <div className="space-y-4">
              {benefits.map((ben, i) => (
                <BenefitCard key={ben.title} {...ben} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <Link
                href="/parents-guide"
                className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-nunito"
              >
                Learn more about our platform
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div
                className="absolute inset-0 rounded-3xl opacity-20"
                style={{
                  background: 'linear-gradient(135deg, #6BCBFF, #6C63FF, #51CF66)',
                  filter: 'blur(40px)',
                }}
              />
              <div
                className="relative w-full h-full rounded-3xl flex items-center justify-center backdrop-blur-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(107,203,255,0.1), rgba(108,99,255,0.05))',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="text-center p-8">
                  <motion.div
                    className="text-8xl mb-6"
                    animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    👨‍👩‍👧‍👦
                  </motion.div>
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: 'var(--font-baloo)' }}
                  >
                    Happy Family
                  </h3>
                  <p className="text-white/40 text-sm font-nunito">Learning together, growing together</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Heart size={16} className="text-coral" fill="#FF6B6B" />
                    <Sparkles size={16} className="text-yellow" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
