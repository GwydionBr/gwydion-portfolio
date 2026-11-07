import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { FIXTURE_POST, fixtureContent } from './contentFixtures'
import { navigationOf, visit } from './visit'

const tile = (page: { main(): HTMLElement }, name: string) =>
  within(page.main()).getByRole('region', { name })

describe('The Profile on the Overview', () => {
  it('shows pitch with skills, "Now" and the Availability in English under /en', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    const profile = tile(page, 'Profile')
    expect(profile.textContent).toContain('I am a fixture.')
    expect(within(profile).getByRole('list', { name: 'Skills' }).textContent).toBe('Testing')
    expect(tile(page, 'Now').textContent).toContain('Learning · More tests.')
    const availability = tile(page, 'Availability')
    expect(availability.textContent).toContain('Open to fixtures')
    expect(availability.textContent).toContain('Also fixtures on the side')
  })

  it('shows the same tiles in German under /de', async () => {
    const page = await visit('/de', { content: fixtureContent() })

    expect(tile(page, 'Profil').textContent).toContain('Ich bin ein Fixture.')
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
