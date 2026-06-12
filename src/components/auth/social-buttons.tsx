'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialButtonProps {
  provider: 'google' | 'facebook' | 'github'
  onClick?: () => Promise<void>
  className?: string
}

const socialConfig = {
  google: {
    icon: Globe,
    label: 'Google',
    bg: 'bg-white hover:bg-gray-50 dark:bg-white/10 dark:hover:bg-white/20',
    text: 'text-gray-800 dark:text-white',
    border: 'border-gray-300 dark:border-white/20',
  },
  facebook: {
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    label: 'Facebook',
    bg: 'bg-[#1877F2] hover:bg-[#166fe5]',
    text: 'text-white',
    border: 'border-[#1877F2]',
  },
  github: {
    icon: Code2,
    label: 'GitHub',
    bg: 'bg-[#333] hover:bg-[#1a1a1a] dark:bg-[#2d2d2d] dark:hover:bg-[#3d3d3d]',
    text: 'text-white',
    border: 'border-[#333]',
  },
}

export function SocialButton({ provider, onClick, className }: SocialButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const config = socialConfig[provider]
  const Icon = config.icon

  const handleClick = async () => {
    if (!onClick || isLoading) return
    setIsLoading(true)
    try {
      await onClick()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl',
        'border text-sm font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/50',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        config.bg,
        config.text,
        config.border,
        'shadow-sm hover:shadow-md',
        className,
      )}
      aria-label={`Sign in with ${config.label}`}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <Icon className="h-5 w-5" />
      )}
      {config.label}
    </motion.button>
  )
}

export function SocialButtons({ className }: { className?: string }) {
  const handleSocialLogin = async (_provider: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <div className={cn('flex gap-3', className)}>
      <SocialButton provider="google" onClick={() => handleSocialLogin('google')} className="flex-1" />
      <SocialButton provider="facebook" onClick={() => handleSocialLogin('facebook')} className="flex-1" />
      <SocialButton provider="github" onClick={() => handleSocialLogin('github')} className="flex-1" />
    </div>
  )
}
