import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { SiteLanguageProvider, useSiteLanguage } from '#/i18n/react'
import { AppShell } from '#/shell/AppShell'
import { NotFoundView } from '#/shell/NotFoundView'
import { ThemeHeadTags } from '#/theme/ThemeHeadTags'

import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      // Fallback for routes without their own head; the SEO module will set one per route.
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
