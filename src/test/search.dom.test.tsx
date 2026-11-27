import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { getByRole, queryByRole, within } from '@testing-library/dom'
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

/** The results the open search lists, by group: the group's name and its options' labels. */
function results() {
  const list = queryByRole(document.body, 'listbox')
  if (!list) return []
  return within(list)
    .getAllByRole('group')
    .map((group) => [
      group.getAttribute('aria-label'),
      within(group)
        .getAllByRole('option')
        .map((option) => option.querySelector('[class*="actionLabel"]')?.textContent),
    ])
}

const option = (name: string | RegExp) => getByRole(document.body, 'option', { name })

describe('The site search', () => {
  it('opens from the sidebar and finds the views, the Projects, contact and settings', async () => {
    const page = await visit('/en')

    const field = await page.openSearch()

    expect(getByRole(document.body, 'dialog', { name: 'Search' })).toBeTruthy()
    expect(document.activeElement).toBe(field)
    expect(results().map(([group]) => group)).toEqual(['Pages', 'Projects', 'Contact', 'Settings'])
    expect(results()[0]).toEqual(['Pages', ['Overview', 'Projects', 'About', 'Contact']])
    expect(results()[2]?.[1]).toEqual(['Download CV', 'hello@gwydion.dev', 'GitHub', 'LinkedIn'])
    expect(results()[3]?.[1]).toEqual(['Deutsch', 'System', 'Light', 'Dark'])
  })

  it('opens with ⌘K or Ctrl+K anywhere on the page', async () => {
    const page = await visit('/en/about')

    await page.press('k', { code: 'KeyK', metaKey: true })
    expect(getByRole(document.body, 'combobox', { name: 'Search' })).toBeTruthy()

    await page.press('Escape', { target: getByRole(document.body, 'combobox') })
    expect(queryByRole(document.body, 'dialog', { name: 'Search' })).toBeNull()

    await page.press('k', { code: 'KeyK', ctrlKey: true })
    expect(getByRole(document.body, 'combobox', { name: 'Search' })).toBeTruthy()
  })

  it('narrows the results as the visitor types, by description and stack too', async () => {
    const page = await visit('/en')
    const field = await page.openSearch()

    await page.fill(field, 'self')
    expect(results()).toEqual([['Projects', ['Self-Engine']]])

    await page.fill(field, 'kubernetes and cobol')
    expect(results()).toEqual([])
    expect(getByRole(document.body, 'dialog').textContent).toContain('Nothing found')
  })

  it('opens a Project chosen with the mouse, counted like any click into it, and closes', async () => {
    const page = await visit('/en')
    const field = await page.openSearch()

    await page.fill(field, 'self-engine')
    await page.click(option(/Self-Engine/))

    expect(page.path()).toBe('/en/projects/self-engine')
    expect(track).toHaveBeenCalledWith('projekt-klick', { projekt: 'self-engine' })
    expect(queryByRole(document.body, 'dialog', { name: 'Search' })).toBeNull()
  })

  it('moves through the results with the arrow keys and runs the selected one with Enter', async () => {
    const page = await visit('/en')
    const field = await page.openSearch()

    await page.fill(field, 'o')
    const first = field.getAttribute('aria-activedescendant')
    expect(document.getElementById(first ?? '')?.getAttribute('aria-selected')).toBe('true')
    expect(document.getElementById(first ?? '')?.textContent).toBe('Overview')

    await page.press('ArrowDown', { target: field })
    const second = document.getElementById(field.getAttribute('aria-activedescendant') ?? '')
    expect(second?.textContent).toBe('Projects')

    await page.press('Enter', { target: field })
    expect(page.path()).toBe('/en/projects')
  })

  it('finds German entries in German, whatever the accents', async () => {
    const page = await visit('/de/projects')
    const field = await page.openSearch({ name: 'Suche' })

    await page.fill(field, 'uber')
    expect(results()[0]).toEqual(['Seiten', ['Übersicht', 'Über mich']])
  })

  it('switches the Site language, staying on the same page', async () => {
    const page = await visit('/de/projects')
    const field = await page.openSearch({ name: 'Suche' })

    await page.fill(field, 'english')
    await page.click(option(/English/))

    expect(page.path()).toBe('/en/projects')
    expect(document.documentElement.lang).toBe('en')
  })

  it('picks the theme, marking the one in effect', async () => {
    const page = await visit('/en')
    const field = await page.openSearch()

    await page.fill(field, 'dark')
    await page.click(option(/Dark/))
    expect(page.theme()).toBe('dark')

    await page.openSearch()
    expect(within(option(/Dark/)).getByRole('img', { name: 'Current' })).toBeTruthy()
    expect(within(option(/Light/)).queryByRole('img', { name: 'Current' })).toBeNull()
  })

  it('downloads the CV, counted with its language', async () => {
    const page = await visit('/en')
    // jsdom cannot download; which file the page asks for is what matters here.
    const download = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(function (this: HTMLAnchorElement) {})
    const field = await page.openSearch()

    await page.fill(field, 'cv')
    await page.click(option(/Download CV/))

    const link = download.mock.contexts[0] as HTMLAnchorElement
    expect(link.getAttribute('href')).toMatch(/^\/cv\/.+\.pdf$/)
    expect(link.hasAttribute('download')).toBe(true)
    expect(track).toHaveBeenCalledWith('cv-download', { sprache: 'en' })
  })

  it('opens from the phone top bar', async () => {
    const page = await visit('/en', { screen: 'phone' })

    const field = await page.openSearch({ from: 'topBar' })

    expect(document.activeElement).toBe(field)
    console.log(
      document.querySelectorAll('header').length,
      [...document.querySelectorAll('header')].map((h) => h.outerHTML.slice(0, 200)),
    )
  })
})
