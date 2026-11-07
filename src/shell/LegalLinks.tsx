import { useLingui } from '@lingui/react/macro'
import { Link } from '@tanstack/react-router'
import { useSiteLanguage } from '#/i18n/react'
import { LEGAL_PAGES } from '#/legal/pages'

/** Links to the Impressum and the privacy policy in the current Site language. */
export function LegalLinks({ className = '' }: { className?: string }) {
  const { t, i18n } = useLingui()
  const lang = useSiteLanguage()
  return (
    <nav aria-label={t`Legal`} className={className}>
      <ul className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
        {LEGAL_PAGES.map((page) => (
          <li key={page.to}>
            <Link
              to={page.to}
              params={{ lang }}
              className="text-subtle hover:text-ink aria-[current=page]:text-ink"
            >
              {i18n._(page.title)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
