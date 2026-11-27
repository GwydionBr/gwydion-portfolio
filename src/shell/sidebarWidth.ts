import { useEffect, useMemo, useState } from 'react'
import { useAppShellResize, type AppShellResizeSizes } from '@mantine/core'

/**
 * The sidebar's width. The visitor can drag it wider (or move it with the
 * arrow keys) up to `max` and back; double-clicking the handle goes back to
 * the default. A chosen width is stored on the device (localStorage) and, like
 * the theme (src/theme/theme.ts), applied by a pre-paint script before the
 * first frame, so a reload never shows the default width first.
 *
 * The contract with Mantine is one CSS variable on `<html>`
 * (`SIDEBAR_WIDTH_VARIABLE`): the navbar's configured width reads it and
 * falls back to the default. Once the page runs, Mantine's resize state
 * (`useSidebarResize`) holds the width and the variable only follows it.
 */

/**
 * Sidebar widths, in px as Mantine's AppShell takes them. The default is
 * also the minimum: any narrower and the identity cuts Gwydion's name off.
 * Past the maximum the main pane loses more than the sidebar gains.
 */
export const SIDEBAR_WIDTH = { default: 240, min: 240, max: 360 } as const

export const SIDEBAR_WIDTH_STORAGE_KEY = 'sidebar-width'

/** The `<html>` CSS variable holding the stored width, set before the first paint. */
export const SIDEBAR_WIDTH_VARIABLE = '--sidebar-width'

/** The navbar width handed to Mantine: the stored width, else the default. */
export const SIDEBAR_WIDTH_CSS = `calc(var(${SIDEBAR_WIDTH_VARIABLE}, ${SIDEBAR_WIDTH.default / 16}rem) * var(--mantine-scale))`

/**
 * A stored width, kept within `bounds`; `null` when there is none or it is
 * not a number.
 *
 * Self-contained on purpose: it is serialized into the pre-paint script.
 */
export function parseSidebarWidth(
  stored: string | null,
  bounds: { min: number; max: number },
): number | null {
  if (stored === null || stored.trim() === '') return null
  const width = Number(stored)
  if (!Number.isFinite(width)) return null
  return Math.min(bounds.max, Math.max(bounds.min, Math.round(width)))
}

/**
 * Puts a width (or none: the default) on `<html>` as `--sidebar-width`, in
 * rem like Mantine's own sizes.
 *
 * Self-contained on purpose: it is serialized into the pre-paint script, so
 * it repeats the variable's name instead of reading `SIDEBAR_WIDTH_VARIABLE`.
 */
export function applySidebarWidth(width: number | null) {
  const style = document.documentElement.style
  if (width === null) style.removeProperty('--sidebar-width')
  else style.setProperty('--sidebar-width', `${width / 16}rem`)
}

/** The stored width, or `null` when there is none (or storage is blocked). */
export function readSidebarWidth(): number | null {
  try {
    return parseSidebarWidth(localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY), SIDEBAR_WIDTH)
  } catch {
    return null
  }
}

/** Stores a width and applies it; `null` forgets it, back to the default. */
export function storeSidebarWidth(width: number | null) {
  try {
    if (width === null) localStorage.removeItem(SIDEBAR_WIDTH_STORAGE_KEY)
    else localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, String(Math.round(width)))
  } catch {
    // Storage blocked: the width still applies to this page.
  }
  applySidebarWidth(width)
}

/**
 * The inline `<head>` script that applies the stored width while the
 * document is parsed, before the first paint.
 */
export const sidebarWidthPrePaintScript = `(function(){var stored=null;try{stored=localStorage.getItem(${JSON.stringify(
  SIDEBAR_WIDTH_STORAGE_KEY,
)})}catch(e){}(${applySidebarWidth.toString()})((${parseSidebarWidth.toString()})(stored,${JSON.stringify(
  { min: SIDEBAR_WIDTH.min, max: SIDEBAR_WIDTH.max },
)}))})()`

/**
 * Mantine's resize controller for the sidebar, its handle named `label`.
 * The stored width enters it once the page runs (the server renders the
 * default, which the pre-paint script has already replaced), and every
 * committed width is stored, a reset (double-click) forgetting it.
 */
export function useSidebarResize(label: string) {
  // `undefined` until the page has read the stored width.
  const [initialSizes, setInitialSizes] = useState<AppShellResizeSizes>()
  useEffect(() => {
    const width = readSidebarWidth()
    setInitialSizes(width === null ? {} : { navbar: width })
  }, [])

  const navbar = useMemo(() => ({ min: SIDEBAR_WIDTH.min, max: SIDEBAR_WIDTH.max, label }), [label])
  const resize = useAppShellResize({ navbar, initialSizes })

  const width = resize.navbar.size
  useEffect(() => {
    if (initialSizes) storeSidebarWidth(width ?? null)
  }, [initialSizes, width])

  return resize
}
