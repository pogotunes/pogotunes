"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  label: string
  completed?: boolean
  current?: boolean
}

interface StepProgressProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function StepProgress({
  steps,
  currentStep,
  className,
}: StepProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = step.completed || index < currentStep
          const isCurrent = step.current || index === currentStep

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center relative z-10">
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    "border-2 transition-colors duration-300",
                    isCompleted
                      ? "bg-green border-green"
                      : isCurrent
                      ? "bg-coral/20 border-coral"
                      : "bg-white/5 border-white/20"
                  )}
                  initial={false}
                  animate={{
                    scale: isCurrent ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-bold font-nunito",
                        isCurrent ? "text-coral" : "text-white/40"
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </motion.div>
                <span
                  className={cn(
                    "mt-2 text-xs font-nunito font-semibold text-center whitespace-nowrap",
                    isCompleted && "text-green",
                    isCurrent && "text-coral",
                    !isCompleted && !isCurrent && "text-white/40"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-3 relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full" />
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green to-green-light rounded-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: isCompleted ? "100%" : isCurrent ? "50%" : "0%",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
