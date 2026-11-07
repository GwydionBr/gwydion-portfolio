import { createRouter, type RouterHistory } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

/** The site's router; tests pass a memory history (src/test/visit.tsx). */
export function createAppRouter({ history }: { history?: RouterHistory } = {}) {
  return createRouter({
    routeTree,
    history,
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
