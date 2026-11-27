import type { AnyRouter } from '@tanstack/react-router'

/**
 * The page transition: going to another page, the main pane's view fades
 * over to the new one while the shell around it (sidebars, top and tab bar)
 * changes in place. It is a View Transition the router starts for every
 * navigation (src/router.tsx); the stylesheet draws it
 * (src/shell/AppShell.module.css). Browsers without View Transitions change
 * the page at once.
 *
 * No transition runs when it would get in the way (`pageTransitionTypes`).
 */

/** The router's View Transition options (TanStack Router doesn't export their type). */
type ViewTransitionOptions = Exclude<
  AnyRouter['options']['defaultViewTransition'],
  boolean | undefined
>

/** The View Transition type of a page change, for stylesheets that tell transitions apart. */
export const PAGE_TRANSITION_TYPE = 'page'

/** What decides whether a page change transitions, besides the change itself. */
export interface PageTransitionConditions {
  /** The visitor asked for less motion. */
  reducedMotion: boolean
  /** A dialog (the search, the More sheet, the settings) is open or closing: its own transition is what moves. */
  dialogShown: boolean
  /** The browser already animated the change itself, such as a swipe back on a phone. */
  browserAnimated: boolean
}

/**
 * The View Transition types of a page change, or `false` for none: none when
 * only the search or the hash changed (the page stays), and none in the
 * `conditions` that rule it out.
 */
export function pageTransitionTypes(
  change: { pathChanged: boolean },
  conditions: PageTransitionConditions,
): string[] | false {
  if (!change.pathChanged) return false
  if (conditions.reducedMotion || conditions.dialogShown || conditions.browserAnimated) return false
  return [PAGE_TRANSITION_TYPE]
}

/** The address the browser animated going back or forward to, until a page change reads it. */
let browserAnimatedHref: string | undefined

if (typeof window !== 'undefined') {
  // Listening from the start, before the router creates its history and listens itself.
  window.addEventListener('popstate', (event) => {
    const animated = (event as PopStateEvent & { hasUAVisualTransition?: boolean })
      .hasUAVisualTransition
    browserAnimatedHref = animated ? currentHref() : undefined
  })
}

function currentHref() {
  return `${location.pathname}${location.search}${location.hash}`
}

/** Whether the browser animated the change to `href`; asked once per page change. */
function takeBrowserAnimated(href: string): boolean {
  const animated = browserAnimatedHref === href
  browserAnimatedHref = undefined
  return animated
}

/**
 * The router's `defaultViewTransition`. Browsers that can't tell View
 * Transition types apart transition every change: the router asks
 * `types` only where they can.
 */
export const PAGE_TRANSITION: ViewTransitionOptions = {
  types: ({ toLocation, pathChanged }) =>
    pageTransitionTypes(
      { pathChanged },
      {
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
        dialogShown: document.querySelector('[role="dialog"]') !== null,
        browserAnimated: takeBrowserAnimated(toLocation.publicHref),
      },
    ),
}
