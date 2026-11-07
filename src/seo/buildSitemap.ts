import type { Content } from '#/content'
import { BASE_LANGUAGE, LANGUAGES } from '#/i18n/language'
import { LEGAL_PAGES } from '#/legal/pages'
import { navigationEntriesFor } from '#/shell/navigation'
import { alternateUrls, pagePathOfRoute, pageUrl, type PagePath } from './urls'

/**
 * Every indexable page, without its language prefix: the pages the
 * navigation offers (Writing only with Posts), every Project page, and the
 * legal pages.
 */
export function sitePages(content: Content): PagePath[] {
  const hasPosts = content.getPosts().length > 0
  return [
    ...navigationEntriesFor(hasPosts).map((entry) => pagePathOfRoute(entry.to)),
    ...content
      .getProjects(BASE_LANGUAGE)
      .map((project): PagePath => `/projects/${encodeURIComponent(project.slug)}`),
    ...LEGAL_PAGES.map((page) => pagePathOfRoute(page.to)),
  ]
}

/** The XML sitemap: every page in every Site language, each linked to its hreflang alternates. */
export function buildSitemap(content: Content): string {
  const urls = sitePages(content).flatMap((path) => {
    const alternates = alternateUrls(path)
      .map(
        ({ hrefLang, href }) =>
          `<xhtml:link rel="alternate" hreflang="${hrefLang}" href="${href}" />`,
      )
      .join('')
    return LANGUAGES.map(
      (language) => `  <url><loc>${pageUrl(path, language)}</loc>${alternates}</url>`,
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
