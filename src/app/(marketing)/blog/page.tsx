'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, staggerItem } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import type { Blog } from '@/types'

export default function BlogPage() {
  const [posts, setPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((res) => setPosts(res.data?.data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-coral/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Blog' }]}
          className="mb-8"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h1 className="text-4xl md:text-5xl font-baloo font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
              Tips, guides, and stories to help you learn and grow with Pogo Tunes.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              <div className="col-span-full flex justify-center py-20">
                <Spinner size="lg" color="coral" label="Loading posts..." />
              </div>
            ) : posts.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-white/40 font-nunito text-lg">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <motion.div variants={staggerItem} className="h-full">
                    <Card variant="glass" className="h-full flex flex-col p-0 overflow-hidden">
                      <div className="relative aspect-video bg-gradient-to-br from-coral/30 to-purple/30 flex items-center justify-center">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-coral/20 to-purple/20 flex items-center justify-center">
                            <Tag className="w-12 h-12 text-white/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {post.category && (
                            <Badge variant="sky" size="sm">{post.category}</Badge>
                          )}
                          {post.publishedAt && (
                            <Badge variant="white" size="sm">
                              <Calendar className="w-3 h-3" />
                              {formatDate(new Date(post.publishedAt))}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-white text-lg mb-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="flex-1 line-clamp-3">
                          {post.excerpt || ''}
                        </CardDescription>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-4 flex-wrap">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="ghost" size="sm">{tag}</Badge>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                          <span className="text-sm text-white/40 font-nunito">
                            {post.author || 'Pogo Tunes'}
                          </span>
                          <span className="text-sm text-coral font-nunito font-semibold flex items-center gap-1">
                            Read more <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
