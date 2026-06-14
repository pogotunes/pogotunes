'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, RefreshCw, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const EMOJIS = ['🌟', '🍎', '🐱', '🎈', '🌸', '⭐', '🍪', '🐶']
const ANSWERS = [3, 7, 5, 9, 4, 8, 6, 2]

export function SpeedCountGame() {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const totalRounds = 5

  const emoji = EMOJIS[round % EMOJIS.length]
  const count = ANSWERS[round % ANSWERS.length]
  const items = Array.from({ length: count })

  const countdownRef = useRef(10)

  const initGame = useCallback(() => {
    setRound(0)
    setScore(0)
    setGameComplete(false)
    setGameStarted(true)
    setTimeLeft(10)
    countdownRef.current = 10
  }, [])

  useEffect(() => {
    if (!gameStarted || gameComplete) return
    const timer = setInterval(() => {
      countdownRef.current -= 1
      setTimeLeft(countdownRef.current)
      if (countdownRef.current <= 0) {
        clearInterval(timer)
        setGameComplete(true)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStarted, gameComplete])

  const options = [count - 2, count - 1, count, count + 1, count + 2].filter(n => n > 0)

  const handleAnswer = (answer: number) => {
    if (feedback) return
    if (answer === count) {
      setFeedback('correct')
      setScore(s => s + 10 + timeLeft)
    } else {
      setFeedback('wrong')
    }
    setTimeout(() => {
      const next = round + 1
      if (next >= totalRounds) {
        setGameComplete(true)
      } else {
        setRound(next)
        setFeedback(null)
        setTimeLeft(10)
      }
    }, 1000)
  }

  if (!gameStarted) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🔢</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Speed Count</h2>
        <p className="text-white/60 font-nunito mb-6">Count the emojis as fast as you can! More time remaining = more points!</p>
        <Button variant="coral" size="lg" icon={<Zap className="w-5 h-5" />} onClick={initGame}>Start Game</Button>
      </Card>
    )
  }

  if (gameComplete) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🏆</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Time&apos;s Up!</h2>
        <p className="text-3xl font-baloo font-bold text-white mb-2">{score} points</p>
        <p className="text-white/60 font-nunito mb-6">You counted {round} rounds!</p>
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
        <span className={cn('font-bold font-nunito', timeLeft <= 3 ? 'text-coral' : 'text-white/60')}>{timeLeft}s</span>
      </div>

      <div className={cn('max-w-md mx-auto mb-8 p-8 rounded-2xl text-center', 'bg-white/5 border border-white/10')}>
        <motion.div
          key={round}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-wrap justify-center gap-2 text-3xl"
        >
          {items.map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <p className="text-center text-white/40 font-nunito text-sm mb-4">How many {emoji} do you see?</p>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-md mx-auto">
        {options.map(n => (
          <motion.button
            key={n}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAnswer(n)}
            className={cn(
              'py-4 rounded-2xl text-xl font-bold font-baloo transition-all border',
              feedback
                ? n === count
                  ? 'bg-green/20 border-green text-green'
                  : 'bg-white/5 border-white/10 text-white/40'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40'
            )}
            disabled={!!feedback}
          >
            {n}
          </motion.button>
        ))}
      </div>

      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn('text-center mt-4 font-bold font-baloo text-lg', feedback === 'correct' ? 'text-green' : 'text-coral')}
        >
          {feedback === 'correct' ? `Correct! +${10 + timeLeft} points` : `Wrong! There were ${count}`}
        </motion.p>
      )}
    </div>
  )
}
