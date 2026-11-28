import { Box } from '@mantine/core'
import type { Screenshot } from '#/content'
import { THEMES, type Theme } from '#/theme/theme'

/**
 * A screenshot in the theme shown, offered at 1× and 2× (`srcSet`), so the
 * browser loads the file that fits `sizes`.
 *
 * While the theme is unknown (server render, hydration) both themes' images
 * render and Mantine’s color scheme hides the other one, so the markup is
 * the same on server and client and the first paint is already right; the
 * hidden one is lazy, so it is never fetched. Once the theme is known only
 * its image renders, and a theme switch swaps it.
 *
 * `priority` is for an image in the first screen: fetched first, and no
 * longer lazy once the theme is known (before that, lazy keeps the hidden
 * theme's image from being fetched too).
 */
export function ScreenshotImage({
  shot,
  theme,
  sizes,
  priority = false,
  className,
}: {
  shot: Screenshot
  theme: Theme | null
  sizes: string
  priority?: boolean
  /** Sizing only; must not set `display`, which hides the other theme's image. */
  className?: string
}) {
  return (theme ? [theme] : THEMES).map((shown) => {
    const image = shot.images[shown]
    if (!image) return null
    return (
      <Box
        component="img"
        key={shown}
        src={image.src}
        srcSet={image.srcSet}
        sizes={sizes}
        width={shot.width}
        height={shot.height}
        alt={shot.alt}
        loading={priority && theme ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        className={className}
        lightHidden={theme === null && shown === 'dark'}
        darkHidden={theme === null && shown === 'light'}
      />
    )
  })
}
