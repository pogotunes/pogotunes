'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/animations'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Shield, Eye, Lock, KeyRound, UserX } from 'lucide-react'

const sections = [
  {
    icon: Shield,
    title: 'Data Collection',
    content: 'We collect minimal data needed to provide the learning experience: your name, email, and learning progress. We never sell your personal information to third parties.',
  },
  {
    icon: Eye,
    title: 'Cookies',
    content: 'We use essential cookies for authentication and session management. Analytics cookies help us improve the platform. You can control cookie preferences in your browser settings.',
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: 'Your data is encrypted in transit and at rest. We use industry-standard security practices including JWT tokens, bcrypt password hashing, and HTTPS connections.',
  },
  {
    icon: KeyRound,
    title: 'Your Rights',
    content: 'You can request access to your data, export it, or request deletion at any time. Contact us at privacy@pogotunes.com for data-related requests.',
  },
  {
    icon: UserX,
    title: 'Account Deletion',
    content: 'You can delete your account and all associated data at any time from the Settings page. Data is permanently removed within 30 days of deletion request.',
  },
]

export default function PrivacyPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}
      className="space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="text-2xl font-baloo font-bold text-white">Privacy & Security</h1>
        <p className="text-white/50 font-nunito text-sm mt-1">
          How we protect and manage your data
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
  )
}
