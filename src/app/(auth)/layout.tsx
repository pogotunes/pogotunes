import type { Metadata } from 'next'
import { Music2 } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFE8D6] dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#0f0f1a]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#FF6B6B]/10 dark:bg-[#FF6B6B]/5 blur-3xl animate-pulse-soft" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#6C63FF]/10 dark:bg-[#6C63FF]/5 blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-60 h-60 rounded-full bg-[#6BCBFF]/10 dark:bg-[#6BCBFF]/5 blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full bg-[#FFD93D]/10 dark:bg-[#FFD93D]/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 rounded-full bg-[#51CF66]/10 dark:bg-[#51CF66]/5 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        <svg className="absolute top-20 left-10 w-8 h-8 text-[#FFD93D]/20 animate-float" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        <svg className="absolute bottom-20 right-10 w-6 h-6 text-[#FF6B6B]/20 animate-float" style={{ animationDelay: '1s' }} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
        <svg className="absolute top-1/3 right-10 w-5 h-5 text-[#6C63FF]/20 animate-float" style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        <svg className="absolute bottom-1/3 left-10 w-4 h-4 text-[#6BCBFF]/20 animate-float" style={{ animationDelay: '2s' }} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-[440px] px-4 sm:px-6 py-8">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center shadow-lg shadow-coral/20 group-hover:shadow-xl group-hover:shadow-coral/30 transition-all duration-300 group-hover:scale-105">
            <Music2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold font-baloo bg-gradient-to-r from-[#FF6B6B] via-[#6C63FF] to-[#6BCBFF] bg-clip-text text-transparent">
            Pogo Tunes
          </span>
        </Link>

        <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 dark:from-white/5 dark:to-transparent pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-6">
          &copy; {new Date().getFullYear()} Pogo Tunes. All rights reserved.
        </p>
      </div>
    </div>
  )
}
