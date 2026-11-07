import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { fixtureContent } from './contentFixtures'
import { navigationOf, visit } from './visit'

const projectList = (page: { main(): HTMLElement }, name: string) =>
  within(within(page.main()).getByRole('list', { name })).getAllByRole('listitem')

describe('The Projects view', () => {
  it('lists every Project in the configured order, with kind, period and summary', async () => {
    const page = await visit('/en/projects', { content: fixtureContent() })

    const items = projectList(page, 'Projects')
    expect(items.map((item) => within(item).getByRole('heading').textContent)).toEqual([
      'Fixture Engine',
      'Fixture Studio',
      'Fixture Kit',
    ])
    expect(items[0]!.textContent).toContain('Own product')
    expect(items[0]!.textContent).toContain('2025–now')
    expect(items[0]!.textContent).toContain('An engine for fixtures.')
    expect(within(items[1]!).getByRole('link').getAttribute('href')).toBe(
      '/en/projects/fixture-studio',
    )
  })

  it('lists them in German under /de', async () => {
    const page = await visit('/de/projects', { content: fixtureContent() })

    const items = projectList(page, 'Projekte')
    expect(items[1]!.textContent).toContain('Kundenprojekt')
    expect(items[1]!.textContent).toContain('Ein Studio für Fixtures.')
    expect(items[2]!.textContent).toContain('Open Source')
    expect(items[0]!.textContent).toContain('2025–heute')
    expect(items[0]!.textContent).not.toContain('now')
    expect(items[2]!.textContent).toContain('2024')
    expect(items[2]!.textContent).not.toContain('2024–')
  })
})

describe('A Project page', () => {
  it('tells the Project’s story in English under /en, with its meta, stack and stats', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })

    expect(page.title()).toBe('Fixture Engine')
    const main = page.main()
    expect(main.textContent).toContain('Own product · 2025–now')
    expect(main.textContent).toContain('An engine for fixtures.')
    expect(within(main).getByRole('list', { name: 'Stack' }).textContent).toBe('TypeScriptPostgres')
    expect(within(main).getByRole('list', { name: 'Numbers' }).textContent).toContain(
      '1,234commits',
    )
    expect(main.textContent).toContain('The story of Fixture Engine.')
    expect(navigationOf('Main navigation').current).toEqual(['Projects'])
  })

  it('sums the Project up in a Facts rail: website, kind, period, role, status, source code', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })

    const facts = within(within(page.main()).getByRole('region', { name: 'Facts' }))
    expect(facts.getByRole('link', { name: 'Visit website' }).getAttribute('href')).toBe(
      'https://engine.example',
    )
    const terms = facts.getAllByRole('term').map((term) => term.textContent)
    const values = facts.getAllByRole('definition').map((value) => value.textContent)
    expect(Object.fromEntries(terms.map((term, index) => [term, values[index]]))).toEqual({
      Kind: 'Own product',
      Period: '2025–now',
      Role: 'Sole developer',
      Status: 'Live, commercial',
      'Source code': 'Not public',
    })
  })

  it('links public source code from the Facts rail, and offers no website when there is none', async () => {
    const page = await visit('/de/projects/fixture-kit', { content: fixtureContent() })

    const facts = within(within(page.main()).getByRole('region', { name: 'Fakten' }))
    expect(facts.getByRole('link', { name: 'Öffentlich auf GitHub' }).getAttribute('href')).toBe(
      'https://github.com/ada-example/fixture-kit',
    )
    expect(facts.queryByRole('link', { name: 'Website besuchen' })).toBeNull()
    expect(facts.getByText('Archiviert')).toBeTruthy()
  })

  it('tells the German story under /de', async () => {
    const page = await visit('/de/projects/self-engine', { content: fixtureContent() })

    expect(page.main().textContent).toContain('Die Geschichte von Fixture Engine.')
    expect(page.main().textContent).not.toContain('The story of')
    expect(page.main().textContent).toContain('Eigenes Produkt · 2025–heute')
  })

  it('is opened from the Projects view', async () => {
    const page = await visit('/en/projects', { content: fixtureContent() })

    await page.click(within(page.main()).getByRole('link', { name: /Fixture Studio/ }))

    expect(page.path()).toBe('/en/projects/fixture-studio')
    expect(page.title()).toBe('Fixture Studio')
  })

  it('offers a Back control to the Projects list (phones; the CSS hides it from md up)', async () => {
    const page = await visit('/de/projects/fixture-studio', { content: fixtureContent() })

    const back = within(page.main()).getByRole('link', { name: 'Zurück zu den Projekten' })
    expect(back.getAttribute('aria-current')).toBeNull()
    await page.click(back)

    expect(page.path()).toBe('/de/projects')
    expect(page.title()).toBe('Projekte')
  })

  it('does not exist for an unknown slug', async () => {
    const page = await visit('/en/projects/does-not-exist', { content: fixtureContent() })

    expect(page.title()).toBe('Page not found')
  })
})

describe('The site’s own Projects', () => {
  it('Self-Engine’s page tells its MDX story in the Site language', async () => {
    const english = await visit('/en/projects/self-engine')
    expect(within(english.main()).getByRole('heading', { level: 2, name: 'The idea' })).toBeTruthy()

    const german = await visit('/de/projects/self-engine')
    expect(within(german.main()).getByRole('heading', { level: 2, name: 'Die Idee' })).toBeTruthy()
  })
})

describe('Projects on the Overview and in the sidebar', () => {
  it('the Overview shows the featured Projects as cards, linking to their pages', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    const featured = within(page.main()).getByRole('region', { name: 'Featured Projects' })
    const cards = within(featured).getAllByRole('article')
    expect(
      cards.map((card) => within(card).getByRole('heading', { level: 3 }).textContent),
    ).toEqual(['Fixture Engine', 'Fixture Studio'])
    expect(
      within(cards[1]!).getByRole('link', { name: 'Fixture Studio' }).getAttribute('href'),
    ).toBe('/en/projects/fixture-studio')
    expect(within(featured).getByRole('link', { name: 'View all' }).getAttribute('href')).toBe(
      '/en/projects',
    )
  })

  it('a featured Project with numbers shows them and its stack on its card', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    const [engine, studio] = within(
      within(page.main()).getByRole('region', { name: 'Featured Projects' }),
    ).getAllByRole('article')
    expect(within(engine!).getByRole('list', { name: 'Numbers' }).textContent).toBe(
      '1,234commits56releases',
    )
    expect(within(engine!).getByRole('list', { name: 'Stack' }).textContent).toBe(
      'TypeScriptPostgres',
    )
    expect(within(studio!).queryByRole('list', { name: 'Numbers' })).toBeNull()
  })

  it('the German Overview names them in German', async () => {
    const page = await visit('/de', { content: fixtureContent() })

    const featured = within(page.main()).getByRole('region', { name: 'Ausgewählte Projekte' })
    expect(within(featured).getByRole('list', { name: 'Zahlen' }).textContent).toContain(
      '1,234Commits',
    )
  })

  it('the sidebar shows the pinned Projects, linking to their pages', async () => {
    await visit('/en/projects/self-engine', { content: fixtureContent() })

    const pinned = navigationOf('Pinned Projects')
    expect(pinned).toEqual({ entries: ['Fixture Engine'], current: ['Fixture Engine'] })
    expect(
      within(document.body)
        .getByRole('navigation', { name: 'Pinned Projects' })
        .querySelector('a')
        ?.getAttribute('href'),
    ).toBe('/en/projects/self-engine')
  })
})
