'use client'

import { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25 },
  },
}

const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35 },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.25 },
  },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35 },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
}

type AnimationVariant = 'fade' | 'slide' | 'scale'

interface PageWrapperProps {
  children: ReactNode
  className?: string
  animation?: AnimationVariant
}

const animationMap: Record<AnimationVariant, Variants> = {
  fade: variants,
  slide: slideFromRight,
  scale: scaleIn,
}

export function PageWrapper({
  children,
  className,
  animation = 'fade',
}: PageWrapperProps) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      variants={animationMap[animation]}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  )
}
