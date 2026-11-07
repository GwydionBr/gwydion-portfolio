import { createFileRoute } from '@tanstack/react-router'
import { siteContent } from '#/content'
import { buildSitemap } from '#/seo/buildSitemap'

// Robots points here (public/robots.txt).
export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(siteContent), {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        }),
    },
  },
})
