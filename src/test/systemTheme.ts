import type { Theme } from '#/theme/theme'

type Listener = (event: MediaQueryListEvent) => void

/**
 * A stand-in for the visitor's operating-system appearance setting: jsdom has
 * no `matchMedia`, so this answers `(prefers-color-scheme: …)` queries and
 * notifies listeners when the setting changes, like a browser does.
 */
export function emulateSystemTheme(initial: Theme) {
  let current = initial
  const lists = new Set<{ media: string; listeners: Set<Listener> }>()
  const matches = (media: string) =>
    media === 'all' || (media !== 'not all' && media.includes(`prefers-color-scheme: ${current}`))

  window.matchMedia = (media: string) => {
    const entry = { media, listeners: new Set<Listener>() }
    lists.add(entry)
    const list = {
      media,
      get matches() {
        return matches(media)
      },
      onchange: null,
      addEventListener: (_type: string, listener: Listener) => entry.listeners.add(listener),
      removeEventListener: (_type: string, listener: Listener) => entry.listeners.delete(listener),
      addListener: (listener: Listener) => entry.listeners.add(listener),
      removeListener: (listener: Listener) => entry.listeners.delete(listener),
      dispatchEvent: () => true,
    }
    return list as unknown as MediaQueryList
  }

  return {
    /** Changes the system setting, as when the visitor switches their OS to dark mode. */
    set(theme: Theme) {
      current = theme
      for (const entry of lists) {
        const event = { matches: matches(entry.media), media: entry.media } as MediaQueryListEvent
        for (const listener of entry.listeners) listener(event)
      }
    },
  }
}
