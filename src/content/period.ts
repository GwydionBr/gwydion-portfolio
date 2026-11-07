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
