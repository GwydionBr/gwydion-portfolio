import type { MouseEvent } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Divider, Drawer, Stack } from '@mantine/core'
import { ProfileLinkRows } from '#/components/ProfileLinks'
import { LegalLinks } from './LegalLinks'
import { SiteSettings } from './SiteSettings'

/**
 * The phone's More sheet, opened from the tab bar: what the desktop sidebar
 * holds besides the navigation (the Profile links, the settings, the legal
 * links), so it isn't repeated at the end of every page. Following a link in
 * it closes it.
 */
export function MoreSheet({ opened, onClose }: { opened: boolean; onClose: () => void }) {
  const { t } = useLingui()
  const closeOnLink = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest('a')) onClose()
  }
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="bottom"
      title={t`More`}
      closeButtonProps={{ 'aria-label': t`Close` }}
    >
      <Stack gap="md" onClick={closeOnLink}>
        <ProfileLinkRows />
        <Divider color="var(--line)" />
        <SiteSettings />
        <Divider color="var(--line)" />
        <LegalLinks />
      </Stack>
    </Drawer>
  )
}
