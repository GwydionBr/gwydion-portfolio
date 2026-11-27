import { useId, useState, type ComponentType } from 'react'
import { useLingui } from '@lingui/react/macro'
import { ProjectNavigation } from '#/components/ProjectNavigation'
import { PaneResizeHandle } from './PaneResizeHandle'
import { SECONDARY_NAVBAR_WIDTH } from './paneWidth'
import type { SecondaryNavigation } from './secondaryNavigation'
import classes from './SecondaryNavbar.module.css'

/** Each list the second sidebar can show; each is a `nav` landmark of its own. */
const LISTS: Record<SecondaryNavigation, ComponentType> = { projects: ProjectNavigation }

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
 *
 * The visitor can resize it on its edge like the sidebar
 * (`SECONDARY_NAVBAR_WIDTH`); the main pane makes room as it does.
 */
export function SecondaryNavbar({ shown }: { shown: SecondaryNavigation | undefined }) {
  const { t } = useLingui()
  const id = useId()
  const [last, setLast] = useState(shown)
  if (shown !== undefined && shown !== last) setLast(shown)
  const List = last && LISTS[last]
  const open = shown !== undefined
  const resizeLabels: Record<SecondaryNavigation, string> = { projects: t`Resize project list` }
  return (
    <div
      id={id}
      className={classes.navbar}
      data-shown={open || undefined}
      inert={!open}
      aria-hidden={!open || undefined}
    >
      {/* What scrolls in a short window; the resize handle stays outside, on the edge. */}
      <div className={classes.content}>{List && <List />}</div>
      {last && (
        <PaneResizeHandle pane={SECONDARY_NAVBAR_WIDTH} label={resizeLabels[last]} controls={id} />
      )}
    </div>
  )
}
