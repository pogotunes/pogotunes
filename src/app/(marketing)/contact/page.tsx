'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/animations'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, name: formData.name, subject: formData.subject, message: formData.message }),
      })
      setSubmitted(true)
    } catch {
      // silently fail
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@pogotunes.com' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
  ]

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-coral/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-sky-blue/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h1 className="text-4xl md:text-5xl font-baloo font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you!
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactInfo.map((info) => {
              const Icon = info.icon
              return (
                <Card key={info.label} variant="glass" className="text-center p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral to-purple flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg mb-1">{info.label}</CardTitle>
                  <CardDescription>{info.value}</CardDescription>
                </Card>
              )
            })}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card variant="glass" className="max-w-2xl mx-auto p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green mx-auto mb-4" />
                  <CardTitle className="text-white text-2xl mb-2">Message Sent!</CardTitle>
                  <CardDescription className="text-base">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </CardDescription>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <CardTitle className="text-white text-2xl text-center">Send us a Message</CardTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      className="peer w-full rounded-2xl border-2 border-white/20 bg-white/10 px-4 py-3.5 font-nunito text-foreground placeholder:text-foreground/30 backdrop-blur-lg transition-all duration-300 focus:border-coral focus:bg-white/15 focus:outline-none focus:shadow-glow-coral min-h-[140px] resize-y pt-6 pb-2"
                    />
                    <label className="absolute left-4 top-4 font-nunito text-sm text-foreground/50 transition-all duration-300 pointer-events-none peer-focus:top-2 peer-focus:text-xs peer-focus:text-coral peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:peer-placeholder-shown:top-2 peer-focus:peer-placeholder-shown:text-xs">
                      Message
                    </label>
                  </div>
                  <Button
                    type="submit"
                    variant="coral"
                    size="lg"
                    fullWidth
                    loading={sending}
                    icon={<Send className="w-4 h-4" />}
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
