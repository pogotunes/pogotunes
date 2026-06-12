import { create } from 'zustand'
import type { Game, GameResult } from '@/types'

interface GameState {
  currentGame: Game | null
  score: number
  level: number
  lives: number
  maxLives: number
  timeLeft: number
  isPlaying: boolean
  isPaused: boolean
  isCompleted: boolean
  combo: number
  highScore: number
  isLoading: boolean
  error: string | null
  setCurrentGame: (game: Game | null) => void
  setScore: (score: number) => void
  addScore: (points: number) => void
  setLevel: (level: number) => void
  setLives: (lives: number) => void
  loseLife: () => void
  gainLife: () => void
  setTimeLeft: (time: number) => void
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  completeGame: () => void
  resetGame: () => void
  addCombo: () => void
  resetCombo: () => void
  setHighScore: (score: number) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  submitResult: (result: GameResult) => Promise<void>
}

const initialState = {
  currentGame: null,
  score: 0,
  level: 1,
  lives: 3,
  maxLives: 5,
  timeLeft: 0,
  isPlaying: false,
  isPaused: false,
  isCompleted: false,
  combo: 0,
  highScore: 0,
  isLoading: false,
  error: null,
}

export const useGameStore = create<GameState>()((set, get) => ({
  ...initialState,

  setCurrentGame: (game) => set({ currentGame: game }),

  setScore: (score) => set({ score }),
  addScore: (points) => {
    const combo = get().combo
    const multiplier = 1 + (combo > 0 ? combo * 0.1 : 0)
    set((state) => ({ score: state.score + Math.round(points * multiplier) }))
  },

  setLevel: (level) => set({ level }),
  setLives: (lives) => set({ lives }),
  loseLife: () => set((state) => ({
    lives: Math.max(0, state.lives - 1),
    combo: 0,
  })),
  gainLife: () => set((state) => ({
    lives: Math.min(state.maxLives, state.lives + 1),
  })),

  setTimeLeft: (time) => set({ timeLeft: time }),

  startGame: () => set({
    isPlaying: true,
    isPaused: false,
    isCompleted: false,
    score: 0,
    level: 1,
    lives: 3,
    combo: 0,
  }),

  pauseGame: () => set({ isPaused: true }),
  resumeGame: () => set({ isPaused: false }),
  completeGame: () => set({ isPlaying: false, isCompleted: true }),

  resetGame: () => set(initialState),

  addCombo: () => set((state) => ({ combo: state.combo + 1 })),
  resetCombo: () => set({ combo: 0 }),

  setHighScore: (score) => set({ highScore: score }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  submitResult: async (result) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/games/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to submit result')
      if (data.data?.highScore) {
        set({ highScore: data.data.highScore })
      }
      set({ isCompleted: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit result'
      set({ error: message })
      throw err
    } finally {
      set({ isLoading: false })
    }
  },
}))
