import type { ReactNode } from 'react'

/**
 * A row of number tiles: a Project's stats on its page, or numbers inside a
 * story (`<NumberTiles><NumberTile value="137" label="migrations" /></NumberTiles>`).
 */
export function NumberTiles({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <ul aria-label={label} className="not-first:mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {children}
    </ul>
  )
}

/** One number and what it counts. */
export function NumberTile({ value, label }: { value: string; label: string }) {
  return (
    <li className="rounded-2xl bg-surface p-4 ring-1 ring-line">
      <p className="text-2xl font-semibold tracking-tight text-ink tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-subtle">{label}</p>
    </li>
  )
}
