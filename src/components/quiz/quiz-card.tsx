"use client"

import { motion } from "framer-motion"
import {
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Timer,
  Star,
  Layers,
  Brain,
  Image as ImageIcon,
  Type,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Quiz, QuizType, Difficulty } from "@/types"

const typeIcons: Record<QuizType, typeof HelpCircle> = {
  MULTIPLE_CHOICE: HelpCircle,
  TRUE_FALSE: CheckCircle2,
  MATCH: Layers,
  FILL_BLANKS: Type,
  DRAG_DROP: Layers,
  MEMORY: Brain,
  IMAGE_QUIZ: ImageIcon,
  TIMED: Timer,
}

const difficultyColors: Record<Difficulty, string> = {
  BEGINNER: "bg-green/15 text-green border-green/30",
  EASY: "bg-sky-blue/15 text-sky-blue border-sky-blue/30",
  MEDIUM: "bg-yellow/15 text-yellow-dark border-yellow/30",
  HARD: "bg-coral/15 text-coral border-coral/30",
  EXPERT: "bg-purple/15 text-purple border-purple/30",
}

interface QuizCardProps {
  quiz: Quiz
  bestScore?: number
  onStart: (quiz: Quiz) => void
  className?: string
}

export function QuizCard({ quiz, bestScore, onStart, className }: QuizCardProps) {
  const Icon = typeIcons[quiz.type] || HelpCircle
  const diffClass = difficultyColors[quiz.difficulty] || difficultyColors.BEGINNER
  const questionCount = quiz.questions?.length || 0

  return (
    <motion.div
      className={cn("group glass-card relative overflow-hidden", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center",
              "bg-white/10 backdrop-blur-sm border border-white/10"
            )}
          >
            <Icon className="w-6 h-6 text-coral" />
          </div>
          <Badge variant="ghost" className={cn("font-semibold", diffClass)}>
            {quiz.difficulty}
          </Badge>
        </div>

        <h3 className="text-xl font-baloo font-bold mb-1.5 text-white group-hover:text-coral transition-colors">
          {quiz.title}
        </h3>

        {quiz.description && (
          <p className="text-sm text-white/60 font-nunito mb-4 line-clamp-2">
            {quiz.description}
          </p>
        )}

        <div className="flex items-center gap-4 mb-4 text-sm text-white/50 font-nunito">
          <span className="flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            {questionCount} questions
          </span>
          {quiz.timeLimit && (
            <span className="flex items-center gap-1.5">
              <Timer className="w-4 h-4" />
              {quiz.timeLimit}s
            </span>
          )}
        </div>

        {bestScore !== undefined && (
          <div className="flex items-center gap-1.5 mb-4 text-yellow">
            <Star className="w-4 h-4 fill-yellow" />
            <span className="text-sm font-nunito font-semibold">Best: {bestScore}%</span>
          </div>
        )}

        <motion.button
          onClick={() => onStart(quiz)}
          className={cn(
            "w-full py-2.5 rounded-xl font-nunito font-bold text-sm",
            "bg-gradient-to-r from-coral to-coral-dark text-white",
            "flex items-center justify-center gap-2",
            "shadow-lg shadow-coral/25"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          Start Quiz
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
