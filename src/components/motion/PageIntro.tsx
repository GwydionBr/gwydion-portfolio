import type { ReactNode } from 'react'
import { motionDurations } from './config'
import { Reveal } from './Reveal'
import { AnimatedAccentRule } from './AnimatedAccentRule'

interface PageIntroProps {
  eyebrow: ReactNode
  title: ReactNode
  ruleMargin?: number | string
  titleDelay?: number
  ruleDelay?: number
}

export function PageIntro({
  eyebrow,
  title,
  ruleMargin = 40,
  titleDelay = 0,
  ruleDelay = 0.25,
}: PageIntroProps) {
  return (
    <>
      <Reveal duration={motionDurations.slow} delay={titleDelay}>
        {eyebrow}
        {title}
      </Reveal>
      <AnimatedAccentRule my={ruleMargin} delay={ruleDelay} />
    </>
  )
}
