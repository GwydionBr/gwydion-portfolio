import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'
import { isLanguage } from '#/i18n/language'
import { buildPersonData, jsonLdScript } from '#/seo/structuredData'

// Every page lives under a Site language prefix; any other first segment is not found.
export const Route = createFileRoute('/$lang')({
  beforeLoad: ({ params }) => {
    if (!isLanguage(params.lang)) throw notFound()
  },
  // Every page describes Gwydion as a Person to search engines (spec #31).
  head: ({ params, match }) =>
    isLanguage(params.lang)
      ? {
          scripts: [
            jsonLdScript(
              buildPersonData(match.context.content.getProfile(params.lang), params.lang),
            ),
          ],
        }
      : {},
  component: Outlet,
})
