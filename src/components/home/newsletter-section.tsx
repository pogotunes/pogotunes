'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, Send, Sparkles, CheckCircle } from 'lucide-react'

export function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-purple blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-coral blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="relative rounded-3xl p-8 sm:p-12 text-center backdrop-blur-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(108,99,255,0.08), rgba(255,107,107,0.05))',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #6C63FF, transparent)' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #FF6B6B, transparent)' }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple/30 to-coral/30 flex items-center justify-center mx-auto mb-6"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Mail size={28} className="text-purple" />
              </motion.div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2
                      className="text-3xl sm:text-4xl font-bold text-white mb-3"
                      style={{ fontFamily: 'var(--font-baloo)' }}
                    >
                      Stay in the Loop!
                    </h2>
                    <p className="text-white/50 mb-8 font-nunito">
                      Subscribe for learning tips, new lesson updates, and exclusive activities for your child
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-purple/50 focus:bg-white/10 transition-all font-nunito text-sm"
                            aria-label="Email for newsletter"
                          />
                          {error && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -bottom-6 left-0 text-xs text-coral font-nunito"
                            >
                              {error}
                            </motion.p>
                          )}
                        </div>
                        <motion.button
                          type="submit"
                          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple to-coral text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(108,99,255,0.3)] transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Subscribe
                          <Send size={16} />
                        </motion.button>
                      </div>
                    </form>

                    <p className="text-[10px] text-white/20 mt-6 font-nunito">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    >
                      <CheckCircle size={56} className="text-green mx-auto mb-4" />
                    </motion.div>
                    <h3
                      className="text-2xl font-bold text-white mb-2"
                      style={{ fontFamily: 'var(--font-baloo)' }}
                    >
                      You&apos;re In! 🎉
                    </h3>
                    <p className="text-white/50 font-nunito">
                      Thanks for subscribing! Check your inbox for a free learning pack.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
