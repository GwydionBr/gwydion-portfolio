import type { Language } from '#/i18n/language'

/**
 * Umami, the self-hosted reach measurement (analytics.gwydion.dev). The
 * browser loads the tracker from, and sends to, this site's own path prefix,
 * which `vercel.json` rewrites to the Umami server (`s.js`, `api/e`). A
 * neutral prefix keeps ad blockers' lists from matching it.
 */
export const UMAMI_PROXY_PREFIX = '/lx'

const UMAMI_WEBSITE_ID = 'f8b83128-ec37-4fc4-bc55-80f5cc2462b2'

/** Only visits on the production domain count: not previews, not localhost. */
const UMAMI_DOMAIN = 'gwydion.dev'

/**
 * The tracker's script element, for the document head. It counts page views
 * itself, client-side navigation included (it hooks `history.pushState`).
 * Visitors with "Do Not Track" set are not counted; query strings and
 * fragments never leave the browser.
 */
export function umamiScript() {
  return {
    src: `${UMAMI_PROXY_PREFIX}/s.js`,
    defer: true,
    'data-website-id': UMAMI_WEBSITE_ID,
    'data-host-url': UMAMI_PROXY_PREFIX,
    'data-domains': UMAMI_DOMAIN,
    'data-do-not-track': 'true',
    'data-exclude-search': 'true',
    'data-exclude-hash': 'true',
  }
}

/**
 * What the site counts beyond page views. Event data names a Project or a
 * language, never anything about the visitor.
 */
export type AnalyticsEvent =
  | {
      name:
        | 'kontakt-klick'
        | 'kontaktformular-gesendet'
        | 'mail-klick'
        | 'mail-kopiert'
        | 'github-klick'
        | 'linkedin-klick'
    }
  | { name: 'cv-download'; data: { sprache: Language } }
  | {
      name: 'projekt-klick' | 'projekt-website-klick' | 'projekt-code-klick'
      data: { projekt: string }
    }

declare global {
  interface Window {
    /** Umami's tracker, once its script has run. */
    umami?: { track: (name: string, data?: Record<string, string>) => unknown }
  }
}

/**
 * The attributes Umami's own click tracking reads, for a link that leaves the
 * site (another site, a new tab, a mail program).
 *
 * Not for in-app links or downloads: Umami follows a same-tab link it tracked
 * by setting `location.href`, which reloads the whole app instead of
 * navigating client-side, and opens a download instead of saving it. Those
 * use `trackEvent` instead.
 */
export function eventAttributes(event: AnalyticsEvent): Record<string, string> {
  const attributes: Record<string, string> = { 'data-umami-event': event.name }
  const data: Record<string, string> = 'data' in event ? event.data : {}
  for (const [key, value] of Object.entries(data)) attributes[`data-umami-event-${key}`] = value
  return attributes
}

/**
 * Counts `event` now: for in-app links, downloads and anything that is not a
 * click. Does nothing where the tracker is not loaded (development, tests, a
 * blocker); the tracker sends with `keepalive`, so a page change right after
 * does not cut it off.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return
  window.umami?.track(event.name, 'data' in event ? event.data : undefined)
}
