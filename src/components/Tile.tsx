import { Group, Paper, Title } from '@mantine/core'
import { useId, type ReactNode } from 'react'

const TILE_PADDING = { roomy: 'lg', snug: 'md', compact: 'sm' } as const

/**
 * A titled card: an Overview tile, a sidebar card or a card of a Project
 * page's rail. A region named by its title, so visitors (and tests) find it
 * by name; a navigation landmark of that name when `landmark` is `nav`.
 */
export function Tile({
  title,
  action,
  density = 'roomy',
  landmark = 'section',
  className,
  children,
}: {
  title: string
  landmark?: 'section' | 'nav'
  /** Shown beside the title, for example a "View all" link. */
  action?: ReactNode
  /**
   * `roomy` by default; `snug` has tighter padding, for the cards of a Project
   * page's rail; `compact` also has smaller text, for the sidebar.
   */
  density?: 'roomy' | 'snug' | 'compact'
  /** Placement only (grid span, margins), or a whole card as a link (LinkCard.module.css); never padding. */
  className?: string
  children: ReactNode
}) {
  const id = useId()
  return (
    <Paper
      component={landmark}
      p={TILE_PADDING[density]}
      fz={density === 'compact' ? 'xs' : undefined}
      lh={density === 'compact' ? 4 / 3 : undefined}
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
