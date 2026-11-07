import type { ReactNode } from 'react'
import { I18nProvider } from '@lingui/react'
import { useLocation } from '@tanstack/react-router'
import { siteLanguageOfPath, type Language } from './language'
import { i18nFor } from './runtime'

/** The Site language of the page shown: its URL prefix, else English. */
export function useSiteLanguage(): Language {
  return useLocation({ select: (location) => siteLanguageOfPath(location.pathname) })
}

/**
 * Translates its children in the Site language of the current URL. A
 * navigation into the other language swaps the instance, so every text
 * re-renders without a reload.
 */
export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const language = useSiteLanguage()
  return <I18nProvider i18n={i18nFor(language)}>{children}</I18nProvider>
}
