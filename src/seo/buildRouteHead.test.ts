import { describe, expect, it } from 'vite-plus/test'
import { buildRouteHead } from './buildRouteHead'

describe('buildRouteHead', () => {
  it('builds canonical and alternate metadata for an English page', () => {
    const head = buildRouteHead({
      path: '/contact',
      language: 'en',
      title: 'Contact · Gwydion Braunsdorf',
      description: 'Contact Gwydion.',
    })

    expect(head.links).toEqual([
      { rel: 'canonical', href: 'https://gwydion.dev/en/contact' },
      { rel: 'alternate', hrefLang: 'en', href: 'https://gwydion.dev/en/contact' },
      { rel: 'alternate', hrefLang: 'de', href: 'https://gwydion.dev/de/contact' },
      { rel: 'alternate', hrefLang: 'x-default', href: 'https://gwydion.dev/en/contact' },
    ])
    expect(head.meta).toEqual(
      expect.arrayContaining([
        { title: 'Contact · Gwydion Braunsdorf' },
        { name: 'description', content: 'Contact Gwydion.' },
        { property: 'og:title', content: 'Contact · Gwydion Braunsdorf' },
        { property: 'og:description', content: 'Contact Gwydion.' },
        { property: 'og:url', content: 'https://gwydion.dev/en/contact' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:locale:alternate', content: 'de_DE' },
        { property: 'og:image', content: 'https://gwydion.dev/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Contact · Gwydion Braunsdorf' },
        { name: 'twitter:image', content: 'https://gwydion.dev/og-image.png' },
      ]),
    )
  })

  it('points the Overview at /en and /de without a trailing slash, x-default at the bare domain', () => {
    const head = buildRouteHead({
      path: '/',
      language: 'de',
      title: 'Gwydion Braunsdorf · Full-Stack-Entwickler',
      description: 'Über Gwydion.',
    })

    expect(head.links).toEqual([
      { rel: 'canonical', href: 'https://gwydion.dev/de' },
      { rel: 'alternate', hrefLang: 'en', href: 'https://gwydion.dev/en' },
      { rel: 'alternate', hrefLang: 'de', href: 'https://gwydion.dev/de' },
      // The bare domain picks the visitor's language (spec #31).
      { rel: 'alternate', hrefLang: 'x-default', href: 'https://gwydion.dev/' },
    ])
    expect(head.meta).toContainEqual({ property: 'og:locale', content: 'de_DE' })
    expect(head.meta).toContainEqual({ property: 'og:locale:alternate', content: 'en_US' })
  })

  it('drops a trailing slash from the page path', () => {
    const head = buildRouteHead({
      path: '/projects/self-engine/',
      language: 'en',
      title: 'Self-Engine',
      description: 'An app.',
    })

    expect(head.links[0]).toEqual({
      rel: 'canonical',
      href: 'https://gwydion.dev/en/projects/self-engine',
    })
  })
})
