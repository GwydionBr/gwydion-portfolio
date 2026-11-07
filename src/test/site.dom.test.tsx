import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { navigationOf, visit } from './visit'

describe('Overview', () => {
  it('opens under /en in English, inside the shell', async () => {
    const page = await visit('/en')

    expect(page.path()).toBe('/en')
    expect(page.title()).toBe('Overview')
    expect(document.documentElement.lang).toBe('en')
    expect(navigationOf('Main navigation')).toEqual({
      entries: ['Overview', 'Projects', 'About', 'Contact'],
      current: ['Overview'],
    })
    expect(
      within(page.main()).getByRole('link', { name: 'Get in touch' }).getAttribute('href'),
    ).toBe('/en/contact')
  })

  it('opens under /de with every interface text in German', async () => {
    const page = await visit('/de')

    expect(page.title()).toBe('Übersicht')
    expect(document.documentElement.lang).toBe('de')
    expect(
      within(page.sidebar('Seitenleiste')).getByRole('heading', { name: 'Verfügbarkeit' }),
    ).toBeTruthy()
    expect(navigationOf('Hauptnavigation')).toEqual({
      entries: ['Übersicht', 'Projekte', 'Über mich', 'Kontakt'],
      current: ['Übersicht'],
    })
    expect(within(page.main()).getByRole('link', { name: 'Kontakt aufnehmen' })).toBeTruthy()
    expect(document.body.textContent).toContain('Zum Inhalt springen')
  })
})

describe('Views', () => {
  it.each([
    ['/en/projects', 'Projects'],
    ['/en/about', 'About'],
    ['/en/contact', 'Contact'],
    ['/de/projects', 'Projekte'],
    ['/de/about', 'Über mich'],
    ['/de/contact', 'Kontakt'],
  ])('%s shows its view inside the shell, its navigation entry current', async (url, title) => {
    const page = await visit(url)

    expect(page.path()).toBe(url)
    expect(page.title()).toBe(title)
    const navigation = url.startsWith('/de') ? 'Hauptnavigation' : 'Main navigation'
    expect(navigationOf(navigation).current).toEqual([title])
  })
})

describe('The bare domain', () => {
  it('redirects a German-preferring browser to /de', async () => {
    const page = await visit('/', { browserLanguages: ['de-DE', 'en'] })

    expect(page.path()).toBe('/de')
    expect(page.title()).toBe('Übersicht')
  })

  it('redirects any other browser to /en', async () => {
    expect((await visit('/', { browserLanguages: ['fr-FR', 'de'] })).path()).toBe('/de')
    expect((await visit('/', { browserLanguages: ['fr-FR'] })).path()).toBe('/en')
  })
})

describe('Not found', () => {
  it.each([
    ['an unsupported language prefix', '/xx/anything', 'Page not found'],
    ['an unknown path', '/anything', 'Page not found'],
    ['an unknown page under /en', '/en/anything', 'Page not found'],
    ['an unknown page under /de', '/de/anything', 'Seite nicht gefunden'],
  ])('%s shows the not-found view inside the shell', async (_, url, title) => {
    const page = await visit(url)

    expect(page.path()).toBe(url)
    expect(page.title()).toBe(title)
    expect(page.sidebar(url.startsWith('/de') ? 'Seitenleiste' : 'Sidebar')).toBeTruthy()
  })
})

describe('Language switch', () => {
  it('moves from /en/about to /de/about', async () => {
    const page = await visit('/en/about')

    const switcher = within(page.sidebar()).getByRole('navigation', { name: 'Site language' })
    await page.click(within(switcher).getByRole('link', { name: 'Deutsch' }))

    expect(page.path()).toBe('/de/about')
    expect(page.title()).toBe('Über mich')
    expect(document.documentElement.lang).toBe('de')
  })
})

describe('Phones', () => {
  it('get a tab bar with the same entries as the sidebar', async () => {
    await visit('/en/projects')

    expect(navigationOf('Tab bar')).toEqual(navigationOf('Main navigation'))
    expect(navigationOf('Tab bar').current).toEqual(['Projects'])
  })
})
