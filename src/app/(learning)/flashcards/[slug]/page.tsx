'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Shuffle, BookOpen, Sparkles } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'
import { fadeInUp } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FlashcardCard, slideVariants } from '@/components/flashcard/flashcard-card'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface CardData {
  id: string
  front: string
  back: string
}

interface FlashcardData {
  id: string
  title: string
  slug: string
  description: string
  cards: CardData[]
}

export default function FlashcardsPage() {
  const params = useParams()
  const slug = params.slug as string
  const [data, setData] = useState<FlashcardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0)
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set())
  const [shuffled, setShuffled] = useState(false)
  const [cards, setCards] = useState<CardData[]>([])

  useEffect(() => {
    fetch(`/api/flashcards/${slug}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          const d = res.data
          setData(d)
          setCards(shuffled ? [...d.cards].sort(() => Math.random() - 0.5) : d.cards)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug, shuffled])

  const currentCard = cards[currentIndex]
  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0
  const remaining = cards.length - knownCards.size

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setDirection(1)
      setIsFlipped(false)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setIsFlipped(false)
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  const handleToggleShuffle = () => {
    const next = !shuffled
    setShuffled(next)
    if (data) {
      setCards(next ? [...data.cards].sort(() => Math.random() - 0.5) : [...data.cards])
    }
    setCurrentIndex(0)
    setIsFlipped(false)
    setKnownCards(new Set())
  }

  const handleMarkKnown = () => {
    setKnownCards((prev) => new Set(prev).add(currentIndex))
    if (currentIndex < cards.length - 1) {
      handleNext()
    }
  }

  const category = CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0]
  const accentColor = category?.color ?? '#6BCBFF'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!data || cards.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h2 className="text-xl font-baloo font-bold text-white mb-2">No Flashcards Found</h2>
          <p className="text-white/50 font-nunito mb-6">This category doesn&apos;t have any flashcard sets yet.</p>
          <Link href="/categories">
            <Button variant="glass">Browse Categories</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${accentColor}15 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: accentColor }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <Breadcrumb
            items={[
              { label: 'Categories', href: '/categories' },
              { label: 'Flashcards', href: '/flashcards' },
              { label: data.title },
            ]}
            className="mb-8"
          />

          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)` }}
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-baloo font-bold text-white">{data.title}</h1>
                  <p className="text-sm text-white/50 font-nunito">
                    Card {currentIndex + 1} of {cards.length}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="green" size="sm">
                  {remaining} remaining
                </Badge>
                <Button
                  variant="glass"
                  size="sm"
                  icon={<Shuffle className="w-4 h-4" />}
                  onClick={handleToggleShuffle}
                  aria-label="Shuffle cards"
                />
              </div>
            </div>

            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple to-coral"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="relative" style={{ minHeight: '320px' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <FlashcardCard
                    front={currentCard.front}
                    back={currentCard.back}
                    isFlipped={isFlipped}
                    accentColor={accentColor}
                    onClick={handleFlip}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="glass"
                icon={<ChevronLeft className="w-4 h-4" />}
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                Previous
              </Button>

              <Button
                variant="green"
                size="sm"
                icon={<Sparkles className="w-4 h-4" />}
                onClick={handleMarkKnown}
                disabled={knownCards.has(currentIndex)}
              >
                {knownCards.has(currentIndex) ? 'Known ✓' : 'Mark Known'}
              </Button>

              <Button
                variant="coral"
                icon={<ChevronRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={handleNext}
                disabled={currentIndex === cards.length - 1}
              >
                Next
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setIsFlipped(false)
                    setCurrentIndex(index)
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'bg-white w-6'
                      : knownCards.has(index)
                      ? 'bg-green/60'
                      : 'bg-white/20 hover:bg-white/40'
                  )}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
