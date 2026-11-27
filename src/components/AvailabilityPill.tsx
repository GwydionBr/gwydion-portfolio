import { Badge, Box } from '@mantine/core'

/** The Availability headline as a green status pill. */
export function AvailabilityPill({ headline }: { headline: string }) {
  return (
    <Badge
      component="p"
      color="available"
      size="lg"
      radius="xl"
      m={0}
      leftSection={
        <Box
          component="span"
          aria-hidden
          w={6}
          h={6}
          bg="var(--available)"
          style={{ borderRadius: '50%' }}
        />
      }
    >
      {headline}
    </Badge>
  )
}
