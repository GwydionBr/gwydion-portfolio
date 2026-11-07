import { createFileRoute, redirect } from '@tanstack/react-router'
import { preferredSiteLanguage } from '#/i18n/request'

// The bare domain opens the Overview in the visitor's preferred Site language.
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/$lang', params: { lang: preferredSiteLanguage() } })
  },
})
