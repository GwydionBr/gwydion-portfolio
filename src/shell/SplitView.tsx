import type { ReactNode } from 'react'
import { Box } from '@mantine/core'
import { SPLIT_BREAKPOINT } from './breakpoint'
import classes from './SplitView.module.css'

/**
 * A detail view beside its list, as a mail app shows a message beside the
 * inbox: from `SPLIT_BREAKPOINT` up, `list` is a pane on the left that stays
 * put while the visitor scrolls the detail (`children`, which renders its own
 * `View`) or opens another item from it. Below the breakpoint the pane is
 * gone and the detail takes the whole width; the list is a view of its own.
 * Its route asks the shell for the wide width (`viewWidth: 'wide'`).
 */
export function SplitView({ list, children }: { list: ReactNode; children: ReactNode }) {
  return (
    <div className={classes.split}>
      <Box visibleFrom={SPLIT_BREAKPOINT} className={classes.list}>
        {list}
      </Box>
      <div className={classes.detail}>{children}</div>
    </div>
  )
}
