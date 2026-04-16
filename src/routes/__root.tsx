import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { MotionConfig } from 'motion/react'
import { LanguageProvider, useLanguage } from '#/app/i18n/LanguageContext'
import { Footer } from '#/app/shell/Footer'
import { Header } from '#/app/shell/Header'
import { ThemeFaviconSync } from '#/app/shell/ThemeFaviconSync'
import { cssVariablesResolver, theme } from '#/app/theme'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Gwydion — Developer & Builder' },
      {
        name: 'description',
        content:
          'Gwydion — developer and builder working on Self-Engine, a personal productivity system for intentional work.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            <LanguageProvider>
              <div className="grain-overlay" aria-hidden="true" />
              <ConnectedHeader />
              <LocalizedContent>{children}</LocalizedContent>
              <ConnectedFooter />
            </LanguageProvider>
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
      </body>
    </html>
  )
}

function ConnectedHeader() {
  const { lang, setLang } = useLanguage()
  return <Header lang={lang} onLangChange={setLang} />
}

function ConnectedFooter() {
  useLanguage()
  return <Footer />
}

function LocalizedContent({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage()
  return (
    <div key={lang} style={{ display: 'contents' }}>
      {children}
    </div>
  )
}
