import { Group, Paper, Text } from '@mantine/core'
import { useId, type ReactNode } from 'react'
import classes from './Tile.module.css'

/**
 * A titled card: an Overview tile or a sidebar card. A region named by its
 * title, so visitors (and tests) find it by name.
 */
export function Tile({
  title,
  action,
  compact = false,
  className = '',
  children,
}: {
  title: string
  /** Shown beside the title, for example a "View all" link. */
  action?: ReactNode
  /** Tighter padding and smaller text, for the sidebar. */
  compact?: boolean
  /** Placement only (grid span, margins); never colours or padding. */
  className?: string
  children: ReactNode
}) {
  const id = useId()
  return (
    <Paper
      component="section"
      radius="lg"
      p={compact ? 'sm' : 'lg'}
      fz={compact ? 'xs' : undefined}
      lh={compact ? 4 / 3 : undefined}
      aria-labelledby={id}
      className={`${classes.surface} ${className}`}
    >
      <Group align="baseline" justify="space-between" gap="sm" wrap="nowrap">
        <Text component="h2" id={id} size="xs" fw={500} c="var(--subtle)">
          {title}
        </Text>
        {action}
      </Group>
      {children}
    </Paper>
  )
}
