import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFE8D6] dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#0f0f1a]">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-7xl mb-6">🔍</div>
        <h1 className="text-3xl font-baloo font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-white/60 font-nunito mb-6">
          We couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link href="/">
          <Button variant="coral">Go Home</Button>
        </Link>
      </div>
    </div>
  )
}
