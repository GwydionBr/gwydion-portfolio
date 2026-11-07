import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { fireEvent, getByRole, within } from '@testing-library/dom'
import { afterEach, vi } from 'vite-plus/test'
import type { Content } from '#/content'
import { createAppRouter } from '#/router'

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}

let mounted: Root | undefined

afterEach(async () => {
  const root = mounted
  mounted = undefined
  if (root) await act(async () => root.unmount())
  vi.restoreAllMocks()
})

interface VisitOptions {
  /** The visitor's browser languages, most preferred first (`navigator.languages`). */
  browserLanguages?: readonly string[]
  /** The content the site serves; the site's own content files by default. */
  content?: Content
}

/**
 * The "URL in, page out" seam: opens `url` in the real route tree with an
 * in-memory history and renders the whole document (`<html>` included) the
 * way a visitor's browser shows it. Assert on what the visitor sees (text,
 * roles, landmarks, the path after redirects), never on class names or
 * component internals.
 */
export async function visit(
  url: string,
  { browserLanguages = ['en-US', 'en'], content }: VisitOptions = {},
) {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(browserLanguages)
  // jsdom does not implement scrolling; the router restores scroll positions.
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

  const router = createAppRouter({
    history: createMemoryHistory({ initialEntries: [url] }),
    content,
  })
  await act(async () => {
    await router.load()
  })
  const root = createRoot(document)
  mounted = root
  await act(async () => root.render(<RouterProvider router={router} />))

  const landmark = (role: 'main' | 'complementary', name?: string) =>
    getByRole(document.body, role, name ? { name } : {})

  return {
    router,
    /** The path the visitor ends up on, after redirects. */
    path: () => router.state.location.pathname,
    /** The main content landmark. */
    main: () => landmark('main'),
    /** The desktop sidebar landmark. */
    sidebar: (name = 'Sidebar') => landmark('complementary', name),
    /** The view's title: the one `h1` in the main pane. */
    title: () => within(landmark('main')).getByRole('heading', { level: 1 }).textContent,
    /** Clicks `element` (a link, a button) like a visitor and waits for what follows: a new page, a request. */
    async click(element: HTMLElement) {
      await act(async () => {
        element.click()
        await settled()
      })
    },
    /** Runs `action` (an answer the test held back) and waits for the page to follow. */
    async settle(action: () => void) {
      await act(async () => {
        action()
        await settled()
      })
    },
    /** Types `value` into a form field, replacing what it held. */
    async fill(field: HTMLElement, value: string) {
      await act(async () => {
        fireEvent.change(field, { target: { value } })
      })
    },
  }
}

/** Lets pending work (navigation, a `fetch` answered in the test) run to its end. */
async function settled() {
  for (let turn = 0; turn < 10; turn++) await new Promise((resolve) => setTimeout(resolve, 0))
}

/** The names of the links in the navigation landmark `name`, and the one marked current. */
export function navigationOf(name: string) {
  const links = within(getByRole(document.body, 'navigation', { name })).getAllByRole('link')
  return {
    entries: links.map((link) => link.textContent),
    current: links.filter((link) => link.getAttribute('aria-current')).map((l) => l.textContent),
  }
}
