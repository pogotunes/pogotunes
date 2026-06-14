'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, RefreshCw, Volume2, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const WORDS = [
  { word: 'cat', hint: 'A furry pet that purrs' },
  { word: 'dog', hint: 'A loyal pet that barks' },
  { word: 'sun', hint: 'The bright star in the sky' },
  { word: 'red', hint: 'The color of strawberries' },
  { word: 'big', hint: 'Opposite of small' },
  { word: 'run', hint: 'To move fast on your feet' },
  { word: 'hat', hint: 'You wear it on your head' },
  { word: 'bed', hint: 'Where you sleep at night' },
  { word: 'cup', hint: 'You drink from it' },
  { word: 'bus', hint: 'A big vehicle that carries people' },
]

export function SpellingGame() {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const totalRounds = 5

  const [shuffled, setShuffled] = useState<typeof WORDS>([])

  const current = shuffled[round % shuffled.length]

  const initGame = useCallback(() => {
    const arr = [...WORDS]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    setShuffled(arr)
    setRound(0)
    setScore(0)
    setGameComplete(false)
    setInput('')
    setFeedback(null)
    setGameStarted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (feedback) return
    const correct = input.trim().toLowerCase() === current.word
    if (correct) {
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
        setInput('')
        setFeedback(null)
      }
    }, 1500)
  }

  const speak = () => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(current.word)
      u.lang = 'en-US'
      u.rate = 0.7
      speechSynthesis.cancel()
      speechSynthesis.speak(u)
    }
  }

  if (!gameStarted) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">✍️</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Spelling Bee</h2>
        <p className="text-white/60 font-nunito mb-6">Listen to the word and spell it correctly!</p>
        <Button variant="coral" size="lg" icon={<Zap className="w-5 h-5" />} onClick={initGame}>Start Game</Button>
      </Card>
    )
  }

  if (gameComplete) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🏆</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Great Spelling!</h2>
        <p className="text-3xl font-baloo font-bold text-white mb-2">{score} points</p>
        <p className="text-white/60 font-nunito mb-6">You spelled {round} words!</p>
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
        <span className="text-white/60 font-nunito">Word {round + 1}/{totalRounds}</span>
        <span className="flex items-center gap-1 text-yellow"><Star className="w-4 h-4" />{score}</span>
      </div>

      <motion.div
        key={round}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-8"
      >
        <p className="text-white/40 font-nunito text-sm mb-2">Hint</p>
        <p className="text-white/80 font-nunito text-lg mb-6 italic">&ldquo;{current.hint}&rdquo;</p>
        <button
          onClick={speak}
          className="mx-auto w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
          aria-label="Listen to the word"
        >
          <Volume2 className="w-7 h-7 text-white/60 group-hover:text-white transition-colors" />
        </button>
        <p className="text-white/40 font-nunito text-xs mt-2">Click to hear the word</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={!!feedback}
          placeholder="Type the word..."
          className={cn(
            'w-full px-6 py-4 rounded-2xl text-center text-2xl font-baloo font-bold text-white outline-none transition-all border',
            'bg-white/10 border-white/20 placeholder:text-white/30 focus:border-coral focus:bg-white/15',
            feedback === 'correct' && 'border-green bg-green/10',
            feedback === 'wrong' && 'border-coral bg-coral/10',
          )}
          autoFocus
        />
        <div className="flex flex-wrap justify-center gap-2">
          {current.word.split('').map((_, i) => (
            <span
              key={i}
              className={cn(
                'w-10 h-12 rounded-xl border-b-4 flex items-center justify-center text-xl font-bold font-baloo',
                feedback
                  ? input[i]?.toLowerCase() === current.word[i]
                    ? 'border-green/60 bg-green/10 text-green'
                    : feedback === 'wrong'
                      ? 'border-coral/60 bg-coral/10 text-coral'
                      : 'border-white/20 bg-white/10 text-white/40'
                  : 'border-white/20 bg-white/10 text-white/30'
              )}
            >
              {input[i] || '?'}
            </span>
          ))}
        </div>
        <Button type="submit" variant="coral" className="w-full" disabled={!input.trim() || !!feedback}>
          Check Spelling
        </Button>
      </form>

      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn('text-center mt-4 font-bold font-baloo text-lg', feedback === 'correct' ? 'text-green' : 'text-coral')}
        >
          {feedback === 'correct' ? 'Correct! +10 points' : `Wrong! The word was "${current.word}"`}
        </motion.p>
      )}
    </div>
  )
}
