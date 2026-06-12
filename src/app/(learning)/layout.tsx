'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PageWrapper } from '@/components/layout/page-wrapper'

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <PageWrapper animation="slide">{children}</PageWrapper>
      </main>
      <Footer />
    </>
  )
}
