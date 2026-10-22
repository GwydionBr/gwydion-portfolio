import { Box } from '@mantine/core'
import type { CSSProperties } from 'react'
import { getLocale } from '#/generated/paraglide/runtime'
import {
  SELF_ENGINE_SCREENSHOT_SCHEMES,
  SELF_ENGINE_SCREENSHOT_SIZE,
  screenshotSource,
  type SelfEngineScreenshot,
} from '../content/screenshots'

interface SelfEngineScreenshotImageProps {
  view: SelfEngineScreenshot['view']
  alt: string
  /** The `sizes` attribute: how wide the image renders, so small slots pick the 1× file. */
  sizes: string
  /** Must not set `display`: an inline one overrides the class that hides the other scheme. */
  style?: CSSProperties
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
  style,
}: SelfEngineScreenshotImageProps) {
  const locale = getLocale()

  return SELF_ENGINE_SCREENSHOT_SCHEMES.map((scheme) => {
    const { src, srcSet } = screenshotSource(view, locale, scheme)
    return (
      <Box
        key={scheme}
        component="img"
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={SELF_ENGINE_SCREENSHOT_SIZE.width}
        height={SELF_ENGINE_SCREENSHOT_SIZE.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        lightHidden={scheme === 'dark'}
        darkHidden={scheme === 'light'}
        w="100%"
        h="auto"
        style={style}
      />
    )
  })
}
