import { useLingui } from '@lingui/react/macro'
import { Identity } from './Identity'
import { LanguageSwitch } from './LanguageSwitch'
import { NAVIGATION_ENTRIES } from './navigation'
import { NavigationLink } from './NavigationLink'
import { SearchPlaceholder } from './SearchPlaceholder'

/** The desktop sidebar: identity, search, navigation and, at the bottom, the Site language switch. */
export function Sidebar() {
  const { t } = useLingui()
  return (
    <aside
      aria-label={t`Sidebar`}
      className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-sidebar p-3 md:flex"
    >
      <Identity className="p-2" />
      <SearchPlaceholder />
      <nav aria-label={t`Main navigation`}>
        <ul className="space-y-0.5">
          {NAVIGATION_ENTRIES.map((entry) => (
            <li key={entry.to}>
              <NavigationLink
                entry={entry}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-1.5 hover:bg-hover aria-[current=page]:bg-selected aria-[current=page]:font-medium aria-[current=page]:text-ink"
              >
                {(label) => (
                  <>
                    <entry.icon aria-hidden className="size-4 text-subtle" />
                    {label}
                  </>
                )}
              </NavigationLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto px-3 pt-3">
        <LanguageSwitch />
      </div>
    </aside>
  )
}
