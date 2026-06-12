'use client'

import { useState, useEffect } from 'react'

interface ScrollPosition {
  x: number
  y: number
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollPosition
}

export function useIsScrolled(threshold = 0): boolean {
  const { y } = useScrollPosition()
  return y > threshold
}

export function useScrollDirection(): 'up' | 'down' | 'static' {
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | 'static'>('static')

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const direction = currentScrollY > lastScrollY ? 'down' : 'up'
      if (direction !== scrollDir && Math.abs(currentScrollY - lastScrollY) > 10) {
        setScrollDir(direction)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollDir])

  return scrollDir
}
