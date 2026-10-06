import { afterEach, describe, expect, it } from 'vite-plus/test'
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
      path: '/contact',
      title: 'Contact — Gwydion',
      description: 'Contact Gwydion.',
    })

    expect(head.links).toEqual([
      { rel: 'canonical', href: 'https://gwydion.dev/contact' },
      { rel: 'alternate', hrefLang: 'en', href: 'https://gwydion.dev/contact' },
      { rel: 'alternate', hrefLang: 'de', href: 'https://gwydion.dev/de/contact' },
      { rel: 'alternate', hrefLang: 'x-default', href: 'https://gwydion.dev/contact' },
    ])
    expect(head.meta).toEqual(
      expect.arrayContaining([
        { title: 'Contact — Gwydion' },
        { name: 'description', content: 'Contact Gwydion.' },
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
      { rel: 'alternate', hrefLang: 'en', href: 'https://gwydion.dev/' },
      { rel: 'alternate', hrefLang: 'de', href: 'https://gwydion.dev/de/' },
      { rel: 'alternate', hrefLang: 'x-default', href: 'https://gwydion.dev/' },
    ])
    expect(head.meta).toContainEqual({ property: 'og:locale', content: 'de_DE' })
  })
})
