import { useCallback, useSyncExternalStore } from 'react'
import {
  applyThemeChoice,
  chooseTheme,
  DARK_SYSTEM_QUERY,
  oppositeOf,
  readThemeChoice,
  THEME_STORAGE_KEY,
  type Theme,
} from './theme'

const listeners = new Set<() => void>()
const notify = () => {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const system = matchMedia(DARK_SYSTEM_QUERY)
  // A choice made in another tab applies here too.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return
    applyThemeChoice(readThemeChoice())
    listener()
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

/**
 * The theme the page is shown in (the stored choice, else the system
 * setting) and a toggle to the other one. On the server, and while
 * hydrating, the theme is unknown (`null`): it lives on the device.
 */
export function useTheme() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, shownTheme, () => null)
  const toggle = useCallback(() => {
    chooseTheme(oppositeOf(shownTheme()))
    notify()
  }, [])
  return { theme, toggle }
}
