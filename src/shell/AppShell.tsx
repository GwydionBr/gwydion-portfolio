import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { AppShell as MantineAppShell, Box } from '@mantine/core'
import { useMatches } from '@tanstack/react-router'
import classes from './AppShell.module.css'
import { SHELL_BREAKPOINT } from './breakpoint'
import { paneWidthCss, SECONDARY_NAVBAR_WIDTH } from './paneWidth'
import { SHELL_MOTION } from './motion'
import { SecondaryNavbar } from './SecondaryNavbar'
import { Sidebar } from './Sidebar'
import { SIDEBAR_RAIL_WIDTH, SIDEBAR_WIDTH_CSS, useSidebarResize } from './sidebarLayout'
import { SiteSearch } from './SiteSearch'
import { TabBar } from './TabBar'
import { Toasts } from './toast'
import { TopBar } from './TopBar'

/** The id of the main content landmark, the skip link's target. */
const MAIN_ID = 'main'

/**
 * The app shell (ADR 0003, prototype J), built on Mantine's AppShell: a
 * sidebar from the `sm` breakpoint up, which the visitor can resize and
 * collapse to an icon rail (src/shell/sidebarLayout.ts); below it a top bar
 * (identity) and a bottom tab bar whose More sheet holds what the sidebar has
 * besides the navigation. On wide screens a view may ask for a second
 * sidebar beside the first (`secondaryNavigation`), which slides in as the
 * main pane makes room, and which the visitor can resize too. The site
 * search opens over all of it; toasts (src/shell/toast.tsx) show in its
 * corner. Views render into the main pane through `View`.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLingui()
  const resize = useSidebarResize(t`Resize sidebar`)
  const secondary = useMatches({
    select: (matches) =>
      matches.find((match) => match.staticData.secondaryNavigation)?.staticData.secondaryNavigation,
  })
  return (
    <MantineAppShell
      className={classes.shell}
      // The panes' widths for the stylesheets, from the same constants as the code.
      style={{
        '--sidebar-rail-width': `calc(${SIDEBAR_RAIL_WIDTH / 16}rem * var(--mantine-scale))`,
        '--secondary-navbar-size': paneWidthCss(SECONDARY_NAVBAR_WIDTH),
      }}
      resize={resize}
      // The main pane makes room in step with the second sidebar's slide and the sidebar collapsing.
      transitionDuration={SHELL_MOTION.duration}
      transitionTimingFunction={SHELL_MOTION.timingFunction}
      navbar={{
        width: SIDEBAR_WIDTH_CSS,
        breakpoint: SHELL_BREAKPOINT,
        collapsed: { mobile: true },
      }}
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
      <Toasts />
    </MantineAppShell>
  )
}
