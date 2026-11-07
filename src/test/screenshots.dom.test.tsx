import { describe, expect, it } from 'vite-plus/test'
import { fireEvent, getByRole, queryByRole, within } from '@testing-library/dom'
import { act } from 'react'
import { fixtureContent } from './contentFixtures'
import { visit } from './visit'

/** The screenshots the gallery in the main pane shows, as `src` and alt text. */
const shownScreenshots = (page: { main(): HTMLElement }, name = 'Screenshots') =>
  within(within(page.main()).getByRole('list', { name }))
    .getAllByRole('img')
    .map((image) => ({ src: image.getAttribute('src'), alt: image.getAttribute('alt') }))

describe('Self-Engine screenshots', () => {
  it('shows the German dark screenshots on the German page in dark theme', async () => {
    const page = await visit('/de/projects/self-engine', {
      content: fixtureContent(),
      systemTheme: 'dark',
    })

    expect(shownScreenshots(page)).toEqual([
      { src: 'https://blob.example/dashboard-de-dark.webp', alt: 'Das Fixture-Dashboard' },
      { src: 'https://blob.example/timer-de-dark.webp', alt: 'Ein laufender Fixture-Timer' },
    ])
  })

  it('shows the English light screenshots on the English page in light theme, at 1× and 2×', async () => {
    const page = await visit('/en/projects/self-engine', {
      content: fixtureContent(),
      systemTheme: 'light',
    })

    expect(shownScreenshots(page)).toEqual([
      { src: 'https://blob.example/dashboard-en-light.webp', alt: 'The fixture dashboard' },
      { src: 'https://blob.example/timer-en-light.webp', alt: 'A running fixture timer' },
    ])
    const timer = within(page.main()).getByRole('img', { name: 'A running fixture timer' })
    expect(timer.getAttribute('srcset')).toBe(
      'https://blob.example/timer-en-light-440w.webp 440w, https://blob.example/timer-en-light.webp 880w',
    )
  })

  it('swaps the screenshots when the theme switches, without a reload', async () => {
    const page = await visit('/en/projects/self-engine', {
      content: fixtureContent(),
      systemTheme: 'light',
    })

    await page.click(within(page.sidebar()).getByRole('button', { name: 'Dark theme' }))
    expect(shownScreenshots(page).map((shot) => shot.src)).toEqual([
      'https://blob.example/dashboard-en-dark.webp',
      'https://blob.example/timer-en-dark.webp',
    ])

    await page.setSystemTheme('dark')
    localStorage.clear()
    await page.click(within(page.sidebar()).getByRole('button', { name: 'Dark theme' }))
    expect(shownScreenshots(page)[0]!.src).toBe('https://blob.example/dashboard-en-light.webp')
  })

  it('enlarges a screenshot, pages through the gallery and closes by keyboard', async () => {
    const page = await visit('/de/projects/self-engine', { content: fixtureContent() })

    const enlarge = within(page.main()).getByRole('button', {
      name: 'Screenshot vergrößern: Timer',
    })
    await page.click(enlarge)

    const dialog = getByRole(document.body, 'dialog', { name: 'Timer' })
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe('Ein laufender Fixture-Timer')
    expect(within(dialog).getByRole('img').getAttribute('src')).toBe(
      'https://blob.example/timer-de-light.webp',
    )

    await act(async () => {
      fireEvent.keyDown(dialog, { key: 'ArrowRight' })
    })
    expect(getByRole(document.body, 'dialog', { name: 'Dashboard' })).toBeTruthy()

    await page.settle(() => fireEvent.keyDown(document.activeElement ?? dialog, { key: 'Escape' }))
    expect(queryByRole(document.body, 'dialog')).toBeNull()
    expect(document.activeElement).toBe(enlarge)
  })

  it('closes the enlarged screenshot with its Close button', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })

    await page.click(
      within(page.main()).getByRole('button', { name: 'Enlarge screenshot: Dashboard' }),
    )
    await page.click(
      within(getByRole(document.body, 'dialog', { name: 'Dashboard' })).getByRole('button', {
        name: 'Close',
      }),
    )

    expect(queryByRole(document.body, 'dialog')).toBeNull()
  })

  it('fills the real Self-Engine story with its screenshots, by Site language and theme', async () => {
    const page = await visit('/de/projects/self-engine', { systemTheme: 'dark' })

    const images = within(page.main())
      .getAllByRole('list', { name: 'Screenshots' })
      .flatMap((gallery) => within(gallery).getAllByRole('img'))
    expect(images).toHaveLength(9)
    for (const image of images) {
      expect(image.getAttribute('src')).toMatch(
        /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/public-site\/[a-z-]+-de-dark-[0-9a-f]+\.webp$/,
      )
    }
    expect(images[3]!.getAttribute('alt')).toMatch(/^Self-Engine-Dashboard mit/)
  })
})
