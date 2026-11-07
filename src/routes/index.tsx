import { createFileRoute, redirect } from '@tanstack/react-router'
import { preferredSiteLanguage } from '#/i18n/request'

// The bare domain opens the Overview in the visitor's preferred Site language.
// Temporary, and varying by Accept-Language, so no cache hands one visitor's
// language to the next. Its pages name it as their `x-default` alternate.
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/$lang',
      params: { lang: preferredSiteLanguage() },
      headers: { Vary: 'Accept-Language' },
    })
  },
})
