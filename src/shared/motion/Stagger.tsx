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

/** Elements a stagger group or item can render as, so lists keep valid markup. */
const motionTags = { div: motion.div, ol: motion.ol, ul: motion.ul, li: motion.li }
type MotionTag = keyof typeof motionTags

interface StaggerGroupProps {
  children: ReactNode
  as?: MotionTag
  className?: string
  'aria-label'?: string
  'aria-hidden'?: boolean
  id?: string
  style?: CSSProperties
  trigger?: 'mount' | 'inView'
  stagger?: number
  delayChildren?: number
  viewport?: ViewportOptions
}

interface StaggerItemProps {
  children: ReactNode
  as?: MotionTag
  className?: string
  'aria-label'?: string
  'aria-hidden'?: boolean
  id?: string
  style?: CSSProperties
  preset?: RevealPreset
  distance?: number
  duration?: number
  transition?: Transition
}

export function StaggerGroup({
  children,
  as = 'div',
  trigger = 'mount',
  stagger = 0.08,
  delayChildren = 0,
  viewport,
  ...props
}: StaggerGroupProps) {
  const reducedMotion = Boolean(useReducedMotion())
  const Component = motionTags[as]

  return (
    <Component
      initial="hidden"
      variants={createStaggerContainer(reducedMotion, stagger, delayChildren)}
      animate={trigger === 'mount' ? 'visible' : undefined}
      whileInView={trigger === 'inView' ? 'visible' : undefined}
      viewport={trigger === 'inView' ? { ...motionViewport.card, ...viewport } : undefined}
      {...props}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({
  children,
  as = 'div',
  preset = 'fade-up',
  distance = 24,
  duration = motionDurations.base,
  transition,
  ...props
}: StaggerItemProps) {
  const reducedMotion = Boolean(useReducedMotion())
  const Component = motionTags[as]

  return (
    <Component
      variants={createRevealVariants(preset, reducedMotion, distance)}
      transition={{
        ...createRevealTransition(duration),
        ...transition,
      }}
      {...props}
    >
      {children}
    </Component>
  )
}
