import type { Period } from './schema'

/** Whether `value` is a well-formed `PeriodDate`: `YYYY` or `YYYY-MM` with a real month. */
export function isPeriodDate(value: string): boolean {
  return /^\d{4}(-(0[1-9]|1[0-2]))?$/.test(value)
}

/**
 * Orders periods newest first: the later start first; for the same start, the
 * ongoing (or later ending) one first. `PeriodDate`s compare as strings.
 */
export function newestFirst(a: Period, b: Period): number {
  return b.start.localeCompare(a.start) || (b.end ?? '9999').localeCompare(a.end ?? '9999')
}

/** What is wrong with `period`, if anything, for example "ends before it starts". */
export function periodProblem({ start, end }: Period): string | undefined {
  if (!isPeriodDate(start)) return `has a malformed start "${start}"`
  if (end === null) return undefined
  if (!isPeriodDate(end)) return `has a malformed end "${end}"`
  if (end.localeCompare(start.slice(0, end.length)) < 0) return 'ends before it starts'
  return undefined
}

/**
 * The dash a period is written with between its sides: spaced only when a
 * side has a month ("Jun 2024 – now"), since those sides contain spaces
 * themselves ("2018–2022"); none when it starts and ends on the same date.
 */
export function periodDash({ start, end }: Period): '–' | ' – ' | null {
  if (end === start) return null
  return start.length > 4 || (end !== null && end.length > 4) ? ' – ' : '–'
}
