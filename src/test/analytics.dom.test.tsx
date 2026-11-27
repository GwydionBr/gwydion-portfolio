import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { screen, within } from '@testing-library/dom'
import { fixtureContent } from './contentFixtures'
import { visit } from './visit'

/** Umami's tracker as the page sees it once its script has run. */
let track: ReturnType<typeof vi.fn<(name: string, data?: Record<string, string>) => void>>

beforeEach(() => {
  track = vi.fn<(name: string, data?: Record<string, string>) => void>()
  window.umami = { track }
})

afterEach(() => {
  delete window.umami
})

describe('Umami', () => {
  it('loads through the site’s own path, counts only gwydion.dev and honours Do Not Track', async () => {
    await visit('/en', { content: fixtureContent() })

    const script = document.head.querySelector<HTMLScriptElement>('script[data-website-id]')
    expect(script?.getAttribute('src')).toBe('/lx/s.js')
    expect(script?.defer).toBe(true)
    expect(script?.dataset).toMatchObject({
      websiteId: 'f8b83128-ec37-4fc4-bc55-80f5cc2462b2',
      hostUrl: '/lx',
      domains: 'gwydion.dev',
      doNotTrack: 'true',
      excludeSearch: 'true',
      excludeHash: 'true',
    })
    expect(script?.dataset.distinctId).toBeUndefined()
  })

  it('counts a click into a Project page, which still opens in the app', async () => {
    const page = await visit('/en/projects', { content: fixtureContent() })

    await page.click(within(page.main()).getByRole('link', { name: /Fixture Studio/ }))

    expect(track).toHaveBeenCalledWith('projekt-klick', { projekt: 'fixture-studio' })
    expect(page.path()).toBe('/en/projects/fixture-studio')
  })

  it('counts a click on another Project in the second sidebar beside a Project page', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })

    const projects = within(screen.getByRole('navigation', { name: 'Projects' }))
    await page.click(projects.getByRole('link', { name: /Fixture Kit/ }))

    expect(track).toHaveBeenCalledWith('projekt-klick', { projekt: 'fixture-kit' })
    expect(page.path()).toBe('/en/projects/fixture-kit')
  })

  it('counts "Get in touch", which still opens Contact in the app', async () => {
    const page = await visit('/en', { content: fixtureContent() })

    await page.click(within(page.main()).getByRole('link', { name: 'Get in touch' }))

    expect(track).toHaveBeenCalledWith('kontakt-klick', undefined)
    expect(page.path()).toBe('/en/contact')
  })

  it('counts a CV download with the CV’s language', async () => {
    const page = await visit('/en', { content: fixtureContent() })
    // jsdom cannot download; the count is what matters here.
    document.addEventListener('click', (event) => event.preventDefault(), { once: true })

    await page.click(within(page.main()).getByRole('link', { name: 'Download CV' }))

    expect(track).toHaveBeenCalledWith('cv-download', { sprache: 'en' })
  })

  it('marks the Profile links and a Project’s outside links for Umami’s click tracking', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })

    const sidebar = within(page.sidebar())
    const eventOf = (link: HTMLElement) => link.dataset.umamiEvent
    expect(eventOf(sidebar.getByRole('link', { name: 'GitHub' }))).toBe('github-klick')
    expect(eventOf(sidebar.getByRole('link', { name: 'ada@example.com' }))).toBe('mail-klick')
    const visitWebsite = within(page.main()).getByRole('link', { name: /Visit website/ })
    expect(visitWebsite.dataset).toMatchObject({
      umamiEvent: 'projekt-website-klick',
      umamiEventProjekt: 'self-engine',
    })
  })
})
