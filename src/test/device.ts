import type { Theme } from '#/theme/theme'

type Listener = (event: MediaQueryListEvent) => void

/** The window widths the tests open pages at, in CSS pixels: either side of the shell's breakpoint (48em). */
export const SCREENS = { phone: 390, desktop: 1280 } as const
export type Screen = keyof typeof SCREENS

/**
 * A stand-in for the visitor's device: jsdom has no `matchMedia`, so this
 * answers media queries on the operating-system appearance setting
 * (`prefers-color-scheme`) and the window width (`min-width`, `max-width`),
 * and notifies listeners when either changes, like a browser does. jsdom
 * also animates nothing, so the visitor asks for reduced motion: Mantine's
 * transitions (src/theme/mantine.ts) then finish at once.
 *
 * jsdom applies no stylesheets either: whatever the width, the page shows
 * both the sidebar and the phone bars. The width only reaches the code that
 * asks for it.
 */
export function emulateDevice(initial: { theme: Theme; screen: Screen }) {
  let theme = initial.theme
  let width: number = SCREENS[initial.screen]
  const lists = new Set<{ media: string; listeners: Set<Listener> }>()

  const pixels = (length: string) => parseFloat(length) * (/r?em$/.test(length) ? 16 : 1)
  const holds = (feature: string) => {
    const [name, value = ''] = feature.split(':').map((part) => part.trim())
    if (name === 'prefers-reduced-motion') return value === 'reduce'
    if (name === 'prefers-color-scheme') return value === theme
    if (name === 'min-width') return width >= pixels(value)
    if (name === 'max-width') return width <= pixels(value)
    return false
  }
  const matches = (media: string) => {
    if (media === 'all') return true
    const features = [...media.matchAll(/\(([^)]*)\)/g)].map((match) => match[1]!)
    return features.length > 0 && features.every(holds)
  }

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

  const notify = () => {
    for (const entry of lists) {
      const event = { matches: matches(entry.media), media: entry.media } as MediaQueryListEvent
      for (const listener of entry.listeners) listener(event)
    }
  }

  return {
    /** Changes the system setting, as when the visitor switches their OS to dark mode. */
    setTheme(next: Theme) {
      theme = next
      notify()
    },
    /** Resizes the window, as when the visitor drags it narrower or wider. */
    resize(screen: Screen) {
      width = SCREENS[screen]
      notify()
    },
  }
}
