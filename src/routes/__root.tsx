import type { ReactNode } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SiteLanguageProvider, useSiteLanguage } from '#/i18n/react'
import { AppShell } from '#/shell/AppShell'
import { NotFoundView } from '#/shell/NotFoundView'
import type { RouterContext } from '#/router'
import { legacyRedirectTarget } from '#/seo/legacyRedirects'
import { ThemeHeadTags } from '#/theme/ThemeHeadTags'

import appCss from '../styles/app.css?url'

export const Route = createRootRouteWithContext<RouterContext>()({
  // Every URL of the old site that moved leads permanently to its new address.
  beforeLoad: ({ location }) => {
    const target = legacyRedirectTarget(location.pathname)
    if (target) throw redirect({ href: `${target}${location.searchStr}`, statusCode: 301 })
  },
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      // Fallback for pages without their own head (the not-found view); every page sets one (src/seo).
      { title: 'Gwydion' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'apple-touch-icon', href: '/logo192.png' },
    ],
  }),
  shellComponent: RootDocument,
  // Every page, the not-found view included, sits inside the app shell (ADR 0003).
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
  notFoundComponent: NotFoundView,
})

function RootDocument({ children }: { children: ReactNode }) {
  const language = useSiteLanguage()
  return (
    // The pre-paint script sets `data-theme` before React hydrates.
    <html lang={language} suppressHydrationWarning>
      <head>
        <HeadContent />
        <ThemeHeadTags />
      </head>
      <body>
        <SiteLanguageProvider>{children}</SiteLanguageProvider>
        <Scripts />
        <Analytics />
      </body>
    </html>
  )
}
