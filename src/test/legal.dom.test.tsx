import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { visit } from './visit'

describe('Legal pages', () => {
  it.each([
    [
      '/en/impressum',
      'Legal notice',
      'Information pursuant to § 5 DDG (German Digital Services Act)',
    ],
    ['/de/impressum', 'Impressum', 'Angaben gemäß § 5 DDG'],
    ['/en/datenschutz', 'Privacy policy', 'Controller'],
    ['/de/datenschutz', 'Datenschutzerklärung', 'Verantwortlicher'],
  ])('%s renders its text inside the shell', async (url, title, firstSection) => {
    const page = await visit(url)

    expect(page.path()).toBe(url)
    expect(page.title()).toBe(title)
    expect(within(page.main()).getByRole('heading', { level: 2, name: firstSection })).toBeTruthy()
  })

  it.each(['/en/impressum', '/en/datenschutz'])(
    '%s says that only the German text is legally binding and links to it',
    async (url) => {
      const page = await visit(url)

      const note = within(page.main()).getByRole('note')
      expect(note.textContent).toContain('Only the German version is legally binding.')
      expect(
        within(note).getByRole('link', { name: 'Read the German version' }).getAttribute('href'),
      ).toBe(url.replace('/en/', '/de/'))
    },
  )

  it.each(['/de/impressum', '/de/datenschutz'])('%s is the binding text itself', async (url) => {
    const page = await visit(url)

    expect(within(page.main()).queryByRole('note')).toBeNull()
  })
})

describe('Legal links', () => {
  it.each([
    ['/en', 'Sidebar', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/en/projects', 'Sidebar', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/en/about', 'Sidebar', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/en/contact', 'Sidebar', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/en/impressum', 'Sidebar', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/en/anything', 'Sidebar', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/de', 'Seitenleiste', 'Rechtliches', ['Impressum', 'Datenschutzerklärung']],
    ['/de/datenschutz', 'Seitenleiste', 'Rechtliches', ['Impressum', 'Datenschutzerklärung']],
  ])(
    '%s links to both legal pages from the sidebar and on phones',
    async (url, sidebar, name, labels) => {
      const page = await visit(url)
      const lang = url.startsWith('/de') ? 'de' : 'en'
      const expected = [
        [labels[0], `/${lang}/impressum`],
        [labels[1], `/${lang}/datenschutz`],
      ]
      const linksOf = (container: HTMLElement) =>
        within(within(container).getByRole('navigation', { name }))
          .getAllByRole('link')
          .map((link) => [link.textContent, link.getAttribute('href')])

      expect(linksOf(page.sidebar(sidebar))).toEqual(expected)
      // Phones have no sidebar: the main pane ends with the same links.
      expect(linksOf(page.main())).toEqual(expected)
    },
  )

  it('opens the legal notice from the sidebar', async () => {
    const page = await visit('/en/about')

    await page.click(within(page.sidebar()).getByRole('link', { name: 'Legal notice' }))

    expect(page.path()).toBe('/en/impressum')
    expect(page.title()).toBe('Legal notice')
  })
})
