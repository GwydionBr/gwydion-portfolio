import { useCallback, useSyncExternalStore } from 'react'
import { useMantineColorScheme } from '@mantine/core'
import {
  DARK_SYSTEM_QUERY,
  readThemeChoice,
  THEME_STORAGE_KEY,
  type Theme,
  type ThemePreference,
} from './theme'

const listeners = new Set<() => void>()
const notify = () => {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const system = matchMedia(DARK_SYSTEM_QUERY)
  // A choice made in another tab shows here too (Mantine applies it: src/theme/mantine.ts).
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) listener()
  }
  system.addEventListener('change', listener)
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    system.removeEventListener('change', listener)
    window.removeEventListener('storage', onStorage)
  }
}

function shownTheme(): Theme {
  return readThemeChoice() ?? (matchMedia(DARK_SYSTEM_QUERY).matches ? 'dark' : 'light')
}

function currentPreference(): ThemePreference {
  return readThemeChoice() ?? 'system'
}

/**
 * The theme the page is shown in (the stored choice, else the system
 * setting), the visitor's preference, and a way to change it. On the server,
 * and while hydrating, both are unknown (`null`): they live on the device.
 * Choosing goes through Mantine, which stores the choice in the theme store.
 */
export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, shownTheme, () => null)
  const preference = useSyncExternalStore<ThemePreference | null>(
    subscribe,
    currentPreference,
    () => null,
  )
  const { setColorScheme } = useMantineColorScheme()
  const choose = useCallback(
    (next: ThemePreference) => {
      setColorScheme(next === 'system' ? 'auto' : next)
      notify()
    },
    [setColorScheme],
  )
  return { theme, preference, choose }
}
