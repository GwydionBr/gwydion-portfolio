import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { useLingui } from '@lingui/react'
import { useSiteLanguage } from '#/i18n/react'
import type { NAVIGATION_ENTRIES } from './navigation'

type NavigationEntry = (typeof NAVIGATION_ENTRIES)[number]

/**
 * One navigation entry as a real link in the current Site language, marked
 * `aria-current="page"` while its view is open. `children` renders it,
 * given the entry's translated label.
 */
export function NavigationLink({
  entry,
  className,
  children,
}: {
  entry: NavigationEntry
  className: string
  children: (label: string) => ReactNode
}) {
  const { i18n } = useLingui()
  const lang = useSiteLanguage()
  return (
    <Link
      to={entry.to}
      params={{ lang }}
      activeOptions={{ exact: entry.exact }}
      className={className}
    >
      {children(i18n._(entry.label))}
    </Link>
  )
}
