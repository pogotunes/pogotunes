'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, staggerItem } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Play, Clock, Eye } from 'lucide-react'
import Link from 'next/link'
import type { Video } from '@/types'

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((res) => setVideos(res.data || []))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false))
  }, [])

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '~10 min'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return secs > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${mins} min`
  }

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-sky-blue/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-coral/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Breadcrumb
          items={[{ label: 'Videos' }]}
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
              Educational Videos
            </h1>
            <p className="text-lg text-white/60 font-nunito max-w-2xl mx-auto">
              Watch and learn with fun animated videos across all subjects.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden glass border border-white/10 animate-pulse"
                >
                  <div className="aspect-video bg-white/10" />
                  <div className="p-4 space-y-2">
                    <div className="h-5 w-3/4 bg-white/10 rounded" />
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-1/3 bg-white/10 rounded" />
                  </div>
                </div>
              ))
            ) : videos.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <Play className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/40 font-nunito text-lg">No videos available yet. Check back soon!</p>
              </div>
            ) : (
              videos.map((video) => (
                <Link key={video.id} href={`/videos/${video.slug}`}>
                  <motion.div variants={staggerItem}>
                    <Card variant="glass" className="h-full overflow-hidden p-0">
                      <div className="relative aspect-video bg-gradient-to-br from-sky-blue/40 to-purple/40 flex items-center justify-center group">
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover opacity-70"
                          />
                        ) : (
                          <Play className="w-12 h-12 text-white/40" />
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-white ml-0.5" />
                          </div>
                        </div>
                        {video.duration && (
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="white" size="sm">
                              <Clock className="w-3 h-3" />
                              {formatDuration(video.duration)}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <CardTitle className="text-white text-lg">{video.title}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {video.description || 'Watch and learn'}
                        </CardDescription>
                        <div className="mt-3 flex items-center gap-2">
                          {video.category && (
                            <Badge variant="sky" size="sm">
                              {video.category.name}
                            </Badge>
                          )}
                          <Badge variant="white" size="sm">
                            <Eye className="w-3 h-3" />
                            {video.viewCount || 0}
                          </Badge>
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
