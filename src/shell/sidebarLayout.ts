import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import { useAppShellResize, type AppShellResizeSizes } from '@mantine/core'
import { paneWidthCss, SIDEBAR_WIDTH, storePaneWidth, useStoredPaneWidth } from './paneWidth'

/**
 * The sidebar's layout: its width (src/shell/paneWidth.ts), resized by
 * Mantine's AppShell, and whether it is collapsed to the icon rail.
 *
 * Collapsed, the sidebar shows only its icons, their names in tooltips. The
 * visitor collapses it with its toggle, with ⌘B (Ctrl+B), or by dragging its
 * edge past the minimum width, and gets it back the same ways but the last.
 * The choice is stored on the device and, like the widths, applied by a
 * pre-paint script, as an attribute on `<html>`: the stylesheets draw the
 * rail from it (src/shell/Sidebar.module.css), so the server can render one
 * sidebar for both. The attribute is also where the page reads the state.
 */

/** The navbar width handed to Mantine: the stored width, else the default. */
export const SIDEBAR_WIDTH_CSS = paneWidthCss(SIDEBAR_WIDTH)

/** The icon rail's width, in px: each icon in it stays where it is in the full sidebar. */
export const SIDEBAR_RAIL_WIDTH = 64

/**
 * Dragged narrower than this (in px, past the minimum width), the sidebar
 * collapses to the rail; dragged back out in the same move, it opens again.
 */
const COLLAPSE_THRESHOLD = 160

export const SIDEBAR_COLLAPSED_STORAGE_KEY = 'sidebar-collapsed'

/** The `<html>` attribute present while the sidebar is collapsed. */
export const SIDEBAR_COLLAPSED_ATTRIBUTE = 'data-sidebar-collapsed'

/** The keyboard shortcut that collapses and opens the sidebar: ⌘B, Ctrl+B off Apple devices. */
export const SIDEBAR_SHORTCUT = 'mod + B'
export const SIDEBAR_ARIA_SHORTCUTS = 'Meta+B Control+B'

const listeners = new Set<() => void>()

const isCollapsed = () => document.documentElement.hasAttribute(SIDEBAR_COLLAPSED_ATTRIBUTE)

/** Collapses the sidebar to the rail, or opens it, and stores the choice. */
export function setSidebarCollapsed(collapsed: boolean) {
  if (collapsed === isCollapsed()) return
  document.documentElement.toggleAttribute(SIDEBAR_COLLAPSED_ATTRIBUTE, collapsed)
  try {
    if (collapsed) localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, 'true')
    else localStorage.removeItem(SIDEBAR_COLLAPSED_STORAGE_KEY)
  } catch {
    // Storage blocked: the choice still holds on this page.
  }
  for (const listener of listeners) listener()
}

export function toggleSidebar() {
  setSidebarCollapsed(!isCollapsed())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** Whether the visitor left the sidebar collapsed on this device. */
function readSidebarCollapsed(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

/** Whether the sidebar is collapsed to the rail; `false` on the server and while hydrating. */
export function useSidebarCollapsed(): boolean {
  return useSyncExternalStore(subscribe, isCollapsed, () => false)
}

/** The inline `<head>` script that collapses the sidebar before the first paint, if the visitor left it so. */
export const sidebarCollapsedPrePaintScript = `(function(){try{if(localStorage.getItem(${JSON.stringify(
  SIDEBAR_COLLAPSED_STORAGE_KEY,
)})==='true')document.documentElement.setAttribute(${JSON.stringify(
  SIDEBAR_COLLAPSED_ATTRIBUTE,
)},'')}catch(e){}})()`

/**
 * Mantine's resize controller for the sidebar, its handle named `label`.
 * The stored width enters it once the page runs (as does the stored
 * collapse, if the pre-paint script hasn't applied it), and every committed width
 * is stored, a reset (double-click) forgetting it. A drag past the collapse
 * threshold collapses the sidebar and keeps the width it had before, for
 * when it opens again.
 */
export function useSidebarResize(label: string) {
  const stored = useStoredPaneWidth(SIDEBAR_WIDTH)
  const initialSizes = useMemo<AppShellResizeSizes | undefined>(() => {
    if (stored === undefined) return undefined
    return stored === null ? {} : { navbar: stored }
  }, [stored])

  const navbar = useMemo(
    () => ({
      min: SIDEBAR_WIDTH.min,
      max: SIDEBAR_WIDTH.max,
      collapseThreshold: COLLAPSE_THRESHOLD,
      label,
    }),
    [label],
  )
  // Mantine commits the drag's last width (the minimum, when it collapsed); the width before it comes back.
  const widthBeforeCollapse = useRef<{ width: number | undefined }>(undefined)
  const resize = useAppShellResize({
    navbar,
    initialSizes,
    onCollapseChange: (_section, collapsed) => {
      widthBeforeCollapse.current = collapsed ? { width: resize.navbar.size } : undefined
      setSidebarCollapsed(collapsed)
    },
    onResizeEnd: () => {
      const before = widthBeforeCollapse.current
      if (!before) return
      widthBeforeCollapse.current = undefined
      if (before.width === undefined) resize.navbar.reset()
      else resize.navbar.setSize(before.width)
    },
  })

  // The stored choice, should the pre-paint script not have applied it.
  useEffect(() => {
    if (readSidebarCollapsed()) setSidebarCollapsed(true)
  }, [])

  const width = resize.navbar.size
  useEffect(() => {
    if (initialSizes) storePaneWidth(SIDEBAR_WIDTH, width ?? null)
  }, [initialSizes, width])

  return resize
}
