'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFE8D6] dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#0f0f1a]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <div className="text-7xl mb-6">😅</div>
        <h1 className="text-3xl font-baloo font-bold text-white mb-2">Oops! Something went wrong</h1>
        <p className="text-white/60 font-nunito mb-6">
          Don&apos;t worry, it&apos;s not your fault! Let&apos;s try again.
        </p>
        <Button variant="coral" onClick={reset}>
          Try Again
        </Button>
      </motion.div>
    </div>
  )
}
