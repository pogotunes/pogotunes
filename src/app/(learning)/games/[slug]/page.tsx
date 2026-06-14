'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Gamepad2 } from 'lucide-react'
import { fadeInUp } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { Spinner } from '@/components/ui/spinner'
import { GamePlayer } from '@/components/games/game-player'

export default function GamePage() {
  const params = useParams()
  const slug = params.slug as string
  const [game, setGame] = useState<{ title: string; description?: string; type: string; config?: Record<string, unknown> } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/games/${slug}`)
      .then(r => r.json())
      .then(res => {
        if (res.success) setGame(res.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" label="Loading game..." />
      </div>
    )
  }

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/40 font-nunito text-lg">Game not found</p>
      </div>
    )
  }

  const accentColor = '#6BCBFF'

  return (
    <div className="min-h-screen">
      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${accentColor}15 0%, transparent 100%)` }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: accentColor }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <Breadcrumb
            items={[
              { label: 'Games', href: '/games' },
              { label: game.title },
            ]}
            className="mb-8"
          />

          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)` }}
              >
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-baloo font-bold text-white">{game.title}</h1>
                {game.description && <p className="text-sm text-white/50 font-nunito">{game.description}</p>}
              </div>
            </div>

            <GamePlayer type={game.type} config={game.config} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
