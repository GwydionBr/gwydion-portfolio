import { useLingui } from '@lingui/react/macro'
import { useProfile } from '#/content/react'
import { AvailabilityPill } from './AvailabilityPill'
import { CvDownload } from './CvDownload'
import { Tile } from './Tile'

/** Gwydion's Availability and the CV download: the sidebar card on desktop, a Contact tile on phones. */
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
      <CvDownload className="mt-3 w-full" />
    </Tile>
  )
}
