import { describe, expect, it } from 'vite-plus/test'
import { getAllByRole, within } from '@testing-library/dom'
import { visit } from './visit'

const option = (landmark: HTMLElement, name: string) =>
  within(landmark).getByRole<HTMLInputElement>('radio', { name })

describe('Theme', () => {
  it('starts on System and follows the system setting live', async () => {
    const page = await visit('/en', { systemTheme: 'dark' })

    expect(option(page.sidebar(), 'System').checked).toBe(true)
    expect(page.theme()).toBe('dark')

    await page.setSystemTheme('light')

    expect(option(page.sidebar(), 'System').checked).toBe(true)
    expect(page.theme()).toBe('light')
  })

  it('offers Light and Dark, and keeps the choice across a reload, painted before the first frame', async () => {
    const page = await visit('/en', { systemTheme: 'light' })

    await page.click(option(page.sidebar(), 'Dark'))
    expect(page.theme()).toBe('dark')
    expect(option(page.sidebar(), 'Dark').checked).toBe(true)

    const reloaded = await visit('/en/about', { systemTheme: 'light' })
    reloaded.paintFirstFrame()
    expect(reloaded.theme()).toBe('dark')
    expect(option(reloaded.sidebar(), 'Dark').checked).toBe(true)

    // A stored choice wins over later system changes.
    await reloaded.setSystemTheme('light')
    expect(reloaded.theme()).toBe('dark')

    await reloaded.click(option(reloaded.sidebar(), 'Light'))
    expect(reloaded.theme()).toBe('light')
  })

  it('goes back to following the system with System', async () => {
    const page = await visit('/en', { systemTheme: 'dark' })
    await page.click(option(page.sidebar(), 'Light'))
    expect(page.theme()).toBe('light')

    await page.click(option(page.sidebar(), 'System'))
    expect(page.theme()).toBe('dark')
    expect(localStorage.getItem('theme')).toBeNull()

    await page.setSystemTheme('light')
    expect(page.theme()).toBe('light')
  })

  it('offers the switch on phones too, at the end of the main pane', async () => {
    const page = await visit('/en')

    const switches = getAllByRole(document.body, 'radiogroup', { name: 'Theme' })
    expect(switches).toHaveLength(2)
    expect(switches.filter((group) => page.main().contains(group))).toHaveLength(1)
  })

  it('names the options in German on German pages', async () => {
    const page = await visit('/de')

    expect(option(page.sidebar('Seitenleiste'), 'Dunkel')).toBeTruthy()
    expect(option(page.sidebar('Seitenleiste'), 'Hell')).toBeTruthy()
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
    await page.click(option(page.sidebar(), 'Light'))
    expect(page.theme()).toBe('light')
    expect(page.chromeColor()).toEqual(light.chrome)
    expect(page.favicon()).toEqual(['/favicon-light.svg'])
  })
})
