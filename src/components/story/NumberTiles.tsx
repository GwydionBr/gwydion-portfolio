import type { ReactNode } from 'react'
import { Paper, SimpleGrid, Text } from '@mantine/core'
import classes from './StoryBlocks.module.css'

/**
 * A row of number tiles: a Project's stats on its page, or numbers inside a
 * story (`<NumberTiles><NumberTile value="137" label="migrations" /></NumberTiles>`).
 */
export function NumberTiles({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <SimpleGrid
      component="ul"
      aria-label={label}
      cols={{ base: 2, xs: 3 }}
      spacing="sm"
      className={classes.list}
    >
      {children}
    </SimpleGrid>
  )
}

/** One number and what it counts. */
export function NumberTile({ value, label }: { value: string; label: string }) {
  return (
    <Paper component="li" p="md" radius="lg" className={classes.surface}>
      <Text fz={24} lh="2rem" fw={600} c="var(--ink)" className={classes.value}>
        {value}
      </Text>
      <Text mt={4} size="xs" lh="1rem" c="var(--subtle)">
        {label}
      </Text>
    </Paper>
  )
}
