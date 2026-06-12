import { Spinner } from '@/components/ui/spinner'

export default function LearningLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" color="coral" />
        <p className="mt-4 text-white/50 font-nunito text-sm">Loading content...</p>
      </div>
    </div>
  )
}
