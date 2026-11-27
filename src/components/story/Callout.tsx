import type { ReactNode } from 'react'
import { Paper, Text } from '@mantine/core'
/** A highlighted aside inside a story (`<Callout title="…">…</Callout>`). */
export function Callout({
  title,
  tone = 'note',
  children,
}: {
  title?: string
  tone?: 'note' | 'placeholder'
  children: ReactNode
}) {
  return (
    <Paper
      component="aside"
      mt="lg"
      p="md"
      bg={tone === 'note' ? 'var(--selected)' : undefined}
      className={tone === 'placeholder' ? 'stand-in' : undefined}
    >
      {title && (
        <Text m={0} fw={500} inherit c="var(--ink)">
          {title}
        </Text>
      )}
      <div>{children}</div>
    </Paper>
  )
}
