'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Lightbulb, RefreshCw, MessageCircle, BookOpen } from 'lucide-react'

type FunType = 'fact' | 'joke' | 'story' | 'riddle'

const icons = {
  fact: Lightbulb,
  joke: MessageCircle,
  story: BookOpen,
  riddle: Sparkles,
}

const labels: Record<string, string> = {
  fact: 'Fun Fact',
  joke: 'Joke',
  story: 'Mini Story',
  riddle: 'Riddle',
}

export function FunFactWidget() {
  const [text, setText] = useState('')
  const [type, setType] = useState<FunType>('fact')
  const [loading, setLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const fetchFun = useCallback(async (t: FunType) => {
    setLoading(true)
    setType(t)
    try {
      const res = await fetch('/api/ai/fun', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: t }),
      })
      const data = await res.json()
      if (data.success) {
        setText(data.data.text)
      } else {
        setText(fallbackContent(t))
      }
    } catch {
      setText(fallbackContent(t))
    } finally {
      setLoading(false)
      setHasFetched(true)
    }
  }, [])

  const Icon = icons[type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl overflow-hidden border border-white/10 shadow-xl"
      style={{
        background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(255,107,107,0.1))',
      }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-purple flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <h3 className="text-xl font-baloo font-bold text-white">Pogo&apos;s Playtime</h3>
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {(Object.keys(labels) as FunType[]).map((t) => (
            <button
              key={t}
              onClick={() => fetchFun(t)}
              disabled={loading}
              className={`px-3 py-1.5 rounded-full text-xs font-bold font-nunito transition-all ${
                type === t && hasFetched
                  ? 'bg-gradient-to-r from-coral to-purple text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
              }`}
            >
              {labels[t]}
            </button>
          ))}
        </div>

        <div className="min-h-[60px] flex items-center">
          {!hasFetched && !loading && (
            <p className="text-white/40 font-nunito text-sm">Tap a button above for some fun!</p>
          )}
          {loading && (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-coral border-t-transparent animate-spin" />
              <span className="text-white/50 font-nunito text-sm">Thinking...</span>
            </div>
          )}
          {hasFetched && !loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={text + type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral to-purple flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon size={16} className="text-white" />
                </div>
                <p className="text-white/80 font-nunito text-sm leading-relaxed">{text}</p>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {hasFetched && !loading && (
          <button
            onClick={() => fetchFun(type)}
            className="mt-4 flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors font-nunito"
          >
            <RefreshCw size={12} />
            Get another {labels[type]}
          </button>
        )}
      </div>
    </motion.div>
  )
}

function fallbackContent(type: string): string {
  const fallbacks: Record<string, string> = {
    fact: "Did you know? Honey never spoils! Archaeologists found 3000-year-old honey in Egyptian tombs that was still perfectly good to eat!",
    joke: "Why did the teddy bear say no to dessert? Because he was stuffed! 🧸",
    story: "Once upon a time, a little star named Twinkle wanted to learn how to shine bright. She asked the moon for help. The moon said, 'Just be yourself!' And Twinkle shone brighter than ever. The end!",
    riddle: "I have hands but can't clap. I have a face but can't smile. What am I?\nAnswer: A clock! ⏰",
  }
  return fallbacks[type] || fallbacks.fact
}
