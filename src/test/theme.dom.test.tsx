import { describe, expect, it } from 'vite-plus/test'
import { getAllByRole, within } from '@testing-library/dom'
import { visit } from './visit'

const toggleIn = (landmark: HTMLElement, name = 'Dark theme') =>
  within(landmark).getByRole('button', { name })

describe('Theme', () => {
  it('follows the system setting when the visitor has not chosen one', async () => {
    const page = await visit('/en', { systemTheme: 'dark' })

    expect(page.theme()).toBe('dark')
    expect(toggleIn(page.sidebar()).getAttribute('aria-pressed')).toBe('true')

    await page.setSystemTheme('light')

    expect(page.theme()).toBe('light')
    expect(toggleIn(page.sidebar()).getAttribute('aria-pressed')).toBe('false')
  })

  it('switches with the toggle and keeps the choice across a reload, painted before the first frame', async () => {
    const page = await visit('/en', { systemTheme: 'light' })

    await page.click(toggleIn(page.sidebar()))
    expect(page.theme()).toBe('dark')
    expect(toggleIn(page.sidebar()).getAttribute('aria-pressed')).toBe('true')

    const reloaded = await visit('/en/about', { systemTheme: 'light' })
    reloaded.paintFirstFrame()
    expect(reloaded.theme()).toBe('dark')
    expect(toggleIn(reloaded.sidebar()).getAttribute('aria-pressed')).toBe('true')

    // A stored choice wins over later system changes.
    await reloaded.setSystemTheme('dark')
    await reloaded.click(toggleIn(reloaded.sidebar()))
    expect(reloaded.theme()).toBe('light')
  })

  it('offers the toggle on phones too, in the top bar', async () => {
    const page = await visit('/en')

    const toggles = getAllByRole(document.body, 'button', { name: 'Dark theme' })
    expect(toggles).toHaveLength(2)
    expect(toggles.filter((toggle) => !page.sidebar().contains(toggle))).toHaveLength(1)
  })

  it('names the toggle in German on German pages', async () => {
    const page = await visit('/de')

    expect(toggleIn(page.sidebar('Seitenleiste'), 'Dunkles Design')).toBeTruthy()
  })

  it('colours the browser chrome and the favicon in the theme shown', async () => {
    const page = await visit('/en', { systemTheme: 'light' })
    const light = { chrome: page.chromeColor(), favicon: page.favicon() }

    await page.setSystemTheme('dark')
    const dark = { chrome: page.chromeColor(), favicon: page.favicon() }
    expect(dark.chrome).toHaveLength(1)
    expect(dark.favicon).toEqual(['/favicon-dark.svg'])
    expect(light.chrome).toHaveLength(1)
    expect(light.favicon).toEqual(['/favicon-light.svg'])
    expect(dark.chrome).not.toEqual(light.chrome)

    // An explicit choice overrides the system setting for chrome and favicon as well.
    await page.click(toggleIn(page.sidebar()))
    expect(page.theme()).toBe('light')
    expect(page.chromeColor()).toEqual(light.chrome)
    expect(page.favicon()).toEqual(['/favicon-light.svg'])
  })
})
