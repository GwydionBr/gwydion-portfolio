import { createMemoryHistory } from '@tanstack/react-router'
import { createAppRouter } from '#/router'

/**
 * What the server answers a request for `url` with, before any page renders:
 * a redirect's status, `Location` and headers, or `null` when the page is
 * rendered. The real route tree loads in server mode, the way TanStack Start
 * loads it per request; `visit()` shows what the visitor then sees.
 */
export async function serve(url: string) {
  const router = createAppRouter({
    history: createMemoryHistory({ initialEntries: [url] }),
    isServer: true,
  })
  await router.load()
  const result = router._serverResult
  if (result?.type !== 'redirect') return null
  const { redirect } = result
  return {
    status: redirect.status,
    location: redirect.headers.get('Location'),
    headers: redirect.headers,
  }
}
