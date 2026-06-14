'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, RefreshCw, Zap, TreePine, Fish, Bird } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type BinKey = 'land' | 'water' | 'sky'

interface SortItem {
  id: number
  label: string
  bin: BinKey
  emoji: string
}

const ITEMS: SortItem[] = [
  { id: 1, label: 'Dog', bin: 'land', emoji: '🐕' },
  { id: 2, label: 'Fish', bin: 'water', emoji: '🐟' },
  { id: 3, label: 'Bird', bin: 'sky', emoji: '🐦' },
  { id: 4, label: 'Cat', bin: 'land', emoji: '🐱' },
  { id: 5, label: 'Whale', bin: 'water', emoji: '🐋' },
  { id: 6, label: 'Eagle', bin: 'sky', emoji: '🦅' },
  { id: 7, label: 'Bear', bin: 'land', emoji: '🐻' },
  { id: 8, label: 'Octopus', bin: 'water', emoji: '🐙' },
  { id: 9, label: 'Parrot', bin: 'sky', emoji: '🦜' },
  { id: 10, label: 'Rabbit', bin: 'land', emoji: '🐰' },
  { id: 11, label: 'Dolphin', bin: 'water', emoji: '🐬' },
  { id: 12, label: 'Owl', bin: 'sky', emoji: '🦉' },
]

const BINS: { key: BinKey; label: string; icon: typeof TreePine; color: string }[] = [
  { key: 'land', label: 'Land', icon: TreePine, color: '#51CF66' },
  { key: 'water', label: 'Water', icon: Fish, color: '#6BCBFF' },
  { key: 'sky', label: 'Sky', icon: Bird, color: '#6C63FF' },
]

export function SortingGame() {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [sorted, setSorted] = useState<Set<number>>(new Set())
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [streak, setStreak] = useState(0)
  const totalRounds = 8

  const [shuffled, setShuffled] = useState<SortItem[]>([])

  const current = shuffled[round]

  const initGame = useCallback(() => {
    const arr = [...ITEMS]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setShuffled(arr.slice(0, totalRounds))
    setRound(0)
    setScore(0)
    setStreak(0)
    setSorted(new Set())
    setFeedback(null)
    setGameStarted(true)
  }, [])

  const handleBin = (bin: BinKey) => {
    if (feedback) return
    if (bin === current.bin) {
      setFeedback('correct')
      const newStreak = streak + 1
      setStreak(newStreak)
      const bonus = newStreak >= 3 ? 5 : 0
      setScore(s => s + 10 + bonus)
      setSorted(prev => new Set(prev).add(current.id))
    } else {
      setFeedback('wrong')
      setStreak(0)
    }
    setTimeout(() => {
      const next = round + 1
      if (next >= totalRounds) {
        setGameComplete(true)
      } else {
        setRound(next)
        setFeedback(null)
      }
    }, 800)
  }

  if (!gameStarted) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">📦</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Sorting Game</h2>
        <p className="text-white/60 font-nunito mb-6">Sort each item into the right category — Land, Water, or Sky!</p>
        <Button variant="coral" size="lg" icon={<Zap className="w-5 h-5" />} onClick={initGame}>Start Game</Button>
      </Card>
    )
  }

  if (gameComplete) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🏆</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">All Sorted!</h2>
        <p className="text-3xl font-baloo font-bold text-white mb-2">{score} points</p>
        <p className="text-white/60 font-nunito mb-6">You sorted {sorted.size} items!</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/games"><Button variant="glass">Back to Games</Button></Link>
          <Button variant="coral" icon={<RefreshCw className="w-4 h-4" />} onClick={initGame}>Play Again</Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-white/60 font-nunito">Item {round + 1}/{totalRounds}</span>
        <span className="flex items-center gap-1 text-yellow"><Star className="w-4 h-4" />{score}</span>
        {streak >= 2 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-orange font-bold font-nunito text-sm">
            🔥 x{streak}
          </motion.span>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ y: -40, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.8 }}
          className="text-center mb-8"
        >
          <div className="text-7xl mb-2">{current.emoji}</div>
          <p className="text-white/80 font-nunito text-xl font-bold">{current.label}</p>
          <p className="text-white/40 font-nunito text-sm mt-1">Where does this belong?</p>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-3">
        {BINS.map(({ key, label, icon: Icon, color }) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleBin(key)}
            disabled={!!feedback}
            className={cn(
              'flex flex-col items-center gap-2 py-6 rounded-2xl transition-all border-2',
              feedback
                ? key === current.bin
                  ? 'border-green bg-green/15'
                  : 'border-white/10 bg-white/5 opacity-50'
                : 'border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/40'
            )}
          >
            <Icon size={32} style={{ color }} />
            <span className="text-white/80 font-nunito font-bold text-sm">{label}</span>
          </motion.button>
        ))}
      </div>

      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn('text-center mt-4 font-bold font-baloo text-lg', feedback === 'correct' ? 'text-green' : 'text-coral')}
        >
          {feedback === 'correct'
            ? streak >= 3 ? `Correct! +${10 + 5} points 🔥` : 'Correct! +10 points'
            : `Wrong! ${current.label} lives in ${current.bin}!`}
        </motion.p>
      )}
    </div>
  )
}
