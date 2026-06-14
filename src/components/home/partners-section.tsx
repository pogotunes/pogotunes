'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

const partners = [
  { name: 'UNICEF', color: '#1CABE2' },
  { name: 'BBC', color: '#FFD230' },
  { name: 'National Geographic', color: '#FFCC00' },
  { name: 'Sesame Street', color: '#E52521' },
  { name: 'Scholastic', color: '#E31837' },
  { name: 'PBS Kids', color: '#004B87' },
  { name: 'Disney', color: '#113CC2' },
  { name: 'NASA', color: '#0B3D91' },
]

export function PartnersSection() {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p
            className="text-sm uppercase tracking-widest text-white/30 font-semibold"
            style={{ fontFamily: 'var(--font-nunito)' }}
          >
            Trusted by leading organizations worldwide
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex gap-16 items-center flex-shrink-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-8 py-4 rounded-xl backdrop-blur-sm"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <span
                    className="text-lg sm:text-xl font-bold tracking-wide opacity-40 hover:opacity-70 transition-opacity duration-300"
                    style={{ color: partner.color, fontFamily: 'var(--font-baloo)' }}
                  >
                    {partner.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0f0f1a] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0f0f1a] to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  )
}
