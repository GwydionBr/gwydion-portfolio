import { describe, expect, it } from 'vite-plus/test'
import { buildSitemap } from './buildSitemap'
import { SITE_PAGES } from './sitePages'

describe('buildSitemap', () => {
  const xml = buildSitemap()

  it('lists every page once per locale', () => {
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc)

    expect(locs).toHaveLength(SITE_PAGES.length * 2)
    expect(locs).toContain('https://gwydion.dev/')
    expect(locs).toContain('https://gwydion.dev/de/')
    expect(locs).toContain('https://gwydion.dev/self-engine')
    expect(locs).toContain('https://gwydion.dev/de/self-engine')
  })

  it('links each URL to all language alternates', () => {
    expect(xml).toContain(
      '<url><loc>https://gwydion.dev/de/contact</loc>' +
        '<xhtml:link rel="alternate" hreflang="en" href="https://gwydion.dev/contact" />' +
        '<xhtml:link rel="alternate" hreflang="de" href="https://gwydion.dev/de/contact" />' +
        '<xhtml:link rel="alternate" hreflang="x-default" href="https://gwydion.dev/contact" />' +
        '<changefreq>yearly</changefreq><priority>0.5</priority></url>',
    )
  })
})
