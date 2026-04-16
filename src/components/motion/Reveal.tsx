import type { CSSProperties, ReactNode } from 'react'
import { motion, useReducedMotion, type Transition } from 'motion/react'
import {
  createRevealTransition,
  createRevealVariants,
  motionViewport,
  type RevealPreset,
} from './config'

interface ViewportOptions {
  amount?: 'some' | 'all' | number
  margin?: string
  once?: boolean
}

interface RevealProps {
  children: ReactNode
  className?: string
  id?: string
  preset?: RevealPreset
  trigger?: 'mount' | 'inView'
  delay?: number
  duration?: number
  distance?: number
  style?: CSSProperties
  transition?: Transition
  viewport?: ViewportOptions
}

export function Reveal({
  children,
  preset = 'fade-up',
  trigger = 'mount',
  delay = 0,
  duration,
  distance = 24,
  transition,
  viewport,
  ...props
}: RevealProps) {
  const reducedMotion = Boolean(useReducedMotion())
  const variants = createRevealVariants(preset, reducedMotion, distance)
  const resolvedTransition = {
    ...createRevealTransition(duration, delay),
    ...transition,
  }

  return (
    <motion.div
      initial="hidden"
      variants={variants}
      animate={trigger === 'mount' ? 'visible' : undefined}
      whileInView={trigger === 'inView' ? 'visible' : undefined}
      viewport={trigger === 'inView' ? { ...motionViewport.card, ...viewport } : undefined}
      transition={resolvedTransition}
      {...props}
    >
      {children}
    </motion.div>
  )
}
