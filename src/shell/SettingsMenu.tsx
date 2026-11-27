import { useLingui } from '@lingui/react/macro'
import { NavLink, Popover } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { GearSix } from '@phosphor-icons/react'
import { SiteSettings } from './SiteSettings'

/**
 * The sidebar's Settings row: opens the Site language and theme switches
 * beside the sidebar, so they don't take room in it. The open panel is a
 * dialog named after the row, which stays selected while it is open.
 */
export function SettingsMenu() {
  const { t } = useLingui()
  const [opened, { toggle, close }] = useDisclosure(false)
  return (
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
        <SiteSettings />
      </Popover.Dropdown>
    </Popover>
  )
}
