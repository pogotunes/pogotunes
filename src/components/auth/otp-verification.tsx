'use client'

import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OtpVerificationProps {
  email?: string
  onVerify: (otp: string) => Promise<void>
  onResend: () => Promise<void>
  onBack?: () => void
  isLoading?: boolean
}

export function OtpVerification({ email, onVerify, onResend, onBack, isLoading: externalLoading }: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''))
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const isLoading = externalLoading || isVerifying

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true)
      return
    }
    const interval = setInterval(() => setResendTimer(prev => prev - 1), 1000)
    return () => clearInterval(interval)
  }, [resendTimer])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    setError(null)

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return

    const newOtp = [...otp]
    pasted.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char
    })
    setOtp(newOtp)
    setError(null)

    const nextIndex = Math.min(pasted.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleSubmit = async () => {
    const code = otp.join('')
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setIsVerifying(true)
    setError(null)
    try {
      await onVerify(code)
      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP. Please try again.')
      setOtp(Array(6).fill(''))
      inputRefs.current[0]?.focus()
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    if (!canResend || isResending) return
    setIsResending(true)
    try {
      await onResend()
      setResendTimer(30)
      setCanResend(false)
      setOtp(Array(6).fill(''))
      setError(null)
      inputRefs.current[0]?.focus()
    } finally {
      setIsResending(false)
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
          Verified Successfully!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 dark:text-gray-400 mt-2"
        >
          Your email has been verified
        </motion.p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      )}

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
        <h3 className="text-xl font-bold font-baloo text-gray-900 dark:text-white">
          Verify Your Email
        </h3>
        {email && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            Enter the 6-digit code sent to{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">{email}</span>
          </p>
        )}
      </div>

      <div className="flex justify-center gap-2 sm:gap-3">
        {otp.map((digit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <input
              ref={el => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              aria-label={`Digit ${index + 1}`}
              className={cn(
                'w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-bold rounded-xl',
                'bg-white/70 dark:bg-white/5 backdrop-blur-sm',
                'border-2 transition-all duration-200',
                'text-gray-900 dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-offset-0',
                error
                  ? 'border-red-300 dark:border-red-500/50 focus:ring-red-400/50'
                  : digit
                    ? 'border-[#6C63FF] dark:border-[#8B85FF] focus:ring-[#6C63FF]/50'
                    : 'border-gray-200 dark:border-white/10 focus:ring-[#6C63FF]/50 focus:border-[#6C63FF]',
                digit ? 'shadow-sm' : '',
              )}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading || otp.join('').length !== 6}
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
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          'Verify Email'
        )}
      </motion.button>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        {canResend ? (
          <>
            Didn&apos;t receive the code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-[#6C63FF] hover:text-[#5A52E0] dark:text-[#8B85FF] font-semibold transition-colors disabled:opacity-50"
            >
              {isResending ? 'Sending...' : 'Resend Code'}
            </button>
          </>
        ) : (
          <>Resend code in <span className="font-medium text-gray-700 dark:text-gray-300">{resendTimer}s</span></>
        )}
      </p>
    </div>
  )
}
