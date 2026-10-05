/** Browser chrome (favicon, address bar color) per resolved color scheme. `public/manifest.json` mirrors the light color. */
export const FAVICON_BY_SCHEME = {
  light: '/favicon-light.svg',
  dark: '/favicon-dark.svg',
} as const

export const THEME_COLOR_BY_SCHEME = {
  light: '#f3efe4',
  dark: '#0f1612',
} as const

/**
 * Runs before hydration so the favicon and theme color match the stored scheme without a flash.
 * `ThemeFaviconSync` takes over once React is mounted.
 */
export const THEME_CHROME_BOOT_SCRIPT = `(() => {
  try {
    const favicons = ${JSON.stringify(FAVICON_BY_SCHEME)};
    const themeColors = ${JSON.stringify(THEME_COLOR_BY_SCHEME)};
    const stored = window.localStorage.getItem('mantine-color-scheme-value') ?? 'auto';
    const scheme =
      stored === 'auto'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : stored;
    document.querySelector('link[data-app-favicon]')?.setAttribute('href', favicons[scheme]);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColors[scheme]);
  } catch {}
})();`
