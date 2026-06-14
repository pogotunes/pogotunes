'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  Search,
  Mic,
  MicOff,
  X,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
  Gamepad2,
  Video,
  HelpCircle,
  Layers,
  ArrowRight,
  Loader2,
  Command,
  Hash,
} from 'lucide-react'
import { useUIStore } from '@/store/ui-store'
import { useDebounce } from '@/hooks/use-debounce'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'
import { cn } from '@/lib/utils'

const trending = [
  { term: 'Math games', href: '/search?q=math+games', color: '#FF6B6B' },
  { term: 'Animal sounds', href: '/search?q=animal+sounds', color: '#6BCBFF' },
  { term: 'Spelling quiz', href: '/search?q=spelling+quiz', color: '#51CF66' },
  { term: 'Space adventure', href: '/search?q=space+adventure', color: '#6C63FF' },
]

const categories = [
  { label: 'All', value: '' },
  { label: 'Lessons', value: 'lesson', icon: BookOpen },
  { label: 'Games', value: 'game', icon: Gamepad2 },
  { label: 'Videos', value: 'video', icon: Video },
  { label: 'Quizzes', value: 'quiz', icon: HelpCircle },
  { label: 'Flashcards', value: 'flashcard', icon: Layers },
]

const suggestions = [
  { title: 'Addition for beginners', type: 'Lesson', href: '/learn/addition' },
  { title: 'Animal kingdom quiz', type: 'Quiz', href: '/quizzes/animal-kingdom' },
  { title: 'Space memory game', type: 'Game', href: '/games/space-memory' },
  { title: 'Phonics flashcards', type: 'Flashcard', href: '/flashcards/phonics' },
  { title: 'Solar system video', type: 'Video', href: '/videos/solar-system' },
]

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    transition: { duration: 0.15 },
  },
}

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [activeCategory, setActiveCategory] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'multiplication table',
    'animal sounds',
    'phonics',
  ])

  const { searchOpen, setSearchOpen } = useUIStore()
  const debouncedQuery = useDebounce(query, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useOnClickOutside<HTMLDivElement>(() => {
    if (!query) {
      setIsFocused(false)
      setSearchOpen(false)
    }
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(!searchOpen)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setIsFocused(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen, setSearchOpen])

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  const handleVoiceSearch = useCallback(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      return
    }
    setIsListening(!isListening)
  }, [isListening])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        setRecentSearches((prev) => [query, ...prev.filter((s) => s !== query)].slice(0, 5))
        setSearchOpen(false)
        router.push(`/search?q=${encodeURIComponent(query)}`)
      }
    },
    [query, router, setSearchOpen],
  )

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl mx-4"
          >
            <form
              onSubmit={handleSubmit}
              className={cn(
                'relative overflow-hidden rounded-2xl',
                'bg-white/90 dark:bg-gray-900/90',
                'backdrop-blur-xl border border-white/30 dark:border-gray-700/30',
                'shadow-2xl shadow-black/10',
                'transition-all duration-300',
                isFocused && 'ring-2 ring-[#6C63FF]/30',
              )}
            >
              <div className="flex items-center gap-3 px-5 py-4">
                <Search className="h-5 w-5 shrink-0 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Search lessons, games, quizzes..."
                  className="flex-1 bg-transparent text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
                  autoComplete="off"
                  aria-label="Search Pogo Tunes"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200',
                      isListening
                        ? 'bg-[#FF6B6B]/20 text-[#FF6B6B] animate-pulse'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                    )}
                    aria-label={isListening ? 'Stop voice search' : 'Voice search'}
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </button>
                  <div className="hidden sm:flex h-7 items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 px-2 text-xs text-gray-400">
                    <Command className="h-3 w-3" />
                    <span>K</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false)
                      setQuery('')
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isFocused && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden border-t border-gray-100 dark:border-gray-800"
                  >
                    <div className="px-5 py-3">
                      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {categories.map((cat) => {
                          const Icon = cat.icon
                          const isActive = activeCategory === cat.value
                          return (
                            <button
                              key={cat.value}
                              type="button"
                              onClick={() => setActiveCategory(cat.value)}
                              className={cn(
                                'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all',
                                isActive
                                  ? 'bg-[#6C63FF]/10 text-[#6C63FF] dark:text-[#6BCBFF]'
                                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                              )}
                            >
                              {Icon && <Icon className="h-3.5 w-3.5" />}
                              {cat.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {!query ? (
                      <div className="px-5 pb-4 space-y-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-3.5 w-3.5 text-[#FF6B6B]" />
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Trending
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {trending.map((item) => (
                              <Link
                                key={item.term}
                                href={item.href}
                                className="group flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105"
                                style={{ backgroundColor: `${item.color}12`, color: item.color }}
                                onClick={() => setSearchOpen(false)}
                              >
                                <Hash className="h-3 w-3" />
                                {item.term}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Recent
                            </span>
                          </div>
                          <div className="space-y-1">
                            {recentSearches.map((term) => (
                              <button
                                key={term}
                                type="button"
                                onClick={() => {
                                  setQuery(term)
                                  router.push(`/search?q=${encodeURIComponent(term)}`)
                                  setSearchOpen(false)
                                }}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              >
                                <Clock className="h-3.5 w-3.5 shrink-0" />
                                <span>{term}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="px-5 pb-4 space-y-1">
                        {suggestions.map((item, i) => (
                          <Link
                            key={`${item.title}-${i}`}
                            href={item.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                            onClick={() => setSearchOpen(false)}
                          >
                            <Sparkles className="h-4 w-4 shrink-0 text-[#FFD93D]" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-400">{item.type}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 dark:text-gray-600 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                          </Link>
                        ))}
                        {debouncedQuery && (
                          <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 mt-2 rounded-lg bg-gradient-to-r from-[#6C63FF]/10 to-[#6BCBFF]/10 px-4 py-2.5 text-sm font-medium text-[#6C63FF] dark:text-[#6BCBFF] hover:from-[#6C63FF]/20 hover:to-[#6BCBFF]/20 transition-colors"
                          >
                            <Search className="h-4 w-4" />
                            Search for &ldquo;{query}&rdquo;
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
