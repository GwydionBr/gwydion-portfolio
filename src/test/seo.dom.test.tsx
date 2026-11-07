import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { FIXTURE_POST, fixtureContent } from './contentFixtures'
import { buildSitemap } from '#/seo/buildSitemap'
import { visit } from './visit'

describe('Page head', () => {
  it('describes the Overview by the Profile, in each Site language', async () => {
    const page = await visit('/de', { content: fixtureContent() })
    const head = page.head()

    expect(head.title).toBe('Ada Example · Fixture-Entwicklerin')
    expect(head.description).toBe('Ich bin ein Fixture.')
    expect(head.canonical).toBe('https://gwydion.dev/de')
    expect(head.alternates).toEqual({
      en: 'https://gwydion.dev/en',
      de: 'https://gwydion.dev/de',
      'x-default': 'https://gwydion.dev/',
    })
    expect(head.openGraph).toMatchObject({
      'og:title': 'Ada Example · Fixture-Entwicklerin',
      'og:description': 'Ich bin ein Fixture.',
      'og:url': 'https://gwydion.dev/de',
      'og:locale': 'de_DE',
      'og:image': 'https://gwydion.dev/og-image.png',
    })
  })

  it("describes a Project page by the Project's title and summary", async () => {
    const page = await visit('/en/projects/fixture-studio', { content: fixtureContent() })
    const head = page.head()

    expect(head.title).toBe('Fixture Studio · Ada Example')
    expect(head.description).toBe('A studio for fixtures.')
    expect(head.canonical).toBe('https://gwydion.dev/en/projects/fixture-studio')
    expect(head.alternates).toEqual({
      en: 'https://gwydion.dev/en/projects/fixture-studio',
      de: 'https://gwydion.dev/de/projects/fixture-studio',
      'x-default': 'https://gwydion.dev/en/projects/fixture-studio',
    })
    expect(head.openGraph).toMatchObject({
      'og:title': 'Fixture Studio · Ada Example',
      'og:description': 'A studio for fixtures.',
      'og:url': 'https://gwydion.dev/en/projects/fixture-studio',
      'og:locale': 'en_US',
    })
    expect(head.twitter).toMatchObject({
      'twitter:card': 'summary_large_image',
      'twitter:title': 'Fixture Studio · Ada Example',
    })
  })

  it('describes About in German on the German page', async () => {
    const page = await visit('/de/about', { content: fixtureContent() })
    const head = page.head()

    expect(head.title).toBe('Über mich · Ada Example')
    expect(head.description).toMatch(/Lebenslauf/)
    expect(head.canonical).toBe('https://gwydion.dev/de/about')
    expect(head.alternates).toEqual({
      en: 'https://gwydion.dev/en/about',
      de: 'https://gwydion.dev/de/about',
      'x-default': 'https://gwydion.dev/en/about',
    })
    expect(head.openGraph).toMatchObject({
      'og:title': 'Über mich · Ada Example',
      'og:url': 'https://gwydion.dev/de/about',
      'og:locale': 'de_DE',
    })
  })

  it.each([
    '/en',
    '/de/projects',
    '/en/projects/self-engine',
    '/de/about',
    '/en/contact',
    '/de/writing',
    '/en/impressum',
    '/de/datenschutz',
  ])(
    '%s has its own title, description, canonical, alternates and Open Graph tags',
    async (url) => {
      const page = await visit(url, { content: fixtureContent({ posts: [FIXTURE_POST] }) })
      const head = page.head()
      const path = url.slice(3)

      expect(head.title).toMatch(/Ada Example/)
      expect(head.description).toBeTruthy()
      expect(head.canonical).toBe(`https://gwydion.dev${url}`)
      expect(head.alternates).toEqual({
        en: `https://gwydion.dev/en${path}`,
        de: `https://gwydion.dev/de${path}`,
        'x-default': path ? `https://gwydion.dev/en${path}` : 'https://gwydion.dev/',
      })
      expect(Object.keys(head.openGraph)).toEqual(
        expect.arrayContaining(['og:title', 'og:description', 'og:url', 'og:image', 'og:locale']),
      )
    },
  )
})

describe('Structured data', () => {
  it('describes Gwydion as a Person built from the Profile, in the Site language', async () => {
    const page = await visit('/de/about', { content: fixtureContent() })

    expect(page.head().structuredData).toEqual([
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://gwydion.dev/#person',
        name: 'Ada Example',
        url: 'https://gwydion.dev/de',
        image: 'https://gwydion.dev/portrait.webp',
        jobTitle: 'Fixture-Entwicklerin',
        description: 'Ich bin ein Fixture.',
        email: 'ada@example.com',
        knowsAbout: ['Testing'],
        // The LinkedIn link is still a placeholder, so it is left out.
        sameAs: ['https://github.com/ada-example'],
      },
    ])
  })
})

describe('Sitemap', () => {
  const content = fixtureContent({ posts: [FIXTURE_POST] })
  const urls = [
    ...buildSitemap(content).matchAll(/<loc>https:\/\/gwydion\.dev([^<]+)<\/loc>/g),
  ].map(([, path]) => path)

  it.each(urls)('lists %s, which opens a page', async (url) => {
    const page = await visit(url, { content })

    expect(page.path()).toBe(url)
    expect(within(page.main()).queryByRole('heading', { name: /not found|nicht gefunden/i })).toBe(
      null,
    )
  })
})
