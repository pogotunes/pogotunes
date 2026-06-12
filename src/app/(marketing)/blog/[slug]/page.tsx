'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { Spinner } from '@/components/ui/spinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import type { Blog } from '@/types'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/blog/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true)
          return null
        }
        return res.json()
      })
      .then((res) => setPost(res?.data || null))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="coral" label="Loading post..." />
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-white/40 font-nunito text-lg">Post not found</p>
        <Link href="/blog">
          <Button variant="glass" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Blog
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-coral/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Breadcrumb
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
          className="mb-8"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <Link href="/blog">
            <motion.div variants={fadeInUp}>
              <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
                Back to Blog
              </Button>
            </motion.div>
          </Link>

          {post.image && (
            <motion.div variants={fadeInUp} className="rounded-2xl overflow-hidden glass border border-white/10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          )}

          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              {post.category && (
                <Badge variant="sky" size="md">{post.category}</Badge>
              )}
              {post.publishedAt && (
                <Badge variant="white" size="sm">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(new Date(post.publishedAt))}
                </Badge>
              )}
              {post.author && (
                <Badge variant="ghost" size="sm">
                  <User className="w-3.5 h-3.5" />
                  {post.author}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-baloo font-bold text-white">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-white/60 font-nunito leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-2">
                <Tag className="w-4 h-4 text-white/40" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="ghost" size="sm">{tag}</Badge>
                ))}
              </div>
            )}
          </motion.div>

          {post.content && (
            <motion.div
              variants={fadeInUp}
              className="glass rounded-2xl p-6 md:p-8 border border-white/10"
            >
              <div className="prose prose-invert max-w-none font-nunito text-white/70 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
