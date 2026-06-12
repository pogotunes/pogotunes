'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PageWrapper } from '@/components/layout/page-wrapper'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <PageWrapper animation="fade">{children}</PageWrapper>
      </main>
      <Footer />
    </>
  )
}
