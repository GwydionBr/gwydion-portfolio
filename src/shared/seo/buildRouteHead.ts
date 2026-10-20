import { getLocale } from '#/generated/paraglide/runtime'
import { SITE_URL, getAlternateUrls, getLocalizedUrl, type SitePath } from './sitePages'

interface RouteImage {
  /** Public path to the image, e.g. `/og-home.png`. */
  path: string
  /** Accessible description of the image for screen readers / card validators. */
  alt: string
  /** Intrinsic pixel width of the image. */
  width: number
  /** Intrinsic pixel height of the image. */
  height: number
}

interface RouteHeadOptions {
  path: SitePath
  title: string
  description: string
  /** Social preview image for this route. Defaults to the home image as fallback. */
  image?: RouteImage
}

const HOME_IMAGE: RouteImage = {
  path: '/og-home.png',
  alt: 'Gwydion — full-stack developer building offline-first products end to end.',
  width: 1200,
  height: 630,
}

export function buildRouteHead({ path, title, description, image = HOME_IMAGE }: RouteHeadOptions) {
  const locale = getLocale()
  const canonical = getLocalizedUrl(path, locale)
  const imageUrl = `${SITE_URL}${image.path}`

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
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:width', content: String(image.width) },
      { property: 'og:image:height', content: String(image.height) },
      { property: 'og:image:alt', content: image.alt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: image.alt },
    ],
    links: [
      { rel: 'canonical', href: canonical },
      ...getAlternateUrls(path).map(({ hrefLang, href }) => ({ rel: 'alternate', hrefLang, href })),
    ],
  }
}
