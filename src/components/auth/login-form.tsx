'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loginSchema, type LoginInput } from '@/lib/validations'
import { useLogin } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
}

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const loginMutation = useLogin()

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => router.push('/dashboard'), 2000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, router])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data: LoginInput) => {
    try {
      await loginMutation.mutateAsync(data)
      setIsSuccess(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid email or password'
      setError('email', { message })
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
          <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold font-baloo text-gray-900 dark:text-white"
        >
          Welcome Back!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 mt-2"
        >
          Redirecting to your dashboard...
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.4, duration: 1.5 }}
          className="h-1 bg-gradient-to-r from-[#51CF66] to-[#6BCBFF] rounded-full mt-6 max-w-xs"
        />
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      variants={stagger}
      initial="initial"
      animate="animate"
      className="space-y-5"
      noValidate
    >
      <motion.div variants={fadeUp} className="text-center">
        <h2 className="text-3xl font-bold font-baloo text-gray-900 dark:text-white">Welcome Back</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Sign in to continue learning</p>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register('email')}
                className={cn(
                  'w-full pl-10 pr-4 py-3 rounded-xl text-sm transition-all duration-200',
                  'bg-white/70 dark:bg-white/5',
                  'border backdrop-blur-sm',
                  'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                  'text-gray-900 dark:text-white',
                  'focus:outline-none focus:ring-2 focus:ring-offset-0',
                  errors.email
                    ? 'border-red-300 dark:border-red-500/50 focus:ring-red-400/50'
                    : 'border-gray-200 dark:border-white/10 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]',
                )}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  id="email-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                {...register('password')}
                className={cn(
                  'w-full pl-10 pr-11 py-3 rounded-xl text-sm transition-all duration-200',
                  'bg-white/70 dark:bg-white/5',
                  'border backdrop-blur-sm',
                  'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                  'text-gray-900 dark:text-white',
                  'focus:outline-none focus:ring-2 focus:ring-offset-0',
                  errors.password
                    ? 'border-red-300 dark:border-red-500/50 focus:ring-red-400/50'
                    : 'border-gray-200 dark:border-white/10 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]',
                )}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
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
            <AnimatePresence>
              {errors.password && (
                <motion.p
                  id="password-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-4 h-4 rounded border border-gray-300 dark:border-white/20 bg-white dark:bg-white/5 peer-checked:bg-[#6C63FF] peer-checked:border-[#6C63FF] transition-colors flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-[#6C63FF]/50">
                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">Remember me</span>
            </label>
          </div>
        </motion.div>

      <AnimatePresence>
        {loginMutation.error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400"
          >
            {loginMutation.error instanceof Error ? loginMutation.error.message : 'Login failed'}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fadeUp} className="space-y-3">
        <motion.button
          type="submit"
          disabled={isSubmitting || loginMutation.isPending}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            'w-full py-3 rounded-xl font-semibold text-sm',
            'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E]',
            'hover:from-[#E55A5A] hover:to-[#FF6B6B]',
            'text-white shadow-lg shadow-coral/25',
            'hover:shadow-xl hover:shadow-coral/30',
            'transition-all duration-300',
            'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:shadow-coral/25',
            'flex items-center justify-center gap-2',
          )}
        >
          {isSubmitting || loginMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              Sign In
            </>
          )}
        </motion.button>
      </motion.div>

      <motion.p variants={fadeUp} className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="text-[#6C63FF] hover:text-[#5A52E0] dark:text-[#8B85FF] dark:hover:text-[#9F9AFF] font-semibold transition-colors"
        >
          Sign Up
          <ArrowRight className="inline h-3 w-3 ml-0.5" />
        </Link>
      </motion.p>
    </motion.form>
  )
}
