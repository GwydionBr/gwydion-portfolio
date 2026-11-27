import { Group, Paper, Title } from '@mantine/core'
import { useId, type ReactNode } from 'react'

/**
 * A titled card: an Overview tile or a sidebar card. A region named by its
 * title, so visitors (and tests) find it by name.
 */
export function Tile({
  title,
  action,
  compact = false,
  className,
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
      p={compact ? 'sm' : 'lg'}
      fz={compact ? 'xs' : undefined}
      lh={compact ? 4 / 3 : undefined}
      aria-labelledby={id}
      className={className}
    >
      <Group align="baseline" justify="space-between" gap="sm" wrap="nowrap">
        <Title order={2} id={id} fz="xs" fw={500} c="var(--subtle)">
          {title}
        </Title>
        {action}
      </Group>
      {children}
    </Paper>
  )
}
