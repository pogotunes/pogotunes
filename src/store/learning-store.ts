import { create } from 'zustand'
import type { Lesson, Progress, QuizResult } from '@/types'

interface LearningState {
  currentLesson: Lesson | null
  progress: Progress[]
  quizAnswers: Record<string, string>
  score: number
  totalQuestions: number
  currentQuestionIndex: number
  isCompleted: boolean
  isLoading: boolean
  error: string | null
  setCurrentLesson: (lesson: Lesson | null) => void
  setProgress: (progress: Progress[]) => void
  addProgress: (progress: Progress) => void
  updateProgress: (id: string, data: Partial<Progress>) => void
  setQuizAnswer: (questionId: string, answer: string) => void
  setQuizAnswers: (answers: Record<string, string>) => void
  clearQuizAnswers: () => void
  setScore: (score: number) => void
  addScore: (points: number) => void
  setTotalQuestions: (total: number) => void
  setCurrentQuestionIndex: (index: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  setIsCompleted: (completed: boolean) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  submitQuizResult: (result: QuizResult) => Promise<void>
  reset: () => void
}

const initialState = {
  currentLesson: null,
  progress: [],
  quizAnswers: {},
  score: 0,
  totalQuestions: 0,
  currentQuestionIndex: 0,
  isCompleted: false,
  isLoading: false,
  error: null,
}

export const useLearningStore = create<LearningState>()((set, get) => ({
  ...initialState,

  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

  setProgress: (progress) => set({ progress }),

  addProgress: (progress) => set((state) => ({
    progress: [...state.progress.filter((p) => p.id !== progress.id), progress],
  })),

  updateProgress: (id, data) => set((state) => ({
    progress: state.progress.map((p) =>
      p.id === id ? { ...p, ...data } : p
    ),
  })),

  setQuizAnswer: (questionId, answer) => set((state) => ({
    quizAnswers: { ...state.quizAnswers, [questionId]: answer },
  })),

  setQuizAnswers: (answers) => set({ quizAnswers: answers }),
  clearQuizAnswers: () => set({ quizAnswers: {} }),

  setScore: (score) => set({ score }),
  addScore: (points) => set((state) => ({ score: state.score + points })),

  setTotalQuestions: (total) => set({ totalQuestions: total }),

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  nextQuestion: () => set((state) => ({
    currentQuestionIndex: Math.min(
      state.currentQuestionIndex + 1,
      state.totalQuestions - 1
    ),
  })),

  prevQuestion: () => set((state) => ({
    currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
  })),

  setIsCompleted: (completed) => set({ isCompleted: completed }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  submitQuizResult: async (result) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to submit quiz')
      set({ isCompleted: true, score: data.data?.score ?? result.score })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit quiz'
      set({ error: message })
      throw err
    } finally {
      set({ isLoading: false })
    }
  },

  reset: () => set(initialState),
}))
