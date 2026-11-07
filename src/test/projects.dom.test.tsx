import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { fixtureContent } from './contentFixtures'
import { navigationOf, visit } from './visit'

const projectList = (page: { main(): HTMLElement }, name: string) =>
  within(within(page.main()).getByRole('list', { name })).getAllByRole('listitem')

describe('The Projects view', () => {
  it('lists every Project in the configured order, with kind, years and summary', async () => {
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

  it('tells the German story under /de', async () => {
    const page = await visit('/de/projects/self-engine', { content: fixtureContent() })

    expect(page.main().textContent).toContain('Die Geschichte von Fixture Engine.')
    expect(page.main().textContent).not.toContain('The story of')
    expect(page.main().textContent).toContain('Eigenes Produkt · 2025–now')
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
  it('the Overview shows the featured Projects and one tile per Self-Engine number', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    const featured = within(page.main()).getByRole('region', { name: 'Featured Projects' })
    expect(
      within(featured)
        .getAllByRole('heading', { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual(['Fixture Engine', 'Fixture Studio'])
    expect(within(featured).getByRole('link', { name: 'View all' }).getAttribute('href')).toBe(
      '/en/projects',
    )
    expect(
      within(page.main()).getByRole('region', { name: 'Fixture Engine · commits' }).textContent,
    ).toContain('1,234')
    expect(
      within(page.main()).getByRole('region', { name: 'Fixture Engine · releases' }).textContent,
    ).toContain('56')
  })

  it('the German Overview names them in German', async () => {
    const page = await visit('/de', { content: fixtureContent() })

    expect(within(page.main()).getByRole('region', { name: 'Ausgewählte Projekte' })).toBeTruthy()
    expect(
      within(page.main()).getByRole('region', { name: 'Fixture Engine · Commits' }),
    ).toBeTruthy()
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
