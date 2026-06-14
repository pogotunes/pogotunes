"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface QuizTimerProps {
  duration: number
  onTimeout: () => void
  isPaused?: boolean
  className?: string
}

export function QuizTimer({ duration, onTimeout, isPaused, className }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isLow = timeLeft <= Math.ceil(duration * 0.2)

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          onTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, onTimeout])

  const progress = timeLeft / duration
  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference * (1 - progress)
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <svg width="130" height="130" className="transform -rotate-90">
        <circle
          cx="65"
          cy="65"
          r="54"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="6"
        />
        <motion.circle
          cx="65"
          cy="65"
          r="54"
          fill="none"
          stroke={isLow ? "#FF6B6B" : "#6BCBFF"}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={false}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "linear" }}
          className={cn(isLow && "drop-shadow-[0_0_8px_#FF6B6B]")}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <motion.span
          className={cn(
            "text-2xl font-baloo font-bold",
            isLow ? "text-coral" : "text-white"
          )}
          animate={isLow ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {minutes}:{seconds.toString().padStart(2, "0")}
        </motion.span>
        <span className="text-[10px] text-white/40 font-nunito">remaining</span>
      </div>
    </div>
  )
}
