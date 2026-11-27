import { useEffect } from 'react'
import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

/** Below this Mantine breakpoint (`sm`, 48em) the sidebar gives way to the phone's top and tab bars. */
export const SHELL_BREAKPOINT = 'sm'

/**
 * From this Mantine breakpoint (`lg`, 75em) up, a detail view keeps its list
 * in a pane beside it (`SplitView`); below it the detail takes the whole pane.
 */
export const SPLIT_BREAKPOINT = 'lg'

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
