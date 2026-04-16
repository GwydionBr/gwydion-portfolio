import { AccentRule } from '../ui/Page'
import { motionDurations } from './config'
import { Reveal } from './Reveal'

interface AnimatedAccentRuleProps {
  my?: number | string
  delay?: number
}

export function AnimatedAccentRule({ my = 40, delay = 0.25 }: AnimatedAccentRuleProps) {
  return (
    <Reveal
      preset="line"
      duration={motionDurations.slow}
      delay={delay}
      style={{ transformOrigin: 'left' }}
    >
      <AccentRule my={my} />
    </Reveal>
  )
}
