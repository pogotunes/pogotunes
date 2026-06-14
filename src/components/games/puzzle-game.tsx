'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Zap, Shuffle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const SIZE = 3
const TOTAL = SIZE * SIZE

function isSolvable(tiles: number[]): boolean {
  let inversions = 0
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) inversions++
    }
  }
  return inversions % 2 === 0
}

function shuffleTiles(): number[] {
  let tiles: number[]
  do {
    tiles = Array.from({ length: TOTAL }, (_, i) => (i + 1) % TOTAL)
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]]
    }
  } while (!isSolvable(tiles) || tiles[TOTAL - 1] !== 0)
  return tiles
}

export function PuzzleGame() {
  const [tiles, setTiles] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [sliding, setSliding] = useState<number | null>(null)

  const solved = tiles.every((t, i) => t === (i + 1) % TOTAL)
  const gameComplete = gameStarted && solved && moves > 0

  const initGame = useCallback(() => {
    setTiles(shuffleTiles())
    setMoves(0)
    setGameStarted(true)
    setSliding(null)
  }, [])

  const canMove = (idx: number): boolean => {
    if (tiles[idx] === 0) return false
    const emptyIdx = tiles.indexOf(0)
    const row = Math.floor(idx / SIZE)
    const col = idx % SIZE
    const emptyRow = Math.floor(emptyIdx / SIZE)
    const emptyCol = emptyIdx % SIZE
    return (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
           (col === emptyCol && Math.abs(row - emptyRow) === 1)
  }

  const handleTile = (idx: number) => {
    if (!canMove(idx) || gameComplete || sliding !== null) return
    const emptyIdx = tiles.indexOf(0)
    setSliding(idx)
    const next = [...tiles];
    [next[idx], next[emptyIdx]] = [next[emptyIdx], next[idx]]
    setTimeout(() => {
      setTiles(next)
      setSliding(null)
      setMoves(m => m + 1)
    }, 150)
  }

  if (!gameStarted) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🧩</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Sliding Puzzle</h2>
        <p className="text-white/60 font-nunito mb-6">Slide the tiles to arrange them in order from 1 to 8!</p>
        <Button variant="coral" size="lg" icon={<Zap className="w-5 h-5" />} onClick={initGame}>Start Game</Button>
      </Card>
    )
  }

  if (gameComplete) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🏆</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Puzzle Solved!</h2>
        <p className="text-3xl font-baloo font-bold text-white mb-2">{Math.max(0, 100 - moves * 2)} points</p>
        <p className="text-white/60 font-nunito mb-2">Completed in {moves} moves</p>
        <p className="text-white/40 font-nunito mb-6 text-sm">Fewer moves = more points!</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/games"><Button variant="glass">Back to Games</Button></Link>
          <Button variant="coral" icon={<RefreshCw className="w-4 h-4" />} onClick={initGame}>Play Again</Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-xs mx-auto">
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="flex items-center gap-1 text-white/60 font-nunito"><Shuffle className="w-4 h-4" />{moves}</span>
        {solved && <span className="text-green font-bold font-nunito">✓ Solved!</span>}
      </div>

      <div className="grid grid-cols-3 gap-2 bg-white/5 rounded-2xl p-3 border border-white/10">
        {tiles.map((tile, idx) => {
          const empty = tile === 0
          const clickable = canMove(idx)
          return (
            <motion.button
              key={tile}
              animate={sliding === idx ? { scale: 0.9, opacity: 0.7 } : { scale: 1, opacity: empty ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              onClick={() => handleTile(idx)}
              disabled={empty || gameComplete}
              className={cn(
                'aspect-square rounded-xl flex items-center justify-center text-2xl font-bold font-baloo transition-all',
                empty
                  ? 'bg-transparent cursor-default'
                  : clickable
                    ? 'bg-gradient-to-br from-coral to-coral/70 text-white shadow-lg cursor-pointer hover:from-coral/80 hover:to-coral/60 active:scale-95'
                    : 'bg-white/10 text-white/40 border border-white/10'
              )}
            >
              {tile || ''}
            </motion.button>
          )
        })}
      </div>

      <div className="flex justify-center mt-4">
        <Button variant="glass" size="sm" icon={<Shuffle className="w-4 h-4" />} onClick={initGame}>
          New Puzzle
        </Button>
      </div>
    </div>
  )
}
