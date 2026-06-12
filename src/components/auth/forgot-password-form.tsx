'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowLeft, Send, Loader2, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/lib/validations'
import { useForgotPassword } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

export function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const forgotMutation = useForgotPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      await forgotMutation.mutateAsync(data.email)
      setIsSuccess(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send reset link'
      setError('email', { message })
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#51CF66] to-[#69DB7C] flex items-center justify-center mb-6 shadow-lg shadow-green/20"
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold font-baloo text-gray-900 dark:text-white"
        >
          Check Your Email
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-sm"
        >
          We&apos;ve sent a password reset link to your email. Please check your inbox and follow the instructions.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-gray-400 dark:text-gray-500 mt-3"
        >
          Didn&apos;t receive the email? Check your spam folder or{' '}
          <button
            type="button"
            onClick={() => { setIsSuccess(false); forgotMutation.reset() }}
            className="text-[#6C63FF] hover:text-[#5A52E0] dark:text-[#8B85FF] font-medium transition-colors"
          >
            try again
          </button>
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
      noValidate
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-coral/20"
        >
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold font-baloo text-gray-900 dark:text-white">Forgot Password?</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          No worries! Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            id="reset-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register('email')}
            className={cn(
              'w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all duration-200',
              'bg-white/70 dark:bg-white/5 border backdrop-blur-sm',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'text-gray-900 dark:text-white',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              errors.email
                ? 'border-red-300 dark:border-red-500/50 focus:ring-red-400/50'
                : 'border-gray-200 dark:border-white/10 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]',
            )}
            aria-invalid={!!errors.email}
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-red-500 text-xs"
            >
              {errors.email.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {forgotMutation.error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400"
          >
            {forgotMutation.error instanceof Error ? forgotMutation.error.message : 'Failed to send reset link'}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={forgotMutation.isPending}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          'w-full py-3 rounded-xl font-semibold text-sm',
          'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E]',
          'hover:from-[#E55A5A] hover:to-[#FF6B6B]',
          'text-white shadow-lg shadow-coral/25',
          'hover:shadow-xl hover:shadow-coral/30',
          'transition-all duration-300',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          'flex items-center justify-center gap-2',
        )}
      >
        {forgotMutation.isPending ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending Reset Link...</>
        ) : (
          <><Send className="h-4 w-4" /> Send Reset Link</>
        )}
      </motion.button>

      <p className="text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </p>
    </motion.form>
  )
}
