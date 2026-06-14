'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, RefreshCw, Palette } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const COLORS = [
  { name: 'Red', hex: '#FF6B6B' },
  { name: 'Blue', hex: '#6BCBFF' },
  { name: 'Green', hex: '#51CF66' },
  { name: 'Yellow', hex: '#FFD93D' },
  { name: 'Purple', hex: '#6C63FF' },
  { name: 'Orange', hex: '#FFA94D' },
  { name: 'Pink', hex: '#FF6B9D' },
  { name: 'Teal', hex: '#20C997' },
]

export function ColorMatchGame() {
  const [targetColor, setTargetColor] = useState(COLORS[0])
  const [options, setOptions] = useState<typeof COLORS>([])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const totalRounds = 8

  const nextRound = useCallback((roundNum: number) => {
    const target = COLORS[roundNum % COLORS.length]
    const others = COLORS.filter(c => c.name !== target.name)
    const shuffled = [target, ...others.sort(() => Math.random() - 0.5).slice(0, 3)]
    const finalOptions = shuffled.sort(() => Math.random() - 0.5)
    setTargetColor(target)
    setOptions(finalOptions)
    setFeedback(null)
  }, [])

  const initGame = useCallback(() => {
    setScore(0)
    setRound(0)
    setGameComplete(false)
    setGameStarted(true)
    nextRound(0)
  }, [nextRound])

  const handlePick = (color: typeof COLORS[0]) => {
    if (feedback) return
    if (color.name === targetColor.name) {
      setFeedback('correct')
      setScore(s => s + 10)
    } else {
      setFeedback('wrong')
    }
    setTimeout(() => {
      const next = round + 1
      if (next >= totalRounds) {
        setGameComplete(true)
      } else {
        setRound(next)
        nextRound(next)
      }
    }, 1000)
  }

  if (!gameStarted) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🎨</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Color Match</h2>
        <p className="text-white/60 font-nunito mb-6">Match the color name to the correct color!</p>
        <Button variant="coral" size="lg" icon={<Palette className="w-5 h-5" />} onClick={initGame}>Start Game</Button>
      </Card>
    )
  }

  if (gameComplete) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🎉</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Game Complete!</h2>
        <p className="text-3xl font-baloo font-bold text-white mb-2">{score} points</p>
        <p className="text-white/60 font-nunito mb-6">{score >= 70 ? 'Amazing color knowledge!' : score >= 40 ? 'Good job!' : 'Keep practicing!'}</p>
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
        <span className="text-white/60 font-nunito">Round {round + 1}/{totalRounds}</span>
        <span className="flex items-center gap-1 text-yellow"><Star className="w-4 h-4" />{score}</span>
      </div>

      <div className="text-center mb-8">
        <p className="text-white/40 font-nunito text-sm mb-4">Click the color that matches:</p>
        <div className="text-3xl font-bold font-baloo text-white mb-4">{targetColor.name}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        {options.map((color) => (
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePick(color)}
            className={cn(
              'aspect-square rounded-2xl transition-all duration-300 border-2',
              feedback === 'correct' && color.name === targetColor.name ? 'border-green shadow-lg shadow-green/30' : '',
              feedback === 'wrong' && color.name === targetColor.name ? 'border-green shadow-lg shadow-green/30' : '',
              feedback === 'wrong' && color.name !== targetColor.name ? 'opacity-50' : '',
              'hover:shadow-lg'
            )}
            style={{ backgroundColor: color.hex }}
            disabled={!!feedback}
          />
        ))}
      </div>

      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn('text-center mt-4 font-bold font-baloo text-lg', feedback === 'correct' ? 'text-green' : 'text-coral')}
        >
          {feedback === 'correct' ? 'Correct! +10' : `Wrong! It was ${targetColor.name}`}
        </motion.p>
      )}
    </div>
  )
}
