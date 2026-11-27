import type { ReactNode } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router'
import { MantineProvider } from '@mantine/core'
import { umamiScript } from '#/analytics/umami'
import { SiteLanguageProvider, useSiteLanguage } from '#/i18n/react'
import { PrePaintScript } from '#/components/PrePaintScript'
import { AppShell } from '#/shell/AppShell'
import { NotFoundView } from '#/shell/NotFoundView'
import { paneWidthPrePaintScript, SECONDARY_NAVBAR_WIDTH, SIDEBAR_WIDTH } from '#/shell/paneWidth'
import { sidebarCollapsedPrePaintScript } from '#/shell/sidebarLayout'
import type { RouterContext } from '#/router'
import { legacyRedirectTarget } from '#/seo/legacyRedirects'
import { siteColorSchemeManager, siteCssVariables, siteTheme } from '#/theme/mantine'
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
    scripts: [umamiScript()],
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

const colorSchemeManager = siteColorSchemeManager()

/** The sidebars' widths and whether the sidebar is collapsed, as the visitor left them on this device. */
const SHELL_PRE_PAINT_SCRIPT = `${paneWidthPrePaintScript([SIDEBAR_WIDTH, SECONDARY_NAVBAR_WIDTH])};${sidebarCollapsedPrePaintScript}`

function RootDocument({ children }: { children: ReactNode }) {
  const language = useSiteLanguage()
  return (
    // The pre-paint scripts set the theme and the sidebars' layout on `<html>` before React hydrates.
    <html lang={language} suppressHydrationWarning>
      <head>
        <HeadContent />
        <ThemeHeadTags />
        <PrePaintScript script={SHELL_PRE_PAINT_SCRIPT} />
      </head>
      <body>
        <MantineProvider
          theme={siteTheme}
          cssVariablesResolver={siteCssVariables}
          colorSchemeManager={colorSchemeManager}
          defaultColorScheme="auto"
        >
          <SiteLanguageProvider>{children}</SiteLanguageProvider>
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  )
}
