import { createRouter, type RouterHistory } from '@tanstack/react-router'
import { siteContent, type Content } from './content'
import { routeTree } from './routeTree.gen'

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
}: { history?: RouterHistory; content?: Content } = {}) {
  return createRouter({
    routeTree,
    history,
    context: { content } satisfies RouterContext,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })
}

/** Called by TanStack Start once per server request and once in the browser. */
export function getRouter() {
  return createAppRouter()
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
