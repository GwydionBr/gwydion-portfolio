import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { AppShell as MantineAppShell, Box, Stack } from '@mantine/core'
import { ProfileLinks } from '#/components/ProfileLinks'
import classes from './AppShell.module.css'
import { SHELL_BREAKPOINT } from './breakpoint'
import { LegalLinks } from './LegalLinks'
import { Sidebar } from './Sidebar'
import { TabBar } from './TabBar'
import { ThemeSwitch } from './ThemeSwitch'
import { TopBar } from './TopBar'

/** The id of the main content landmark, the skip link's target. */
const MAIN_ID = 'main'

/**
 * The app shell (ADR 0003, prototype J), built on Mantine's AppShell: a
 * sidebar from the `sm` breakpoint up; below it a top bar (identity, Site
 * language switch) and a bottom tab bar, and the main pane ends with the
 * Profile links, the theme switch and the legal links the sidebar holds on
 * desktop. Views render into the main pane through `View`.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLingui()
  return (
    <MantineAppShell
      navbar={{ width: 240, breakpoint: SHELL_BREAKPOINT, collapsed: { mobile: true } }}
      header={{ height: { base: 52, [SHELL_BREAKPOINT]: 0 } }}
      footer={{ height: { base: 60, [SHELL_BREAKPOINT]: 0 } }}
      padding={{ base: 'md', xs: 'lg', md: 40 }}
    >
      <a href={`#${MAIN_ID}`} className={classes.skip}>
        {t`Skip to content`}
      </a>
      <Sidebar />
      <TopBar />
      <MantineAppShell.Main id={MAIN_ID} tabIndex={-1} className={classes.main}>
        <Box maw={1024} mx="auto">
          {children}
        </Box>
        <Stack gap="md" mt={40} hiddenFrom={SHELL_BREAKPOINT}>
          <ProfileLinks />
          <Box maw={240}>
            <ThemeSwitch />
          </Box>
          <LegalLinks />
        </Stack>
      </MantineAppShell.Main>
      <TabBar />
    </MantineAppShell>
  )
}
