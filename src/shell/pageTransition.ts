import type { AnyRouter } from '@tanstack/react-router'
import { secondaryNavbarFits } from './breakpoint'
import type { SecondaryNavigation } from './secondaryNavigation'

/**
 * The page transition: going to another page, the next view fades in over
 * the main pane, rising a little into place, while the shell around it
 * (sidebars, top and tab bar) changes in place. Where the old view would
 * stand still under it, it fades out at the same time: a crossfade. It is a
 * View Transition the router starts for every navigation (src/router.tsx);
 * the stylesheet draws it (src/shell/AppShell.module.css). Browsers without
 * View Transitions, or without their types, change the page at once.
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
   * on neither (on narrower windows it never shows). Otherwise the pane narrows or widens as the view changes, and
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

/**
 * Whether the browser animated the last going back or forward itself. The
 * page change it starts is the next one the router transitions, which reads
 * and clears it.
 */
let browserAnimatedPop = false

function takeBrowserAnimated(): boolean {
  const animated = browserAnimatedPop
  browserAnimatedPop = false
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

/** Whether a View Transition is under way: capturing, waiting for the next page, or animating. */
function pageTransitionActive(): boolean {
  try {
    return document.documentElement.matches(':active-view-transition')
  } catch {
    // A browser that can't tell: while its animations run.
    return runningPageTransition().length > 0
  }
}

/** How long a click waits for the transition to end, at most, in ms. */
const CLICK_THROUGH_WAIT = 1000

/**
 * While a View Transition is under way, the browser hands every click to
 * `<html>`, under its images, and the page underneath never gets it: a
 * visitor clicking on quickly would lose the click. Such a click ends the
 * transition at once (its animations finish as soon as they start, should
 * the next page still be on its way) and goes on to what is under the
 * pointer on the page.
 */
function passClickThrough(event: MouseEvent) {
  if (event.target !== document.documentElement || !pageTransitionActive()) return
  const { clientX, clientY, ctrlKey, metaKey, shiftKey, altKey, button } = event
  const deadline = performance.now() + CLICK_THROUGH_WAIT
  const pass = () => {
    for (const animation of runningPageTransition()) animation.finish()
    if (pageTransitionActive() && performance.now() < deadline) {
      requestAnimationFrame(pass)
      return
    }
    const target = document.elementFromPoint(clientX, clientY)
    if (!target || target === document.documentElement) return
    // Dispatched rather than `click()`: the target may be an icon (SVG), which has no
    // `click()`. With the keys held at the time, so a ⌘-click still opens a new tab.
    target.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX,
        clientY,
        ctrlKey,
        metaKey,
        shiftKey,
        altKey,
        button,
      }),
    )
  }
  pass()
}

if (typeof window !== 'undefined') {
  // Listening from the start, before the router creates its history and listens itself.
  window.addEventListener('popstate', (event) => {
    browserAnimatedPop = Boolean(
      (event as PopStateEvent & { hasUAVisualTransition?: boolean }).hasUAVisualTransition,
    )
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
 * on a page; `false` (no transition) where the browser can't tell View
 * Transition types apart, since the router then asks `types` nothing and
 * would transition every change, those ruled out too.
 */
export function pageTransition({
  secondaryNavigationAt,
}: {
  secondaryNavigationAt: (pathname: string) => SecondaryNavigation | undefined
}): ViewTransitionOptions | false {
  const typesSupported =
    typeof CSS !== 'undefined' && CSS.supports('selector(:active-view-transition-type(a))')
  if (!typesSupported) return false
  return {
    types: ({ fromLocation, toLocation, pathChanged }) =>
      pageTransitionTypes(
        { firstPage: fromLocation === undefined, pathChanged },
        {
          reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
          dialogShown: document.querySelector('[role="dialog"]') !== null,
          browserAnimated: takeBrowserAnimated(),
          keepsLayout:
            fromLocation !== undefined &&
            (!secondaryNavbarFits() ||
              secondaryNavigationAt(fromLocation.pathname) ===
                secondaryNavigationAt(toLocation.pathname)),
          scrolled: window.scrollY > 0,
        },
      ),
  }
}
