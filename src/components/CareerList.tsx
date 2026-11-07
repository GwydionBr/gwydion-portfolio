import type { I18n } from '@lingui/core'
import { useLingui } from '@lingui/react/macro'
import type { CareerDate, CareerEntry } from '#/content'

/** `date` for people: the year alone, or the short month and year in the Site language. */
function formatCareerDate(i18n: I18n, date: CareerDate) {
  return date.length === 4
    ? date
    : i18n.date(`${date}-01`, { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

/** Career entries in the order given, each with period, title, organisation and summary. */
export function CareerList({ entries }: { entries: readonly CareerEntry[] }) {
  const { t, i18n } = useLingui()
  return (
    <ol className="mt-2">
      {entries.map((entry) => (
        <li
          key={`${entry.start}-${entry.organisation}`}
          className={`grid gap-1 border-b border-line py-3 last:border-0 sm:grid-cols-[8rem_1fr] sm:gap-4 ${entry.placeholder ? 'stand-in' : ''}`}
        >
          <p className="text-xs text-subtle">
            <time dateTime={entry.start}>{formatCareerDate(i18n, entry.start)}</time>
            {' – '}
            {entry.end === null ? (
              t`now`
            ) : (
              <time dateTime={entry.end}>{formatCareerDate(i18n, entry.end)}</time>
            )}
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
