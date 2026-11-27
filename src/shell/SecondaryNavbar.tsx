import { useState, type ComponentType } from 'react'
import { Transition, type MantineTransition } from '@mantine/core'
import { ProjectNavigation } from '#/components/ProjectNavigation'
import classes from './SecondaryNavbar.module.css'

/** What the second sidebar can list: a route names one in its `secondaryNavigation`. */
export type SecondaryNavigation = 'projects'

/** Each list the second sidebar can show; each is a `nav` landmark of its own. */
const LISTS: Record<SecondaryNavigation, ComponentType> = { projects: ProjectNavigation }

/** How the second sidebar slides, and the main pane with it: fast, with a soft landing. */
export const SECONDARY_NAVBAR_MOTION = {
  duration: 280,
  timingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
}

/** In from behind the sidebar, and back behind it. */
const SLIDE: MantineTransition = {
  in: { transform: 'translateX(0)' },
  out: { transform: 'translateX(-100%)' },
  transitionProperty: 'transform',
}

/**
 * A second sidebar beside the first, from `SECONDARY_NAVBAR_BREAKPOINT` up (its CSS):
 * the items of the open view (`shown`, from its route), to open one from
 * while the view shows another. It slides in from behind the sidebar when
 * the visitor enters such a view and slides back when they leave it, showing
 * its list until it is gone. Already open on a page loaded there, it doesn't
 * slide. Below the breakpoint the list is a view of its own.
 */
export function SecondaryNavbar({ shown }: { shown: SecondaryNavigation | undefined }) {
  const [last, setLast] = useState(shown)
  if (shown !== undefined && shown !== last) setLast(shown)
  const List = last && LISTS[last]
  return (
    <Transition
      mounted={shown !== undefined}
      transition={SLIDE}
      duration={SECONDARY_NAVBAR_MOTION.duration}
      timingFunction={SECONDARY_NAVBAR_MOTION.timingFunction}
    >
      {(style) => (
        <div className={classes.navbar} style={style}>
          {List && <List />}
        </div>
      )}
    </Transition>
  )
}
