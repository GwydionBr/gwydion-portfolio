import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { AppShell, Box, Group, ScrollArea, Stack } from '@mantine/core'
import { CircleHalf, Globe, type Icon } from '@phosphor-icons/react'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { ProfileLinkRows } from '#/components/ProfileLinks'
import { Identity } from './Identity'
import { LanguageSwitch } from './LanguageSwitch'
import { LegalLinks } from './LegalLinks'
import { useNavigationEntries } from './navigation'
import { NavigationLink } from './NavigationLink'
import classes from './Sidebar.module.css'
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
      className={classes.sidebar}
    >
      <AppShell.Section p="xs">
        <Identity />
      </AppShell.Section>
      <AppShell.Section grow component={ScrollArea} scrollbarSize={6} mt="xs">
        <nav aria-label={t`Main navigation`}>
          <Stack component="ul" gap={2} className={classes.list}>
            {entries.map((entry) => (
              <li key={entry.to}>
                <NavigationLink entry={entry} className={classes.entry}>
                  {(label) => (
                    <>
                      <entry.icon aria-hidden className={classes.icon} />
                      {label}
                    </>
                  )}
                </NavigationLink>
              </li>
            ))}
          </Stack>
        </nav>
      </AppShell.Section>
      <AppShell.Section>
        <Stack gap="xs" pt="md">
          <AvailabilityTile compact />
          <ProfileLinkRows />
          <Stack gap={6} className={classes.settings}>
            <Setting icon={Globe}>
              <LanguageSwitch />
            </Setting>
            <Setting icon={CircleHalf}>
              <ThemeSwitch />
            </Setting>
          </Stack>
          <LegalLinks className={classes.legal} />
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  )
}

/** A control in the sidebar's settings, its icon aligned with the rows above it. */
function Setting({ icon: Icon, children }: { icon: Icon; children: ReactNode }) {
  return (
    <Group gap="sm" wrap="nowrap" pl="sm">
      <Icon aria-hidden className={classes.icon} />
      <Box miw={0} flex={1}>
        {children}
      </Box>
    </Group>
  )
}
