import type { ReactNode } from 'react'
import { Paper, SimpleGrid, Text } from '@mantine/core'

/**
 * A row of number tiles: a Project's stats on its page, or numbers inside a
 * story (`<NumberTiles><NumberTile value="137" label="migrations" /></NumberTiles>`).
 */
export function NumberTiles({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <SimpleGrid
      component="ul"
      role="list"
      aria-label={label}
      cols={{ base: 2, xs: 3 }}
      spacing="sm"
      p={0}
      mb={0}
      style={{ listStyle: 'none' }}
    >
      {children}
    </SimpleGrid>
  )
}

/** One number and what it counts. */
export function NumberTile({ value, label }: { value: string; label: string }) {
  return (
    <Paper component="li" p="md" mt={0}>
      <Text
        fz={24}
        lh="2rem"
        fw={600}
        c="var(--ink)"
        m={0}
        lts="-0.025em"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </Text>
      <Text mt={4} size="xs" lh="1rem" c="var(--subtle)">
        {label}
      </Text>
    </Paper>
  )
}
