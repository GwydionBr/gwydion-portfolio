import { describe, expect, it } from 'vite-plus/test'
import { getByRole, queryByRole, within } from '@testing-library/dom'
import { createContent } from '#/content'
import { fixtureContent, fixtureSource } from './contentFixtures'
import { visit } from './visit'

/** The screenshots the gallery in the main pane shows, as `src` and alt text. */
const shownScreenshots = (page: { main(): HTMLElement }, name = 'Screenshots') =>
  within(within(page.main()).getByRole('list', { name }))
    .getAllByRole('img')
    .map((image) => ({ src: image.getAttribute('src'), alt: image.getAttribute('alt') }))

/** The lightbox's current slide: the one not made inert. */
const activeSlide = (dialog: HTMLElement) =>
  within(dialog)
    .getAllByRole('group', { hidden: true })
    .find(
      (slide) =>
        slide.getAttribute('aria-roledescription') === 'slide' && !slide.hasAttribute('inert'),
    )!

/** What the lightbox shows: what it announces, its counter, and the files its image offers. */
function shownSlide(dialog: HTMLElement) {
  const image = within(activeSlide(dialog)).getByRole('img')
  return {
    announced: within(dialog).getByRole('status').textContent,
    counter: within(dialog).getByText(/^\d+ \/ \d+$/).textContent,
    alt: image.getAttribute('alt'),
    src: image.getAttribute('src'),
    srcSet: image.getAttribute('srcset'),
    sizes: image.getAttribute('sizes'),
  }
}

/** The lightbox's thumbnails, by name, in the order of the strip. */
const thumbnailNames = (dialog: HTMLElement) =>
  within(dialog)
    .queryAllByRole('button', { name: /^(Show screenshot|Screenshot zeigen): / })
    .map((thumbnail) => thumbnail.getAttribute('aria-label'))

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

    const settings = await page.openSettings()
    await page.click(within(settings).getByRole('radio', { name: 'Dark' }))
    expect(shownScreenshots(page).map((shot) => shot.src)).toEqual([
      'https://blob.example/dashboard-en-dark.webp',
      'https://blob.example/timer-en-dark.webp',
    ])

    await page.click(within(settings).getByRole('radio', { name: 'Light' }))
    expect(shownScreenshots(page)[0]!.src).toBe('https://blob.example/dashboard-en-light.webp')
  })

  it('opens a story screenshot in the page lightbox, pages through all of them and closes by keyboard', async () => {
    const page = await visit('/de/projects/self-engine', {
      content: fixtureContent(),
      systemTheme: 'dark',
    })
    const enlarge = within(page.main()).getByRole('button', {
      name: 'Screenshot vergrößern: Timer',
    })

    await page.click(enlarge)

    const dialog = getByRole(document.body, 'dialog', { name: 'Screenshots' })
    expect(shownSlide(dialog)).toEqual({
      announced: 'Screenshot 2 von 2: Ein laufender Fixture-Timer',
      counter: '2 / 2',
      alt: 'Ein laufender Fixture-Timer',
      src: 'https://blob.example/timer-de-dark.webp',
      srcSet:
        'https://blob.example/timer-de-dark-440w.webp 440w, https://blob.example/timer-de-dark.webp 880w',
      // Never larger than it was captured.
      sizes: 'min(100vw, 440px)',
    })
    expect(within(dialog).getByText('Timer')).toBeTruthy()

    // From the last to the first, and back.
    await page.press('ArrowRight')
    expect(shownSlide(dialog)).toMatchObject({
      announced: 'Screenshot 1 von 2: Das Fixture-Dashboard',
      counter: '1 / 2',
      src: 'https://blob.example/dashboard-de-dark.webp',
    })
    expect(within(dialog).getByText('Dashboard')).toBeTruthy()
    await page.press('ArrowLeft')
    expect(shownSlide(dialog).announced).toBe('Screenshot 2 von 2: Ein laufender Fixture-Timer')

    await page.press('Escape')
    expect(queryByRole(document.body, 'dialog')).toBeNull()
    expect(document.activeElement).toBe(enlarge)
  })

  it('pages with its arrows and its thumbnails, and closes with Close and beside the screenshot', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })
    const enlarge = within(
      within(page.main()).getByRole('list', { name: 'Screenshots' }),
    ).getByRole('button', { name: 'Enlarge screenshot: Timer' })

    await page.click(enlarge)
    let dialog = getByRole(document.body, 'dialog', { name: 'Screenshots' })
    await page.click(within(dialog).getByRole('button', { name: 'Next screenshot' }))
    expect(shownSlide(dialog).announced).toBe('Screenshot 1 of 2: The fixture dashboard')
    await page.click(within(dialog).getByRole('button', { name: 'Previous screenshot' }))
    expect(shownSlide(dialog).announced).toBe('Screenshot 2 of 2: A running fixture timer')

    // The strip shows each screenshot's 1× file at thumbnail size, not the 2× file of the slide.
    const thumbnail = within(dialog).getByRole('button', { name: 'Show screenshot: Dashboard' })
    const thumbnailImage = within(thumbnail).getByRole('img', { hidden: true })
    expect(thumbnailImage.getAttribute('srcset')).toBe(
      'https://blob.example/dashboard-en-light-1440w.webp 1440w, https://blob.example/dashboard-en-light.webp 2880w',
    )
    expect(thumbnailImage.getAttribute('sizes')).toBe('6rem')
    await page.click(thumbnail)
    expect(shownSlide(dialog).announced).toBe('Screenshot 1 of 2: The fixture dashboard')

    await page.click(within(dialog).getByRole('button', { name: 'Close' }))
    expect(queryByRole(document.body, 'dialog')).toBeNull()
    expect(document.activeElement).toBe(enlarge)

    await page.click(enlarge)
    dialog = getByRole(document.body, 'dialog', { name: 'Screenshots' })
    await page.click(activeSlide(dialog))
    expect(queryByRole(document.body, 'dialog')).toBeNull()
  })

  it('opens the cover first of the page’s screenshots, and shows a screenshot shown twice once', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })
    // The cover is the dashboard, and the story's gallery shows it again.
    const [cover, again] = within(page.main()).getAllByRole('button', {
      name: 'Enlarge screenshot: Dashboard',
    })

    await page.click(cover!)
    const dialog = getByRole(document.body, 'dialog', { name: 'Screenshots' })
    expect(shownSlide(dialog).announced).toBe('Screenshot 1 of 2: The fixture dashboard')
    expect(thumbnailNames(dialog)).toEqual(['Show screenshot: Dashboard', 'Show screenshot: Timer'])
    await page.click(within(dialog).getByRole('button', { name: 'Next screenshot' }))
    expect(shownSlide(dialog).announced).toBe('Screenshot 2 of 2: A running fixture timer')
    await page.press('Escape')
    expect(document.activeElement).toBe(cover)

    // Opened from the gallery's copy, it is the same slide.
    await page.click(again!)
    expect(shownSlide(getByRole(document.body, 'dialog')).announced).toBe(
      'Screenshot 1 of 2: The fixture dashboard',
    )
    await page.press('Escape')
    expect(document.activeElement).toBe(again)
  })

  it('closes when the visitor goes to another page, as with Back, and opens that page’s screenshots after', async () => {
    const page = await visit('/en/projects/self-engine', { content: fixtureContent() })
    const [cover] = within(page.main()).getAllByRole('button', {
      name: 'Enlarge screenshot: Dashboard',
    })
    await page.click(cover!)
    expect(getByRole(document.body, 'dialog', { name: 'Screenshots' })).toBeTruthy()

    // The same Project in German: the page's frame stays, its screenshots change.
    await page.settle(() => page.router.history.push('/de/projects/self-engine'))

    expect(page.path()).toBe('/de/projects/self-engine')
    expect(queryByRole(document.body, 'dialog')).toBeNull()
    await page.click(
      within(page.main()).getByRole('button', { name: 'Screenshot vergrößern: Timer' }),
    )
    expect(shownSlide(getByRole(document.body, 'dialog')).announced).toBe(
      'Screenshot 2 von 2: Ein laufender Fixture-Timer',
    )
  })

  it('shows a page’s only screenshot without arrows or thumbnails', async () => {
    const source = fixtureSource()
    const set = source.screenshots['self-engine']!
    set.shots = set.shots.filter((shot) => shot.view === 'dashboard')
    const page = await visit('/en/projects/self-engine', { content: createContent(source) })
    const [cover] = within(page.main()).getAllByRole('button', {
      name: 'Enlarge screenshot: Dashboard',
    })

    await page.click(cover!)

    const dialog = getByRole(document.body, 'dialog', { name: 'Screenshots' })
    expect(shownSlide(dialog)).toMatchObject({
      announced: 'Screenshot 1 of 1: The fixture dashboard',
      counter: '1 / 1',
    })
    expect(within(dialog).queryByRole('button', { name: 'Next screenshot' })).toBeNull()
    expect(within(dialog).queryByRole('button', { name: 'Previous screenshot' })).toBeNull()
    expect(thumbnailNames(dialog)).toEqual([])
    expect(within(dialog).getByRole('button', { name: 'Close' })).toBeTruthy()
  })

  it('fills the real Self-Engine page with its screenshots, by Site language and theme', async () => {
    const page = await visit('/de/projects/self-engine', { systemTheme: 'dark' })

    // The cover, then the story's galleries, which do not show it again.
    const images = within(page.main()).getAllByRole('img')
    expect(images).toHaveLength(9)
    expect(new Set(images.map((image) => image.getAttribute('src'))).size).toBe(9)
    for (const image of images) {
      expect(image.getAttribute('src')).toMatch(
        /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/public-site\/[a-z-]+-de-dark-[0-9a-f]+\.webp$/,
      )
    }
    expect(images[0]!.getAttribute('alt')).toMatch(/^Self-Engine-Dashboard mit/)
  })
})
