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

    page.paintFirstFrame()
    expect(paintedWidth()).toBe('18.75rem')
    expect(handleIn(page.sidebar()).getAttribute('aria-valuenow')).toBe('300')
  })

  it('keeps a stored width within the bounds', async () => {
    localStorage.setItem(STORAGE_KEY, '999')
    const page = await visit('/en')

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
