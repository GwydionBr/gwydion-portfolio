import { useEffect, useState } from 'react'

/**
 * The widths of the shell's side panes, which the visitor can drag wider or
 * narrower (or move with the arrow keys) within bounds; double-clicking the
 * handle goes back to the default. A chosen width is stored on the device
 * (localStorage) and, like the theme (src/theme/theme.ts), applied by a
 * pre-paint script before the first frame, so a reload never shows the
 * default width first.
 *
 * The contract with the stylesheets is one CSS variable per pane on
 * `<html>` (`PaneWidth.variable`): the pane's width reads it (`paneWidthCss`)
 * and falls back to the default. The sidebar is resized by Mantine's
 * AppShell (src/shell/sidebarLayout.ts), the second sidebar by the shell's
 * own handle (src/shell/PaneResizeHandle.tsx).
 */
export interface PaneWidth {
  /** Where the chosen width is stored on the device. */
  storageKey: string
  /** The `<html>` CSS variable holding the stored width, set before the first paint. */
  variable: `--${string}`
  /** The widths, in px as Mantine takes sizes. */
  default: number
  min: number
  max: number
}

/**
 * The sidebar. The default is also the minimum: any narrower and the
 * identity cuts Gwydion's name off (narrower still, it collapses to the icon
 * rail). Past the maximum the main pane loses more than the sidebar gains.
 */
export const SIDEBAR_WIDTH: PaneWidth = {
  storageKey: 'sidebar-width',
  variable: '--sidebar-width',
  default: 240,
  min: 240,
  max: 360,
}

/**
 * The second sidebar (src/shell/SecondaryNavbar.tsx). At the minimum a
 * Project's title and period still fit on their lines.
 */
export const SECONDARY_NAVBAR_WIDTH: PaneWidth = {
  storageKey: 'secondary-navbar-width',
  variable: '--secondary-navbar-width',
  default: 256,
  min: 208,
  max: 400,
}

/** The pane's width for the stylesheets: the stored width, else the default. */
export function paneWidthCss(pane: PaneWidth): string {
  return `calc(var(${pane.variable}, ${pane.default / 16}rem) * var(--mantine-scale))`
}

/** `width` kept within the pane's bounds, whole pixels. */
export function clampPaneWidth(pane: PaneWidth, width: number): number {
  return Math.min(pane.max, Math.max(pane.min, Math.round(width)))
}

/**
 * A stored width, kept within `bounds`; `null` when there is none or it is
 * not a number.
 *
 * Self-contained on purpose: it is serialized into the pre-paint script.
 */
export function parsePaneWidth(
  stored: string | null,
  bounds: { min: number; max: number },
): number | null {
  if (stored === null || stored.trim() === '') return null
  const width = Number(stored)
  if (!Number.isFinite(width)) return null
  return Math.min(bounds.max, Math.max(bounds.min, Math.round(width)))
}

/**
 * Puts a width (or none: the default) on `<html>` as `variable`, in rem like
 * Mantine's own sizes.
 *
 * Self-contained on purpose: it is serialized into the pre-paint script.
 */
export function applyPaneWidth(variable: string, width: number | null) {
  const style = document.documentElement.style
  if (width === null) style.removeProperty(variable)
  else style.setProperty(variable, `${width / 16}rem`)
}

/** The stored width, or `null` when there is none (or storage is blocked). */
export function readPaneWidth(pane: PaneWidth): number | null {
  try {
    return parsePaneWidth(localStorage.getItem(pane.storageKey), pane)
  } catch {
    return null
  }
}

/** Stores a width and applies it; `null` forgets it, back to the default. */
export function storePaneWidth(pane: PaneWidth, width: number | null) {
  try {
    if (width === null) localStorage.removeItem(pane.storageKey)
    else localStorage.setItem(pane.storageKey, String(Math.round(width)))
  } catch {
    // Storage blocked: the width still applies to this page.
  }
  applyPaneWidth(pane.variable, width)
}

/**
 * The inline `<head>` script that applies every pane's stored width while
 * the document is parsed, before the first paint.
 */
export function paneWidthPrePaintScript(panes: readonly PaneWidth[]): string {
  const entries = panes.map((pane) => ({
    key: pane.storageKey,
    variable: pane.variable,
    bounds: { min: pane.min, max: pane.max },
  }))
  return `(function(){var parse=(${parsePaneWidth.toString()}),apply=(${applyPaneWidth.toString()});${JSON.stringify(
    entries,
  )}.forEach(function(pane){var stored=null;try{stored=localStorage.getItem(pane.key)}catch(e){}apply(pane.variable,parse(stored,pane.bounds))})})()`
}

/**
 * The pane's stored width, `undefined` until the page has read it (the
 * server renders the default, which the pre-paint script has already
 * replaced) and `null` for the default.
 */
export function useStoredPaneWidth(pane: PaneWidth): number | null | undefined {
  const [width, setWidth] = useState<number | null>()
  useEffect(() => setWidth(readPaneWidth(pane)), [pane])
  return width
}
