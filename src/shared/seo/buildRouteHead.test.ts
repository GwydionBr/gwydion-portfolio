import { afterEach, describe, expect, it } from 'vitest'
import { getLocale, overwriteGetLocale } from '#/generated/paraglide/runtime'
import { buildRouteHead } from './buildRouteHead'

const defaultGetLocale = getLocale

afterEach(() => {
  overwriteGetLocale(defaultGetLocale)
})

describe('buildRouteHead', () => {
  it('builds canonical and alternate metadata for an English route', () => {
    overwriteGetLocale(() => 'en')

    const head = buildRouteHead({
      path: '/about',
      title: 'About — Gwydion',
      description: 'About Gwydion.',
    })

    expect(head.links).toEqual([
      { rel: 'canonical', href: 'https://gwydion.dev/about' },
      { rel: 'alternate', hreflang: 'en', href: 'https://gwydion.dev/about' },
      { rel: 'alternate', hreflang: 'de', href: 'https://gwydion.dev/de/about' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://gwydion.dev/about' },
    ])
    expect(head.meta).toEqual(
      expect.arrayContaining([
        { title: 'About — Gwydion' },
        { name: 'description', content: 'About Gwydion.' },
        { property: 'og:locale', content: 'en_US' },
      ]),
    )
  })

  it('preserves trailing slashes in canonical and alternate German home URLs', () => {
    overwriteGetLocale(() => 'de')

    const head = buildRouteHead({
      path: '/',
      title: 'Gwydion — Entwickler & Builder',
      description: 'Über Gwydion.',
    })

    expect(head.links).toEqual([
      { rel: 'canonical', href: 'https://gwydion.dev/de/' },
      { rel: 'alternate', hreflang: 'en', href: 'https://gwydion.dev/' },
      { rel: 'alternate', hreflang: 'de', href: 'https://gwydion.dev/de/' },
      { rel: 'alternate', hreflang: 'x-default', href: 'https://gwydion.dev/' },
    ])
    expect(head.meta).toContainEqual({ property: 'og:locale', content: 'de_DE' })
  })
})
