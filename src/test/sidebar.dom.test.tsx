import { describe, expect, it } from 'vite-plus/test'
import { fireEvent, within } from '@testing-library/dom'
import { visit } from './visit'

const STORAGE_KEY = 'sidebar-width'

/** The sidebar's resize handle, by its accessible name. */
const handleIn = (sidebar: HTMLElement, name = 'Resize sidebar') =>
  within(sidebar).getByRole('separator', { name })

/** The width the pre-paint script put on `<html>` for the stylesheets. */
const paintedWidth = () => document.documentElement.style.getPropertyValue('--sidebar-width')

describe('Sidebar width', () => {
  it('offers a resize handle on the sidebar, within its bounds', async () => {
    const page = await visit('/en')
    const handle = handleIn(page.sidebar())

    expect(handle.getAttribute('aria-orientation')).toBe('vertical')
    expect(handle.getAttribute('aria-valuemin')).toBe('240')
    expect(handle.getAttribute('aria-valuemax')).toBe('360')
    expect(handle.tabIndex).toBe(0)
  })

  it('names the handle in German on German pages', async () => {
    const page = await visit('/de')

    expect(handleIn(page.sidebar('Seitenleiste'), 'Seitenleiste anpassen')).toBeTruthy()
  })

  it('applies a stored width before the first frame, and keeps it once the page runs', async () => {
    localStorage.setItem(STORAGE_KEY, '300')
    const page = await visit('/en/about')

    expect(paintedWidth()).toBe('18.75rem')
    page.paintFirstFrame()
    expect(paintedWidth()).toBe('18.75rem')
    expect(handleIn(page.sidebar()).getAttribute('aria-valuenow')).toBe('300')
  })

  it('keeps a stored width within the bounds', async () => {
    localStorage.setItem(STORAGE_KEY, '999')
    const page = await visit('/en')

    expect(paintedWidth()).toBe('22.5rem')
    page.paintFirstFrame()
    expect(paintedWidth()).toBe('22.5rem')
    expect(handleIn(page.sidebar()).getAttribute('aria-valuenow')).toBe('360')
  })

  it('ignores a stored width that is not a number', async () => {
    localStorage.setItem(STORAGE_KEY, 'wide')
    const page = await visit('/en')

    page.paintFirstFrame()
    expect(paintedWidth()).toBe('')
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('resizes with the arrow keys and remembers the width for the next visit', async () => {
    localStorage.setItem(STORAGE_KEY, '300')
    const page = await visit('/en')
    const handle = handleIn(page.sidebar())

    await page.press('ArrowRight', { target: handle })
    expect(handle.getAttribute('aria-valuenow')).toBe('310')
    expect(localStorage.getItem(STORAGE_KEY)).toBe('310')

    await page.press('ArrowLeft', { target: handle })
    await page.press('ArrowLeft', { target: handle })
    expect(localStorage.getItem(STORAGE_KEY)).toBe('290')

    const reloaded = await visit('/en/projects')
    expect(paintedWidth()).toBe('18.125rem')
    reloaded.paintFirstFrame()
    expect(paintedWidth()).toBe('18.125rem')
  })

  it('goes back to the default width on a double-click, forgetting the stored one', async () => {
    localStorage.setItem(STORAGE_KEY, '320')
    const page = await visit('/en')
    const handle = handleIn(page.sidebar())

    await page.settle(() => fireEvent.doubleClick(handle))

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(paintedWidth()).toBe('')
  })
})

const COLLAPSED_KEY = 'sidebar-collapsed'

/** Whether `<html>` asks the stylesheets for the icon rail (src/shell/Sidebar.module.css). */
const paintedAsRail = () => document.documentElement.hasAttribute('data-sidebar-collapsed')

describe('Collapsing the sidebar to its icons', () => {
  it('collapses with its toggle and opens again, remembering the choice on the device', async () => {
    const page = await visit('/en/about')
    const sidebar = within(page.sidebar())

    await page.click(sidebar.getByRole('button', { name: 'Collapse sidebar' }))

    expect(paintedAsRail()).toBe(true)
    expect(localStorage.getItem(COLLAPSED_KEY)).toBe('true')
    // The rows keep their names, which the rail shows in tooltips.
    expect(sidebar.getByRole('link', { name: 'Projects' })).toBeTruthy()
    expect(sidebar.getByRole('button', { name: 'Search' })).toBeTruthy()

    await page.click(sidebar.getByRole('button', { name: 'Expand sidebar' }))

    expect(paintedAsRail()).toBe(false)
    expect(localStorage.getItem(COLLAPSED_KEY)).toBeNull()
  })

  it('stays collapsed on the next visit, from the first frame', async () => {
    localStorage.setItem(COLLAPSED_KEY, 'true')
    const page = await visit('/en')

    page.paintFirstFrame()

    expect(paintedAsRail()).toBe(true)
    expect(within(page.sidebar()).getByRole('button', { name: 'Expand sidebar' })).toBeTruthy()
  })

  it('collapses and opens with ⌘B or Ctrl+B, the toggle naming the shortcut', async () => {
    const page = await visit('/en')
    const toggle = within(page.sidebar()).getByRole('button', { name: 'Collapse sidebar' })
    expect(toggle.getAttribute('aria-keyshortcuts')).toBe('Meta+B Control+B')

    await page.press('b', { metaKey: true })
    expect(paintedAsRail()).toBe(true)

    await page.press('b', { ctrlKey: true })
    expect(paintedAsRail()).toBe(false)
  })

  it('ignores the shortcut on a phone, which has no sidebar', async () => {
    const page = await visit('/en', { screen: 'phone' })

    await page.press('b', { metaKey: true })

    expect(paintedAsRail()).toBe(false)
  })

  it('offers the legal links in the Settings panel, expanded and collapsed alike', async () => {
    const expanded = await visit('/en')
    expect(
      within(await expanded.openSettings()).getByRole('link', { name: 'Legal notice' }),
    ).toBeTruthy()

    localStorage.setItem(COLLAPSED_KEY, 'true')
    const collapsed = await visit('/en')
    const settings = await collapsed.openSettings()

    expect(within(settings).getByRole('link', { name: 'Legal notice' })).toBeTruthy()
    expect(within(settings).getByRole('link', { name: 'Privacy policy' })).toBeTruthy()
  })

  it('names the toggle in German on German pages', async () => {
    const page = await visit('/de')
    const sidebar = within(page.sidebar('Seitenleiste'))

    await page.click(sidebar.getByRole('button', { name: 'Seitenleiste einklappen' }))

    expect(sidebar.getByRole('button', { name: 'Seitenleiste ausklappen' })).toBeTruthy()
  })
})
