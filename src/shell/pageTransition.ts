import type { AnyRouter } from '@tanstack/react-router'
import type { SecondaryNavigation } from './secondaryNavigation'

/**
 * The page transition: going to another page, the next view fades in over
 * the main pane, rising a little into place, while the shell around it
 * (sidebars, top and tab bar) changes in place. Where the old view would
 * stand still under it, it fades out at the same time: a crossfade. It is a
 * View Transition the router starts for every navigation (src/router.tsx);
 * the stylesheet draws it (src/shell/AppShell.module.css). Browsers without
 * View Transitions change the page at once.
 *
 * No transition runs when it would get in the way (`pageTransitionTypes`).
 */

/** The View Transition type of every page change. */
export const PAGE_TRANSITION_TYPE = 'page'

/** The type of a page change whose old view also shows, fading out. */
export const CROSSFADE_TRANSITION_TYPE = 'crossfade'

/** What decides how a page change transitions, besides the change itself. */
export interface PageTransitionConditions {
  /** The visitor asked for less motion. */
  reducedMotion: boolean
  /** A dialog (the search, the More sheet, the settings) is open or closing: its own transition is what moves. */
  dialogShown: boolean
  /** The browser already animated the change itself, such as a swipe back on a phone. */
  browserAnimated: boolean
  /**
   * The main pane keeps its place: the second sidebar shows on both pages or
   * on neither. Otherwise the pane narrows or widens as the view changes, and
   * the old view's image would be squeezed or stretched with it.
   */
  keepsLayout: boolean
  /**
   * The old page is scrolled. The next one starts at the top, and the old
   * view's image would stand at the top too, showing its start again as it fades.
   */
  scrolled: boolean
}

/**
 * The View Transition types of a page change, or `false` for none: none on
 * the first page, none when only the search or the hash changed (the page
 * stays), and none in the `conditions` that rule it out. The crossfade only
 * where the old view would stand still under the next one.
 */
export function pageTransitionTypes(
  change: { firstPage: boolean; pathChanged: boolean },
  conditions: PageTransitionConditions,
): string[] | false {
  if (change.firstPage || !change.pathChanged) return false
  if (conditions.reducedMotion || conditions.dialogShown || conditions.browserAnimated) return false
  return conditions.keepsLayout && !conditions.scrolled
    ? [PAGE_TRANSITION_TYPE, CROSSFADE_TRANSITION_TYPE]
    : [PAGE_TRANSITION_TYPE]
}

/** The address the browser animated going back or forward to, until a page change reads it. */
let browserAnimatedHref: string | undefined

/** Whether the browser animated the change to `href`; asked once per page change. */
function takeBrowserAnimated(href: string): boolean {
  const animated = browserAnimatedHref === href
  browserAnimatedHref = undefined
  return animated
}

/** The animations of a View Transition still running: those of its pseudo-elements. */
function runningPageTransition(): Animation[] {
  return document
    .getAnimations()
    .filter((animation) =>
      (animation.effect as KeyframeEffect | null)?.pseudoElement?.startsWith('::view-transition'),
    )
}

/**
 * While a View Transition runs, the browser hands every click to `<html>`,
 * under its images, and the page underneath never gets it: a visitor
 * clicking on quickly would lose the click. Such a click ends the transition
 * at once and goes on to what is under the pointer on the page.
 */
function passClickThrough(event: MouseEvent) {
  if (event.target !== document.documentElement) return
  const running = runningPageTransition()
  if (running.length === 0) return
  for (const animation of running) animation.finish()
  const { clientX, clientY } = event
  // Once the transition's images are gone, a frame after its animations ended.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      const target = document.elementFromPoint(clientX, clientY)
      if (target instanceof HTMLElement && target !== document.documentElement) target.click()
    }),
  )
}

if (typeof window !== 'undefined') {
  // Listening from the start, before the router creates its history and listens itself.
  window.addEventListener('popstate', (event) => {
    const animated = (event as PopStateEvent & { hasUAVisualTransition?: boolean })
      .hasUAVisualTransition
    browserAnimatedHref = animated
      ? `${location.pathname}${location.search}${location.hash}`
      : undefined
  })
  document.addEventListener('click', passClickThrough)
}

/** The router's View Transition options (TanStack Router doesn't export their type). */
type ViewTransitionOptions = Exclude<
  AnyRouter['options']['defaultViewTransition'],
  boolean | undefined
>

/**
 * The router's `defaultViewTransition`, given what the second sidebar lists
 * on a page. Browsers that can't tell View Transition types apart transition
 * every change, without the crossfade: the router asks `types` only where
 * they can.
 */
export function pageTransition({
  secondaryNavigationAt,
}: {
  secondaryNavigationAt: (pathname: string) => SecondaryNavigation | undefined
}): ViewTransitionOptions {
  return {
    types: ({ fromLocation, toLocation, pathChanged }) =>
      pageTransitionTypes(
        { firstPage: fromLocation === undefined, pathChanged },
        {
          reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
          dialogShown: document.querySelector('[role="dialog"]') !== null,
          browserAnimated: takeBrowserAnimated(toLocation.publicHref),
          keepsLayout:
            fromLocation !== undefined &&
            secondaryNavigationAt(fromLocation.pathname) ===
              secondaryNavigationAt(toLocation.pathname),
          scrolled: window.scrollY > 0,
        },
      ),
  }
}
