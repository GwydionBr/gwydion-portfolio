import { Link, useLocation } from '@tanstack/react-router'
import { LANGUAGES, nativeNameOf, pathInLanguage, type Language } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'
import classes from './LanguageSwitch.module.css'

/**
 * Links to the current page in every Site language; the shown one is marked
 * current. Real links, so it looks like the theme's SegmentedControl without
 * being one. `labelledBy` is the id of the visible label that names it.
 */
export function LanguageSwitch({ labelledBy }: { labelledBy: string }) {
  const current = useSiteLanguage()
  const pageIn = usePageInLanguage()
  return (
    <nav aria-labelledby={labelledBy}>
      <ul className={classes.track}>
        {LANGUAGES.map((language) => (
          <li key={language}>
            <Link
              to={pageIn(language)}
              hrefLang={language}
              lang={language}
              aria-current={language === current ? 'true' : undefined}
              aria-label={nativeNameOf(language)}
              className={classes.segment}
            >
              {nativeNameOf(language)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/**
 * The address of the page shown in another Site language: same page, other
 * prefix, so the visitor stays where they are. A hash is left behind: it
 * names a place by its heading, which reads differently in each language.
 */
export function usePageInLanguage(): (language: Language) => string {
  const { pathname, searchStr } = useLocation()
  return (language) => `${pathInLanguage(pathname, language)}${searchStr}`
}
