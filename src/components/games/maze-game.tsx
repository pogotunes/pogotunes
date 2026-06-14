'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, RefreshCw, Zap, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Rocket } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Cell = 0 | 1
type Maze = Cell[][]

function generateMaze(rows: number, cols: number): Maze {
  const maze: Maze = Array.from({ length: rows }, () => Array(cols).fill(1) as Cell[])

  const dirs = [[0, 2], [2, 0], [0, -2], [-2, 0]]
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false))

  function carve(r: number, c: number) {
    visited[r][c] = true
    maze[r][c] = 0
    const shuffled = [...dirs].sort(() => Math.random() - 0.5)
    for (const [dr, dc] of shuffled) {
      const nr = r + dr
      const nc = c + dc
      if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && !visited[nr][nc]) {
        maze[r + dr / 2][c + dc / 2] = 0
        carve(nr, nc)
      }
    }
  }

  carve(1, 1)
  maze[1][1] = 0
  maze[rows - 2][cols - 2] = 0
  return maze
}

interface LevelConfig {
  rows: number
  cols: number
}

const LEVELS: LevelConfig[] = [
  { rows: 7, cols: 7 },
  { rows: 9, cols: 9 },
  { rows: 11, cols: 11 },
]

export function MazeGame() {
  const [level, setLevel] = useState(0)
  const [maze, setMaze] = useState<Maze>([])
  const [player, setPlayer] = useState({ r: 1, c: 1 })
  const [gameStarted, setGameStarted] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [moveCount, setMoveCount] = useState(0)
  const [score, setScore] = useState(0)

  const cfg = LEVELS[level]
  const goal = { r: cfg.rows - 2, c: cfg.cols - 2 }

  const initLevel = useCallback((lvl: number) => {
    const cfg = LEVELS[lvl]
    const m = generateMaze(cfg.rows, cfg.cols)
    setMaze(m)
    setPlayer({ r: 1, c: 1 })
    setMoveCount(0)
    setGameComplete(false)
  }, [])

  const initGame = useCallback(() => {
    setLevel(0)
    setScore(0)
    setGameStarted(true)
    initLevel(0)
  }, [initLevel])

  useEffect(() => {
    if (!gameStarted) return
    initLevel(0)
  }, [gameStarted, initLevel])

  const move = (dr: number, dc: number) => {
    if (gameComplete) return
    const nr = player.r + dr
    const nc = player.c + dc
    if (nr < 0 || nr >= cfg.rows || nc < 0 || nc >= cfg.cols) return
    if (maze[nr][nc] === 1) return
    setPlayer({ r: nr, c: nc })
    setMoveCount(m => m + 1)
    if (nr === goal.r && nc === goal.c) {
      const lvlScore = Math.max(10, 50 - moveCount)
      setScore(s => s + lvlScore)
      const nextLvl = level + 1
      if (nextLvl >= LEVELS.length) {
        setGameComplete(true)
      } else {
        setLevel(nextLvl)
        initLevel(nextLvl)
      }
    }
  }

  if (!gameStarted) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🪐</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Space Maze</h2>
        <p className="text-white/60 font-nunito mb-6">Navigate the rocket through the maze to reach the goal!</p>
        <Button variant="coral" size="lg" icon={<Zap className="w-5 h-5" />} onClick={initGame}>Start Game</Button>
      </Card>
    )
  }

  if (gameComplete) {
    return (
      <Card variant="glass" className="p-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-7xl mb-6">🏆</motion.div>
        <h2 className="text-2xl font-baloo font-bold text-white mb-2">Mission Complete!</h2>
        <p className="text-3xl font-baloo font-bold text-white mb-2">{score} points</p>
        <p className="text-white/60 font-nunito mb-6">All {LEVELS.length} levels conquered!</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/games"><Button variant="glass">Back to Games</Button></Link>
          <Button variant="coral" icon={<RefreshCw className="w-4 h-4" />} onClick={initGame}>Play Again</Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="text-white/60 font-nunito">Level {level + 1}/{LEVELS.length}</span>
        <span className="flex items-center gap-1 text-yellow"><Star className="w-4 h-4" />{score}</span>
        <span className="text-white/40 font-nunito text-sm">{cfg.rows}x{cfg.cols}</span>
      </div>

      <div className="bg-white/5 rounded-2xl p-3 border border-white/10 mb-4 overflow-auto">
        <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${cfg.cols}, minmax(0, 1fr))` }}>
          {maze.map((row, ri) =>
            row.map((cell, ci) => {
              const isPlayer = player.r === ri && player.c === ci
              const isGoal = goal.r === ri && goal.c === ci
              return (
                <div
                  key={`${ri}-${ci}`}
                  className={cn(
                    'aspect-square rounded-sm text-xs flex items-center justify-center transition-colors',
                    cell === 1
                      ? 'bg-white/15'
                      : isPlayer
                        ? 'bg-gradient-to-br from-coral to-coral/70'
                        : isGoal
                          ? 'bg-green/30'
                          : 'bg-white/5'
                  )}
                >
                  {isPlayer && <Rocket className="w-4 h-4 text-white" />}
                  {isGoal && !isPlayer && <span className="text-green text-xs">★</span>}
                </div>
              )
            })
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2 w-fit">
          <div />
          <button
            onClick={() => move(-1, 0)}
            className="p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
            aria-label="Move up"
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </button>
          <div />
          <button
            onClick={() => move(0, -1)}
            className="p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
            aria-label="Move left"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => move(0, 1)}
            className="p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
            aria-label="Move right"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
          <div />
          <button
            onClick={() => move(1, 0)}
            className="p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 transition-all"
            aria-label="Move down"
          >
            <ArrowDown className="w-6 h-6 text-white" />
          </button>
          <div />
        </div>
      </div>

      <p className="text-center text-white/30 font-nunito text-xs mt-3">Reach the ★ to complete the level!</p>
    </div>
  )
}
