import { describe, expect, it } from 'vite-plus/test'
import { fireEvent, screen, waitFor, within } from '@testing-library/dom'
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
  it('opens with what the Project is: kind, status, summary, key points, website and cover', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })

    expect(page.title()).toBe('Fixture Engine')
    const main = within(page.main())
    expect(main.getByText('Own product')).toBeTruthy()
    expect(main.getByText('Live, commercial')).toBeTruthy()
    expect(main.getByText('An engine for fixtures.')).toBeTruthy()
    expect(main.getByRole('list', { name: 'Key points' }).textContent).toBe(
      'Fast engineTested engineTyped engine',
    )
    expect(main.getByRole('link', { name: 'Visit website' }).getAttribute('href')).toBe(
      'https://engine.example',
    )
    expect(main.queryByRole('link', { name: 'View source' })).toBeNull()
    // The cover: the first screenshot on the page, before the story and outside its galleries.
    const [cover] = main.getAllByRole('button', { name: 'Enlarge screenshot: Dashboard' })
    expect(cover!.closest('ul')).toBeNull()
    expect(navigationOf('Main navigation').current).toEqual(['Projects'])
  })

  it('tells the Project’s story in English under /en, with its stats', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })

    const main = page.main()
    expect(within(main).getByRole('list', { name: 'Numbers' }).textContent).toContain(
      '1,234commits',
    )
    expect(main.textContent).toContain('The story of Fixture Engine.')
  })

  it('lists the story’s sections as links to their headings', async () => {
    const page = await visit('/en/projects/fixture-studio', { content: fixtureContent() })

    const contents = within(screen.getByRole('navigation', { name: 'On this page' }))
    const links = contents.getAllByRole('link')
    expect(links.map((link) => [link.textContent, link.getAttribute('href')])).toEqual([
      ['The idea', '#the-idea'],
      ['How it works', '#how-it-works'],
    ])
    for (const link of links) {
      const id = link.getAttribute('href')!.slice(1)
      expect(
        within(page.main()).getByRole('heading', { level: 2, name: link.textContent! }).id,
      ).toBe(id)
    }
  })

  it('moves the focus to a section’s heading when its link is followed, and puts it in the address', async () => {
    const page = await visit('/de/projects/fixture-studio', { content: fixtureContent() })
    const heading = within(page.main()).getByRole('heading', { name: 'Wie es funktioniert' })

    await page.click(
      within(screen.getByRole('navigation', { name: 'Auf dieser Seite' })).getByRole('link', {
        name: 'Wie es funktioniert',
      }),
    )

    expect(document.activeElement).toBe(heading)
    await waitFor(() => expect(page.hash()).toBe('wie-es-funktioniert'))
    expect(page.path()).toBe('/de/projects/fixture-studio')
  })

  it('marks the section jumped to as the one being read, wherever its heading comes to rest', async () => {
    const page = await visit('/de/projects/fixture-studio', { content: fixtureContent() })
    const contents = () => screen.getByRole('navigation', { name: 'Auf dieser Seite' })
    const marked = () =>
      within(contents())
        .getAllByRole('link')
        .filter((link) => link.getAttribute('aria-current') === 'location')
        .map((link) => link.textContent)

    await page.click(within(contents()).getByRole('link', { name: 'Die Idee' }))

    await waitFor(() => expect(page.hash()).toBe('die-idee'))
    expect(marked()).toEqual(['Die Idee'])
  })

  it('leaves a section’s address behind when the Site language is switched', async () => {
    const page = await visit('/de/projects/fixture-studio', { content: fixtureContent() })
    await page.click(
      within(screen.getByRole('navigation', { name: 'Auf dieser Seite' })).getByRole('link', {
        name: 'Wie es funktioniert',
      }),
    )
    await waitFor(() => expect(page.hash()).toBe('wie-es-funktioniert'))

    const settings = await page.openSettings('Einstellungen')
    const switcher = within(settings).getByRole('navigation', { name: 'Seitensprache' })
    await page.click(within(switcher).getByRole('link', { name: 'English' }))

    expect(page.path()).toBe('/en/projects/fixture-studio')
    expect(page.hash()).toBe('')
  })

  it('sums the Project up in its Facts: period, role, source code and stack', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })

    const facts = within(within(page.main()).getByRole('region', { name: 'Facts' }))
    const terms = facts.getAllByRole('term').map((term) => term.textContent)
    const values = facts.getAllByRole('definition').map((value) => value.textContent)
    expect(Object.fromEntries(terms.map((term, index) => [term, values[index]]))).toEqual({
      Period: '2025–now',
      Role: 'Sole developer',
      'Source code': 'Not public',
      Stack: 'TypeScriptPostgres',
    })
  })

  it('links public source code from the entry, and offers no website when there is none', async () => {
    const page = await visit('/de/projects/fixture-kit', { content: fixtureContent() })

    const main = within(page.main())
    expect(main.getByRole('link', { name: 'Quellcode ansehen' }).getAttribute('href')).toBe(
      'https://github.com/ada-example/fixture-kit',
    )
    expect(main.queryByRole('link', { name: 'Website besuchen' })).toBeNull()
    expect(main.getByText('Archiviert')).toBeTruthy()
    expect(
      within(main.getByRole('region', { name: 'Fakten' })).getByText('Öffentlich auf GitHub'),
    ).toBeTruthy()
  })

  it('has no cover without screenshots', async () => {
    const page = await visit('/en/projects/fixture-kit', { content: fixtureContent() })

    expect(within(page.main()).queryByRole('img')).toBeNull()
  })

  it('ends with the next Project, the first again after the last', async () => {
    const page = await visit('/en/projects/fixture-kit', { content: fixtureContent() })

    const next = within(within(page.main()).getByRole('region', { name: 'Next Project' }))
    expect(next.getByRole('link', { name: 'Fixture Engine' }).getAttribute('href')).toBe(
      '/en/projects/self-engine',
    )
  })

  it('tells the German story under /de', async () => {
    const page = await visit('/de/projects/self-engine', { content: fixtureContent() })

    expect(page.main().textContent).toContain('Die Geschichte von Fixture Engine.')
    expect(page.main().textContent).not.toContain('The story of')
    expect(page.main().textContent).toContain('Eigenes Produkt')
    expect(page.main().textContent).toContain('Schnelles engine')
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

describe('The second sidebar beside the Projects (the CSS shows it from lg up)', () => {
  const sidebar = (name = 'Projects') => within(screen.getByRole('navigation', { name }))

  it('opens the first Project from /projects on a wide screen, every Project listed beside it', async () => {
    const page = await visit('/en/projects', { content: fixtureContent(), screen: 'wide' })

    expect(page.path()).toBe('/en/projects/self-engine')
    expect(page.title()).toBe('Fixture Engine')
    const links = sidebar().getAllByRole('link')
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/en/projects/self-engine',
      '/en/projects/fixture-studio',
      '/en/projects/fixture-kit',
    ])
    expect(links[0]!.textContent).toBe('Fixture EngineOwn product · 2025–now')
    expect(navigationOf('Projects').current).toEqual(['Fixture EngineOwn product · 2025–now'])
    expect(navigationOf('Main navigation').current).toEqual(['Projects'])
  })

  it('opens another Project from it, and stays where it is', async () => {
    const page = await visit('/de/projects/fixture-studio', {
      content: fixtureContent(),
      screen: 'wide',
    })
    const list = screen.getByRole('navigation', { name: 'Projekte' })

    await page.click(sidebar('Projekte').getByRole('link', { name: /Fixture Kit/ }))

    expect(page.path()).toBe('/de/projects/fixture-kit')
    expect(page.title()).toBe('Fixture Kit')
    expect(screen.getByRole('navigation', { name: 'Projekte' })).toBe(list)
    expect(navigationOf('Projekte').current).toEqual(['Fixture KitOpen Source · 2024'])
  })

  it('keeps the list as a view below lg, and opens the first Project once the window is wide enough', async () => {
    const page = await visit('/en/projects', { content: fixtureContent() })
    expect(page.title()).toBe('Projects')

    await page.resize('wide')

    await waitFor(() => expect(page.path()).toBe('/en/projects/self-engine'))
    expect(page.title()).toBe('Fixture Engine')
  })

  it('is resized on its edge, the width kept for the next visit', async () => {
    const page = await visit('/en/projects/self-engine', {
      content: fixtureContent(),
      screen: 'wide',
    })
    const handle = screen.getByRole('separator', { name: 'Resize project list' })
    const painted = () =>
      document.documentElement.style.getPropertyValue('--secondary-navbar-width')
    expect(handle.getAttribute('aria-valuemin')).toBe('208')
    expect(handle.getAttribute('aria-valuemax')).toBe('400')
    expect(handle.getAttribute('aria-valuenow')).toBe('256')

    await page.press('ArrowRight', { target: handle })
    await page.press('ArrowRight', { target: handle, shiftKey: true })

    expect(handle.getAttribute('aria-valuenow')).toBe('316')
    expect(localStorage.getItem('secondary-navbar-width')).toBe('316')
    expect(painted()).toBe('19.75rem')

    const reloaded = await visit('/en/projects/fixture-kit', {
      content: fixtureContent(),
      screen: 'wide',
    })
    reloaded.paintFirstFrame()
    expect(painted()).toBe('19.75rem')

    await reloaded.settle(() =>
      fireEvent.doubleClick(screen.getByRole('separator', { name: 'Resize project list' })),
    )
    expect(localStorage.getItem('secondary-navbar-width')).toBeNull()
    expect(painted()).toBe('')
  })

  it('names its resize handle in German on German pages', async () => {
    await visit('/de/projects/self-engine', { content: fixtureContent(), screen: 'wide' })

    expect(screen.getByRole('separator', { name: 'Projektliste anpassen' })).toBeTruthy()
  })

  it('is gone outside the Projects', async () => {
    const page = await visit('/en/projects/fixture-kit', {
      content: fixtureContent(),
      screen: 'wide',
    })

    await page.click(within(page.sidebar('Sidebar')).getByRole('link', { name: 'About' }))

    await waitFor(() => expect(screen.queryByRole('navigation', { name: 'Projects' })).toBeNull())
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

describe('Projects on the Overview', () => {
  const work = (page: { main(): HTMLElement }, name: string) =>
    within(within(page.main()).getByRole('region', { name })).getAllByRole('article')

  it('shows every Project as a card in the configured order, each one link to its page', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    const cards = work(page, 'What I built')
    expect(
      cards.map((card) => within(card).getByRole('heading', { level: 3 }).textContent),
    ).toEqual(['Fixture Engine', 'Fixture Studio', 'Fixture Kit'])
    expect(
      cards.map((card) =>
        within(card)
          .getAllByRole('link')
          .map((link) => [link.textContent, link.getAttribute('href')]),
      ),
    ).toEqual([
      [['Fixture Engine', '/en/projects/self-engine']],
      [['Fixture Studio', '/en/projects/fixture-studio']],
      [['Fixture Kit', '/en/projects/fixture-kit']],
    ])
  })

  it('says on each card what the Project is, what stands out, and when and as what it was built', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    const [engine, studio] = work(page, 'What I built')
    expect(engine!.textContent).toContain('Own product')
    expect(engine!.textContent).toContain('Live, commercial')
    expect(engine!.textContent).toContain('An engine for fixtures.')
    expect(
      within(engine!)
        .getAllByRole('listitem')
        .map((point) => point.textContent),
    ).toEqual(['Fast engine', 'Tested engine', 'Typed engine'])
    expect(within(engine!).getByRole('list', { name: 'Key points' })).toBeTruthy()
    expect(engine!.textContent).toContain('2025–now · Sole developer')
    expect(studio!.textContent).toContain('Client work')
    expect(studio!.textContent).toContain('Launching soon')
  })

  it('leads a card with its cover, and a Project without one with no image', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    const [engine, studio] = work(page, 'What I built')
    const covers = within(engine!).getAllByRole('img', { name: 'The fixture dashboard' })
    expect(covers.length).toBeGreaterThan(0)
    expect(covers[0]!.getAttribute('srcset')).toContain('dashboard-en-')
    expect(engine!.textContent).toContain('engine.example')
    expect(within(studio!).queryByRole('img')).toBeNull()
  })

  it('names them in German under /de, each card leading to its German page', async () => {
    const page = await visit('/de', { content: fixtureContent() })

    const [engine, , kit] = work(page, 'Was ich gebaut habe')
    expect(engine!.textContent).toContain('Eigenes Produkt')
    expect(within(engine!).getByRole('list', { name: 'Kernpunkte' }).textContent).toContain(
      'Schnelles engine',
    )
    expect(engine!.textContent).toContain('2025–heute · Alleinige Entwicklerin')
    expect(within(kit!).getByRole('link').getAttribute('href')).toBe('/de/projects/fixture-kit')
  })
})
