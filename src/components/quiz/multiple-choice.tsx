"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { QuizTimer } from "./quiz-timer"
import { CheckCircle2, XCircle, Lightbulb, Award } from "lucide-react"

interface MultipleChoiceProps {
  question: {
    id: string
    text: string
    image?: string
    options: string[]
    correctAnswer: string
    points: number
    hint?: string
    explanation?: string
  }
  onAnswer: (questionId: string, answer: string) => void
  questionNumber: number
  totalQuestions: number
  timeLimit?: number
}

const optionLabels = ["A", "B", "C", "D"]

export function MultipleChoice({
  question,
  onAnswer,
  questionNumber,
  totalQuestions,
  timeLimit,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [pointsEarned, setPointsEarned] = useState(0)

  const isCorrect = selected === question.correctAnswer

  const handleSelect = useCallback(
    (option: string) => {
      if (showResult) return
      setSelected(option)
      setShowResult(true)
      const correct = option === question.correctAnswer
      setPointsEarned(correct ? question.points : 0)
      setTimeout(() => {
        setShowExplanation(true)
      }, 1200)
      setTimeout(() => {
        onAnswer(question.id, option)
      }, 2500)
    },
    [showResult, question, onAnswer]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = parseInt(e.key)
      if (key >= 1 && key <= 4 && question.options[key - 1]) {
        handleSelect(question.options[key - 1])
      }
      if (e.key === "h" || e.key === "H") {
        setShowHint(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleSelect, question.options])

  useEffect(() => {
    setSelected(null)
    setShowResult(false)
    setShowHint(false)
    setShowExplanation(false)
    setPointsEarned(0)
  }, [question.id])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="sky" size="lg">
          Question {questionNumber} of {totalQuestions}
        </Badge>
        {timeLimit && (
          <QuizTimer duration={timeLimit} onTimeout={() => handleSelect("")} />
        )}
      </div>

      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 space-y-4"
      >
        {question.image && (
          <motion.img
            src={question.image}
            alt=""
            className="w-full h-48 object-cover rounded-xl mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
        )}

        <h3 className="text-xl font-baloo font-bold text-white">{question.text}</h3>

        <AnimatePresence>
          {showHint && question.hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-2 p-3 rounded-xl bg-yellow/10 border border-yellow/20 text-yellow text-sm font-nunito"
            >
              <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
              {question.hint}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, idx) => {
            let optionClass =
              "glass border border-white/10 hover:border-white/30"
            if (showResult) {
              if (option === question.correctAnswer) {
                optionClass = "bg-green/20 border-green shadow-lg shadow-green/10"
              } else if (option === selected && !isCorrect) {
                optionClass = "bg-coral/20 border-coral shadow-lg shadow-coral/10"
              } else {
                optionClass = "bg-white/5 border-white/5 opacity-50"
              }
            }

            return (
              <motion.button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={showResult}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 font-nunito",
                  optionClass
                )}
                whileHover={!showResult ? { scale: 1.02, x: 4 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <span
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
                    showResult && option === question.correctAnswer
                      ? "bg-green text-white"
                      : showResult && option === selected && !isCorrect
                        ? "bg-coral text-white"
                        : "bg-white/10 text-white/70"
                  )}
                >
                  {showResult && option === question.correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : showResult && option === selected && !isCorrect ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    optionLabels[idx]
                  )}
                </span>
                <span className="text-white/90 font-semibold">{option}</span>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "glass-card border-2 text-center",
              isCorrect
                ? "border-green/50 shadow-lg shadow-green/10"
                : "border-coral/50 shadow-lg shadow-coral/10"
            )}
          >
            {isCorrect ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle2 className="w-10 h-10 text-green" />
                <p className="text-lg font-baloo font-bold text-green">Correct!</p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 text-yellow font-nunito font-bold"
                >
                  <Award className="w-5 h-5" />
                  +{pointsEarned} points
                </motion.div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <XCircle className="w-10 h-10 text-coral" />
                <p className="text-lg font-baloo font-bold text-coral">Incorrect</p>
                <p className="text-sm text-white/60 font-nunito">
                  The correct answer was:{" "}
                  <span className="text-green font-bold">{question.correctAnswer}</span>
                </p>
              </div>
            )}
            {showExplanation && question.explanation && (
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

      {!showHint && question.hint && !showResult && (
        <motion.button
          onClick={() => setShowHint(true)}
          className="flex items-center gap-2 text-sm text-yellow/70 hover:text-yellow font-nunito font-semibold mx-auto"
          whileHover={{ scale: 1.05 }}
        >
          <Lightbulb className="w-4 h-4" />
          Show Hint (press H)
        </motion.button>
      )}
    </div>
  )
}
