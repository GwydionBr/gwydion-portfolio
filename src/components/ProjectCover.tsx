import { Paper } from '@mantine/core'
import type { Screenshot } from '#/content'
import { EnlargeableScreenshot } from './ScreenshotLightbox'
import classes from './ProjectCover.module.css'

/**
 * A Project's cover: its chosen screenshot in a plain browser window, the
 * address of its website in the bar (a bare bar without one). The window is
 * decoration; the screenshot keeps its alt text and opens in the page's
 * lightbox on click, first of the page's screenshots.
 */
export function ProjectCover({ shot, address }: { shot: Screenshot; address?: string }) {
  return (
    <Paper shadow="xl" className={classes.window}>
      <div className={classes.bar} aria-hidden>
        <span className={classes.dot} />
        <span className={classes.dot} />
        <span className={classes.dot} />
        {address && <span className={classes.address}>{address}</span>}
      </div>
      <EnlargeableScreenshot
        shot={shot}
        flush
        sizes="(min-width: 1024px) 30rem, 100vw"
        className={classes.image}
      />
    </Paper>
  )
}
