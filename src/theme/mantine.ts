import {
  createTheme,
  type CSSVariablesResolver,
  type MantineColorSchemeManager,
} from '@mantine/core'
import { siteComponents } from './components'
import { chooseTheme, readThemeChoice, THEME_STORAGE_KEY } from './theme'

/**
 * The site's Mantine theme. Colours come from the tokens in
 * src/styles/app.css (`var(--ink)`, …), never from Mantine's palette, so the
 * contrast test there covers every component; each component's look is in
 * src/theme/components.ts.
 */
export const siteTheme = createTheme({
  fontFamily: "'Inter Variable', system-ui, sans-serif",
  headings: {
    fontFamily: "'Inter Variable', system-ui, sans-serif",
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '1.5rem', lineHeight: '1.25' },
      h2: { fontSize: '1rem', lineHeight: '1.5' },
      h3: { fontSize: '0.875rem', lineHeight: '1.5' },
    },
  },
  /*
   * Mantine's neutrals, warmed to the tokens' stone greys: whatever a
   * component draws from them (a hover, a track, a border) matches the site.
   * `gray` serves the light theme, `dark` the dark one.
   */
  colors: {
    gray: [
      '#fafaf9',
      '#f3f3f1',
      '#e9e9e6',
      '#dededa',
      '#c8c8c3',
      '#a8a8a3',
      '#8a8a85',
      '#666662',
      '#525250',
      '#3b3b39',
    ],
    dark: [
      '#ededec',
      '#b4b4b2',
      '#8f8f8d',
      '#6c6c6a',
      '#3b3b39',
      '#2d2d2b',
      '#262625',
      '#1e1e1d',
      '#171716',
      '#111110',
    ],
  },
  primaryColor: 'blue',
  defaultRadius: 'md',
  cursorType: 'pointer',
  // Visitors who ask for less motion get Mantine's transitions instantly.
  respectReducedMotion: true,
  components: siteComponents,
})

/** Mantine's own colour variables, pointed at the site's tokens (src/styles/app.css). */
const TOKEN_VARIABLES = {
  '--mantine-color-body': 'var(--canvas)',
  '--mantine-color-text': 'var(--muted)',
  '--mantine-color-bright': 'var(--ink)',
  '--mantine-color-dimmed': 'var(--subtle)',
  '--mantine-color-placeholder': 'var(--subtle)',
  '--mantine-color-anchor': 'var(--ink)',
  '--mantine-color-default': 'var(--surface)',
  '--mantine-color-default-hover': 'var(--hover)',
  '--mantine-color-default-color': 'var(--ink)',
  '--mantine-color-default-border': 'var(--line)',
  '--mantine-color-error': 'var(--danger)',
}

/** The tokens follow the theme on their own (`light-dark()`), so both schemes map alike. */
export const siteCssVariables: CSSVariablesResolver = () => ({
  variables: {},
  light: TOKEN_VARIABLES,
  dark: TOKEN_VARIABLES,
})

/**
 * Mantine's colour scheme, kept in the site's theme store (src/theme/theme.ts):
 * the same storage key, `auto` (follow the system) when nothing is stored.
 * Setting a scheme stores it and updates the head tags; a choice made in
 * another tab reaches Mantine through `subscribe`.
 */
export function siteColorSchemeManager(): MantineColorSchemeManager {
  let onStorage: ((event: StorageEvent) => void) | undefined
  return {
    get: (fallback) => (typeof window === 'undefined' ? fallback : (readThemeChoice() ?? 'auto')),
    set: (scheme) => chooseTheme(scheme === 'auto' ? 'system' : scheme),
    subscribe: (onUpdate) => {
      onStorage = (event) => {
        if (event.key === THEME_STORAGE_KEY || event.key === null)
          onUpdate(readThemeChoice() ?? 'auto')
      }
      window.addEventListener('storage', onStorage)
    },
    unsubscribe: () => {
      if (onStorage) window.removeEventListener('storage', onStorage)
    },
    clear: () => chooseTheme('system'),
  }
}
