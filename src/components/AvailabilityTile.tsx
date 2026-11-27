import { Box, Text } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { useProfile } from '#/content/react'
import { AvailabilityPill } from './AvailabilityPill'
import { Tile } from './Tile'

/** Gwydion's Availability: the sidebar card on desktop, a Contact tile on phones. */
export function AvailabilityTile({
  compact,
  className,
}: {
  compact?: boolean
  className?: string
}) {
  const { t } = useLingui()
  const { availability } = useProfile()
  return (
    <Tile title={t`Availability`} compact={compact} className={className}>
      <Box mt={10}>
        <AvailabilityPill headline={availability.headline} />
      </Box>
      {availability.freelance && (
        <Text inherit mt={10} lh={1.625} c="var(--muted)">
          {availability.freelance}
        </Text>
      )}
    </Tile>
  )
}
