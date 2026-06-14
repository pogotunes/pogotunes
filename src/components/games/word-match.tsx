'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Star, RefreshCw, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const PAIRS = [
  { word: 'Apple', match: '🍎' },
  { word: 'Cat', match: '🐱' },
  { word: 'Star', match: '⭐' },
  { word: 'Balloon', match: '🎈' },
  { word: 'Flower', match: '🌸' },
  { word: 'Cookie', match: '🍪' },
  { word: 'Dog', match: '🐶' },
  { word: 'Moon', match: '🌙' },
]

export function WordMatchGame() {
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)

  const totalPairs = 5

  const shuffledPairs = useMemo(() => {
    const arr = [...PAIRS]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])

  const currentPairs = shuffledPairs.slice(0, totalPairs)

  const shuffledWords = useMemo(() => {
    const arr = currentPairs.map(p => p.word)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [currentPairs])

  const shuffledEmojis = useMemo(() => {
    const arr = currentPairs.map(p => p.match)
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [currentPairs])

  const initGame = useCallback(() => {
    setRound(0)
    setScore(0)
    setGameComplete(false)
    setSelectedWord(null)
    setSelectedMatch(null)
    setMatched(new Set())
    setFeedback(null)
    setGameStarted(true)
  }, [])

  const handleWordClick = (word: string) => {
    if (feedback) return
    setSelectedWord(word)
    setSelectedMatch(null)
    setFeedback(null)
  }

  const handleEmojiClick = (emoji: string) => {
    if (!selectedWord || feedback) return
    setSelectedMatch(emoji)
    const pair = currentPairs.find(p => p.word === selectedWord)
    const correct = pair?.match === emoji
    if (correct) {
      setFeedback('correct')
      setScore(s => s + 10)
      const idx = currentPairs.findIndex(p => p.word === selectedWord)
      setMatched(prev => new Set(prev).add(idx))
      setSelectedWord(null)
      setSelectedMatch(null)
      setTimeout(() => {
        const remaining = currentPairs.length - (matched.size + 1)
        if (remaining <= 0) {
          setGameComplete(true)
        } else {
          setFeedback(null)
        }
      }, 800)
    } else {
      setFeedback('wrong')
      setTimeout(() => {
        setSelectedWord(null)
        setSelectedMatch(null)
        setFeedback(null)
      }, 800)
    }
  }

  if (!gameStarted) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🔤</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Word Match</h2>
        <p className="text-white/60 font-nunito mb-6">Match each word to its picture!</p>
        <Button variant="coral" size="lg" icon={<Zap className="w-5 h-5" />} onClick={initGame}>Start Game</Button>
      </Card>
    )
  }

  if (gameComplete) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🏆</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">All Matched!</h2>
        <p className="text-3xl font-baloo font-bold text-white mb-2">{score} points</p>
        <p className="text-white/60 font-nunito mb-6">You matched {matched.size} pairs!</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/games"><Button variant="glass">Back to Games</Button></Link>
          <Button variant="coral" icon={<RefreshCw className="w-4 h-4" />} onClick={initGame}>Play Again</Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="text-white/60 font-nunito">Match {matched.size}/{totalPairs}</span>
        <span className="flex items-center gap-1 text-yellow"><Star className="w-4 h-4" />{score}</span>
      </div>

      <p className="text-center text-white/40 font-nunito text-sm mb-4">Click a word, then click its matching picture</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {shuffledWords.map(word => {
            const pairIdx = currentPairs.findIndex(p => p.word === word)
            const isMatched = matched.has(pairIdx)
            return (
              <motion.button
                key={word}
                whileHover={!isMatched ? { scale: 1.03 } : {}}
                whileTap={!isMatched ? { scale: 0.97 } : {}}
                onClick={() => !isMatched && handleWordClick(word)}
                disabled={isMatched}
                className={cn(
                  'w-full py-3 px-4 rounded-xl text-left font-bold font-nunito transition-all border',
                  isMatched
                    ? 'bg-green/10 border-green/30 text-green/60 line-through'
                    : selectedWord === word
                      ? 'bg-coral/20 border-coral text-white'
                      : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-white/40'
                )}
              >
                {word}
              </motion.button>
            )
          })}
        </div>

        <div className="space-y-2">
          {shuffledEmojis.map(emoji => {
            const pairIdx = currentPairs.findIndex(p => p.match === emoji)
            const isMatched = matched.has(pairIdx)
            return (
              <motion.button
                key={emoji}
                whileHover={!isMatched ? { scale: 1.05 } : {}}
                whileTap={!isMatched ? { scale: 0.95 } : {}}
                onClick={() => !isMatched && selectedWord && handleEmojiClick(emoji)}
                disabled={isMatched || !selectedWord}
                className={cn(
                  'w-full py-3 px-4 rounded-xl text-center text-2xl transition-all border',
                  isMatched
                    ? 'bg-green/10 border-green/30 opacity-60'
                    : selectedMatch === emoji
                      ? feedback === 'correct'
                        ? 'bg-green/10 border-green'
                        : feedback === 'wrong'
                          ? 'bg-coral/10 border-coral'
                          : 'bg-white/10 border-white/20'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/40',
                  !selectedWord && !isMatched && 'opacity-50'
                )}
              >
                {emoji}
              </motion.button>
            )
          })}
        </div>
      </div>

      {feedback && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn('text-center mt-4 font-bold font-baloo text-lg', feedback === 'correct' ? 'text-green' : 'text-coral')}
        >
          {feedback === 'correct' ? 'Correct! +10 points' : 'Wrong match, try again!'}
        </motion.p>
      )}
    </div>
  )
}
