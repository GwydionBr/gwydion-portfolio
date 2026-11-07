import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { LEGACY_REDIRECTS } from '#/seo/legacyRedirects'
import { serve } from './serve'
import { visit } from './visit'

const notFoundHeading = /not found|nicht gefunden/i

/** Every URL of the old site (main, before the rebuild) and the page it is now. */
const OLD_SITE = [
  ['/self-engine', '/en/projects/self-engine', 'Self-Engine'],
  ['/de/self-engine', '/de/projects/self-engine', 'Self-Engine'],
  ['/about', '/en/about', 'About'],
  ['/contact', '/en/contact', 'Contact'],
  ['/impressum', '/en/impressum', 'Legal notice'],
  ['/datenschutz', '/en/datenschutz', 'Privacy policy'],
] as const

/** Old German URLs whose address the new site keeps: they open their page directly. */
const KEPT = [
  ['/de', 'Gwydion Braunsdorf'],
  ['/de/about', 'Über mich'],
  ['/de/contact', 'Kontakt'],
  ['/de/impressum', 'Impressum'],
  ['/de/datenschutz', 'Datenschutzerklärung'],
] as const

describe('Old URLs', () => {
  it('the redirect table covers exactly the old URLs that moved', () => {
    expect(Object.entries(LEGACY_REDIRECTS)).toEqual(OLD_SITE.map(([from, to]) => [from, to]))
  })

  it.each(OLD_SITE)('%s answers 301 to %s', async (from, to) => {
    expect(await serve(from)).toMatchObject({ status: 301, location: to })
  })

  it.each(OLD_SITE)('%s leads the visitor to %s, which shows %s', async (from, to, title) => {
    const page = await visit(from)

    expect(page.path()).toBe(to)
    expect(page.title()).toBe(title)
  })

  it('keeps the query of an old URL', async () => {
    expect(await serve('/self-engine?ref=cv')).toMatchObject({
      status: 301,
      location: '/en/projects/self-engine?ref=cv',
    })
  })

  it('also leads an old URL written with a trailing slash to its new address', async () => {
    expect((await visit('/de/self-engine/')).path()).toBe('/de/projects/self-engine')
  })

  it.each(KEPT)('%s still opens its page, without a redirect', async (url, title) => {
    expect(await serve(url)).toBe(null)
    const page = await visit(url)

    expect(page.path()).toBe(url)
    expect(page.title()).toBe(title)
    expect(within(page.main()).queryByRole('heading', { name: notFoundHeading })).toBe(null)
  })
})

describe('The bare domain', () => {
  it('redirects temporarily by language and tells caches the answer varies by it', async () => {
    const response = await serve('/')

    expect(response?.status).toBe(307)
    expect(response?.location).toBe('/en')
    expect(response?.headers.get('Vary')).toBe('Accept-Language')
  })
})
