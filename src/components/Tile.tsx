import { useId, type ReactNode } from 'react'

/**
 * A titled card: an Overview tile or a sidebar card. A region named by its
 * title, so visitors (and tests) find it by name.
 */
export function Tile({
  title,
  action,
  compact = false,
  className = '',
  children,
}: {
  title: string
  /** Shown beside the title, for example a "View all" link. */
  action?: ReactNode
  /** Tighter padding and smaller text, for the sidebar. */
  compact?: boolean
  /** Placement only (grid span, margins); never colours or padding. */
  className?: string
  children: ReactNode
}) {
  const id = useId()
  return (
    <section
      aria-labelledby={id}
      className={`rounded-2xl bg-surface ring-1 ring-line ${compact ? 'p-3 text-xs' : 'p-5'} ${className}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={id} className="text-xs font-medium text-subtle">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}
