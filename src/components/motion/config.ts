import type { Transition, Variants } from 'motion/react'

export const motionEase = [0.16, 1, 0.3, 1] as const

export const motionDurations = {
  fast: 0.45,
  base: 0.6,
  slow: 0.8,
  hero: 0.9,
} as const

export const motionViewport = {
  section: { once: true, margin: '-80px' },
  card: { once: true, margin: '-60px' },
  item: { once: true },
} as const

export type RevealPreset =
  | 'fade-in'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-in'
  | 'line'

export function createRevealTransition(duration: number = motionDurations.base, delay = 0): Transition {
  return {
    duration,
    delay,
    ease: motionEase,
  }
}

export function createRevealVariants(
  preset: RevealPreset,
  reducedMotion: boolean,
  distance = 24,
): Variants {
  switch (preset) {
    case 'fade-in':
      return {
        hidden: { opacity: reducedMotion ? 1 : 0 },
        visible: { opacity: 1 },
      }
    case 'fade-down':
      return {
        hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -distance },
        visible: { opacity: 1, y: 0 },
      }
    case 'fade-left':
      return {
        hidden: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -distance },
        visible: { opacity: 1, x: 0 },
      }
    case 'fade-right':
      return {
        hidden: { opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : distance },
        visible: { opacity: 1, x: 0 },
      }
    case 'scale-in':
      return {
        hidden: { opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0.96 },
        visible: { opacity: 1, scale: 1 },
      }
    case 'line':
      return {
        hidden: { opacity: reducedMotion ? 1 : 0, scaleX: reducedMotion ? 1 : 0 },
        visible: { opacity: 1, scaleX: 1 },
      }
    case 'fade-up':
    default:
      return {
        hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : distance },
        visible: { opacity: 1, y: 0 },
      }
  }
}

export function createStaggerContainer(
  reducedMotion: boolean,
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        ...(reducedMotion ? {} : { staggerChildren }),
      },
    },
  }
}
