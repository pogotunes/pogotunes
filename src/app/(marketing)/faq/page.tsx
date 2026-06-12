'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/animations'
import { Card, CardTitle } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'What is Pogo Tunes?',
    answer: 'Pogo Tunes is an interactive learning platform designed for kids. It combines music, games, and educational content to make learning fun and engaging. Our platform covers subjects like math, reading, science, and more through animated lessons and interactive activities.',
  },
  {
    question: 'Is Pogo Tunes free to use?',
    answer: 'We offer a free tier with access to basic lessons and features. Premium subscribers get unlimited access to all content, including advanced lessons, games, and exclusive features.',
  },
  {
    question: 'What age group is Pogo Tunes for?',
    answer: 'Pogo Tunes is designed for children aged 3 to 12. Our content is organized by age group and skill level, ensuring age-appropriate learning experiences for every child.',
  },
  {
    question: 'How do I create an account?',
    answer: 'Click the "Sign Up" button on the top right corner. You can register using an email address or sign in with Google, Facebook, or GitHub. Parents can create accounts for their children and monitor their progress.',
  },
  {
    question: 'Can I track my child\'s progress?',
    answer: 'Yes! Parents can view detailed progress reports including lessons completed, quiz scores, time spent learning, and areas where their child excels or needs improvement.',
  },
  {
    question: 'Is my child\'s data safe?',
    answer: 'Absolutely. We take privacy and security seriously. All data is encrypted, and we never share personal information with third parties. You can review our full privacy policy on our Privacy page.',
  },
  {
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the login page. Enter your email address, and we\'ll send you a password reset link. If you don\'t receive the email, check your spam folder.',
  },
  {
    question: 'Can I use Pogo Tunes offline?',
    answer: 'Currently, Pogo Tunes requires an internet connection. However, we are working on an offline mode for premium users that will allow downloading lessons for offline access.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel anytime from the Settings page. Your premium benefits will continue until the end of the current billing period.',
  },
  {
    question: 'I\'m having technical issues. What should I do?',
    answer: 'Try refreshing the page or clearing your browser cache. If the issue persists, contact our support team at hello@pogotunes.com and we\'ll help you out.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-yellow/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-coral/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h1 className="text-4xl md:text-5xl font-baloo font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
              Everything you need to know about Pogo Tunes. Can't find what you're looking for? Contact us!
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-3">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                variant="glass"
                hoverable={false}
                className={cn(
                  'p-0 overflow-hidden transition-all duration-300',
                  openIndex === index ? 'border-coral/30' : 'border-white/10'
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <CardTitle className="text-white text-base md:text-lg pr-4">
                    {faq.question}
                  </CardTitle>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                  >
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 border-t border-white/10">
                        <p className="text-white/60 font-nunito text-sm leading-relaxed mt-3">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
