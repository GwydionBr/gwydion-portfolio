import type { I18n } from '@lingui/core'
import { useLingui } from '@lingui/react/macro'
import { periodDash, type Period, type PeriodDate } from '#/content'

/** `date` for people: the year alone, or the short month and year in the Site language. */
function formatPeriodDate(i18n: I18n, date: PeriodDate) {
  return date.length === 4
    ? date
    : i18n.date(`${date}-01`, { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

/** A period in the Site language: "2026", "2025–now" / "2025–heute", "Jun 2024 – now". */
export function PeriodText({ period }: { period: Period }) {
  const { t, i18n } = useLingui()
  const { start, end } = period
  const dash = periodDash(period)
  if (dash === null) return <time dateTime={start}>{formatPeriodDate(i18n, start)}</time>
  return (
    <>
      <time dateTime={start}>{formatPeriodDate(i18n, start)}</time>
      {dash}
      {end === null ? t`now` : <time dateTime={end}>{formatPeriodDate(i18n, end)}</time>}
    </>
  )
}
