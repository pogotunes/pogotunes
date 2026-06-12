'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson', role: 'Parent of 5-year-old', avatar: '👩',
    text: 'My daughter absolutely loves Pogo Tunes! She went from knowing only a few letters to reading short words in just 2 months. The animations are so engaging, she asks to learn every day!',
    rating: 5,
  },
  {
    name: 'Michael Chen', role: 'Teacher, Grade 1', avatar: '👨‍🏫',
    text: 'I recommend Pogo Tunes to all my students\' parents. The phonics section is fantastic and the progress tracking helps parents stay involved in their child\'s learning journey.',
    rating: 5,
  },
  {
    name: 'Priya Sharma', role: 'Parent of 3-year-old', avatar: '👩‍👧',
    text: 'As a working mom, I was worried about screen time. But Pogo Tunes makes me feel good about it - my son is actually learning colors, shapes, and numbers while having fun!',
    rating: 5,
  },
  {
    name: 'James Wilson', role: 'Early Childhood Educator', avatar: '🧑‍🏫',
    text: 'The curriculum is well-researched and age-appropriate. I use Pogo Tunes in my classroom and the kids are always excited for "learning time." The games reinforce concepts beautifully.',
    rating: 5,
  },
  {
    name: 'Aisha Patel', role: 'Homeschooling Mom', avatar: '👩‍👧‍👦',
    text: 'Pogo Tunes has been a game-changer for our homeschool. The structured lessons, fun quizzes, and printable activities give us everything we need. My kids love the characters!',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-coral blur-[100px]" />
        <div className="absolute bottom-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-purple blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass text-yellow mb-4">
            💬 What People Say
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-baloo)' }}
          >
            Loved by Parents &{' '}
            <span className="bg-gradient-to-r from-yellow to-coral bg-clip-text text-transparent">
              Teachers Alike
            </span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative"
          >
            <div
              className="relative rounded-2xl p-8 sm:p-10 md:p-12 backdrop-blur-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Quote size={48} className="text-coral/20 absolute top-6 left-6" />

              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1, type: 'spring' }}
                    >
                      <Star size={22} className="text-yellow" fill="currentColor" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed mb-8 font-nunito italic">
                  &ldquo;{testimonials[activeIndex].text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl border-2 border-white/10">
                    {testimonials[activeIndex].avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-baloo)' }}>
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-white/40 text-sm font-nunito">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 h-2.5 bg-coral' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
