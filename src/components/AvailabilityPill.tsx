/** The Availability headline as a green status pill. */
export function AvailabilityPill({ headline }: { headline: string }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-available-surface px-3 py-1 font-medium text-available ring-1 ring-available-line">
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-available" />
      {headline}
    </p>
  )
}
