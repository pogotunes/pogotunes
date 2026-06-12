"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Calculator,
  BookOpen,
  FlaskConical,
  Book,
  Pencil,
  Type,
  BookMarked,
  PencilLine,
  Languages,
  Globe,
  Landmark,
  Palette,
  Music,
  Code,
  Puzzle,
  Brain,
  Shapes,
  Hash,
  Sigma,
  PawPrint,
  TreeDeciduous,
  Rocket,
  Heart,
  Apple,
  Users,
  Smile,
  Sparkles,
  Globe2,
  Leaf,
  Monitor,
  Lightbulb,
  Target,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { staggerItem } from "@/animations"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CATEGORIES } from "@/lib/constants"

interface CategoryCardProps {
  category: (typeof CATEGORIES)[number]
  progress?: number
  lessonCount?: number
  className?: string
}

const iconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  "book-open": BookOpen,
  flask: FlaskConical,
  book: Book,
  edit: Pencil,
  type: Type,
  "book-marked": BookMarked,
  "pencil-line": PencilLine,
  languages: Languages,
  globe: Globe,
  landmark: Landmark,
  palette: Palette,
  music: Music,
  code: Code,
  puzzle: Puzzle,
  brain: Brain,
  shapes: Shapes,
  hash: Hash,
  sigma: Sigma,
  "paw-print": PawPrint,
  tree: TreeDeciduous,
  rocket: Rocket,
  heart: Heart,
  apple: Apple,
  users: Users,
  smile: Smile,
  sparkles: Sparkles,
  "globe-2": Globe2,
  leaf: Leaf,
  monitor: Monitor,
  lightbulb: Lightbulb,
  target: Target,
}

const colorMap: Record<string, string> = {
  coral: "from-coral to-coral-light",
  yellow: "from-yellow to-yellow-light",
  sky: "from-sky-blue to-sky-blue-light",
  purple: "from-purple to-purple-light",
  green: "from-green to-green-light",
}

function getGradientClass(color: string): string {
  const key = Object.keys(colorMap).find((k) => color.toLowerCase().includes(k))
  return key ? colorMap[key] : "from-coral to-purple"
}

export function CategoryCard({
  category,
  progress,
  lessonCount = 12,
  className,
}: CategoryCardProps) {
  const Icon = iconMap[category.icon] || BookOpen

  return (
    <motion.div
      variants={staggerItem}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 cursor-pointer",
        "glass border border-white/10",
        "transition-all duration-500",
        className
      )}
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${category.color}15, transparent 40%)`,
        }}
      />

      <div className="relative z-10">
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
            `bg-gradient-to-br ${getGradientClass(category.color)}`,
            "shadow-lg"
          )}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        <h3
          className="text-xl font-baloo font-bold mb-1 text-white"
          style={{ fontFamily: "var(--font-baloo)" }}
        >
          {category.name}
        </h3>

        <div className="flex items-center gap-2 mt-3">
          <Badge variant="white" size="sm">
            {lessonCount} lessons
          </Badge>
        </div>

        {progress !== undefined && progress > 0 && (
          <div className="mt-4">
            <Progress
              value={progress}
              max={100}
              size="sm"
              showPercentage
              variant={
                category.color === "#FF6B6B"
                  ? "coral"
                  : category.color === "#6BCBFF"
                  ? "sky"
                  : category.color === "#6C63FF"
                  ? "purple"
                  : category.color === "#51CF66"
                  ? "green"
                  : "yellow"
              }
            />
          </div>
        )}

        {(!progress || progress === 0) && (
          <div className="mt-4 flex items-center gap-2 text-sm text-white/50 font-nunito">
            <Sparkles className="w-4 h-4" />
            Start learning
          </div>
        )}
      </div>
    </motion.div>
  )
}
