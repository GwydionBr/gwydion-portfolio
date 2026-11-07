import { withoutTrailingSlash } from './urls'

/**
 * Every URL of the old site (on `main`, before the rebuild) whose address
 * changed, and its new address: one permanent (301) redirect each. The old
 * site served English without a prefix and German under `/de`; the old German
 * URLs not listed here (`/de`, `/de/about`, `/de/contact`, `/de/impressum`,
 * `/de/datenschutz`) are still the same pages' addresses. `/` stays the
 * language redirect (src/routes/index.tsx).
 */
export const LEGACY_REDIRECTS = {
  '/self-engine': '/en/projects/self-engine',
  '/de/self-engine': '/de/projects/self-engine',
  '/about': '/en/about',
  '/contact': '/en/contact',
  '/impressum': '/en/impressum',
  '/datenschutz': '/en/datenschutz',
} as const satisfies Record<string, `/${string}`>

/** The new address of an old URL path (a trailing slash ignored), or undefined when it did not move. */
export function legacyRedirectTarget(pathname: string): string | undefined {
  const path = withoutTrailingSlash(pathname)
  return Object.hasOwn(LEGACY_REDIRECTS, path)
    ? LEGACY_REDIRECTS[path as keyof typeof LEGACY_REDIRECTS]
    : undefined
}
