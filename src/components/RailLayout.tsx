import type { ReactNode } from 'react'
import classes from './RailLayout.module.css'

/**
 * A page's main column with a rail beside it that stays in view while the
 * main column scrolls, used by the Overview and the Project pages so both
 * behave alike. The rail goes beside the main column only where the page
 * gives both room (by the layout's own width, not the window's: the
 * sidebars take their share); on a window too short for it, the rail
 * scrolls on its own. Narrower, everything is one column in this order:
 * `top`, the rail's `lead`, `main`, the rail's `tail`, `foot`.
 *
 * In the page the rail comes before the main column, so it reads (and
 * tabs) in the order it shows when wide; `tail` should hold nothing to
 * focus, as narrow it shows after `main`.
 */
export function RailLayout({
  side = 'end',
  top,
  lead,
  tail,
  main,
  foot,
  className,
}: {
  /** Which side of the main column the rail stands on when wide. */
  side?: 'start' | 'end'
  /** Above both columns, as wide as the layout. */
  top?: ReactNode
  /** The rail's first part; narrow, before the main column. */
  lead?: ReactNode
  /** The rail's second part; narrow, after the main column. */
  tail?: ReactNode
  main: ReactNode
  /** Wide, under the rail, level with the main column's end; narrow, last. */
  foot?: ReactNode
  /** Placement only, or `--rail-stack-gap` (the room between the rail's parts). */
  className?: string
}) {
  return (
    <div className={className ? `${classes.layout} ${className}` : classes.layout}>
      {top}
      <div className={classes.columns} data-rail-side={side}>
        {/* The rail's cell ends where the foot begins, and so does its stay in view. */}
        <div className={classes.railCell}>
          <div className={classes.rail}>
            {lead && <div className={classes.lead}>{lead}</div>}
            {tail && <div className={classes.tail}>{tail}</div>}
          </div>
        </div>
        <div className={classes.main}>{main}</div>
        {foot && <div className={classes.foot}>{foot}</div>}
      </div>
    </div>
  )
}

/** Shown only while the rail stands beside the main column, such as a list of the main column's sections. */
export function WideOnly({ children }: { children: ReactNode }) {
  return <div className={classes.wideOnly}>{children}</div>
}
