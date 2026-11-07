import type { Content } from '#/content'
import { siteLanguageOfPath, type Language } from '#/i18n/language'
import { i18nFor, type MessageDescriptor } from '#/i18n/runtime'
import { buildRouteHead } from './buildRouteHead'
import { pagePathOf } from './urls'

/** A text a page's head shows: content (already in the Site language) or interface text. */
type HeadText = string | MessageDescriptor

/** What a page says about itself; without a title, the page is the Overview and is titled by the Profile. */
interface PageDescription {
  title?: HeadText
  description: HeadText
}

/** The part of a route match a page's head is built from. */
interface PageMatch {
  pathname: string
  context: { content: Content }
}

/**
 * A route's `head`: the page's SEO tags in the Site language of its URL.
 * `describe` names the page; the title gets the Profile's name appended
 * ("About · Gwydion Braunsdorf"). It returns nothing for a page that does not
 * exist (an unknown Project), which keeps the root's fallback head.
 *
 * ```ts
 * head: ({ match }) => pageHead(match, () => ({ title: msg`About`, description: msg`…` }))
 * ```
 */
export function pageHead(
  match: PageMatch,
  describe: (page: { language: Language; content: Content }) => PageDescription | undefined,
) {
  const language = siteLanguageOfPath(match.pathname)
  const { content } = match.context
  const page = describe({ language, content })
  if (!page) return {}

  const i18n = i18nFor(language)
  const text = (value: HeadText) => (typeof value === 'string' ? value : i18n._(value))
  const { name, role } = content.getProfile(language)
  return buildRouteHead({
    path: pagePathOf(match.pathname),
    language,
    title: page.title ? `${text(page.title)} · ${name}` : `${name} · ${role}`,
    description: text(page.description),
  })
}
