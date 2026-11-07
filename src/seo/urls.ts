import { BASE_LANGUAGE, LANGUAGES, languageOfPath, type Language } from '#/i18n/language'

/** Where the site is served; every canonical, alternate and sitemap URL is absolute under it. */
export const SITE_URL = 'https://gwydion.dev'

/**
 * A page's path without its Site language prefix: `/` for the Overview,
 * `/about`, `/projects/self-engine`. Every page exists once per Site language
 * at `/<language><path>`.
 */
export type PagePath = '/' | `/${string}`

/** `path` without a trailing slash (`/about/` → `/about`); `/` stays `/`. */
export function withoutTrailingSlash<Path extends string>(path: Path): Path {
  const trimmed = path.replace(/\/+$/, '')
  return (trimmed === '' ? '/' : trimmed) as Path
}

/**
 * The page a URL path shows, without its language prefix
 * (`/de/projects/x` → `/projects/x`, `/en` → `/`). A path without a Site
 * language prefix is returned as it is.
 */
export function pagePathOf(pathname: string): PagePath {
  const path = (languageOfPath(pathname) ? pathname.replace(/^\/[^/]+/, '') : pathname) || '/'
  return withoutTrailingSlash(path as PagePath)
}

/** The page a route under `/$lang` shows (`/$lang/about` → `/about`, `/$lang` → `/`). */
export function pagePathOfRoute(to: `/$lang${string}`): PagePath {
  return withoutTrailingSlash((to.slice('/$lang'.length) || '/') as PagePath)
}

/**
 * The absolute URL of `path` in `language`, as the router serves it: no
 * trailing slash, so the Overview is `https://gwydion.dev/de`.
 */
export function pageUrl(path: PagePath, language: Language): string {
  const page = withoutTrailingSlash(path)
  return absoluteUrl(page === '/' ? `/${language}` : `/${language}${page}`)
}

/** `path` (`/og-image.png`) as an absolute URL on the site. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href
}

/**
 * The hreflang alternates of `path`: one per Site language, plus `x-default`.
 * The Overview's `x-default` is the bare domain, which redirects to the
 * visitor's preferred language; every other page falls back to the Base language.
 */
export function alternateUrls(path: PagePath): { hrefLang: string; href: string }[] {
  const page = withoutTrailingSlash(path)
  return [
    ...LANGUAGES.map((language) => ({ hrefLang: language, href: pageUrl(page, language) })),
    {
      hrefLang: 'x-default',
      href: page === '/' ? absoluteUrl('/') : pageUrl(page, BASE_LANGUAGE),
    },
  ]
}
