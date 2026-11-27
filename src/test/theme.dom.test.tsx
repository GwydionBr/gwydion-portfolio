import { describe, expect, it } from 'vite-plus/test'
import { within } from '@testing-library/dom'
import { visit } from './visit'

const option = (panel: HTMLElement, name: string) =>
  within(panel).getByRole<HTMLInputElement>('radio', { name })

describe('Theme', () => {
  it('starts on System and follows the system setting live', async () => {
    const page = await visit('/en', { systemTheme: 'dark' })
    const settings = await page.openSettings()

    expect(option(settings, 'System').checked).toBe(true)
    expect(page.theme()).toBe('dark')

    await page.setSystemTheme('light')

    expect(option(settings, 'System').checked).toBe(true)
    expect(page.theme()).toBe('light')
  })

  it('offers Light and Dark, and keeps the choice across a reload, painted before the first frame', async () => {
    const page = await visit('/en', { systemTheme: 'light' })
    const settings = await page.openSettings()

    await page.click(option(settings, 'Dark'))
    expect(page.theme()).toBe('dark')
    expect(option(settings, 'Dark').checked).toBe(true)

    const reloaded = await visit('/en/about', { systemTheme: 'light' })
    reloaded.paintFirstFrame()
    expect(reloaded.theme()).toBe('dark')
    const reloadedSettings = await reloaded.openSettings()
    expect(option(reloadedSettings, 'Dark').checked).toBe(true)

    // A stored choice wins over later system changes.
    await reloaded.setSystemTheme('light')
    expect(reloaded.theme()).toBe('dark')

    await reloaded.click(option(reloadedSettings, 'Light'))
    expect(reloaded.theme()).toBe('light')
  })

  it('goes back to following the system with System', async () => {
    const page = await visit('/en', { systemTheme: 'dark' })
    const settings = await page.openSettings()
    await page.click(option(settings, 'Light'))
    expect(page.theme()).toBe('light')

    await page.click(option(settings, 'System'))
    expect(page.theme()).toBe('dark')
    expect(localStorage.getItem('theme')).toBeNull()

    await page.setSystemTheme('light')
    expect(page.theme()).toBe('light')
  })

  it('offers the switch on phones too, in the More sheet', async () => {
    const page = await visit('/en', { systemTheme: 'light' })
    const more = await page.openMore()

    await page.click(option(more, 'Dark'))
    expect(page.theme()).toBe('dark')
  })

  it('names the options in German on German pages', async () => {
    const page = await visit('/de')
    const settings = await page.openSettings('Einstellungen')

    expect(within(settings).getByRole('radiogroup', { name: 'Design' })).toBeTruthy()
    expect(option(settings, 'Dunkel')).toBeTruthy()
    expect(option(settings, 'Hell')).toBeTruthy()
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
    await page.click(option(await page.openSettings(), 'Light'))
    expect(page.theme()).toBe('light')
    expect(page.chromeColor()).toEqual(light.chrome)
    expect(page.favicon()).toEqual(['/favicon-light.svg'])
  })
})
