import { createFileRoute, notFound, Outlet } from '@tanstack/react-router'
import { isLanguage } from '#/i18n/language'

// Every page lives under a Site language prefix; any other first segment is not found.
export const Route = createFileRoute('/$lang')({
  beforeLoad: ({ params }) => {
    if (!isLanguage(params.lang)) throw notFound()
  },
  component: Outlet,
})
