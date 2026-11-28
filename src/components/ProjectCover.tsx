import type { Screenshot } from '#/content'
import { BrowserFrame } from './BrowserFrame'
import { EnlargeableScreenshot } from './ScreenshotLightbox'
import classes from './ProjectCover.module.css'

/**
 * A Project's cover on its page: its chosen screenshot in a plain browser
 * window (BrowserFrame), raised off the page. The screenshot keeps its alt
 * text and opens in the page's lightbox on click, first of the page's
 * screenshots.
 */
export function ProjectCover({ shot, address }: { shot: Screenshot; address?: string }) {
  return (
    <BrowserFrame shadow="xl" address={address}>
      <EnlargeableScreenshot
        shot={shot}
        flush
        sizes="(min-width: 1024px) 30rem, 100vw"
        className={classes.image}
      />
    </BrowserFrame>
  )
}
