import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'
import { isLanguage } from '#/i18n/language'
import { buildPersonData, jsonLdScript } from '#/seo/structuredData'

// Every page lives under a Site language prefix; any other first segment is
// not found. Parsing `lang` here types it as a `Language` for every route below.
export const Route = createFileRoute('/$lang')({
  params: {
    parse: ({ lang }) => {
      if (!isLanguage(lang)) throw notFound()
      return { lang }
    },
    stringify: ({ lang }) => ({ lang }),
  },
  // Every page describes Gwydion as a Person to search engines (spec #31).
  head: ({ params, match }) => ({
    scripts: [
      jsonLdScript(buildPersonData(match.context.content.getProfile(params.lang), params.lang)),
    ],
  }),
  component: Outlet,
})
