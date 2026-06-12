import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, RegisterInput } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  _hydrated: boolean
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterInput) => Promise<void>
  logout: () => Promise<void>
  updateUser: (data: Partial<User>) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      _hydrated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setLoading: (isLoading) => set({ isLoading }),

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })
          const data = await response.json()
          if (!response.ok) throw new Error(data.message || 'Login failed')
          set({ user: data.data || data.user, isAuthenticated: true })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Login failed'
          set({ error: message })
          throw err
        } finally {
          set({ isLoading: false })
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          const result = await response.json()
          if (!response.ok) throw new Error(result.message || 'Registration failed')
          set({ user: result.data || result.user, isAuthenticated: true })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Registration failed'
          set({ error: message })
          throw err
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await fetch('/api/auth/logout', { method: 'POST' })
        } finally {
          set({ user: null, isAuthenticated: false, isLoading: false, error: null })
        }
      },

      updateUser: (data) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...data } })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'pogotunes-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ _hydrated: true })
      },
    }
  )
)
