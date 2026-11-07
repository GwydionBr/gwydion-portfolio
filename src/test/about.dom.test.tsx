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
      'Mar 2022 – 2024Freelance fixture maker · Self-employedBuilt fixtures.',
      '2018–2022Degree in fixtures · Example UniversityStudied fixtures.',
    ])
  })

  it('shows the Career entries in German under /de/about, ongoing ones until "heute"', async () => {
    const page = await visit('/de/about', { content: fixtureContent() })

    expect(page.title()).toBe('Über mich')
    expect(careerEntries(page, 'Werdegang')).toEqual([
      'Juni 2024 – heuteLeitendes Fixture · Example GmbHLeitet Fixtures.',
      'März 2022 – 2024Freiberufliche Fixture-Bauerin · Self-employedBaute Fixtures.',
      '2018–2022Studium der Fixtures · Example UniversityStudierte Fixtures.',
    ])
  })

  it('lists the skills', async () => {
    const page = await visit('/en/about', { content: fixtureContent() })

    const skills = within(region(page.main(), 'Skills')).getByRole('list', { name: 'Skills' })
    expect(skills.textContent).toBe('Testing')
  })

  it('offers the CV as a download', async () => {
    const page = await visit('/en/about', { content: fixtureContent() })

    const download = within(page.main()).getByRole('link', { name: 'Download CV' })
    expect(download.getAttribute('href')).toBe('/cv/ada-example-cv-en.pdf')
    expect(download.hasAttribute('download')).toBe(true)
  })

  it('offers the English CV under /de when there is no German one, and says so', async () => {
    const page = await visit('/de/about', { content: fixtureContent() })

    const download = within(page.main()).getByRole('link', { name: /Lebenslauf herunterladen/ })
    expect(download.getAttribute('href')).toBe('/cv/ada-example-cv-en.pdf')
    expect(download.getAttribute('hreflang')).toBe('en')
    expect(download.textContent).toContain('English')
  })
})

describe('The CV download', () => {
  it.each([
    ['/en/projects', 'Sidebar', 'Availability', 'Download CV'],
    ['/de/contact', 'Seitenleiste', 'Verfügbarkeit', /Lebenslauf herunterladen/],
  ])('on %s sits in the sidebar Availability card', async (url, sidebar, card, name) => {
    const page = await visit(url, { content: fixtureContent() })

    const download = within(region(page.sidebar(sidebar), card)).getByRole('link', { name })
    expect(download.getAttribute('href')).toBe('/cv/ada-example-cv-en.pdf')
  })

  it("sits in the Contact view's Availability tile, which phones show", async () => {
    const page = await visit('/en/contact', { content: fixtureContent() })

    const download = within(region(page.main(), 'Availability')).getByRole('link', {
      name: 'Download CV',
    })
    expect(download.getAttribute('href')).toBe('/cv/ada-example-cv-en.pdf')
  })
})
