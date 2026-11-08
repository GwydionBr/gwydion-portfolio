import type { CSSProperties } from 'react'
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
      <ul
        className="phone-tabs relative isolate flex px-1"
        style={{ '--tab-count': entries.length } as CSSProperties}
      >
        {entries.map((entry) => (
          <li key={entry.to} className="min-w-0 flex-1">
            <NavigationLink
              entry={entry}
              className="group flex flex-col items-center gap-0.5 rounded-lg py-2 text-[11px] text-subtle outline-offset-[-3px] motion-safe:transition-colors motion-safe:duration-200 aria-[current=page]:text-ink"
            >
              {(label) => (
                <>
                  <span className="relative size-5">
                    <entry.icon
                      aria-hidden
                      className="absolute inset-0 size-5 motion-safe:transition-opacity motion-safe:duration-200 group-aria-[current=page]:opacity-0"
                    />
                    <entry.icon
                      aria-hidden
                      weight="fill"
                      className="absolute inset-0 size-5 opacity-0 motion-safe:transition-opacity motion-safe:duration-200 group-aria-[current=page]:opacity-100"
                    />
                  </span>
                  <span className="w-full whitespace-nowrap text-center group-aria-[current=page]:font-semibold">
                    {label}
                  </span>
                </>
              )}
            </NavigationLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
