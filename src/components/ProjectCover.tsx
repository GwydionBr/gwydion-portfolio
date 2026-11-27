import { Paper } from '@mantine/core'
import type { Screenshot } from '#/content'
import { EnlargeableScreenshot, useScreenshotViewer } from './story/ScreenshotViewer'
import classes from './ProjectCover.module.css'

/**
 * A Project's cover: its chosen screenshot in a plain browser window, the
 * address of its website in the bar (a bare bar without one). The window is
 * decoration; the screenshot keeps its alt text and opens enlarged on click.
 */
export function ProjectCover({ shot, address }: { shot: Screenshot; address?: string }) {
  const { enlarge, viewer } = useScreenshotViewer([shot])
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
        enlarge={enlarge(0)}
        flush
        sizes="(min-width: 1024px) 30rem, 100vw"
        className={classes.image}
      />
      {viewer}
    </Paper>
  )
}
