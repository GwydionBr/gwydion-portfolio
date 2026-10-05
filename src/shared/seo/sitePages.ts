import { baseLocale, locales, localizeHref, type Locale } from '#/generated/paraglide/runtime'

export const SITE_URL = 'https://gwydion.dev'

type ChangeFrequency = 'weekly' | 'monthly' | 'yearly'

interface SitePage {
  path: string
  changefreq: ChangeFrequency
  priority: number
}

/** Every indexable page. Routes may only build SEO metadata for paths listed here. */
export const SITE_PAGES = [
  { path: '/', changefreq: 'monthly', priority: 1 },
  { path: '/self-engine', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact', changefreq: 'yearly', priority: 0.5 },
  { path: '/impressum', changefreq: 'yearly', priority: 0.3 },
  { path: '/datenschutz', changefreq: 'yearly', priority: 0.3 },
] as const satisfies ReadonlyArray<SitePage>

export type SitePath = (typeof SITE_PAGES)[number]['path']

export function getLocalizedUrl(path: SitePath, locale: Locale) {
  return new URL(localizeHref(path, { locale }), SITE_URL).href
}

/** hreflang alternates for a page, including the `x-default` fallback. */
export function getAlternateUrls(path: SitePath) {
  return [
    ...locales.map((locale) => ({ hrefLang: locale, href: getLocalizedUrl(path, locale) })),
    { hrefLang: 'x-default', href: getLocalizedUrl(path, baseLocale) },
  ]
}
