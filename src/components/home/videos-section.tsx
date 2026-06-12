'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Play, Clock, ArrowRight, Sparkles, Music, BookOpen, Palette, Globe } from 'lucide-react'

const videos = [
  {
    title: 'ABC Phonics Song', category: 'Phonics', duration: '5:30', icon: Music,
    color: '#FF6B6B', views: '1.2M',
  },
  {
    title: 'Count to 100 Song', category: 'Math', duration: '4:15', icon: BookOpen,
    color: '#FFD93D', views: '890K',
  },
  {
    title: 'Rainbow Colors', category: 'Art', duration: '3:45', icon: Palette,
    color: '#6BCBFF', views: '750K',
  },
  {
    title: 'Solar System Tour', category: 'Science', duration: '8:20', icon: Globe,
    color: '#6C63FF', views: '620K',
  },
  {
    title: 'Animal Sounds', category: 'GK', duration: '4:00', icon: Music,
    color: '#51CF66', views: '1.5M',
  },
  {
    title: 'Days of the Week', category: 'GK', duration: '2:50', icon: BookOpen,
    color: '#FF6B6B', views: '980K',
  },
]

function VideoCard({ title, category, duration, icon: Icon, color, views, index }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: string; category: string; duration: string; icon: React.ComponentType<any>
  color: string; views: string; index: number
}) {
  return (
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
            <Icon size={48} style={{ color: `${color}80` }} />
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
          <span className="text-[10px] text-white/30 font-nunito">{views} views</span>
        </div>
      </div>
    </motion.div>
  )
}

export function VideosSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
          {videos.map((video, i) => (
            <VideoCard key={video.title} {...video} index={i} />
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
