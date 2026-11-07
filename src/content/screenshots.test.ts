import { describe, expect, it } from 'vite-plus/test'
import { pickScreenshotUrls } from './screenshots'

const closeUp = {
  view: 'timer',
  size: { width: 440, height: 360 },
  caption: { en: 'Timer', de: 'Timer' },
  alt: { en: 'A timer', de: 'Ein Timer' },
}

/** What the Self-Engine repo's `screenshotUrls.json` lists: every file of the close-up, and others. */
const everyFile = {
  'timer-en-light.webp': 'https://blob/timer-en-light-a.webp',
  'timer-en-light-440w.webp': 'https://blob/timer-en-light-440w-b.webp',
  'timer-en-dark.webp': 'https://blob/timer-en-dark-c.webp',
  'timer-en-dark-440w.webp': 'https://blob/timer-en-dark-440w-d.webp',
  'timer-de-light.webp': 'https://blob/timer-de-light-e.webp',
  'timer-de-light-440w.webp': 'https://blob/timer-de-light-440w-f.webp',
  'timer-de-dark.webp': 'https://blob/timer-de-dark-g.webp',
  'timer-de-dark-440w.webp': 'https://blob/timer-de-dark-440w-h.webp',
  'calendar-en-light.webp': 'https://blob/calendar-en-light-i.webp',
}

describe('Syncing the screenshot URLs from the Self-Engine repo', () => {
  it('picks each screenshot in every Site language and theme, at 1× and 2×, and nothing else', () => {
    const { urls, missing } = pickScreenshotUrls([closeUp], everyFile)

    expect(missing).toEqual([])
    expect(Object.keys(urls).sort()).toEqual(
      Object.keys(everyFile)
        .filter((file) => file.startsWith('timer-'))
        .sort(),
    )
    expect(urls['timer-de-dark-440w.webp']).toBe('https://blob/timer-de-dark-440w-h.webp')
  })

  it('reports the files the Self-Engine repo lacks', () => {
    const {
      'timer-de-dark.webp': _dropped,
      'timer-en-light-440w.webp': _alsoDropped,
      ...rest
    } = everyFile

    expect(pickScreenshotUrls([closeUp], rest).missing).toEqual([
      'timer-en-light-440w.webp',
      'timer-de-dark.webp',
    ])
  })
})
