"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, ThumbsUp, ThumbsDown, Award } from "lucide-react"

interface TrueFalseProps {
  question: {
    id: string
    text: string
    image?: string
    options: string[]
    correctAnswer: string
    points: number
    explanation?: string
  }
  onAnswer: (questionId: string, answer: string) => void
  questionNumber: number
  totalQuestions: number
}

export function TrueFalse({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
}: TrueFalseProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const isCorrect = selected === question.correctAnswer

  const handleSelect = useCallback(
    (value: string) => {
      if (showResult) return
      setSelected(value)
      setShowResult(true)
      setTimeout(() => {
        onAnswer(question.id, value)
      }, 2000)
    },
    [showResult, question.id, onAnswer]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "t" || e.key === "T") handleSelect("True")
      if (e.key === "f" || e.key === "F") handleSelect("False")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleSelect])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(null)
    setShowResult(false)
  }, [question.id])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="sky" size="lg">
          Question {questionNumber} of {totalQuestions}
        </Badge>
      </div>

      <motion.div
        key={question.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 space-y-6 text-center"
      >
        {question.image && (
          <motion.img
            src={question.image}
            alt=""
            className="w-full h-40 object-cover rounded-xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          />
        )}

        <h3 className="text-2xl font-baloo font-bold text-white">{question.text}</h3>

        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={() => handleSelect("True")}
            disabled={showResult}
            className={cn(
              "flex flex-col items-center gap-3 p-8 rounded-2xl min-w-[160px] transition-all",
              "border-2 font-nunito font-bold text-lg",
              showResult && selected === "True" && isCorrect
                ? "bg-green/20 border-green shadow-lg shadow-green/10"
                : showResult && selected === "True" && !isCorrect
                  ? "bg-coral/20 border-coral shadow-lg shadow-coral/10"
                  : showResult
                    ? "bg-white/5 border-white/5 opacity-50"
                    : "glass border-white/10 hover:border-green/50 hover:shadow-lg hover:shadow-green/10"
            )}
            whileHover={!showResult ? { scale: 1.05 } : {}}
            whileTap={!showResult ? { scale: 0.95 } : {}}
          >
            {showResult && selected === "True" && isCorrect ? (
              <CheckCircle2 className="w-12 h-12 text-green" />
            ) : showResult && selected === "True" && !isCorrect ? (
              <XCircle className="w-12 h-12 text-coral" />
            ) : (
              <ThumbsUp className="w-12 h-12 text-green" />
            )}
            <span className={cn(
              "text-xl",
              showResult && selected === "True" && isCorrect && "text-green",
              showResult && selected === "True" && !isCorrect && "text-coral",
              !showResult && "text-white"
            )}>
              True
            </span>
            <span className="text-xs text-white/40 font-normal">(Press T)</span>
          </motion.button>

          <motion.button
            onClick={() => handleSelect("False")}
            disabled={showResult}
            className={cn(
              "flex flex-col items-center gap-3 p-8 rounded-2xl min-w-[160px] transition-all",
              "border-2 font-nunito font-bold text-lg",
              showResult && selected === "False" && isCorrect
                ? "bg-green/20 border-green shadow-lg shadow-green/10"
                : showResult && selected === "False" && !isCorrect
                  ? "bg-coral/20 border-coral shadow-lg shadow-coral/10"
                  : showResult
                    ? "bg-white/5 border-white/5 opacity-50"
                    : "glass border-white/10 hover:border-coral/50 hover:shadow-lg hover:shadow-coral/10"
            )}
            whileHover={!showResult ? { scale: 1.05 } : {}}
            whileTap={!showResult ? { scale: 0.95 } : {}}
          >
            {showResult && selected === "False" && isCorrect ? (
              <CheckCircle2 className="w-12 h-12 text-green" />
            ) : showResult && selected === "False" && !isCorrect ? (
              <XCircle className="w-12 h-12 text-coral" />
            ) : (
              <ThumbsDown className="w-12 h-12 text-coral" />
            )}
            <span className={cn(
              "text-xl",
              showResult && selected === "False" && isCorrect && "text-green",
              showResult && selected === "False" && !isCorrect && "text-coral",
              !showResult && "text-white"
            )}>
              False
            </span>
            <span className="text-xs text-white/40 font-normal">(Press F)</span>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "glass-card border-2 text-center",
              isCorrect ? "border-green/50" : "border-coral/50"
            )}
          >
            {isCorrect ? (
              <div className="flex items-center justify-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green" />
                <span className="text-lg font-baloo font-bold text-green">Correct!</span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-yellow font-nunito font-bold"
                >
                  <Award className="w-4 h-4" />+{question.points}
                </motion.span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <XCircle className="w-8 h-8 text-coral" />
                <span className="text-lg font-baloo font-bold text-coral">Incorrect</span>
              </div>
            )}
            {question.explanation && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-sm text-white/70 font-nunito pt-3 border-t border-white/10"
              >
                {question.explanation}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
