import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { AppShell as MantineAppShell, Box } from '@mantine/core'
import { useMatches } from '@tanstack/react-router'
import classes from './AppShell.module.css'
import { SHELL_BREAKPOINT } from './breakpoint'
import { SECONDARY_NAVBAR_MOTION, SecondaryNavbar } from './SecondaryNavbar'
import { Sidebar } from './Sidebar'
import { SiteSearch } from './SiteSearch'
import { TabBar } from './TabBar'
import { TopBar } from './TopBar'

/** The id of the main content landmark, the skip link's target. */
const MAIN_ID = 'main'

/**
 * The app shell (ADR 0003, prototype J), built on Mantine's AppShell: a
 * sidebar from the `sm` breakpoint up; below it a top bar (identity) and a
 * bottom tab bar whose More sheet holds what the sidebar has besides the
 * navigation. On wide screens a view may ask for a second sidebar beside the
 * first (`secondaryNavigation`), which slides in as the main pane makes room.
 * The site search opens over all of it. Views render into the main pane
 * through `View`.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLingui()
  const secondary = useMatches({
    select: (matches) =>
      matches.find((match) => match.staticData.secondaryNavigation)?.staticData.secondaryNavigation,
  })
  return (
    <MantineAppShell
      className={classes.shell}
      // The main pane makes room for the second sidebar in step with its slide.
      transitionDuration={SECONDARY_NAVBAR_MOTION.duration}
      transitionTimingFunction={SECONDARY_NAVBAR_MOTION.timingFunction}
      navbar={{ width: 240, breakpoint: SHELL_BREAKPOINT, collapsed: { mobile: true } }}
      header={{ height: { base: 52, [SHELL_BREAKPOINT]: 0 } }}
      footer={{ height: { base: 60, [SHELL_BREAKPOINT]: 0 } }}
      padding={{ base: 'md', xs: 'lg', md: 40 }}
    >
      <a href={`#${MAIN_ID}`} className={classes.skip}>
        {t`Skip to content`}
      </a>
      <Sidebar />
      <SecondaryNavbar shown={secondary} />
      <TopBar />
      <MantineAppShell.Main
        id={MAIN_ID}
        tabIndex={-1}
        className={classes.main}
        data-secondary-navbar={secondary !== undefined || undefined}
      >
        <Box maw={1024} mx="auto">
          {children}
        </Box>
      </MantineAppShell.Main>
      <TabBar />
      <SiteSearch />
    </MantineAppShell>
  )
}
