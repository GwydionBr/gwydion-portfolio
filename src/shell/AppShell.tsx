import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { AppShell as MantineAppShell, Box } from '@mantine/core'
import { useMatches } from '@tanstack/react-router'
import classes from './AppShell.module.css'
import { SHELL_BREAKPOINT } from './breakpoint'
import { Sidebar } from './Sidebar'
import { SiteSearch } from './SiteSearch'
import { TabBar } from './TabBar'
import { TopBar } from './TopBar'

/** The id of the main content landmark, the skip link's target. */
const MAIN_ID = 'main'

/** How wide the main pane's content grows: a view's usual width, and a wide view's (`viewWidth`). */
const CONTENT_WIDTH = { usual: 1024, wide: 1280 }

/**
 * The app shell (ADR 0003, prototype J), built on Mantine's AppShell: a
 * sidebar from the `sm` breakpoint up; below it a top bar (identity) and a
 * bottom tab bar whose More sheet holds what the sidebar has besides the
 * navigation. The site search opens over all of it. Views render into the
 * main pane through `View`, as wide as the open route asks (`viewWidth`).
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLingui()
  const wide = useMatches({
    select: (matches) => matches.some((match) => match.staticData.viewWidth === 'wide'),
  })
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
        <Box maw={wide ? CONTENT_WIDTH.wide : CONTENT_WIDTH.usual} mx="auto">
          {children}
        </Box>
      </MantineAppShell.Main>
      <TabBar />
      <SiteSearch />
    </MantineAppShell>
  )
}
