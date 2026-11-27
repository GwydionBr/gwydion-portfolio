import { StatusPill } from './StatusPill'

/** The Availability headline as a green status pill. */
export function AvailabilityPill({ headline }: { headline: string }) {
  return (
    <StatusPill live component="p" size="lg">
      {headline}
    </StatusPill>
  )
}
