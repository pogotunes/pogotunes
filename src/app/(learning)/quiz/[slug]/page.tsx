'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Brain, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { staggerContainer, fadeInUp, fadeInLeft } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { QuizTimer } from '@/components/quiz/quiz-timer'
import { MultipleChoice } from '@/components/quiz/multiple-choice'
import { TrueFalse } from '@/components/quiz/true-false'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: string
  explanation?: string
  points: number
  hint?: string
}

export default function QuizPage() {
  const params = useParams()
  const slug = params.slug as string
  const [questions, setQuestions] = useState<Question[]>([])
  const [quizTitle, setQuizTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    fetch(`/api/quizzes/${slug}`)
      .then((r) => r.json())
      .then((res) => {
        if (!res.success) {
          setError(res.error || 'Quiz not found')
          return
        }
        setQuizTitle(res.data.title || 'Knowledge Challenge')
        setQuestions(res.data.questions || [])
      })
      .catch(() => setError('Failed to load quiz'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" label="Loading quiz..." />
      </div>
    )
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">🧠</span>
        <h1 className="text-2xl font-baloo font-bold text-white">{error || 'Quiz not found'}</h1>
        <Link href="/quizzes">
          <Button variant="coral">Browse Quizzes</Button>
        </Link>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const score = Object.entries(answers).reduce((acc, [qId, answer]) => {
    const q = questions.find((mq) => mq.id === qId)
    return acc + (q?.correctAnswer === answer ? (q?.points ?? 10) : 0)
  }, 0)
  const maxScore = questions.reduce((acc, q) => acc + (q.points ?? 10), 0)

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
  const accentColor = '#6BCBFF'

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
            <Link href="/quizzes">
              <Button variant="glass">Back to Quizzes</Button>
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
              { label: 'Quizzes', href: '/quizzes' },
              { label: quizTitle },
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
                  <h1 className="text-xl font-baloo font-bold text-white">{quizTitle}</h1>
                  <p className="text-sm text-white/50 font-nunito">
                    Question {currentQuestion + 1} of {questions.length}
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
                  totalQuestions={questions.length}
                />
              ) : (
                <MultipleChoice
                  question={question}
                  onAnswer={handleAnswer}
                  questionNumber={currentQuestion + 1}
                  totalQuestions={questions.length}
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
