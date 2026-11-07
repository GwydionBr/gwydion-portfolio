/** A small square in a Project's accent colour. */
export function ProjectSwatch({ accent, className = '' }: { accent: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`size-2.5 shrink-0 rounded-sm ${className}`}
      style={{ background: accent }}
    />
  )
}
