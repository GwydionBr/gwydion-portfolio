import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { AppShell, Box, Divider, Group, Stack } from '@mantine/core'
import { CircleHalf, Globe, type Icon } from '@phosphor-icons/react'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { ProfileLinkRows } from '#/components/ProfileLinks'
import { SHELL_BREAKPOINT } from './breakpoint'
import { Identity } from './Identity'
import { LanguageSwitch } from './LanguageSwitch'
import { LegalLinks } from './LegalLinks'
import { useNavigationEntries } from './navigation'
import { NavigationRow } from './NavigationLink'
import { ThemeSwitch } from './ThemeSwitch'

/** The desktop sidebar: identity, navigation and, at the bottom, the Availability, the Profile links, the Site language and theme switches and the legal links. */
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
      <AppShell.Section grow mt="xs" component="nav" aria-label={t`Main navigation`}>
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
          <Stack gap={6}>
            <Setting icon={Globe}>
              <LanguageSwitch />
            </Setting>
            <Setting icon={CircleHalf}>
              <ThemeSwitch />
            </Setting>
          </Stack>
          <LegalLinks pl="sm" pt={4} />
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  )
}

/** A control in the sidebar's settings, its icon aligned with the rows above it. */
function Setting({ icon: Icon, children }: { icon: Icon; children: ReactNode }) {
  return (
    <Group gap="sm" wrap="nowrap" pl="sm">
      <Icon aria-hidden size={16} color="var(--subtle)" style={{ flexShrink: 0 }} />
      <Box miw={0} flex={1}>
        {children}
      </Box>
    </Group>
  )
}
