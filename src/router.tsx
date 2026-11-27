import { createRouter, type RouterHistory } from '@tanstack/react-router'
import { siteContent, type Content } from './content'
import { routeTree } from './routeTree.gen'
import { pageTransition } from './shell/pageTransition'
import { secondaryNavigationOf, type SecondaryNavigation } from './shell/secondaryNavigation'

/** What every route can read from its context: the content module (ADR 0004). */
export interface RouterContext {
  content: Content
}

/**
 * The site's router. Tests pass a memory history and fixture content
 * (src/test/visit.tsx); the site uses its own content files.
 */
export function createAppRouter({
  history,
  content = siteContent,
  isServer,
}: {
  history?: RouterHistory
  content?: Content
  /** Load as the server does per request (tests of redirects and response headers). */
  isServer?: boolean
} = {}) {
  const router = createRouter({
    routeTree,
    history,
    isServer,
    context: { content } satisfies RouterContext,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    // Pages fade over in the main pane while the shell stays (src/shell/pageTransition.ts).
    defaultViewTransition: pageTransition({
      secondaryNavigationAt: (pathname: string): SecondaryNavigation | undefined =>
        secondaryNavigationOf(
          router.getMatchedRoutes(pathname)[0].map((route) => route.options.staticData),
        ),
    }),
  })
  return router
}

/** Called by TanStack Start once per server request and once in the browser. */
export function getRouter() {
  return createAppRouter()
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
  interface StaticDataRouteOption {
    /** What the shell's second sidebar lists beside the view (`SecondaryNavbar`); none when left out. */
    secondaryNavigation?: SecondaryNavigation
  }
}
