import { useLingui } from '@lingui/react/macro'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { Identity } from './Identity'
import { LanguageSwitch } from './LanguageSwitch'
import { LegalLinks } from './LegalLinks'
import { useNavigationEntries } from './navigation'
import { NavigationLink } from './NavigationLink'
import { SearchPlaceholder } from './SearchPlaceholder'
import { ThemeToggle } from './ThemeToggle'

/** The desktop sidebar: identity, search, navigation and, at the bottom, the Availability, the Site language switch, the theme toggle and the legal links. */
export function Sidebar() {
  const { t } = useLingui()
  const entries = useNavigationEntries()
  return (
    <aside
      aria-label={t`Sidebar`}
      className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-sidebar p-3 md:flex"
    >
      <Identity className="p-2" />
      <SearchPlaceholder />
      <nav aria-label={t`Main navigation`}>
        <ul className="space-y-0.5">
          {entries.map((entry) => (
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
      <AvailabilityTile compact className="mt-auto" />
      <div className="flex items-center justify-between px-3 pt-3">
        <LanguageSwitch />
        <ThemeToggle />
      </div>
      <LegalLinks className="px-3 pt-2" />
    </aside>
  )
}
