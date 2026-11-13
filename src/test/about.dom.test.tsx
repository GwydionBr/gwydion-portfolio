import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { fixtureContent } from './contentFixtures'
import { visit } from './visit'

const region = (container: HTMLElement, name: string) =>
  within(container).getByRole('region', { name })

/** The Career entries shown, top to bottom, each as its visible text. */
const careerEntries = (page: { main(): HTMLElement }, name: string) =>
  within(region(page.main(), name))
    .getAllByRole('listitem')
    .map((entry) => entry.textContent)

describe('The About view', () => {
  it('shows the Career entries newest first, in English under /en/about', async () => {
    const page = await visit('/en/about', { content: fixtureContent() })

    expect(page.title()).toBe('About')
    expect(careerEntries(page, 'Career')).toEqual([
      'Jun 2024 – nowLead fixture · Example GmbHLeads fixtures.',
      'Mar 2022 – 2024Freelance fixture maker · Self-employedBuilt fixtures.Fixture Studio →',
      '2018–2022Degree in fixtures · Example UniversityStudied fixtures.',
    ])
  })

  it('shows the Career entries in German under /de/about, ongoing ones until "heute"', async () => {
    const page = await visit('/de/about', { content: fixtureContent() })

    expect(page.title()).toBe('Über mich')
    expect(careerEntries(page, 'Werdegang')).toEqual([
      'Juni 2024 – heuteLeitendes Fixture · Example GmbHLeitet Fixtures.',
      'März 2022 – 2024Freiberufliche Fixture-Bauerin · Self-employedBaute Fixtures.Fixture Studio →',
      '2018–2022Studium der Fixtures · Example UniversityStudierte Fixtures.',
    ])
  })

  it('links a Career entry to the Project it was about', async () => {
    const page = await visit('/en/about', { content: fixtureContent() })

    const career = within(region(page.main(), 'Career'))
    expect(career.getAllByRole('link').map((link) => link.textContent)).toEqual([
      'Fixture Studio →',
    ])
    await page.click(career.getByRole('link', { name: 'Fixture Studio' }))

    expect(page.path()).toBe('/en/projects/fixture-studio')
    expect(page.title()).toBe('Fixture Studio')
  })

  it('lists the skills group by group, in the Site language', async () => {
    const page = await visit('/de/about', { content: fixtureContent() })

    const skills = within(region(page.main(), 'Kenntnisse')).getByRole('list', { name: 'Handwerk' })
    expect(skills.textContent).toBe('Testing')
  })

  it('offers the CV once, in its tile, as a download', async () => {
    const page = await visit('/en/about', { content: fixtureContent() })

    const downloads = within(page.main())
      .getAllByRole('link')
      .filter((link) => link.hasAttribute('download'))
    expect(downloads.map((link) => link.getAttribute('href'))).toEqual([
      '/cv/ada-example-cv-en.pdf',
    ])
    expect(region(page.main(), 'CV').contains(downloads[0]!)).toBe(true)
  })
})

describe('The CV download on the Overview', () => {
  it('offers the English CV under /de when there is no German one, and says so', async () => {
    const page = await visit('/de', { content: fixtureContent() })

    const download = within(page.main()).getByRole('link', { name: /Lebenslauf herunterladen/ })
    expect(download.getAttribute('href')).toBe('/cv/ada-example-cv-en.pdf')
    expect(download.getAttribute('hreflang')).toBe('en')
    expect(download.textContent).toContain('English')
  })
})

describe('The CV tile on About', () => {
  it('offers the CV in every language it exists in', async () => {
    const page = await visit('/de/about')

    const tile = within(region(page.main(), 'Lebenslauf'))
    expect(tile.getByText('1 Seite · PDF')).toBeTruthy()
    expect(
      tile.getAllByRole('link').map((link) => [link.textContent, link.getAttribute('href')]),
    ).toEqual([
      ['English', '/cv/gwydion-braunsdorf-cv-en.pdf'],
      ['Deutsch', '/cv/gwydion-braunsdorf-cv-de.pdf'],
    ])
  })
})

describe('The Availability card', () => {
  it.each([
    ['/en/projects', 'Sidebar', 'Availability'],
    ['/de/contact', 'Seitenleiste', 'Verfügbarkeit'],
  ])('on %s offers no second CV download in the sidebar', async (url, sidebar, card) => {
    const page = await visit(url, { content: fixtureContent() })

    expect(within(region(page.sidebar(sidebar), card)).queryByRole('link')).toBeNull()
  })
})
