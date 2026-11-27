import { Box, Group } from '@mantine/core'
import classes from './AvailabilityPill.module.css'

/** The Availability headline as a green status pill. */
export function AvailabilityPill({ headline }: { headline: string }) {
  return (
    <Group
      component="p"
      gap={8}
      px="sm"
      py={4}
      fw={500}
      c="var(--available)"
      className={classes.pill}
      wrap="nowrap"
    >
      <Box component="span" aria-hidden w={6} h={6} className={classes.dot} />
      {headline}
    </Group>
  )
}
