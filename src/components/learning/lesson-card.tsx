"use client"

import { motion } from "framer-motion"
import {
  Clock,
  Play,
  Star,
  BookOpen,
  Volume2,
  Gamepad2,
  Brain,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { staggerItem } from "@/animations"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import type { Lesson, Difficulty } from "@/types"

interface LessonCardProps {
  lesson: Lesson
  progress?: number
  onStart?: (slug: string) => void
  className?: string
}

const difficultyStars: Record<Difficulty, number> = {
  BEGINNER: 1,
  EASY: 2,
  MEDIUM: 3,
  HARD: 4,
  EXPERT: 5,
}

const difficultyLabels: Record<Difficulty, string> = {
  BEGINNER: "Beginner",
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
  EXPERT: "Expert",
}

const typeIcons: Record<string, typeof Play> = {
  VIDEO: Play,
  ARTICLE: BookOpen,
  QUIZ: Brain,
  GAME: Gamepad2,
  FLASHCARD: Sparkles,
  PRACTICE: Volume2,
}

const typeColors: Record<string, string> = {
  VIDEO: "sky",
  ARTICLE: "purple",
  QUIZ: "yellow",
  GAME: "green",
  FLASHCARD: "coral",
  PRACTICE: "sky",
}

const colorHexMap: Record<string, string> = {
  coral: "#FF6B6B",
  yellow: "#FFD93D",
  sky: "#6BCBFF",
  purple: "#6C63FF",
  green: "#51CF66",
}

export function LessonCard({
  lesson,
  progress,
  onStart,
  className,
}: LessonCardProps) {
  const TypeIcon = typeIcons[lesson.type] || BookOpen
  const badgeVariant = (typeColors[lesson.type] || "coral") as
    | "coral"
    | "yellow"
    | "sky"
    | "purple"
    | "green"
  const accentColor = colorHexMap[badgeVariant] || "#FF6B6B"
  const stars = difficultyStars[lesson.difficulty]
  const hasProgress = progress !== undefined && progress > 0 && progress < 100
  const isComplete = progress === 100

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "glass border border-white/10",
        "transition-all duration-500",
        className
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative h-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br opacity-80"
          style={{
            background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
          }}
        />
        {lesson.image && (
          <img
            src={lesson.image}
            alt={lesson.title}
            className="w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-3 left-3">
          <Badge variant={badgeVariant} size="sm">
            <TypeIcon className="w-3 h-3" />
            {lesson.type}
          </Badge>
        </div>

        <div className="absolute top-3 right-3 flex gap-1">
          {Array.from({ length: stars }).map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 fill-yellow text-yellow"
            />
          ))}
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3
            className="text-lg font-baloo font-bold text-white drop-shadow-lg"
            style={{ fontFamily: "var(--font-baloo)" }}
          >
            {lesson.title}
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {lesson.description && (
          <p className="text-sm font-nunito text-white/60 line-clamp-2">
            {lesson.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs font-nunito text-white/50">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {lesson.duration
                ? `${Math.floor(lesson.duration / 60)} min`
                : "~10 min"}
            </span>
          </div>
          <span>{difficultyLabels[lesson.difficulty]}</span>
        </div>

        {isComplete && (
          <div className="flex items-center gap-1.5 text-green font-semibold text-sm font-nunito">
            <Sparkles className="w-4 h-4" />
            Completed
          </div>
        )}

        {hasProgress && (
          <Progress
            value={progress || 0}
            size="sm"
            showPercentage
            variant={badgeVariant}
          />
        )}

        <Button
          variant={isComplete ? "glass" : "coral"}
          size="sm"
          fullWidth
          icon={isComplete ? <BookOpen className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          onClick={() => onStart?.(lesson.slug)}
        >
          {isComplete ? "Review" : hasProgress ? "Continue" : "Start"}
        </Button>
      </div>
    </motion.div>
  )
}
