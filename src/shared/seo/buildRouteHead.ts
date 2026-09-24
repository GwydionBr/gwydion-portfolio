import { getLocale, localizeHref } from '#/generated/paraglide/runtime'

export const SITE_URL = 'https://gwydion.dev'

interface RouteHeadOptions {
  path: string
  title: string
  description: string
}

export function buildRouteHead({ path, title, description }: RouteHeadOptions) {
  const locale = getLocale()
  const localizedPath = localizeHref(path, { locale })
  const canonical = new URL(localizedPath, SITE_URL).href
  const englishUrl = new URL(localizeHref(path, { locale: 'en' }), SITE_URL).href
  const germanUrl = new URL(localizeHref(path, { locale: 'de' }), SITE_URL).href

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Gwydion' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonical },
      { property: 'og:locale', content: locale === 'de' ? 'de_DE' : 'en_US' },
      { property: 'og:image', content: `${SITE_URL}/og-image.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${SITE_URL}/og-image.png` },
    ],
    links: [
      { rel: 'canonical', href: canonical },
      { rel: 'alternate', hrefLang: 'en', href: englishUrl },
      { rel: 'alternate', hrefLang: 'de', href: germanUrl },
      { rel: 'alternate', hrefLang: 'x-default', href: englishUrl },
    ],
  }
}
