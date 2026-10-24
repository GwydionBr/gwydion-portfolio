import { Box } from '@mantine/core'
import { getLocale } from '#/generated/paraglide/runtime'
import {
  SELF_ENGINE_SCREENSHOT_SCHEMES,
  screenshotSize,
  screenshotSource,
  type SelfEngineScreenshotView,
} from '../content/screenshots'

interface SelfEngineScreenshotImageProps {
  view: SelfEngineScreenshotView
  alt: string
  /** The `sizes` attribute: how wide the image renders, so small slots pick the 1× file. */
  sizes: string
  /**
   * Replaces the default full-width sizing, so it must set the width itself. Must not set
   * `display`: the class that hides the other scheme sets it.
   */
  className?: string
  /** Read by the stage's crops: a whole window or a close-up of one element. */
  'data-fit'?: 'window' | 'close-up'
}

/**
 * A Self-Engine screenshot in the visitor's language and the site's color scheme.
 *
 * Both schemes' images are rendered and Mantine's `lightHidden` / `darkHidden` show the
 * one matching the scheme Mantine sets on `<html>` before the first paint, so server and
 * client markup stay identical. The images load lazily, so the hidden one
 * (`display: none`) is never fetched.
 */
export function SelfEngineScreenshotImage({
  view,
  alt,
  sizes,
  className,
  'data-fit': fit,
}: SelfEngineScreenshotImageProps) {
  const locale = getLocale()
  const { width, height } = screenshotSize(view)

  return SELF_ENGINE_SCREENSHOT_SCHEMES.map((scheme) => {
    const { src, srcSet } = screenshotSource(view, locale, scheme)
    return (
      <Box
        key={scheme}
        component="img"
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        decoding="async"
        lightHidden={scheme === 'dark'}
        darkHidden={scheme === 'light'}
        className={className}
        data-fit={fit}
        // Inline sizing would beat the class, so it only applies without one.
        w={className ? undefined : '100%'}
        h={className ? undefined : 'auto'}
      />
    )
  })
}
