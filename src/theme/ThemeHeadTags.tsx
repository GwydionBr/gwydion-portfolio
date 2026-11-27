import { PrePaintScript } from '#/components/PrePaintScript'
import { CHROME_COLORS, FAVICONS, prePaintScript, systemMediaOf, THEMES } from './theme'

/**
 * The document head tags the theme needs: per theme a browser chrome colour
 * and a favicon, each with its system media query (which `applyThemeChoice`
 * overrides once the visitor has chosen), then the pre-paint script, which
 * must come after them.
 *
 * Rendered in the root document's `<head>`, not through the route `head`:
 * that dedupes metas by name and would keep only one `theme-color`.
 * `suppressHydrationWarning`: the pre-paint script may have changed `media`
 * and the theme on `<html>` before React hydrates.
 */
export function ThemeHeadTags() {
  return (
    <>
      {THEMES.map((theme) => (
        <meta
          key={`color-${theme}`}
          name="theme-color"
          content={CHROME_COLORS[theme]}
          media={systemMediaOf(theme)}
          data-theme={theme}
          suppressHydrationWarning
        />
      ))}
      {THEMES.map((theme) => (
        <link
          key={`icon-${theme}`}
          rel="icon"
          href={FAVICONS[theme]}
          type="image/svg+xml"
          media={systemMediaOf(theme)}
          data-theme={theme}
          suppressHydrationWarning
        />
      ))}
      <PrePaintScript script={prePaintScript} />
    </>
  )
}
