import { describe, expect, it } from 'vite-plus/test'
import { FIXTURE_POST, fixtureContent } from '#/test/contentFixtures'
import { buildSitemap } from './buildSitemap'

const locsOf = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc)

describe('buildSitemap', () => {
  it('lists every page and every Project page once per Site language', () => {
    expect(locsOf(buildSitemap(fixtureContent()))).toEqual([
      'https://gwydion.dev/en',
      'https://gwydion.dev/de',
      'https://gwydion.dev/en/projects',
      'https://gwydion.dev/de/projects',
      'https://gwydion.dev/en/about',
      'https://gwydion.dev/de/about',
      'https://gwydion.dev/en/contact',
      'https://gwydion.dev/de/contact',
      'https://gwydion.dev/en/projects/self-engine',
      'https://gwydion.dev/de/projects/self-engine',
      'https://gwydion.dev/en/projects/fixture-studio',
      'https://gwydion.dev/de/projects/fixture-studio',
      'https://gwydion.dev/en/projects/fixture-kit',
      'https://gwydion.dev/de/projects/fixture-kit',
      'https://gwydion.dev/en/impressum',
      'https://gwydion.dev/de/impressum',
      'https://gwydion.dev/en/datenschutz',
      'https://gwydion.dev/de/datenschutz',
    ])
  })

  it('lists Writing only once Posts exist', () => {
    expect(locsOf(buildSitemap(fixtureContent()))).not.toContain('https://gwydion.dev/en/writing')
    expect(locsOf(buildSitemap(fixtureContent({ posts: [FIXTURE_POST] })))).toEqual(
      expect.arrayContaining(['https://gwydion.dev/en/writing', 'https://gwydion.dev/de/writing']),
    )
  })

  it('links each URL to all its language alternates, x-default included', () => {
    const xml = buildSitemap(fixtureContent())

    expect(xml).toContain(
      '<url><loc>https://gwydion.dev/de/contact</loc>' +
        '<xhtml:link rel="alternate" hreflang="en" href="https://gwydion.dev/en/contact" />' +
        '<xhtml:link rel="alternate" hreflang="de" href="https://gwydion.dev/de/contact" />' +
        '<xhtml:link rel="alternate" hreflang="x-default" href="https://gwydion.dev/en/contact" />' +
        '</url>',
    )
    expect(xml).toContain(
      '<url><loc>https://gwydion.dev/en</loc>' +
        '<xhtml:link rel="alternate" hreflang="en" href="https://gwydion.dev/en" />' +
        '<xhtml:link rel="alternate" hreflang="de" href="https://gwydion.dev/de" />' +
        '<xhtml:link rel="alternate" hreflang="x-default" href="https://gwydion.dev/" />' +
        '</url>',
    )
  })

  it('is a sitemap document', () => {
    const xml = buildSitemap(fixtureContent())

    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n')).toBe(true)
    expect(xml).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    )
    expect(xml.trimEnd().endsWith('</urlset>')).toBe(true)
  })
})
