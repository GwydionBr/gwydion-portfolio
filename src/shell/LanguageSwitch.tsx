import { useLingui } from '@lingui/react/macro'
import { Link, useLocation } from '@tanstack/react-router'
import { LANGUAGES, nativeNameOf, pathInLanguage } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'
import { SEGMENT, SEGMENTED_TRACK } from './segmented'

/**
 * Links to the current page in every Site language; the shown one is marked
 * current. `short` writes each as its code ("EN") where the full name won't fit.
 */
export function LanguageSwitch({ short = false }: { short?: boolean }) {
  const { t } = useLingui()
  const current = useSiteLanguage()
  const { pathname, searchStr, hash } = useLocation()
  return (
    <nav aria-label={t`Site language`}>
      <ul className={SEGMENTED_TRACK}>
        {LANGUAGES.map((language) => (
          <li key={language}>
            <Link
              // Same page, other prefix: the visitor stays where they are.
              to={`${pathInLanguage(pathname, language)}${searchStr}${hash ? `#${hash}` : ''}`}
              hrefLang={language}
              lang={language}
              aria-current={language === current ? 'true' : undefined}
              aria-label={nativeNameOf(language)}
              className={SEGMENT}
            >
              {short ? language.toUpperCase() : nativeNameOf(language)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
