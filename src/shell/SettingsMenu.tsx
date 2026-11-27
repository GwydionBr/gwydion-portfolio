import type { MouseEvent } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Divider, NavLink, Popover, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { GearSix } from '@phosphor-icons/react'
import { useCloseWhenHidden } from './breakpoint'
import { LegalLinks } from './LegalLinks'
import { SIDEBAR_ICON_SIZE } from './sidebarLayout'
import { RailTooltip } from './SidebarRail'
import { SiteSettings } from './SiteSettings'

/**
 * The sidebar's Settings row: opens the Site language and theme switches and
 * the legal links beside the sidebar, so they don't take room in it. The open
 * panel is a dialog named after the row, which stays selected while it is
 * open; it closes when the window gets too narrow for the sidebar, and when
 * one of its links is followed.
 */
export function SettingsMenu() {
  const { t } = useLingui()
  const [opened, { toggle, close }] = useDisclosure(false)
  useCloseWhenHidden('sidebar', close)
  const closeOnLink = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest('a')) close()
  }
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
            leftSection={<GearSix aria-hidden size={SIDEBAR_ICON_SIZE} />}
            active={opened}
            onClick={toggle}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <Stack gap="md" onClick={closeOnLink}>
            <SiteSettings />
            <Divider color="var(--line)" />
            <LegalLinks />
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </RailTooltip>
  )
}
