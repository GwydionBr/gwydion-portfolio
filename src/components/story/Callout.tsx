import type { ReactNode } from 'react'
import { Paper, Text } from '@mantine/core'
import classes from './StoryBlocks.module.css'

const TONES = {
  note: classes.note,
  /** Marks text that stands in for content still to be written; dimmed. */
  placeholder: `${classes.surface} stand-in`,
}

/** A highlighted aside inside a story (`<Callout title="…">…</Callout>`). */
export function Callout({
  title,
  tone = 'note',
  children,
}: {
  title?: string
  tone?: keyof typeof TONES
  children: ReactNode
}) {
  return (
    <Paper component="aside" mt={24} p="md" radius="lg" className={TONES[tone]}>
      {title && (
        <Text fw={500} inherit c="var(--ink)">
          {title}
        </Text>
      )}
      <div className={classes.calloutBody}>{children}</div>
    </Paper>
  )
}
