'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { resetPasswordSchema, getPasswordStrength, type ResetPasswordInput } from '@/lib/validations'
import { useResetPassword } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

const strengthConfig = {
  weak: { label: 'Weak', color: 'bg-red-500', textColor: 'text-red-500', width: '25%' },
  medium: { label: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-500', width: '50%' },
  strong: { label: 'Strong', color: 'bg-[#51CF66]', textColor: 'text-[#51CF66]', width: '75%' },
  'very-strong': { label: 'Very Strong', color: 'bg-[#6C63FF]', textColor: 'text-[#6C63FF]', width: '100%' },
}

export function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const resetMutation = useResetPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: '', confirmPassword: '' },
  })

  const password = watch('password')
  const strength = password ? getPasswordStrength(password) : null
  const strengthInfo = strength ? strengthConfig[strength] : null

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      await resetMutation.mutateAsync({ token: data.token, password: data.password })
      setIsSuccess(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reset password'
      setError('password', { message })
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
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
          Password Reset!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 mt-2"
        >
          Your password has been successfully updated.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#6C63FF] to-[#8B85FF] text-white shadow-lg shadow-purple/25 hover:shadow-xl hover:shadow-purple/30 transition-all duration-300"
          >
            Sign In
          </Link>
        </motion.div>
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
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#8B85FF] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple/20"
        >
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-bold font-baloo text-gray-900 dark:text-white">Set New Password</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Must be at least 6 characters
        </p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          New Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            id="new-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Enter new password"
            {...register('password')}
            className={cn(
              'w-full pl-10 pr-11 py-3 rounded-xl text-sm transition-all duration-200',
              'bg-white/70 dark:bg-white/5 border backdrop-blur-sm',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'text-gray-900 dark:text-white',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              errors.password
                ? 'border-red-300 dark:border-red-500/50 focus:ring-red-400/50'
                : 'border-gray-200 dark:border-white/10 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]',
            )}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {password && strengthInfo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
            <div className="h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: strengthInfo.width }}
                className={`h-full rounded-full ${strengthInfo.color} transition-all duration-500`}
              />
            </div>
            <p className={`text-xs ${strengthInfo.textColor}`}>{strengthInfo.label}</p>
          </motion.div>
        )}
        <AnimatePresence>
          {errors.password && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-red-500 text-xs">{errors.password.message}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            id="confirm-new-password"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Re-enter new password"
            {...register('confirmPassword')}
            className={cn(
              'w-full pl-10 pr-11 py-3 rounded-xl text-sm transition-all duration-200',
              'bg-white/70 dark:bg-white/5 border backdrop-blur-sm',
              'placeholder:text-gray-400 dark:placeholder:text-gray-500',
              'text-gray-900 dark:text-white',
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              errors.confirmPassword
                ? 'border-red-300 dark:border-red-500/50 focus:ring-red-400/50'
                : 'border-gray-200 dark:border-white/10 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]',
            )}
            aria-invalid={!!errors.confirmPassword}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <AnimatePresence>
          {errors.confirmPassword && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-red-500 text-xs">{errors.confirmPassword.message}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {resetMutation.error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400"
          >
            {resetMutation.error instanceof Error ? resetMutation.error.message : 'Failed to reset password'}
          </motion.div>
        )}
      </AnimatePresence>

      <input type="hidden" {...register('token')} />

      <motion.button
        type="submit"
        disabled={resetMutation.isPending}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          'w-full py-3 rounded-xl font-semibold text-sm',
          'bg-gradient-to-r from-[#6C63FF] to-[#8B85FF]',
          'hover:from-[#5A52E0] hover:to-[#6C63FF]',
          'text-white shadow-lg shadow-purple/25',
          'hover:shadow-xl hover:shadow-purple/30',
          'transition-all duration-300',
          'disabled:opacity-60 disabled:cursor-not-allowed',
          'flex items-center justify-center gap-2',
        )}
      >
        {resetMutation.isPending ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Resetting Password...</>
        ) : (
          <><svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg> Reset Password</>
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
