import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ToastOptions } from 'react-hot-toast'

type Theme = 'light' | 'dark'
type ToastType = 'success' | 'error' | 'loading' | 'custom'

interface Toast {
  id: string
  type: ToastType
  message: string
  options?: ToastOptions
}

interface UIState {
  theme: Theme
  _hydrated: boolean
  sidebarOpen: boolean
  searchOpen: boolean
  modalOpen: string | null
  modalData: unknown
  mobileMenuOpen: boolean
  cartOpen: boolean
  notificationsPanelOpen: boolean
  toasts: Toast[]
  isScrolled: boolean
  isOnline: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setSearchOpen: (open: boolean) => void
  toggleSearch: () => void
  openModal: (id: string, data?: unknown) => void
  closeModal: () => void
  setMobileMenuOpen: (open: boolean) => void
  setCartOpen: (open: boolean) => void
  setNotificationsPanelOpen: (open: boolean) => void
  addToast: (toast: Toast) => void
  removeToast: (id: string) => void
  clearToasts: () => void
  setIsScrolled: (scrolled: boolean) => void
  setIsOnline: (online: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      _hydrated: false,
      sidebarOpen: false,
      searchOpen: false,
      modalOpen: null,
      modalData: null,
      mobileMenuOpen: false,
      cartOpen: false,
      notificationsPanelOpen: false,
      toasts: [],
      isScrolled: false,
      isOnline: true,

      setTheme: (theme) => set({ theme }),

      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
      })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSearchOpen: (open) => set({ searchOpen: open }),
      toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),

      openModal: (id, data) => set({ modalOpen: id, modalData: data }),
      closeModal: () => set({ modalOpen: null, modalData: null }),

      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      setCartOpen: (open) => set({ cartOpen: open }),
      setNotificationsPanelOpen: (open) => set({ notificationsPanelOpen: open }),

      addToast: (toast) => set((state) => ({
        toasts: [...state.toasts, toast],
      })),

      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      })),

      clearToasts: () => set({ toasts: [] }),

      setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
      setIsOnline: (online) => set({ isOnline: online }),
    }),
    {
      name: 'pogotunes-ui',
      partialize: (state) => ({
        theme: state.theme,
      }),
      onRehydrateStorage: () => () => {
        useUIStore.setState({ _hydrated: true })
      },
    }
  )
)
