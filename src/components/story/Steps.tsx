import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { Timeline, type TimelineItemProps } from '@mantine/core'

/**
 * The steps of a flow, numbered in order and joined by a line
 * (`<Steps><Step title="Form">…</Step><Step title="Portal">…</Step></Steps>`).
 */
export function Steps({ children }: { children: ReactNode }) {
  const steps = Children.toArray(children).filter(
    (child): child is ReactElement<TimelineItemProps> => isValidElement(child),
  )
  return (
    // No step is "reached": the line stays quiet from first to last.
    <Timeline active={-1} mt="lg" mb="lg">
      {steps.map((step, index) => cloneElement(step, { bullet: index + 1 }))}
    </Timeline>
  )
}

/** One step of `<Steps>`: what happens (`title`) and, as its content, how. */
export const Step = Timeline.Item
