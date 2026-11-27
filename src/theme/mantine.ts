import {
  Button,
  createTheme,
  type CSSVariablesResolver,
  type MantineColorSchemeManager,
} from '@mantine/core'
import { chooseTheme, readThemeChoice, THEME_STORAGE_KEY } from './theme'

/**
 * The site's Mantine theme. Colours come from the tokens in
 * src/styles/app.css (`var(--ink)`, …), never from Mantine's palette, so the
 * contrast test there covers every component.
 */
export const siteTheme = createTheme({
  fontFamily: "'Inter Variable', system-ui, sans-serif",
  headings: {
    fontFamily: "'Inter Variable', system-ui, sans-serif",
    fontWeight: '600',
  },
  primaryColor: 'blue',
  defaultRadius: 'md',
  cursorType: 'pointer',
  // Visitors who ask for less motion get Mantine's transitions instantly.
  respectReducedMotion: true,
  components: {
    Button: Button.extend({
      defaultProps: { variant: 'filled' },
      // `filled` is the one main action of a place: ink on canvas, in both themes.
      vars: (_theme, props) =>
        props.variant === 'filled' || props.variant === undefined
          ? {
              root: {
                '--button-bg': 'var(--ink)',
                '--button-hover': 'color-mix(in srgb, var(--ink) 88%, var(--canvas))',
                '--button-color': 'var(--canvas)',
              },
            }
          : { root: {} },
    }),
  },
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
