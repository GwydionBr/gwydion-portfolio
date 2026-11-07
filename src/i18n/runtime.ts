import { setupI18n, type I18n } from '@lingui/core'
import { messages as de } from './locales/de.po'
import { messages as en } from './locales/en.po'
import { LANGUAGES, type Language } from './language'

export type { I18n, MessageDescriptor } from '@lingui/core'

/**
 * One translation instance per Site language, each fixed to its language.
 *
 * Unlike Self-Engine, which switches one instance per tab and loads catalogs
 * lazily, the site's language is a pure function of the URL: an instance never
 * switches, so the same one can serve concurrent server requests and the
 * browser, and a page renders in its language on the first (and hydrating)
 * render without awaiting a catalog. Both catalogs are small and ship eagerly.
 * Lingui's global `i18n` is never used.
 */
const catalogs: Record<Language, typeof en> = { en, de }

const instances = Object.fromEntries(
  LANGUAGES.map((language) => {
    const i18n = setupI18n()
    i18n.loadAndActivate({ locale: language, messages: catalogs[language] })
    return [language, i18n]
  }),
) as Record<Language, I18n>

/** The translation instance of `language`: for React (`I18nProvider`) and for code outside it (a route's head). */
export function i18nFor(language: Language): I18n {
  return instances[language]
}
