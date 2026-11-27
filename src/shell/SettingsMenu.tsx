import { useLingui } from '@lingui/react/macro'
import { Divider, NavLink, Popover, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { GearSix } from '@phosphor-icons/react'
import { useCloseWhenHidden } from './breakpoint'
import { LegalLinks } from './LegalLinks'
import { useSidebarCollapsed } from './sidebarLayout'
import { RailTooltip } from './SidebarRail'
import { SiteSettings } from './SiteSettings'

/**
 * The sidebar's Settings row: opens the Site language and theme switches
 * beside the sidebar, so they don't take room in it. The open panel is a
 * dialog named after the row, which stays selected while it is open; it
 * closes when the window gets too narrow for the sidebar. While the sidebar
 * is collapsed to its icons, which leaves no room for the legal links, the
 * panel offers them.
 */
export function SettingsMenu() {
  const { t } = useLingui()
  const [opened, { toggle, close }] = useDisclosure(false)
  const collapsed = useSidebarCollapsed()
  useCloseWhenHidden('sidebar', close)
  return (
    <RailTooltip label={t`Settings`} disabled={opened}>
      <Popover
        opened={opened}
        onDismiss={close}
        position="right-end"
        offset={12}
        width={260}
        trapFocus
        // Open until dismissed, even while the sidebar scrolls the row out of view.
        hideDetached={false}
      >
        <Popover.Target>
          <NavLink
            component="button"
            label={t`Settings`}
            leftSection={<GearSix aria-hidden size={16} />}
            active={opened}
            onClick={toggle}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <Stack gap="md">
            <SiteSettings />
            {collapsed && (
              <>
                <Divider color="var(--line)" />
                <LegalLinks />
              </>
            )}
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </RailTooltip>
  )
}
