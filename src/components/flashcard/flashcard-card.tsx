'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FlashcardCardProps {
  front: string
  back: string
  isFlipped: boolean
  accentColor?: string
  onClick?: () => void
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 200 : -200,
    opacity: 0,
    rotateY: dir > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -200 : 200,
    opacity: 0,
    rotateY: dir > 0 ? -15 : 15,
  }),
}

export function FlashcardCard({
  front,
  back,
  isFlipped,
  accentColor = '#6BCBFF',
  onClick,
}: FlashcardCardProps) {
  return (
    <div
      className="cursor-pointer"
      style={{ perspective: '1000px' }}
      onClick={onClick}
    >
      <div
        className={cn(
          'relative w-full min-h-[320px] rounded-2xl p-8 transition-all duration-500',
          'flex items-center justify-center text-center',
          'glass border border-white/10'
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={cn(
            'absolute inset-0 rounded-2xl transition-opacity duration-500',
            isFlipped ? 'opacity-0' : 'opacity-100'
          )}
          style={{
            background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)`,
          }}
        />
        <div
          className={cn(
            'absolute inset-0 rounded-2xl transition-opacity duration-500',
            isFlipped ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}15)`,
          }}
        />

        <div className="relative z-10">
          <span className="text-sm text-white/40 font-nunito mb-4 block">
            {isFlipped ? 'Answer' : 'Question'}
          </span>
          <motion.p
            key={isFlipped ? 'back' : 'front'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl font-baloo font-bold text-white"
          >
            {isFlipped ? back : front}
          </motion.p>
          <p className="text-white/30 text-sm font-nunito mt-6">
            Tap to flip
          </p>
        </div>
      </div>
    </div>
  )
}

export { slideVariants }
