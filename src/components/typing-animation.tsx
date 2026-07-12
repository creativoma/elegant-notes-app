'use client'

import { motion, MotionProps } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { cn } from '@/src/lib/utils'

interface TypingAnimationProps extends MotionProps {
  children: string
  className?: string
  duration?: number
  delay?: number
  as?: React.ElementType
  startOnView?: boolean
}

const motionComponentCache = new Map<React.ElementType, any>()

function getMotionComponent(as: React.ElementType) {
  let MotionComponent = motionComponentCache.get(as)
  if (!MotionComponent) {
    MotionComponent = motion.create(as, { forwardMotionProps: true })
    motionComponentCache.set(as, MotionComponent)
  }
  return MotionComponent
}

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = 'div',
  startOnView = false,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = getMotionComponent(Component)

  const [displayedText, setDisplayedText] = useState<string>('')
  const [started, setStarted] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true)
      }, delay)
      return () => clearTimeout(startTimeout)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true)
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay, startOnView])

  useEffect(() => {
    if (!started) return

    let i = 0
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingEffect)
      }
    }, duration)

    return () => {
      clearInterval(typingEffect)
    }
  }, [children, duration, started])

  return (
    // eslint-disable-next-line react-hooks/static-components -- getMotionComponent caches by `as` so identity is stable across renders, unlike motion.create() called inline
    <MotionComponent
      ref={elementRef}
      className={cn(
        'text-4xl leading-20 font-bold tracking-[-0.02em]',
        className,
      )}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  )
}
