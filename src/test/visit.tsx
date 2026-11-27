import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { fireEvent, getByRole, within } from '@testing-library/dom'
import { afterEach, vi } from 'vite-plus/test'
import type { Content } from '#/content'
import { createAppRouter } from '#/router'

type AppRouter = ReturnType<typeof createAppRouter>
import { THEME_ATTRIBUTE, type Theme } from '#/theme/theme'
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
  document.documentElement.removeAttribute(THEME_ATTRIBUTE)
})

interface VisitOptions {
  /** The visitor's browser languages, most preferred first (`navigator.languages`). */
  browserLanguages?: readonly string[]
  /** The content the site serves; the site's own content files by default. */
  content?: Content
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
  { browserLanguages = ['en-US', 'en'], content, systemTheme = 'light' }: VisitOptions = {},
) {
  const system = emulateSystemTheme(systemTheme)
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
    /** What a search engine or a link preview reads from the document's head. */
    head: readHead,
    /** Changes the visitor's system appearance setting while the page is open. */
    async setSystemTheme(theme: Theme) {
      await act(async () => system.set(theme))
    },
    /**
     * The theme the page is painted in: the stylesheets paint the theme named
     * on `<html>` (src/styles/app.css), else the system setting.
     */
    theme: (): Theme =>
      (document.documentElement.getAttribute(THEME_ATTRIBUTE) as Theme | null) ??
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
      document.documentElement.removeAttribute(THEME_ATTRIBUTE)
      // Only scripts the browser runs: not data blocks such as JSON-LD.
      const inline = document.head.querySelectorAll<HTMLScriptElement>('script:not([src])')
      for (const script of [...inline].filter((s) => !s.type || /javascript/.test(s.type))) {
        // oxlint-disable-next-line typescript/no-implied-eval -- executing the page's own inline script is the point
        new Function(script.textContent ?? '')()
      }
    },
    /** Clicks `element` (a link, a button) like a visitor and waits for what follows: a new page, a request. */
    async click(element: HTMLElement) {
      await act(async () => {
        element.click()
        await settled(router)
      })
    },
    /** Runs `action` (an answer the test held back) and waits for the page to follow. */
    async settle(action: () => void) {
      await act(async () => {
        action()
        await settled(router)
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

/**
 * Lets pending work (navigation, a `fetch` answered in the test) run to its
 * end. A navigation may first load the next view's code, which on a cold
 * start takes longer than a few turns: wait until the router is done too.
 */
async function settled(router: AppRouter) {
  const turn = () => new Promise((resolve) => setTimeout(resolve, 0))
  for (let count = 0; count < 10; count++) await turn()
  const deadline = Date.now() + 5000
  while (router.state.isLoading && Date.now() < deadline) await turn()
}

/**
 * The document head as a crawler reads it: title, description, canonical URL,
 * hreflang alternates by language, Open Graph and Twitter tags by property,
 * and the parsed JSON-LD structured data.
 */
function readHead() {
  const { head } = document
  const content = (selector: string) => head.querySelector(selector)?.getAttribute('content')
  const tags = (selector: string, key: string) =>
    Object.fromEntries(
      [...head.querySelectorAll(selector)].map((tag) => [
        tag.getAttribute(key),
        tag.getAttribute('content'),
      ]),
    )
  return {
    title: document.title,
    description: content('meta[name="description"]'),
    canonical: head.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    alternates: Object.fromEntries(
      [...head.querySelectorAll('link[rel="alternate"][hreflang]')].map((link) => [
        link.getAttribute('hreflang'),
        link.getAttribute('href'),
      ]),
    ),
    openGraph: tags('meta[property^="og:"]', 'property'),
    twitter: tags('meta[name^="twitter:"]', 'name'),
    structuredData: [...head.querySelectorAll('script[type="application/ld+json"]')].map(
      (script) => JSON.parse(script.textContent ?? 'null') as unknown,
    ),
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
