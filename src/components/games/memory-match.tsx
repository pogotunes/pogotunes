'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Zap, Gamepad2, RefreshCw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const defaultEmojis = ['🐶', '🐱', '🐼', '🦊', '🐸', '🦋', '🐙', '🦄']

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

interface MemoryMatchProps {
  emojis?: string[]
  pairs?: number
  lives?: number
  accentColor?: string
  onComplete?: (score: number, moves: number, matched: number) => void
}

export function MemoryMatch({
  emojis = defaultEmojis,
  pairs = 6,
  lives: maxLives = 3,
  accentColor = '#6BCBFF',
  onComplete,
}: MemoryMatchProps) {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [lives, setLives] = useState(maxLives)

  const initGame = useCallback(() => {
    const gamePairs = shuffleArray(emojis).slice(0, pairs)
    const deck = shuffleArray(
      [...gamePairs, ...gamePairs].map((emoji, index) => ({
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
    setLives(maxLives)
    setGameStarted(true)
  }, [emojis, pairs, maxLives])

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
    if (gameStarted && matchedPairs === pairs) {
      setGameComplete(true)
      onComplete?.(score, moves, matchedPairs)
    }
  }, [gameStarted, matchedPairs, pairs, score, moves, onComplete])

  useEffect(() => {
    if (lives <= 0) {
      setGameComplete(true)
      onComplete?.(score, moves, matchedPairs)
    }
  }, [lives, score, moves, matchedPairs, onComplete])

  const handleCardClick = (id: number) => {
    if (flippedIds.length >= 2) return
    const card = cards.find((c) => c.id === id)
    if (!card || card.flipped || card.matched) return

    setMoves((m) => m + 1)
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, flipped: true } : c))
    )
    setFlippedIds((prev) => [...prev, id])
  }

  if (!gameStarted && !gameComplete) {
    return (
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
          Match all the pairs to win! You have {maxLives} lives.
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
    )
  }

  if (gameComplete) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="text-7xl mb-6"
        >
          {matchedPairs === pairs ? '🎉' : '😅'}
        </motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">
          {matchedPairs === pairs ? 'You Win!' : 'Game Over'}
        </h2>
        <p className="text-white/60 font-nunito mb-2">
          {matchedPairs} pairs matched in {moves} moves
        </p>
        <p className="text-3xl font-baloo font-bold text-white mb-6">{score} points</p>
        <Button
          variant="coral"
          icon={<RefreshCw className="w-4 h-4" />}
          onClick={initGame}
        >
          Play Again
        </Button>
      </Card>
    )
  }

  return (
    <div>
      {gameStarted && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-1 text-coral">
            {Array.from({ length: maxLives }).map((_, i) => (
              <Heart
                key={i}
                className={cn('w-4 h-4', i < lives ? 'fill-coral text-coral' : 'text-white/20')}
              />
            ))}
          </div>
          <Badge variant="yellow" size="sm">
            <Star className="w-3 h-3" /> {score}
          </Badge>
          <Badge variant="sky" size="sm">
            <Zap className="w-3 h-3" /> x{combo}
          </Badge>
        </div>
      )}
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
    </div>
  )
}
