'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, Zap, RefreshCw, Gamepad2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const EMOJIS = ['🐶', '🐱', '🐼', '🦊', '🐸', '🦋', '🐙', '🦄', '🐰', '🐮', '🐷', '🐵']

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function MemoryMatchGame() {
  const [cards, setCards] = useState<Array<{ id: number; emoji: string; flipped: boolean; matched: boolean }>>([])
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [lives, setLives] = useState(3)
  const totalPairs = 6

  const initGame = useCallback(() => {
    const pairs = shuffle(EMOJIS).slice(0, totalPairs)
    const deck = shuffle([...pairs, ...pairs].map((emoji, index) => ({
      id: index, emoji, flipped: false, matched: false,
    })))
    setCards(deck)
    setFlippedIds([])
    setMatchedPairs(0)
    setMoves(0)
    setScore(0)
    setCombo(0)
    setLives(3)
    setGameStarted(true)
  }, [])

  const gameComplete = useMemo(() =>
    (gameStarted && matchedPairs === totalPairs) || lives <= 0,
    [gameStarted, matchedPairs, totalPairs, lives]
  )

  const handleClick = (id: number) => {
    if (flippedIds.length >= 2) return
    const card = cards.find(c => c.id === id)
    if (!card || card.flipped || card.matched) return

    const newFlippedIds = [...flippedIds, id]
    setFlippedIds(newFlippedIds)
    setMoves(m => m + 1)

    const updatedCards = cards.map(c => c.id === id ? { ...c, flipped: true } : c)
    setCards(updatedCards)

    if (newFlippedIds.length === 2) {
      const [first, second] = newFlippedIds
      const c1 = updatedCards.find(c => c.id === first)
      const c2 = updatedCards.find(c => c.id === second)
      if (c1 && c2 && c1.emoji === c2.emoji) {
        setTimeout(() => {
          setCards(prev => prev.map(c => c.id === first || c.id === second ? { ...c, matched: true } : c))
          setMatchedPairs(p => p + 1)
          setCombo(c => c + 1)
          setScore(s => s + 10 * (combo + 1))
          setFlippedIds([])
        }, 500)
      } else {
        setCombo(0)
        setLives(l => l - 1)
        setTimeout(() => {
          setCards(prev => prev.map(c => c.id === first || c.id === second ? { ...c, flipped: false } : c))
          setFlippedIds([])
        }, 800)
      }
    }
  }

  if (!gameStarted) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🎮</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Ready to Play?</h2>
        <p className="text-white/60 font-nunito mb-6">Match all {totalPairs} pairs to win! You have 3 lives.</p>
        <Button variant="coral" size="lg" icon={<Gamepad2 className="w-5 h-5" />} onClick={initGame}>Start Game</Button>
      </Card>
    )
  }

  if (gameComplete) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }} className="text-7xl mb-6">{matchedPairs === totalPairs ? '🎉' : '😅'}</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">{matchedPairs === totalPairs ? 'You Win!' : 'Game Over'}</h2>
        <p className="text-white/60 font-nunito mb-2">{matchedPairs} pairs matched in {moves} moves</p>
        <p className="text-3xl font-baloo font-bold text-white mb-6">{score} points</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/games"><Button variant="glass">Back to Games</Button></Link>
          <Button variant="coral" icon={<RefreshCw className="w-4 h-4" />} onClick={initGame}>Play Again</Button>
        </div>
      </Card>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <div className="flex items-center gap-1 text-coral">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart key={i} className={cn('w-4 h-4', i < lives ? 'fill-coral text-coral' : 'text-white/20')} />
          ))}
        </div>
        <Badge variant="yellow" size="sm"><Star className="w-3 h-3" />{score}</Badge>
        <Badge variant="sky" size="sm"><Zap className="w-3 h-3" />x{combo}</Badge>
        <Badge variant="white" size="sm">{moves} moves</Badge>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map(card => (
          <motion.button
            key={card.id}
            whileHover={{ scale: card.flipped || card.matched ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleClick(card.id)}
            className={cn(
              'aspect-square rounded-2xl text-4xl sm:text-5xl flex items-center justify-center transition-all duration-300 border',
              card.flipped || card.matched ? 'glass border-white/20' : 'bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-white/30'
            )}
            disabled={card.flipped || card.matched}
          >
            {(card.flipped || card.matched) && (
              <motion.span initial={{ rotateY: 180, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                {card.emoji}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
