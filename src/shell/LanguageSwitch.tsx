import { Link, useLocation } from '@tanstack/react-router'
import { LANGUAGES, nativeNameOf, pathInLanguage } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'
import classes from './LanguageSwitch.module.css'

/**
 * Links to the current page in every Site language; the shown one is marked
 * current. Real links, so it looks like the theme's SegmentedControl without
 * being one. `labelledBy` is the id of the visible label that names it.
 */
export function LanguageSwitch({ labelledBy }: { labelledBy: string }) {
  const current = useSiteLanguage()
  const { pathname, searchStr, hash } = useLocation()
  return (
    <nav aria-labelledby={labelledBy}>
      <ul className={classes.track}>
        {LANGUAGES.map((language) => (
          <li key={language}>
            <Link
              // Same page, other prefix: the visitor stays where they are.
              to={`${pathInLanguage(pathname, language)}${searchStr}${hash ? `#${hash}` : ''}`}
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
