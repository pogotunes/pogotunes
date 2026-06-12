'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Video, ThumbsUp, MessageCircle, Bookmark, Share2, List, Grid } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'
import { staggerContainer, fadeInUp, staggerItem } from '@/animations'
import { Breadcrumb } from '@/components/learning/breadcrumb'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const mockVideo = {
  title: 'Counting 1 to 10',
  description: 'Join our friendly characters as they teach you to count from 1 to 10 with songs, animations, and interactive fun!',
  views: 15420,
  likes: 892,
  duration: '5:30',
  thumbnail: null,
}

const relatedVideos = Array.from({ length: 6 }, (_, i) => ({
  id: `video-${i + 1}`,
  title: [
    'Learn the Alphabet Song',
    'Shapes Around Us',
    'Colors of the Rainbow',
    'Animal Sounds for Kids',
    'Days of the Week Song',
    'Weather and Seasons',
  ][i],
  slug: `video-${i + 1}`,
  views: Math.floor(Math.random() * 20000),
  duration: `${Math.floor(Math.random() * 8) + 2}:00`,
}))

export default function VideoPage() {
  const params = useParams()
  const slug = params.slug as string
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const category = CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0]
  const accentColor = category?.color ?? '#6BCBFF'

  return (
    <div className="min-h-screen">
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${accentColor}15 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: accentColor }} />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: accentColor }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <Breadcrumb
            items={[
              { label: 'Categories', href: '/categories' },
              { label: 'Videos', href: '/videos' },
              { label: mockVideo.title },
            ]}
            className="mb-8"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <div className="relative rounded-2xl overflow-hidden glass border border-white/10 mb-6">
                <div
                  className="w-full aspect-video flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer border-2 border-white/30"
                  >
                    <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-t-transparent border-b-transparent border-l-white ml-1" />
                  </motion.div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl font-baloo font-bold text-white mb-2">
                        {mockVideo.title}
                      </h1>
                      <div className="flex items-center gap-3 text-sm text-white/50 font-nunito">
                        <span>{mockVideo.views.toLocaleString()} views</span>
                        <span>{mockVideo.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="glass"
                        size="sm"
                        icon={<ThumbsUp className={cn('w-4 h-4', isLiked && 'fill-coral text-coral')} />}
                        onClick={() => setIsLiked(!isLiked)}
                      >
                        {mockVideo.likes + (isLiked ? 1 : 0)}
                      </Button>
                      <Button variant="glass" size="sm" icon={<Share2 className="w-4 h-4" />} />
                      <Button
                        variant="glass"
                        size="sm"
                        icon={<Bookmark className={cn('w-4 h-4', isBookmarked && 'fill-yellow text-yellow')} />}
                        onClick={() => setIsBookmarked(!isBookmarked)}
                      />
                    </div>
                  </div>

                  <p className="mt-4 text-white/60 font-nunito leading-relaxed">
                    {mockVideo.description}
                  </p>

                  <Separator className="my-4" />

                  <div className="flex items-center gap-2 text-sm text-white/40 font-nunito">
                    <MessageCircle className="w-4 h-4" />
                    <span>Comments (0)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-baloo font-bold text-white">Related Videos</h2>
                <div className="flex items-center gap-1 glass rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'p-2 rounded-md transition-all',
                      viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                    )}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'p-2 rounded-md transition-all',
                      viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                className={cn(
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                    : 'space-y-3'
                )}
              >
                {relatedVideos.map((video) => (
                  <motion.div
                    key={video.id}
                    variants={staggerItem}
                    className={cn(
                      'group cursor-pointer rounded-2xl overflow-hidden glass border border-white/10 transition-all duration-300 hover:border-white/20',
                      viewMode === 'list' && 'flex items-center gap-4 p-3'
                    )}
                    whileHover={{ y: viewMode === 'grid' ? -4 : 0 }}
                  >
                    <div
                      className={cn(
                        'relative flex items-center justify-center',
                        viewMode === 'grid' ? 'w-full aspect-video' : 'w-40 h-24 shrink-0 rounded-xl overflow-hidden'
                      )}
                      style={{
                        background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`,
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-t-transparent border-b-transparent border-l-white ml-1" />
                      </div>
                      <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded font-nunito">
                        {video.duration}
                      </span>
                    </div>
                    <div className={cn('p-3', viewMode === 'list' && 'p-0 flex-1 min-w-0')}>
                      <h3 className="text-sm font-baloo font-bold text-white group-hover:text-white/80 transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-white/40 font-nunito mt-1">
                        {video.views.toLocaleString()} views
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
