import { useLingui } from '@lingui/react/macro'
import { useNavigationEntries } from './navigation'
import { NavigationLink } from './NavigationLink'

/**
 * The phone tab bar below the `md` breakpoint, in place of the sidebar: the
 * same navigation entries.
 */
export function TabBar() {
  const { t } = useLingui()
  const entries = useNavigationEntries()
  return (
    <nav
      aria-label={t`Tab bar`}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-sidebar/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <ul className="flex">
        {entries.map((entry) => (
          <li key={entry.to} className="flex-1">
            <NavigationLink
              entry={entry}
              className="flex flex-col items-center gap-0.5 py-2 text-[11px] text-subtle aria-[current=page]:text-ink"
            >
              {(label) => (
                <>
                  <entry.icon aria-hidden className="size-5" />
                  {label}
                </>
              )}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
