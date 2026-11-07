import type { Screenshot } from '#/content'
import { THEMES, type Theme } from '#/theme/theme'

/**
 * A screenshot in the theme shown, offered at 1× and 2× (`srcSet`), so the
 * browser loads the file that fits `sizes`.
 *
 * While the theme is unknown (server render, hydration) both themes' images
 * render and the stylesheet hides the other one (`dark:`), so the markup is
 * the same on server and client and the first paint is already right; the
 * hidden one is lazy, so it is never fetched. Once the theme is known only
 * its image renders, and a theme switch swaps it.
 */
export function ScreenshotImage({
  shot,
  theme,
  sizes,
  className = '',
}: {
  shot: Screenshot
  theme: Theme | null
  sizes: string
  /** Sizing only; must not set `display`, which hides the other theme's image. */
  className?: string
}) {
  return (theme ? [theme] : THEMES).map((shown) => {
    const image = shot.images[shown]
    if (!image) return null
    const hide = theme ? '' : shown === 'dark' ? 'hidden dark:block' : 'dark:hidden'
    return (
      <img
        key={shown}
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={shot.width}
        height={shot.height}
        alt={shot.alt}
        loading="lazy"
        decoding="async"
        className={`${className} ${hide}`}
      />
    )
  })
}
