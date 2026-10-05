import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { MotionConfig } from 'motion/react'
import { Footer } from '#/app/shell/Footer'
import { Header } from '#/app/shell/Header'
import { NotFound } from '#/app/shell/NotFound'
import { ThemeFaviconSync } from '#/app/shell/ThemeFaviconSync'
import { cssVariablesResolver, theme } from '#/app/theme'
import { Analytics } from '@vercel/analytics/react'
import { getLocale, setLocale } from '#/generated/paraglide/runtime'
import { SITE_URL } from '#/shared/seo/buildRouteHead'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Fallback for routes without their own head (e.g. 404); child routes override it.
      { title: 'Gwydion' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()} suppressHydrationWarning>
      <head>
        <link data-app-favicon rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <meta name="theme-color" content="#f3efe4" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
  try {
    const stored = window.localStorage.getItem('mantine-color-scheme-value') ?? 'auto';
    const scheme =
      stored === 'auto'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : stored;
    const favicon = document.querySelector('link[data-app-favicon]');
    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (favicon) {
      favicon.setAttribute('href', scheme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg');
    }

    if (themeColor) {
      themeColor.setAttribute('content', scheme === 'dark' ? '#0f1612' : '#f3efe4');
    }
  } catch {}
})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Gwydion Braunsdorf',
              url: SITE_URL,
              image: `${SITE_URL}/portrait.webp`,
              jobTitle: 'Full-stack developer',
              sameAs: ['https://github.com/GwydionBr'],
            }),
          }}
        />
        <ColorSchemeScript defaultColorScheme="auto" />
        <HeadContent />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <MantineProvider
            theme={theme}
            cssVariablesResolver={cssVariablesResolver}
            defaultColorScheme="auto"
          >
            <ThemeFaviconSync />
            <div className="grain-overlay" aria-hidden="true" />
            <Header lang={getLocale()} onLangChange={(locale) => setLocale(locale)} />
            {children}
            <Footer />
            <TanStackDevtools
              config={{ position: 'middle-left' }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
          </MantineProvider>
        </MotionConfig>
        <Scripts />
        <Analytics />
      </body>
    </html>
  )
}
