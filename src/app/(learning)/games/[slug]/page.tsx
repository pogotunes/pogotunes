'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Gamepad2, Star, Heart, Zap, Sparkles, RefreshCw } from 'lucide-react'
import { fadeInUp } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const emojis = ['🐶', '🐱', '🐼', '🦊', '🐸', '🦋', '🐙', '🦄']

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface MemoryCard {
  id: number
  emoji: string
  flipped: boolean
  matched: boolean
}

export default function GamePage() {
  const params = useParams()
  const slug = params.slug as string
  const [gameTitle, setGameTitle] = useState('Memory Match')
  const [gameDesc, setGameDesc] = useState('Flip cards and find matching pairs! Test your memory skills.')
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [lives, setLives] = useState(3)

  useEffect(() => {
    fetch(`/api/games/${slug}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) {
          setGameTitle(res.data.title || 'Memory Match')
          setGameDesc(res.data.description || '')
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  const initGame = useCallback(() => {
    const pairs = shuffleArray(emojis).slice(0, 6)
    const deck = shuffleArray(
      [...pairs, ...pairs].map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }))
    )
    setCards(deck)
    setFlippedIds([])
    setMatchedPairs(0)
    setMoves(0)
    setScore(0)
    setCombo(0)
    setGameComplete(false)
    setLives(3)
    setGameStarted(true)
  }, [])

  useEffect(() => {
    if (flippedIds.length === 2) {
      const [first, second] = flippedIds
      const card1 = cards.find((c) => c.id === first)
      const card2 = cards.find((c) => c.id === second)

      if (card1 && card2 && card1.emoji === card2.emoji) {
        setCards((prev) =>
          prev.map((c) =>
            c.id === first || c.id === second ? { ...c, matched: true } : c
          )
        )
        setMatchedPairs((p) => p + 1)
        setCombo((c) => c + 1)
        setScore((s) => s + 10 * (combo + 1))
        setFlippedIds([])
      } else {
        setCombo(0)
        setLives((l) => l - 1)
        const timeout = setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first || c.id === second ? { ...c, flipped: false } : c
            )
          )
          setFlippedIds([])
        }, 800)
        return () => clearTimeout(timeout)
      }
    }
  }, [flippedIds, cards, combo])

  useEffect(() => {
    if (gameStarted && matchedPairs === 6) {
      setGameComplete(true)
    }
  }, [gameStarted, matchedPairs])

  useEffect(() => {
    if (lives <= 0) {
      setGameComplete(true)
    }
  }, [lives])

  const handleCardClick = (id: number) => {
    if (flippedIds.length >= 2) return
    if (cards.find((c) => c.id === id)?.flipped) return
    if (cards.find((c) => c.id === id)?.matched) return

    setMoves((m) => m + 1)
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, flipped: true } : c))
    )
    setFlippedIds((prev) => [...prev, id])
  }

  const accentColor = '#6BCBFF'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" label="Loading game..." />
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
              { label: 'Games', href: '/games' },
              { label: gameTitle },
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
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-baloo font-bold text-white">{gameTitle}</h1>
                  <p className="text-sm text-white/50 font-nunito">{gameDesc}</p>
                </div>
              </div>

              {gameStarted && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-coral">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Heart
                        key={i}
                        className={cn('w-4 h-4', i < lives ? 'fill-coral text-coral' : 'text-white/20')}
                      />
                    ))}
                  </div>
                  <Badge variant="yellow" size="sm">
                    <Star className="w-3 h-3" />
                    {score}
                  </Badge>
                  <Badge variant="sky" size="sm">
                    <Zap className="w-3 h-3" />
                    x{combo}
                  </Badge>
                </div>
              )}
            </div>

            {!gameStarted && !gameComplete ? (
              <Card variant="glass" className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="text-7xl mb-6"
                >
                  🎮
                </motion.div>
                <h2 className="text-2xl font-baloo font-bold text-white mb-2">Ready to Play?</h2>
                <p className="text-white/60 font-nunito mb-6">
                  Match all the pairs to win! You have 3 lives.
                </p>
                <Button
                  variant="coral"
                  size="lg"
                  icon={<Gamepad2 className="w-5 h-5" />}
                  onClick={initGame}
                >
                  Start Game
                </Button>
              </Card>
            ) : gameComplete ? (
              <Card variant="glass" className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                  className="text-7xl mb-6"
                >
                  {matchedPairs === 6 ? '🎉' : '😅'}
                </motion.div>
                <h2 className="text-2xl font-baloo font-bold text-white mb-2">
                  {matchedPairs === 6 ? 'You Win!' : 'Game Over'}
                </h2>
                <p className="text-white/60 font-nunito mb-2">
                  {matchedPairs} pairs matched in {moves} moves
                </p>
                <p className="text-3xl font-baloo font-bold text-white mb-6">{score} points</p>
                <div className="flex items-center justify-center gap-3">
                  <Link href="/games">
                    <Button variant="glass">Back to Games</Button>
                  </Link>
                  <Button
                    variant="coral"
                    icon={<RefreshCw className="w-4 h-4" />}
                    onClick={initGame}
                  >
                    Play Again
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {cards.map((card) => (
                  <motion.button
                    key={card.id}
                    whileHover={{ scale: card.flipped || card.matched ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(card.id)}
                    className={cn(
                      'aspect-square rounded-2xl text-4xl sm:text-5xl flex items-center justify-center',
                      'transition-all duration-300 border',
                      card.flipped || card.matched
                        ? 'glass border-white/20'
                        : 'bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-white/30'
                    )}
                    disabled={card.flipped || card.matched}
                  >
                    {(card.flipped || card.matched) && (
                      <motion.span
                        initial={{ rotateY: 180, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.emoji}
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
