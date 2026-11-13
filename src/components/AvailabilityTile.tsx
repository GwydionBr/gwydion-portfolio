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
      <div className="mt-2.5">
        <AvailabilityPill headline={availability.headline} />
      </div>
      {availability.freelance && (
        <p className="mt-2.5 leading-relaxed text-muted">{availability.freelance}</p>
      )}
    </Tile>
  )
}
