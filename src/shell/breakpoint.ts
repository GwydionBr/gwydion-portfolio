import { useEffect } from 'react'
import { DEFAULT_THEME, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { siteTheme } from '#/theme/mantine'

/** Below this Mantine breakpoint (`sm`, 48em) the sidebar gives way to the phone's top and tab bars. */
export const SHELL_BREAKPOINT = 'sm'

/**
 * From this Mantine breakpoint (`lg`, 75em) up, a view with items to open
 * (the Projects) lists them in a second sidebar beside the first
 * (`SecondaryNavbar`); below it the list is a view of its own.
 */
export const SECONDARY_NAVBAR_BREAKPOINT = 'lg'

const SECONDARY_NAVBAR_QUERY = `(min-width: ${
  siteTheme.breakpoints?.[SECONDARY_NAVBAR_BREAKPOINT] ??
  DEFAULT_THEME.breakpoints[SECONDARY_NAVBAR_BREAKPOINT]
})`

/** Whether the window is wide enough for the second sidebar now; `false` on the server, which can't know. */
export function secondaryNavbarFits(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(SECONDARY_NAVBAR_QUERY).matches
}

/** Whether the window is wide enough for the second sidebar, following its resizes; `undefined` until the page knows. */
export function useSecondaryNavbarFits(): boolean | undefined {
  return useMediaQuery(SECONDARY_NAVBAR_QUERY)
}

/** Where the shell's navigation is: the sidebar or the phone's tab bar. */
export type ShellNavigation = 'sidebar' | 'tabBar'

/** Which navigation the window is wide enough for; `undefined` until the page knows the width. */
export function useShellNavigation(): ShellNavigation | undefined {
  const { breakpoints } = useMantineTheme()
  const wide = useMediaQuery(`(min-width: ${breakpoints[SHELL_BREAKPOINT]})`)
  if (wide === undefined) return undefined
  return wide ? 'sidebar' : 'tabBar'
}

/**
 * Closes a panel opened from `navigation` (the sidebar's Settings, the tab
 * bar's More sheet) once the window crosses the breakpoint and the shell
 * hides it: the panel lives in a portal and would stay open without it.
 */
export function useCloseWhenHidden(navigation: ShellNavigation, close: () => void) {
  const shown = useShellNavigation()
  useEffect(() => {
    if (shown !== undefined && shown !== navigation) close()
  }, [shown, navigation, close])
}
