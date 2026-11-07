import { useLingui } from '@lingui/react/macro'
import { useProfile } from '#/content/react'
import { Tile } from './Tile'

/** Gwydion's Availability: the sidebar card on desktop, an Overview tile on every screen. */
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
    <Tile title={t`Availability`} tone="available" compact={compact} className={className}>
      <p className="mt-2 flex items-center gap-2 font-medium text-available">
        <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-available" />
        {availability.headline}
      </p>
      {availability.freelance && <p className="mt-1 text-muted">{availability.freelance}</p>}
    </Tile>
  )
}
