import { useState, type ComponentType } from 'react'
import { ProjectNavigation } from '#/components/ProjectNavigation'
import classes from './SecondaryNavbar.module.css'

/** What the second sidebar can list: a route names one in its `secondaryNavigation`. */
export type SecondaryNavigation = 'projects'

/** Each list the second sidebar can show; each is a `nav` landmark of its own. */
const LISTS: Record<SecondaryNavigation, ComponentType> = { projects: ProjectNavigation }

/**
 * How the second sidebar slides, fast with a soft landing. The shell hands
 * it to Mantine's AppShell, so the main pane makes room in the same motion;
 * the slide reads it back from the AppShell's CSS variables.
 */
export const SECONDARY_NAVBAR_MOTION = {
  duration: 280,
  timingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
}

/**
 * A second sidebar beside the first, from `SECONDARY_NAVBAR_BREAKPOINT` up (its CSS):
 * the items of the open view (`shown`, from its route), to open one from
 * while the view shows another. It slides in from behind the sidebar when
 * the visitor enters such a view and slides back when they leave it, still
 * showing its list on the way out; already open on a page loaded there, it
 * doesn't slide.
 *
 * The slide is a CSS transition on `data-shown`, set in the same render as
 * the main pane's room (`data-secondary-navbar`), so both start in the same
 * frame. Slid away, it is hidden and inert: out of the tab order and the
 * accessibility tree.
 */
export function SecondaryNavbar({ shown }: { shown: SecondaryNavigation | undefined }) {
  const [last, setLast] = useState(shown)
  if (shown !== undefined && shown !== last) setLast(shown)
  const List = last && LISTS[last]
  const open = shown !== undefined
  return (
    <div
      className={classes.navbar}
      data-shown={open || undefined}
      inert={!open}
      aria-hidden={!open || undefined}
    >
      {List && <List />}
    </div>
  )
}
