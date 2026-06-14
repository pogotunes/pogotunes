'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Lock, Eye, EyeOff, User, ArrowRight, Loader2, UserPlus,
  Calendar, GraduationCap,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerSchema, getPasswordStrength, type RegisterInput } from '@/lib/validations'
import { useRegister } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
}

const strengthConfig = {
  weak: { label: 'Weak', color: 'bg-red-500', textColor: 'text-red-500', width: '25%' },
  medium: { label: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-500', width: '50%' },
  strong: { label: 'Strong', color: 'bg-[#51CF66]', textColor: 'text-[#51CF66]', width: '75%' },
  'very-strong': { label: 'Very Strong', color: 'bg-[#6C63FF]', textColor: 'text-[#6C63FF]', width: '100%' },
}

const accountTypes = [
  { value: 'STUDENT', label: 'Student', icon: GraduationCap },
  { value: 'PARENT', label: 'Parent', icon: User },
  { value: 'TEACHER', label: 'Teacher', icon: User },
] as const

type FormData = RegisterInput & { acceptTerms: boolean; accountType: string }

export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const registerMutation = useRegister()

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
    watch,
    setValue,
  } = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      name: '', email: '', password: '', confirmPassword: '',
      age: undefined, grade: '', accountType: 'STUDENT', acceptTerms: false,
    },
  })

  const password = watch('password')
  const strength = password ? getPasswordStrength(password) : null
  const strengthInfo = strength ? strengthConfig[strength] : null

  const onSubmit = async (data: FormData) => {
    try {
      const registerData = { ...data }
      delete (registerData as Record<string, unknown>).acceptTerms
      delete (registerData as Record<string, unknown>).accountType
      await registerMutation.mutateAsync(registerData as RegisterInput)
      setIsSuccess(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      setError('email', { message })
    }
  }

  const errMsg = (field: keyof typeof errors) => {
    const e = errors[field]
    return e && 'message' in e ? String(e.message) : ''
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
          <UserPlus className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold font-baloo text-gray-900 dark:text-white"
        >
          Account Created!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 mt-2"
        >
          Welcome to Pogo Tunes! Redirecting...
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
      className="space-y-4"
      noValidate
    >
      <motion.div variants={fadeUp} className="text-center">
        <h2 className="text-3xl font-bold font-baloo text-gray-900 dark:text-white">Create Account</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Join millions of learners worldwide</p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I am a</label>
        <div className="grid grid-cols-3 gap-2">
          {accountTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue('accountType', value, { shouldValidate: true })}
              className={cn(
                'flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6C63FF]/50',
                watch('accountType') === value
                  ? 'border-[#6C63FF] bg-[#6C63FF]/5 dark:bg-[#6C63FF]/10 shadow-sm'
                  : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 bg-white/50 dark:bg-white/5',
              )}
            >
              <Icon className={cn(
                'h-5 w-5',
                watch('accountType') === value ? 'text-[#6C63FF]' : 'text-gray-400',
              )} />
              <span className={cn(
                'text-xs font-semibold',
                watch('accountType') === value ? 'text-[#6C63FF]' : 'text-gray-600 dark:text-gray-400',
              )}>{label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              {...register('name')}
              className={cn(
                'w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/70 dark:bg-white/5 border backdrop-blur-sm',
                'placeholder:text-gray-400 text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200',
                errors.name
                  ? 'border-red-300 dark:border-red-500/50 focus:ring-red-400/50'
                  : 'border-gray-200 dark:border-white/10 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]',
              )}
              aria-invalid={!!errors.name}
            />
          </div>
          <AnimatePresence>
            {errors.name && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-red-500 text-xs">{errMsg('name')}</motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register('email')}
              className={cn(
                'w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/70 dark:bg-white/5 border backdrop-blur-sm',
                'placeholder:text-gray-400 text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200',
                errors.email
                  ? 'border-red-300 dark:border-red-500/50 focus:ring-red-400/50'
                  : 'border-gray-200 dark:border-white/10 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]',
              )}
              aria-invalid={!!errors.email}
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-red-500 text-xs">{errMsg('email')}</motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            autoComplete="new-password"
            {...register('password')}
            className={cn(
              'w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white/70 dark:bg-white/5 border backdrop-blur-sm',
              'placeholder:text-gray-400 text-gray-900 dark:text-white',
              'focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200',
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
        <AnimatePresence>
          {errors.password && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-red-500 text-xs">{errMsg('password')}</motion.p>
          )}
        </AnimatePresence>
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
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-1.5">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Re-enter password"
            autoComplete="new-password"
            {...register('confirmPassword')}
            className={cn(
              'w-full pl-10 pr-11 py-3 rounded-xl text-sm bg-white/70 dark:bg-white/5 border backdrop-blur-sm',
              'placeholder:text-gray-400 text-gray-900 dark:text-white',
              'focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200',
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
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-red-500 text-xs">{errMsg('confirmPassword')}</motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age (optional)</label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              id="age"
              type="number"
              min={3}
              max={18}
              placeholder="8"
              {...register('age')}
              className={cn(
                'w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/70 dark:bg-white/5 border backdrop-blur-sm',
                'placeholder:text-gray-400 text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200',
                'border-gray-200 dark:border-white/10 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]',
              )}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Grade (optional)</label>
          <div className="relative">
            <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <select
              id="grade"
              {...register('grade')}
              className={cn(
                'w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/70 dark:bg-white/5 border backdrop-blur-sm appearance-none',
                'text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200',
                'border-gray-200 dark:border-white/10 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]',
              )}
            >
              <option value="">Select grade</option>
              {['Kindergarten', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="relative flex items-start gap-3">
          <input
            type="checkbox"
            id="acceptTerms"
            className="sr-only peer"
            {...register('acceptTerms')}
          />
          <div
            className="w-4 h-4 mt-0.5 rounded border border-gray-300 dark:border-white/20 bg-white dark:bg-white/5 peer-checked:bg-[#6C63FF] peer-checked:border-[#6C63FF] transition-colors flex items-center justify-center shrink-0 cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-[#6C63FF]/50"
            onClick={() => {
              const el = document.getElementById('acceptTerms') as HTMLInputElement
              if (el) el.click()
            }}
          >
            <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <label htmlFor="acceptTerms" className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer select-none">
            I agree to the{' '}
            <Link href="/terms" className="text-[#6C63FF] hover:text-[#5A52E0] dark:text-[#8B85FF] font-medium transition-colors">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-[#6C63FF] hover:text-[#5A52E0] dark:text-[#8B85FF] font-medium transition-colors">Privacy Policy</Link>
          </label>
        </div>
        <AnimatePresence>
          {errors.acceptTerms && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-red-500 text-xs mt-1">{errMsg('acceptTerms')}</motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {registerMutation.error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400"
          >
            {registerMutation.error instanceof Error ? registerMutation.error.message : 'Registration failed'}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={fadeUp}>
        <motion.button
          type="submit"
          disabled={isSubmitting || registerMutation.isPending}
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
          {isSubmitting || registerMutation.isPending ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Creating Account...</>
          ) : (
            <><UserPlus className="h-4 w-4" /> Create Account</>
          )}
        </motion.button>
      </motion.div>

      <motion.p variants={fadeUp} className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-[#6C63FF] hover:text-[#5A52E0] dark:text-[#8B85FF] font-semibold transition-colors">
          Sign In <ArrowRight className="inline h-3 w-3 ml-0.5" />
        </Link>
      </motion.p>
    </motion.form>
  )
}
