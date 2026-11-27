import { useLingui } from '@lingui/react/macro'
import { AppShell, Divider, Stack } from '@mantine/core'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { ProfileLinkRows } from '#/components/ProfileLinks'
import { SHELL_BREAKPOINT } from './breakpoint'
import { Identity } from './Identity'
import { LegalLinks } from './LegalLinks'
import { useNavigationEntries } from './navigation'
import { NavigationRow } from './NavigationLink'
import { SettingsMenu } from './SettingsMenu'
import { SearchField } from './SiteSearch'

/** The desktop sidebar: identity, the search field, navigation and, at the bottom, the Availability, the Profile links, the Settings row and the legal links. */
export function Sidebar() {
  const { t } = useLingui()
  const entries = useNavigationEntries()
  return (
    <AppShell.Navbar
      // A sidebar of several parts, the navigation only one of them.
      renderRoot={(props) => <aside {...props} />}
      aria-label={t`Sidebar`}
      // Below the breakpoint Mantine only slides it off screen; gone, it can't take keyboard focus.
      visibleFrom={SHELL_BREAKPOINT}
    >
      <AppShell.Section p="xs">
        <Identity />
      </AppShell.Section>
      <AppShell.Section mt="xs">
        <SearchField />
      </AppShell.Section>
      <AppShell.Section grow mt="md" component="nav" aria-label={t`Main navigation`}>
        <Stack component="ul" gap={2} m={0} p={0} style={{ listStyle: 'none' }}>
          {entries.map((entry) => (
            <li key={entry.to}>
              <NavigationRow entry={entry} />
            </li>
          ))}
        </Stack>
      </AppShell.Section>
      <AppShell.Section>
        <Stack gap="xs" pt="md">
          <AvailabilityTile compact />
          <ProfileLinkRows />
          <Divider color="var(--line)" />
          <SettingsMenu />
          <LegalLinks pl="sm" />
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  )
}
