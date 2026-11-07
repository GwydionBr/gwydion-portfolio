/**
 * Every Site language, keyed by its language-only tag. Routing (`/$lang`), the
 * language switch, extraction and the catalog check follow from this list.
 * Mirrors Self-Engine's `packages/i18n/src/language.ts`, trimmed to what a
 * site whose language lives only in the URL needs.
 *
 * - `name`: the language's name in itself, as the language switch shows it.
 */
export const LANGUAGE_LIST = {
  en: { name: 'English' },
  de: { name: 'Deutsch' },
} as const satisfies Record<string, { name: string }>

export type Language = keyof typeof LANGUAGE_LIST

/** The Site languages, in list order. */
export const LANGUAGES = Object.keys(LANGUAGE_LIST) as Language[]

/** English: the Base language. Every text missing in German shows in English. */
export const BASE_LANGUAGE: Language = 'en'

/** Whether `value` is exactly the tag of a Site language (`"de"`, not `"de-AT"`). */
export function isLanguage(value: unknown): value is Language {
  return (LANGUAGES as readonly unknown[]).includes(value)
}

/** The name of `language` in itself ("Deutsch"). */
export function nativeNameOf(language: Language): string {
  return LANGUAGE_LIST[language].name
}

/**
 * The Site language a reported tag names, or null. Reads only the language
 * part, so `"de-AT"`, `"de_DE"` and `"DE"` all name German.
 */
export function parseLanguage(tag: string | null | undefined): Language | null {
  const language = tag?.trim().split(/[-_]/)[0]?.toLowerCase()
  return isLanguage(language) ? language : null
}

/**
 * The Site language a URL path's prefix names (`/de/about` → `"de"`), or null
 * when the first segment is not exactly a Site language (`/about`, `/de-facto`).
 */
export function languageOfPath(pathname: string | null | undefined): Language | null {
  const prefix = pathname?.split('/')[1]
  return isLanguage(prefix) ? prefix : null
}

/**
 * The Site language a page at `pathname` is shown in: its prefix, else the
 * Base language (an unknown path's not-found view).
 */
export function siteLanguageOfPath(pathname: string | null | undefined): Language {
  return languageOfPath(pathname) ?? BASE_LANGUAGE
}

/**
 * `pathname` without its Site language prefix (`/de/about` → `/about`,
 * `/de` → `""`). A path without one is returned as it is.
 */
export function withoutLanguagePrefix(pathname: string): string {
  return languageOfPath(pathname) ? pathname.replace(/^\/[^/]+/, '') : pathname
}

/**
 * The same page in `language`: the language prefix swapped, or added when the
 * path has none (a not-found view outside `/$lang`).
 */
export function pathInLanguage(pathname: string, language: Language): string {
  if (languageOfPath(pathname)) return `/${language}${withoutLanguagePrefix(pathname)}`
  return `/${language}`
}

/** Browser languages, most preferred first; an `Accept-Language` header is ordered by q-value. */
function preferredTags(browser: string | readonly string[]): string[] {
  if (typeof browser !== 'string') return [...browser]
  return browser
    .split(',')
    .map((entry, index) => {
      const [tag = '', ...params] = entry.split(';').map((part) => part.trim())
      const q = params.find((param) => param.startsWith('q='))
      const weight = q ? Number(q.slice(2)) : 1
      return { tag, weight: Number.isFinite(weight) ? weight : 0, index }
    })
    .filter(({ tag, weight }) => tag && weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index)
    .map(({ tag }) => tag)
}

/**
 * The Site language a visitor's browser prefers: the first Site language in an
 * `Accept-Language` header (or `navigator.languages`), else the Base language.
 */
export function preferredLanguageOf(
  browser: string | readonly string[] | null | undefined,
): Language {
  for (const tag of browser ? preferredTags(browser) : []) {
    const language = parseLanguage(tag)
    if (language) return language
  }
  return BASE_LANGUAGE
}
