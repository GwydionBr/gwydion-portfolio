import { LANGUAGES, type Language } from '#/i18n/language'
import { SHARE_IMAGE } from './shareImage'
import { absoluteUrl, alternateUrls, pageUrl, type PagePath } from './urls'

/** The name social cards show for the site. */
const SITE_NAME = 'gwydion.dev'

/** Open Graph's locale tag for each Site language. */
const OG_LOCALES: Record<Language, string> = { en: 'en_US', de: 'de_DE' }

interface RouteHeadOptions {
  /** The page, without its language prefix (`/about`). */
  path: PagePath
  /** The Site language this rendering of the page is in. */
  language: Language
  /** The full document title. */
  title: string
  description: string
  /** What the share image shows, in the Site language. */
  imageAlt: string
}

/**
 * Everything a search engine and a link preview read from a page's head:
 * title, description, canonical URL, hreflang alternates (each Site language
 * plus `x-default`), Open Graph and Twitter tags with the share image. Pure, so the URL edge cases
 * are tested directly; routes reach it through `pageHead` (./pageHead.ts).
 */
export function buildRouteHead({ path, language, title, description, imageAlt }: RouteHeadOptions) {
  const canonical = pageUrl(path, language)
  const image = absoluteUrl(SHARE_IMAGE.path)

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonical },
      { property: 'og:locale', content: OG_LOCALES[language] },
      ...LANGUAGES.filter((other) => other !== language).map((other) => ({
        property: 'og:locale:alternate',
        content: OG_LOCALES[other],
      })),
      { property: 'og:image', content: image },
      // Declared so a link preview can lay out the card before it fetches the image.
      { property: 'og:image:width', content: String(SHARE_IMAGE.width) },
      { property: 'og:image:height', content: String(SHARE_IMAGE.height) },
      { property: 'og:image:type', content: SHARE_IMAGE.type },
      { property: 'og:image:alt', content: imageAlt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: imageAlt },
    ],
    links: [
      { rel: 'canonical', href: canonical },
      ...alternateUrls(path).map(({ hrefLang, href }) => ({ rel: 'alternate', hrefLang, href })),
    ],
  }
}
