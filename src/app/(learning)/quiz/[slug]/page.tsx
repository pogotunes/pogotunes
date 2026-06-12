'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Brain, Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'
import { staggerContainer, fadeInUp, fadeInLeft } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { QuizTimer } from '@/components/quiz/quiz-timer'
import { MultipleChoice } from '@/components/quiz/multiple-choice'
import { TrueFalse } from '@/components/quiz/true-false'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const mockQuestions = [
  {
    id: 'q1',
    text: 'What is 2 + 3?',
    options: ['4', '5', '6', '7'],
    correctAnswer: '5',
    explanation: '2 + 3 equals 5. When you add two and three together, you get five!',
    points: 10,
    hint: 'Count on your fingers: 1, 2, then 3 more makes...',
  },
  {
    id: 'q2',
    text: 'The Earth is flat.',
    options: ['true', 'false'],
    correctAnswer: 'false',
    explanation: 'The Earth is actually round like a ball! Scientists have proven this with photos from space.',
    points: 10,
  },
  {
    id: 'q3',
    text: 'Which color do you get by mixing red and blue?',
    options: ['Green', 'Orange', 'Purple', 'Yellow'],
    correctAnswer: 'Purple',
    explanation: 'Red and blue make purple! It\'s one of the secondary colors.',
    points: 15,
  },
  {
    id: 'q4',
    text: 'Water freezes at 0 degrees Celsius.',
    options: ['true', 'false'],
    correctAnswer: 'true',
    explanation: 'Yes! Water turns into ice when it gets cold enough (0°C or 32°F).',
    points: 10,
  },
]

export default function QuizPage() {
  const params = useParams()
  const slug = params.slug as string
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  const question = mockQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === mockQuestions.length - 1
  const progress = ((currentQuestion + 1) / mockQuestions.length) * 100
  const score = Object.entries(answers).reduce((acc, [qId, answer]) => {
    const q = mockQuestions.find((mq) => mq.id === qId)
    return acc + (q?.correctAnswer === answer ? (q?.points ?? 10) : 0)
  }, 0)
  const maxScore = mockQuestions.reduce((acc, q) => acc + (q.points ?? 10), 0)

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true)
    } else {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const completedCount = Object.keys(answers).length
  const allAnswered = completedCount === mockQuestions.length

  const category = CATEGORIES[0]
  const accentColor = category?.color ?? '#6BCBFF'

  if (showResults || timeUp) {
    const percentage = Math.round((score / maxScore) * 100)
    const passed = percentage >= 60

    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="text-8xl mb-6"
          >
            {passed ? '🎉' : '💪'}
          </motion.div>
          <h2 className="text-3xl font-baloo font-bold text-white mb-2">
            {passed ? 'Great Job!' : 'Keep Trying!'}
          </h2>
          <p className="text-white/60 font-nunito mb-6">
            {passed
              ? 'You did an amazing job on this quiz!'
              : 'Don\'t give up! Practice makes perfect.'}
          </p>

          <Card variant="glass" className="p-6 mb-6">
            <div className="text-5xl font-baloo font-bold text-white mb-2">
              {score}/{maxScore}
            </div>
            <div className="text-white/50 font-nunito">{percentage}% correct</div>
            <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={cn(
                  'h-full rounded-full',
                  passed ? 'bg-gradient-to-r from-green to-green-light' : 'bg-gradient-to-r from-coral to-coral-light'
                )}
              />
            </div>
          </Card>

          <div className="flex items-center justify-center gap-3">
            <Link href={`/categories/${slug}`}>
              <Button variant="glass">Back to Category</Button>
            </Link>
            <Button
              variant="coral"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={() => {
                setCurrentQuestion(0)
                setAnswers({})
                setShowResults(false)
                setTimeUp(false)
              }}
            >
              Try Again
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${accentColor}15 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: accentColor }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <Breadcrumb
            items={[
              { label: 'Categories', href: '/categories' },
              { label: 'Quiz', href: `/categories/${slug}` },
              { label: 'Knowledge Challenge' },
            ]}
            className="mb-8"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
                  }}
                >
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-baloo font-bold text-white">Knowledge Challenge</h1>
                  <p className="text-sm text-white/50 font-nunito">
                    Question {currentQuestion + 1} of {mockQuestions.length}
                  </p>
                </div>
              </div>
              <QuizTimer
                duration={120}
                onTimeout={() => setTimeUp(true)}
                isPaused={false}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-coral to-yellow"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>

            <motion.div key={question.id} variants={fadeInLeft}>
              {question.options.length === 2 &&
               question.options[0] === 'true' &&
               question.options[1] === 'false' ? (
                <TrueFalse
                  question={question}
                  onAnswer={handleAnswer}
                  questionNumber={currentQuestion + 1}
                  totalQuestions={mockQuestions.length}
                />
              ) : (
                <MultipleChoice
                  question={question}
                  onAnswer={handleAnswer}
                  questionNumber={currentQuestion + 1}
                  totalQuestions={mockQuestions.length}
                  timeLimit={120}
                />
              )}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between"
            >
              <Button
                variant="glass"
                icon={<ChevronLeft className="w-4 h-4" />}
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>

              <Button
                variant={answers[question.id] ? 'coral' : 'glass'}
                icon={isLastQuestion ? <Sparkles className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={handleNext}
                disabled={!answers[question.id]}
              >
                {isLastQuestion ? 'Finish' : 'Next'}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
