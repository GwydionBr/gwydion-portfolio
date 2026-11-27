import type { ReactNode } from 'react'
import { Badge, Box, type BadgeProps } from '@mantine/core'

/**
 * A state in a few words as a pill with a dot: green while `live` (Gwydion is
 * open to work, a Project is live), quiet otherwise. `component` names the
 * element it is, when it stands for a paragraph.
 */
export function StatusPill({
  live,
  size,
  component = 'span',
  children,
}: {
  live: boolean
  size?: BadgeProps['size']
  component?: 'span' | 'p'
  children: ReactNode
}) {
  return (
    <Badge
      component={component}
      color={live ? 'available' : undefined}
      size={size}
      radius="xl"
      m={0}
      leftSection={
        <Box
          component="span"
          aria-hidden
          w={6}
          h={6}
          bg={live ? 'var(--available)' : 'var(--subtle)'}
          style={{ borderRadius: '50%' }}
        />
      }
    >
      {children}
    </Badge>
  )
}
