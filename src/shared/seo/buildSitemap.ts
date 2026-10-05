import { locales } from '#/generated/paraglide/runtime'
import { SITE_PAGES, getAlternateUrls, getLocalizedUrl } from './sitePages'

export function buildSitemap() {
  const urls = SITE_PAGES.flatMap(({ path, changefreq, priority }) => {
    const alternates = getAlternateUrls(path)
      .map(
        ({ hrefLang, href }) =>
          `<xhtml:link rel="alternate" hreflang="${hrefLang}" href="${href}" />`,
      )
      .join('')

    return locales.map(
      (locale) =>
        `  <url><loc>${getLocalizedUrl(path, locale)}</loc>${alternates}<changefreq>${changefreq}</changefreq><priority>${priority.toFixed(1)}</priority></url>`,
    )
  })

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}
