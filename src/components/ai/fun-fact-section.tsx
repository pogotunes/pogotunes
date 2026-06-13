'use client'

import { motion } from 'framer-motion'
import { FunFactWidget } from './fun-fact'

export function FunFactSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]"
        style={{ background: 'radial-gradient(circle at 30% 80%, #FF6B6B, transparent 50%)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-coral/20 to-purple/20 text-coral border border-coral/20 mb-4">
            ✨ AI-Powered Fun
          </span>
          <h2 className="text-3xl sm:text-4xl font-baloo font-bold text-white mb-3">
            Play with <span className="bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">Pogo</span>
          </h2>
          <p className="text-white/50 font-nunito max-w-xl mx-auto">
            Pogo the fox has fun facts, jokes, stories, and riddles just for you!
          </p>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <FunFactWidget />
        </div>
      </div>
    </section>
  )
}
