'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Play, Clock, ArrowRight, Music } from 'lucide-react'
import type { Video } from '@/types'

const videoColors = ['#FF6B6B', '#FFD93D', '#6BCBFF', '#6C63FF', '#51CF66', '#FF6B6B']

function formatDuration(seconds?: number): string {
  if (!seconds) return '5:00'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function VideoCard({ title, category, duration, color, index, slug }: {
  title: string; category: string; duration: string; color: string; index: number; slug: string
}) {
  return (
    <Link href={`/videos/${slug}`}>
      <motion.div
        className="group cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
      >
        <div
          className="relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1"
          style={{
            background: `linear-gradient(135deg, ${color}08, ${color}02)`,
            border: `1px solid ${color}20`,
          }}
        >
          <div
            className="relative aspect-video flex items-center justify-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${color}20, ${color}05)` }}
          >
            <motion.div
              className="absolute inset-0 opacity-15"
              style={{ background: `radial-gradient(circle at 30% 30%, ${color}, transparent 70%)` }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Music size={48} style={{ color: `${color}80` }} />
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            >
              <motion.div
                className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.3)' }}
              >
                <Play size={24} className="text-white ml-0.5" />
              </motion.div>
            </motion.div>

            <span
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
              style={{
                background: `${color}30`,
                color,
                border: `1px solid ${color}40`,
              }}
            >
              {category}
            </span>

            <span className="absolute bottom-3 right-3 px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 glass">
              <Clock size={10} />
              {duration}
            </span>
          </div>

          <div className="p-3 sm:p-4">
            <h3
              className="font-bold text-white text-sm sm:text-base mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all line-clamp-1"
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              {title}
            </h3>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export function VideosSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    fetch('/api/videos')
      .then(r => r.json())
      .then(r => setVideos(r.data || []))
      .catch(() => setVideos([]))
  }, [])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-sky-blue blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold glass text-sky-blue mb-4">
              🎬 Video Library
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-baloo)' }}
            >
              Watch &{' '}
              <span className="bg-gradient-to-r from-sky-blue to-coral bg-clip-text text-transparent">
                Learn
              </span>
            </h2>
          </div>
          <Link
            href="/videos"
            className="hidden sm:flex items-center gap-2 text-white/40 hover:text-white transition-colors font-nunito"
          >
            View All <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {videos.slice(0, 6).map((video, i) => (
            <VideoCard
              key={video.id}
              title={video.title}
              category={(video as any).category?.name || 'General'}
              duration={formatDuration(video.duration)}
              color={videoColors[i % videoColors.length]}
              slug={video.slug}
              index={i}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 sm:hidden"
        >
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-white font-semibold"
          >
            View All Videos <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
