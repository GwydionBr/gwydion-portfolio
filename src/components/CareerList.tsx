import { PeriodText } from './PeriodText'
import type { CareerEntry } from '#/content'

/** Career entries in the order given, each with period, title, organisation and summary. */
export function CareerList({ entries }: { entries: readonly CareerEntry[] }) {
  return (
    <ol className="mt-2">
      {entries.map((entry) => (
        <li
          key={`${entry.start}-${entry.organisation}`}
          className={`grid gap-1 border-b border-line py-3 last:border-0 sm:grid-cols-[8rem_1fr] sm:gap-4 ${entry.placeholder ? 'stand-in' : ''}`}
        >
          <p className="text-xs text-subtle">
            <PeriodText period={entry} />
          </p>
          <div>
            <h3 className="font-medium text-ink">
              {entry.title} · {entry.organisation}
            </h3>
            <p>{entry.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
