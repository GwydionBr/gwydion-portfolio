import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react'
import { RouterNavLink, RouterUnstyled } from '#/components/links'
import { useSiteLanguage } from '#/i18n/react'
import type { NavigationEntry } from './navigation'

/** The link props and translated label of a navigation entry, in the current Site language. */
function useEntryLink(entry: NavigationEntry) {
  const { i18n } = useLingui()
  const lang = useSiteLanguage()
  return {
    link: { to: entry.to, params: { lang }, activeOptions: { exact: entry.exact } },
    label: i18n._(entry.label),
  }
}

/**
 * One navigation entry as a sidebar row (Mantine NavLink, its look from the
 * theme): a real link, marked `aria-current="page"` while its view is open.
 */
export function NavigationRow({ entry }: { entry: NavigationEntry }) {
  const { link, label } = useEntryLink(entry)
  return (
    <RouterNavLink {...link} label={label} leftSection={<entry.icon aria-hidden size={16} />} />
  )
}

/**
 * One navigation entry as a link with no look of its own, for the tab bar:
 * `children` renders it, given the entry's translated label, and `className`
 * (a CSS Module class) gives the look.
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
  const { link, label } = useEntryLink(entry)
  return (
    <RouterUnstyled {...link} className={className}>
      {children(label)}
    </RouterUnstyled>
  )
}
