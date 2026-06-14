'use client'

import { MemoryMatchGame } from './memory-match'
import { ColorMatchGame } from './color-match'
import { SpeedCountGame } from './speed-count'
import { SpellingGame } from './spelling-game'
import { WordMatchGame } from './word-match'
import { SortingGame } from './sorting-game'
import { PuzzleGame } from './puzzle-game'
import { MazeGame } from './maze-game'

interface GamePlayerProps {
  type: string
  config?: Record<string, unknown>
}

export function GamePlayer({ type }: GamePlayerProps) {
  switch (type) {
    case 'MEMORY':
      return <MemoryMatchGame />
    case 'COLOR':
      return <ColorMatchGame />
    case 'SPEED':
      return <SpeedCountGame />
    case 'SPELLING':
      return <SpellingGame />
    case 'MATCHING':
      return <WordMatchGame />
    case 'SORTING':
      return <SortingGame />
    case 'PUZZLE':
      return <PuzzleGame />
    case 'MAZE':
      return <MazeGame />
    default:
      return <MemoryMatchGame />
  }
}
