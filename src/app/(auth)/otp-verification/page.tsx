'use client'

import { OtpVerification } from '@/components/auth/otp-verification'
import { useRouter } from 'next/navigation'

export default function OtpVerificationPage() {
  const router = useRouter()

  const handleVerify = async (otp: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push('/')
  }

  const handleResend = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return (
    <OtpVerification
      email="user@example.com"
      onVerify={handleVerify}
      onResend={handleResend}
      onBack={() => router.push('/login')}
    />
  )
}
