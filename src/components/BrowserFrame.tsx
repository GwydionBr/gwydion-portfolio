import type { ReactNode } from 'react'
import { Paper, type MantineShadow } from '@mantine/core'
import type { Project } from '#/content'
import classes from './BrowserFrame.module.css'

/**
 * A plain browser window around a Project's screenshot: three dots and the
 * address of its website in the bar (a bare bar without one). The window is
 * decoration, hidden from screen readers; what it holds is not. A Project's
 * cover on its page and its card on the Overview both wear it.
 */
export function BrowserFrame({
  address,
  shadow,
  children,
}: {
  address?: string
  /** Raised off the page (a cover on its own), or flat (a cover inside a card). */
  shadow?: MantineShadow
  children: ReactNode
}) {
  return (
    <Paper shadow={shadow} className={classes.window}>
      <div className={classes.bar} aria-hidden>
        <span className={classes.dot} />
        <span className={classes.dot} />
        <span className={classes.dot} />
        {address && <span className={classes.address}>{address}</span>}
      </div>
      {children}
    </Paper>
  )
}

/** The host of a Project's website ("example.com"), for a frame's address bar; none without a website. */
export function websiteAddress(project: Pick<Project, 'links'>): string | undefined {
  return project.links.live && new URL(project.links.live).host
}
