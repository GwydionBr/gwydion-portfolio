import { useLingui } from '@lingui/react/macro'
import { AppShell, Divider, Stack } from '@mantine/core'
import { AvailabilityTile } from '#/components/AvailabilityTile'
import { ProfileLinkRows } from '#/components/ProfileLinks'
import { SHELL_BREAKPOINT } from './breakpoint'
import { Identity } from './Identity'
import { useNavigationEntries } from './navigation'
import { NavigationRow } from './NavigationLink'
import { SettingsMenu } from './SettingsMenu'
import classes from './Sidebar.module.css'
import { RailTooltip, SidebarToggle } from './SidebarRail'
import { SearchField } from './SiteSearch'

/**
 * The desktop sidebar: identity, the search field, navigation and, at the
 * bottom, the Availability, the Profile links, the Settings row (which also
 * holds the legal links) and the toggle that collapses it. Mantine adds the resize handle
 * on its edge. Collapsed to its icon rail (src/shell/sidebarLayout.ts), it
 * shows the rows' icons, named in tooltips; its stylesheet draws the rail.
 */
export function Sidebar() {
  const { t } = useLingui()
  const entries = useNavigationEntries()
  return (
    <AppShell.Navbar
      // A sidebar of several parts, the navigation only one of them.
      renderRoot={(props) => <aside {...props} />}
      aria-label={t`Sidebar`}
      className={classes.sidebar}
      // Below the breakpoint Mantine only slides it off screen; gone, it can't take keyboard focus.
      visibleFrom={SHELL_BREAKPOINT}
    >
      {/* What scrolls in a short window; the resize handle stays outside, on the edge. */}
      <div className={classes.content}>
        <AppShell.Section py="xs" className={classes.identity}>
          <Identity />
        </AppShell.Section>
        <AppShell.Section mt="xs" className={classes.search}>
          <RailTooltip label={t`Search`}>
            <SearchField />
          </RailTooltip>
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
            <AvailabilityTile compact className={classes.railHidden} />
            <ProfileLinkRows
              wrapRow={(row, label) => <RailTooltip label={label}>{row}</RailTooltip>}
            />
            <Divider color="var(--line)" />
            <SettingsMenu />
            <div className={classes.toggleRow}>
              <SidebarToggle />
            </div>
          </Stack>
        </AppShell.Section>
      </div>
    </AppShell.Navbar>
  )
}
