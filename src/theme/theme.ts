/**
 * The site theme. Without a stored choice the page follows the visitor's
 * system setting (`prefers-color-scheme`), live. The theme switch can store
 * an explicit choice on the device (localStorage), which the pre-paint script
 * applies before the first frame; choosing System removes it again.
 *
 * The contract with the stylesheet (src/styles/app.css) is one attribute:
 * `<html data-theme="light|dark">` when the visitor has chosen, none when
 * the system decides.
 */

export const THEMES = ['light', 'dark'] as const
export type Theme = (typeof THEMES)[number]

/** What the visitor can pick: a theme, or following the system (the default). */
export const THEME_PREFERENCES = ['system', ...THEMES] as const
export type ThemePreference = (typeof THEME_PREFERENCES)[number]

export const THEME_STORAGE_KEY = 'theme'

/** The query that is true when the system setting is dark. */
export const DARK_SYSTEM_QUERY = '(prefers-color-scheme: dark)'

/** The browser chrome colour per theme: the sidebar and top bar colour (`--sidebar`). */
export const CHROME_COLORS: Record<Theme, string> = { light: '#fafaf9', dark: '#171716' }

/** The favicon per theme. */
export const FAVICONS: Record<Theme, string> = {
  light: '/favicon-light.svg',
  dark: '/favicon-dark.svg',
}

export function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme)
}

/**
 * The media query a theme's head tag (chrome colour, favicon) carries while
 * the system decides. The tag's `data-theme` names its theme, so
 * `applyThemeChoice` can override the query once the visitor has chosen.
 */
export function systemMediaOf(theme: Theme) {
  return `(prefers-color-scheme: ${theme})`
}

/**
 * Puts a theme choice (or none: follow the system) on the document: the
 * `data-theme` attribute for the stylesheet, and the media of the
 * per-theme head tags, so chrome colour and favicon follow the choice too.
 *
 * Self-contained on purpose: it is serialized into the pre-paint script
 * (`prePaintScript`), so it must not reference anything outside its body.
 */
export function applyThemeChoice(choice: string | null) {
  const root = document.documentElement
  const theme = choice === 'light' || choice === 'dark' ? choice : null
  if (theme) root.dataset.theme = theme
  else delete root.dataset.theme
  for (const tag of document.head.querySelectorAll<HTMLElement>('[data-theme]')) {
    const own = tag.dataset.theme
    tag.setAttribute(
      'media',
      theme ? (own === theme ? 'all' : 'not all') : `(prefers-color-scheme: ${own})`,
    )
  }
}

/** The visitor's stored choice, or `null` when there is none (or storage is blocked). */
export function readThemeChoice(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : null
  } catch {
    return null
  }
}

/** Stores the visitor's preference and applies it; `system` clears any stored choice. */
export function chooseTheme(preference: ThemePreference) {
  const choice = preference === 'system' ? null : preference
  try {
    if (choice) localStorage.setItem(THEME_STORAGE_KEY, choice)
    else localStorage.removeItem(THEME_STORAGE_KEY)
  } catch {
    // Storage blocked: the choice still applies to this page.
  }
  applyThemeChoice(choice)
}

/**
 * The inline `<head>` script that applies the stored choice while the
 * document is parsed, before the first paint, so a reload never flashes the
 * other theme.
 */
export const prePaintScript = `(function(){var choice=null;try{choice=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}(${applyThemeChoice.toString()})(choice)})()`
