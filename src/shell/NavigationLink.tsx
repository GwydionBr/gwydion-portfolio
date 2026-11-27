import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react'
import { RouterUnstyled } from '#/components/links'
import { useSiteLanguage } from '#/i18n/react'
import type { NavigationEntry } from './navigation'

/**
 * One navigation entry as a real link in the current Site language, marked
 * `aria-current="page"` while its view is open. `children` renders it,
 * given the entry's translated label; `className` (a CSS Module class) gives
 * the look, the sidebar's row or the tab bar's tab.
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
    <RouterUnstyled
      to={entry.to}
      params={{ lang }}
      activeOptions={{ exact: entry.exact }}
      className={className}
    >
      {children(i18n._(entry.label))}
    </RouterUnstyled>
  )
}
