import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8F0] via-white to-[#FFE8D6] dark:from-[#0f0f1a] dark:via-[#1a1a2e] dark:to-[#0f0f1a]">
      <div className="text-center">
        <Spinner size="lg" color="coral" />
        <p className="mt-4 text-white/50 font-nunito text-sm">Loading...</p>
      </div>
    </div>
  )
}
