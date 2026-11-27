import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Box, useMantineTheme } from '@mantine/core'
import { RESIZE_HANDLE_CLASS_NAME } from '#/theme/components'
import classes from './PaneResizeHandle.module.css'
import {
  applyPaneWidth,
  clampPaneWidth,
  storePaneWidth,
  useStoredPaneWidth,
  type PaneWidth,
} from './paneWidth'

/** How far an arrow key moves the edge, in px; with Shift, further. As Mantine's handle. */
const KEYBOARD_STEP = 10
const KEYBOARD_SHIFT_STEP = 50

/** The `<html>` attribute present while a pane is dragged: the shell's transitions pause (AppShell.module.css). */
export const PANE_RESIZING_ATTRIBUTE = 'data-pane-resizing'

/**
 * The resize handle on the inline-end edge of a shell pane that Mantine's
 * AppShell doesn't manage (the second sidebar), looking and working like
 * the sidebar's (Mantine's): drag it, or focus it and use the arrow keys
 * (Shift for bigger steps, Home and End for the bounds); Escape cancels a
 * drag, a double-click goes back to the default width. The pane needs a
 * position, and must not scroll itself, or the handle scrolls away.
 *
 * While dragging, the width goes straight to the pane's CSS variable each
 * frame; it is stored once the drag ends.
 */
export function PaneResizeHandle({
  pane,
  label,
  controls,
}: {
  pane: PaneWidth
  /** The handle's accessible name. */
  label: string
  /** The id of the pane it resizes. */
  controls: string
}) {
  const theme = useMantineTheme()
  const stored = useStoredPaneWidth(pane)
  const [committed, setCommitted] = useState<number | null>()
  // `null` for the default, `undefined` until the stored width is read.
  const chosen = committed === undefined ? stored : committed
  const width = chosen ?? pane.default
  const [dragging, setDragging] = useState(false)
  const handleRef = useRef<HTMLDivElement>(null)
  const stopDrag = useRef<() => void>(undefined)

  // A drag still running when the pane goes (the visitor left the view) ends where it is.
  useEffect(() => () => stopDrag.current?.(), [])

  const commit = (next: number | null) => {
    setCommitted(next)
    storePaneWidth(pane, next)
  }

  const showWidth = (shown: number) => {
    applyPaneWidth(pane.variable, shown)
    handleRef.current?.setAttribute('aria-valuenow', String(shown))
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || stopDrag.current) return
    event.preventDefault()
    const startX = event.clientX
    let shown = width
    let moved = false
    const root = document.documentElement
    const body = document.body.style
    const previousBody = { cursor: body.cursor, userSelect: body.userSelect }
    const abort = new AbortController()
    const { signal } = abort

    const stop = () => {
      abort.abort()
      stopDrag.current = undefined
      root.removeAttribute(PANE_RESIZING_ATTRIBUTE)
      body.cursor = previousBody.cursor
      body.userSelect = previousBody.userSelect
      setDragging(false)
    }
    const cancel = () => {
      stop()
      showWidth(width)
      // Back to what was there: the default is no variable at all.
      if (chosen == null) applyPaneWidth(pane.variable, null)
    }
    stopDrag.current = () => {
      stop()
      if (moved) commit(shown)
    }

    root.setAttribute(PANE_RESIZING_ATTRIBUTE, '')
    body.cursor = 'col-resize'
    body.userSelect = 'none'
    setDragging(true)

    document.addEventListener(
      'pointermove',
      (move) => {
        moved = true
        shown = clampPaneWidth(pane, width + (move.clientX - startX) / theme.scale)
        showWidth(shown)
      },
      { signal },
    )
    document.addEventListener('pointerup', () => stopDrag.current?.(), { signal })
    document.addEventListener('pointercancel', cancel, { signal })
    document.addEventListener(
      'keydown',
      (key) => {
        if (key.key !== 'Escape') return
        key.preventDefault()
        cancel()
      },
      { signal },
    )
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? KEYBOARD_SHIFT_STEP : KEYBOARD_STEP
    const target: Partial<Record<string, number>> = {
      ArrowLeft: width - step,
      ArrowRight: width + step,
      Home: pane.min,
      End: pane.max,
    }
    const next = target[event.key]
    if (next === undefined) return
    event.preventDefault()
    commit(clampPaneWidth(pane, next))
  }

  return (
    <Box
      ref={handleRef}
      role="separator"
      tabIndex={0}
      aria-label={label}
      aria-controls={controls}
      aria-orientation="vertical"
      aria-valuemin={pane.min}
      aria-valuemax={pane.max}
      aria-valuenow={width}
      className={`${RESIZE_HANDLE_CLASS_NAME} ${classes.handle}`}
      mod={{ orientation: 'vertical', active: dragging }}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      onDoubleClick={() => commit(null)}
    />
  )
}
