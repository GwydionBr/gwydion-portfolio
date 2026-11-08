import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { CircleHalf, Globe, type Icon } from '@phosphor-icons/react'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { ProfileLinkRows } from '#/components/ProfileLinks'
import { Identity } from './Identity'
import { LanguageSwitch } from './LanguageSwitch'
import { LegalLinks } from './LegalLinks'
import { useNavigationEntries } from './navigation'
import { NavigationLink } from './NavigationLink'
import { PinnedProjects } from './PinnedProjects'
import { SearchPlaceholder } from './SearchPlaceholder'
import { ThemeSwitch } from './ThemeSwitch'

/** The desktop sidebar: identity, search, navigation, pinned Projects and, at the bottom, the Availability, the Profile links, the Site language and theme switches and the legal links. */
export function Sidebar() {
  const { t } = useLingui()
  const entries = useNavigationEntries()
  return (
    <aside
      aria-label={t`Sidebar`}
      className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col overflow-y-auto border-r border-line bg-sidebar p-3 md:flex"
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
      <PinnedProjects />
      <div className="mt-auto space-y-2 pt-4">
        <AvailabilityTile compact />
        <ProfileLinkRows />
        <div className="space-y-1.5 border-t border-line pt-2.5">
          <Setting icon={Globe}>
            <LanguageSwitch />
          </Setting>
          <Setting icon={CircleHalf}>
            <ThemeSwitch />
          </Setting>
        </div>
        <LegalLinks className="pl-3 pt-1" />
      </div>
    </aside>
  )
}

/** A control in the sidebar's settings, its icon aligned with the rows above it. */
function Setting({ icon: Icon, children }: { icon: Icon; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 pl-3">
      <Icon aria-hidden className="size-4 shrink-0 text-subtle" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
