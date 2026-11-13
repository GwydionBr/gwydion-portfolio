import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { FIXTURE_POST, fixtureContent } from './contentFixtures'
import { navigationOf, visit } from './visit'

const tile = (page: { main(): HTMLElement }, name: string) =>
  within(page.main()).getByRole('region', { name })

describe('The Profile on the Overview', () => {
  it('is titled with the name, and leads with role, location, pitch and the Availability', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    expect(page.title()).toBe('Ada Example')
    const hero = page.main().querySelector('header')!
    expect(hero.textContent).toContain('Fixture developer · Testland')
    expect(hero.textContent).toContain('I am a fixture.')
    const availability = tile(page, 'Availability')
    expect(availability.textContent).toContain('Open to fixtures')
    expect(availability.textContent).toContain('Also fixtures on the side')
  })

  it('offers the CV and "Get in touch" right under the pitch', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    const hero = within(page.main().querySelector('header')!)
    expect(hero.getByRole('link', { name: 'Download CV' }).getAttribute('href')).toBe(
      '/cv/ada-example-cv-en.pdf',
    )
    expect(hero.getByRole('link', { name: 'Get in touch' }).getAttribute('href')).toBe(
      '/en/contact',
    )
  })

  it('shows "Now" below the Projects, and leaves the skills to About', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    expect(within(page.main()).queryByRole('region', { name: 'Skills' })).toBeNull()
    expect(tile(page, 'Now').textContent).toContain('Learning · More tests.')
  })

  it('shows the same in German under /de', async () => {
    const page = await visit('/de', { content: fixtureContent() })

    expect(page.main().querySelector('header')!.textContent).toContain('Ich bin ein Fixture.')
    expect(tile(page, 'Aktuell').textContent).toContain('Lernen · Mehr Tests.')
    const availability = tile(page, 'Verfügbarkeit')
    expect(availability.textContent).toContain('Offen für Fixtures')
    expect(availability.textContent).toContain('Nebenbei auch Fixtures')
  })
})

describe('The sidebar', () => {
  it.each([
    ['/en/projects', 'Sidebar', 'Fixture developer', 'Availability', 'Open to fixtures'],
    ['/de/about', 'Seitenleiste', 'Fixture-Entwicklerin', 'Verfügbarkeit', 'Offen für Fixtures'],
  ])('on %s shows identity and Availability', async (url, sidebar, role, heading, headline) => {
    const page = await visit(url, { content: fixtureContent() })

    const aside = page.sidebar(sidebar)
    expect(aside.textContent).toContain('Ada Example')
    expect(aside.textContent).toContain(role)
    expect(within(aside).getByRole('region', { name: heading }).textContent).toContain(headline)
  })
})

describe('Writing', () => {
  it('is absent from navigation and Overview while there are no Posts', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    expect(navigationOf('Main navigation').entries).not.toContain('Writing')
    expect(navigationOf('Tab bar').entries).not.toContain('Writing')
    expect(within(page.main()).queryByRole('region', { name: 'Latest Posts' })).toBeNull()
  })

  it('appears in navigation and as a "latest Posts" tile once a Post exists', async () => {
    const page = await visit('/en', { content: fixtureContent({ posts: [FIXTURE_POST] }) })

    expect(navigationOf('Main navigation').entries).toEqual([
      'Overview',
      'Projects',
      'Writing',
      'About',
      'Contact',
    ])
    expect(navigationOf('Tab bar')).toEqual(navigationOf('Main navigation'))
    const latest = tile(page, 'Latest Posts')
    expect(latest.textContent).toContain(FIXTURE_POST.title)
  })

  it('marks a Post whose Post language differs from the Site language', async () => {
    const page = await visit('/de', { content: fixtureContent({ posts: [FIXTURE_POST] }) })

    const post = within(tile(page, 'Neueste Beiträge')).getByText(FIXTURE_POST.title)
    expect(post.getAttribute('lang')).toBe('en')
    expect(navigationOf('Hauptnavigation').entries).toContain('Beiträge')
  })

  it('has its own view once a Post exists', async () => {
    const page = await visit('/en/writing', {
      content: fixtureContent({ posts: [FIXTURE_POST] }),
    })
    expect(page.title()).toBe('Writing')
    expect(navigationOf('Main navigation').current).toEqual(['Writing'])
    expect(page.main().textContent).toContain(FIXTURE_POST.title)
  })

  it('has no view while there are no Posts', async () => {
    const page = await visit('/en/writing', { content: fixtureContent() })

    expect(page.title()).toBe('Page not found')
  })
})

describe('The Profile links in the shell', () => {
  it.each([
    ['/en/projects', 'Sidebar'],
    ['/en/about', 'Sidebar'],
    ['/de/projects', 'Seitenleiste'],
  ])('%s offers email and GitHub from the sidebar and on phones', async (url, sidebar) => {
    const page = await visit(url, { content: fixtureContent() })
    const linksOf = (container: HTMLElement) => ({
      email: within(container).getByRole('link', { name: 'ada@example.com' }).getAttribute('href'),
      github: within(container).getByRole('link', { name: 'GitHub' }).getAttribute('href'),
      // The LinkedIn URL is still a placeholder: named, but not a working link.
      linkedin: within(container).queryByRole('link', { name: 'LinkedIn' }),
    })
    const expected = {
      email: 'mailto:ada@example.com',
      github: 'https://github.com/ada-example',
      linkedin: null,
    }

    expect(linksOf(page.sidebar(sidebar))).toEqual(expected)
    // Phones have no sidebar: the main pane ends with the same links.
    expect(linksOf(page.main())).toEqual(expected)
  })
})
