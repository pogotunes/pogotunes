'use client'

import { Header } from '@/components/layout/header'
import { PageWrapper } from '@/components/layout/page-wrapper'
import { useAuthStore } from '@/store/auth-store'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const hydrated = useAuthStore((state) => state._hydrated)

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      redirect('/login')
    }
  }, [isAuthenticated, hydrated])

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <PageWrapper animation="fade">{children}</PageWrapper>
      </main>
    </>
  )
}
