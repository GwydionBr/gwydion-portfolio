import { getLocale } from '#/generated/paraglide/runtime'
import { SITE_URL, getAlternateUrls, getLocalizedUrl, type SitePath } from './sitePages'

interface RouteHeadOptions {
  path: SitePath
  title: string
  description: string
}

export function buildRouteHead({ path, title, description }: RouteHeadOptions) {
  const locale = getLocale()
  const canonical = getLocalizedUrl(path, locale)

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
      ...getAlternateUrls(path).map(({ hrefLang, href }) => ({ rel: 'alternate', hrefLang, href })),
    ],
  }
}
