import { describe, expect, it } from 'vite-plus/test'
import { queryByRole, within } from '@testing-library/dom'
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
    ['/en', 'Settings', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/en/projects', 'Settings', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/en/about', 'Settings', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/en/contact', 'Settings', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/en/impressum', 'Settings', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/en/anything', 'Settings', 'Legal', ['Legal notice', 'Privacy policy']],
    ['/de', 'Einstellungen', 'Rechtliches', ['Impressum', 'Datenschutzerklärung']],
    ['/de/datenschutz', 'Einstellungen', 'Rechtliches', ['Impressum', 'Datenschutzerklärung']],
  ])(
    '%s links to both legal pages from the Settings panel and from the More sheet',
    async (url, settings, name, labels) => {
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

      // Only the Settings panel holds them, not the sidebar itself.
      expect(
        within(page.sidebar(lang === 'de' ? 'Seitenleiste' : 'Sidebar')).queryByRole('navigation', {
          name,
        }),
      ).toBeNull()
      expect(linksOf(await page.openSettings(settings))).toEqual(expected)
      // Phones have no sidebar: the tab bar's More sheet holds the same links.
      await page.resize('phone')
      expect(linksOf(await page.openMore(lang === 'de' ? 'Mehr' : 'More'))).toEqual(expected)
    },
  )

  it('opens the legal notice from the Settings panel, which then closes', async () => {
    const page = await visit('/en/about')

    await page.click(within(await page.openSettings()).getByRole('link', { name: 'Legal notice' }))

    expect(page.path()).toBe('/en/impressum')
    expect(page.title()).toBe('Legal notice')
    expect(queryByRole(document.body, 'dialog', { name: 'Settings' })).toBeNull()
  })
})
