'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { FileText, Globe, CreditCard, Ban, AlertTriangle, Gavel } from 'lucide-react'

const sections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    content: 'By accessing or using Pogo Tunes, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our service.',
  },
  {
    icon: Globe,
    title: 'Use of Service',
    content: 'You agree to use Pogo Tunes for lawful purposes only. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.',
  },
  {
    icon: CreditCard,
    title: 'Subscriptions & Billing',
    content: 'Premium subscriptions are billed monthly or annually as selected. You may cancel at any time. Refunds are provided on a case-by-case basis. Prices are subject to change with 30 days notice.',
  },
  {
    icon: Ban,
    title: 'Prohibited Activities',
    content: 'You may not use the service for any illegal activity, attempt to hack or disrupt the platform, create multiple free accounts, or share premium access with unauthorized users.',
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: 'Pogo Tunes is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform, to the fullest extent permitted by law.',
  },
  {
    icon: Gavel,
    title: 'Changes to Terms',
    content: 'We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Continued use after changes constitutes acceptance of the new terms.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-coral/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-yellow/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="space-y-6"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h1 className="text-4xl md:text-5xl font-baloo font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
              Please read these terms carefully before using Pogo Tunes.
            </p>
          </motion.div>

          {sections.map((section) => {
            const Icon = section.icon
            return (
              <motion.div key={section.title} variants={fadeInUp}>
                <Card variant="glass" className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-coral to-purple flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/60 font-nunito text-sm leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}

          <motion.div variants={fadeInUp} className="text-center pt-4 pb-8">
            <p className="text-white/30 text-sm font-nunito">
              Last updated: June 2026
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
