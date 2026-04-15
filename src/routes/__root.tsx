import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../lib/theme";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { LanguageProvider, useLanguage } from "../lib/LanguageContext";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gwydion — Developer & Builder" },
      {
        name: "description",
        content:
          "Gwydion — developer and builder working on Self-Engine, a personal productivity system for intentional work.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <HeadContent />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <LanguageProvider>
            <div className="grain-overlay" aria-hidden="true" />
            <ConnectedHeader />
            {children}
            <ConnectedFooter />
          </LanguageProvider>
          <TanStackDevtools
            config={{ position: "bottom-right" }}
            plugins={[
              {
                name: "Tanstack Router",
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}

function ConnectedHeader() {
  const { lang, setLang } = useLanguage();
  return <Header lang={lang} onLangChange={setLang} />;
}

function ConnectedFooter() {
  const { lang } = useLanguage();
  return <Footer lang={lang} />;
}
