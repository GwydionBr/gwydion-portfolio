import { useLingui } from '@lingui/react/macro'
import { Link, useLocation } from '@tanstack/react-router'
import { LANGUAGES, nativeNameOf, pathInLanguage } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'

/** Links to the current page in every Site language; the shown one is marked current. */
export function LanguageSwitch() {
  const { t } = useLingui()
  const current = useSiteLanguage()
  const { pathname, searchStr, hash } = useLocation()
  return (
    <nav aria-label={t`Site language`}>
      <ul className="flex gap-1 text-xs">
        {LANGUAGES.map((language) => (
          <li key={language}>
            <Link
              // Same page, other prefix: the visitor stays where they are.
              to={`${pathInLanguage(pathname, language)}${searchStr}${hash ? `#${hash}` : ''}`}
              hrefLang={language}
              lang={language}
              aria-current={language === current ? 'true' : undefined}
              aria-label={nativeNameOf(language)}
              className="rounded-md px-2 py-1 uppercase text-subtle hover:bg-hover aria-[current=true]:bg-selected aria-[current=true]:font-medium aria-[current=true]:text-ink"
            >
              {language}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
