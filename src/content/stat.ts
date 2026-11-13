import type { Language } from '#/i18n/language'
import type { ProjectStatSource } from './schema'

/** A Project's number as `language` writes it: "88", "2,200+" or "2.200+" (at least), "~2,200" (about). */
export function statText(stat: ProjectStatSource, language: Language): string {
  const count = new Intl.NumberFormat(language).format(stat.value)
  if (stat.precision === 'at-least') return `${count}+`
  if (stat.precision === 'about') return `~${count}`
  return count
}
