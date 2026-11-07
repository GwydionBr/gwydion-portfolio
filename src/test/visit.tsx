import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { getByRole, within } from '@testing-library/dom'
import { afterEach, vi } from 'vite-plus/test'
import { createAppRouter } from '#/router'
import type { Theme } from '#/theme/theme'
import { emulateSystemTheme } from './systemTheme'

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean
}

let mounted: Root | undefined

afterEach(async () => {
  const root = mounted
  mounted = undefined
  if (root) await act(async () => root.unmount())
  vi.restoreAllMocks()
  // The device forgets the visit: no stored choices, no theme left on `<html>`.
  localStorage.clear()
  delete document.documentElement.dataset.theme
})

interface VisitOptions {
  /** The visitor's browser languages, most preferred first (`navigator.languages`). */
  browserLanguages?: readonly string[]
  /** The visitor's system appearance setting (`prefers-color-scheme`). */
  systemTheme?: Theme
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
  { browserLanguages = ['en-US', 'en'], systemTheme = 'light' }: VisitOptions = {},
) {
  const system = emulateSystemTheme(systemTheme)
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  vi.spyOn(navigator, 'languages', 'get').mockReturnValue(browserLanguages)
  // jsdom does not implement scrolling; the router restores scroll positions.
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

  const router = createAppRouter({ history: createMemoryHistory({ initialEntries: [url] }) })
  await act(async () => {
    await router.load()
  })
  const root = createRoot(document)
  mounted = root
  await act(async () => root.render(<RouterProvider router={router} />))

  const applies = (element: Element) => matchMedia(element.getAttribute('media') ?? 'all').matches
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
    /** Changes the visitor's system appearance setting while the page is open. */
    async setSystemTheme(theme: Theme) {
      await act(async () => system.set(theme))
    },
    /**
     * The theme the page is painted in. The stylesheet paints `<html
     * data-theme>` when set, else the system setting (src/styles/app.css).
     */
    theme: (): Theme =>
      (document.documentElement.dataset.theme as Theme | undefined) ??
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    /** The browser chrome colour in effect: the `theme-color` whose media applies. */
    chromeColor: () =>
      [...document.head.querySelectorAll('meta[name="theme-color"]')]
        .filter(applies)
        .map((meta) => meta.getAttribute('content')),
    /** The favicon in effect: the icon links whose media applies. */
    favicon: () =>
      [...document.head.querySelectorAll('link[rel="icon"]')]
        .filter(applies)
        .map((link) => link.getAttribute('href')),
    /**
     * Runs the document's inline head scripts the way a browser does while
     * parsing, before anything is painted: on a fresh `<html>`, as on a reload.
     */
    paintFirstFrame() {
      delete document.documentElement.dataset.theme
      for (const script of document.head.querySelectorAll('script:not([src])')) {
        // oxlint-disable-next-line typescript/no-implied-eval -- executing the page's own inline script is the point
        new Function(script.textContent ?? '')()
      }
    },
    /** Follows `link` like a visitor's click and waits for the new page. */
    async click(link: HTMLElement) {
      await act(async () => {
        link.click()
        await new Promise((resolve) => setTimeout(resolve, 0))
      })
    },
  }
}

/** The names of the links in the navigation landmark `name`, and the one marked current. */
export function navigationOf(name: string) {
  const links = within(getByRole(document.body, 'navigation', { name })).getAllByRole('link')
  return {
    entries: links.map((link) => link.textContent),
    current: links.filter((link) => link.getAttribute('aria-current')).map((l) => l.textContent),
  }
}
