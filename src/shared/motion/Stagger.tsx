import type { CSSProperties, ReactNode } from 'react'
import { motion, useReducedMotion, type Transition } from 'motion/react'
import {
  createRevealTransition,
  createRevealVariants,
  createStaggerContainer,
  motionDurations,
  motionViewport,
  type RevealPreset,
} from './config'

interface ViewportOptions {
  amount?: 'some' | 'all' | number
  margin?: string
  once?: boolean
}

interface StaggerGroupProps {
  children: ReactNode
  className?: string
  id?: string
  style?: CSSProperties
  trigger?: 'mount' | 'inView'
  stagger?: number
  delayChildren?: number
  viewport?: ViewportOptions
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  id?: string
  style?: CSSProperties
  preset?: RevealPreset
  distance?: number
  duration?: number
  transition?: Transition
}

export function StaggerGroup({
  children,
  trigger = 'mount',
  stagger = 0.08,
  delayChildren = 0,
  viewport,
  ...props
}: StaggerGroupProps) {
  const reducedMotion = Boolean(useReducedMotion())

  return (
    <motion.div
      initial="hidden"
      variants={createStaggerContainer(reducedMotion, stagger, delayChildren)}
      animate={trigger === 'mount' ? 'visible' : undefined}
      whileInView={trigger === 'inView' ? 'visible' : undefined}
      viewport={trigger === 'inView' ? { ...motionViewport.card, ...viewport } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  preset = 'fade-up',
  distance = 24,
  duration = motionDurations.base,
  transition,
  ...props
}: StaggerItemProps) {
  const reducedMotion = Boolean(useReducedMotion())

  return (
    <motion.div
      variants={createRevealVariants(preset, reducedMotion, distance)}
      transition={{
        ...createRevealTransition(duration),
        ...transition,
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
