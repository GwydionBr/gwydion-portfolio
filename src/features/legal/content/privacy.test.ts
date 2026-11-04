import { describe, expect, it } from 'vite-plus/test'
import { getPrivacySections } from './privacy'

const locales = ['de', 'en'] as const

describe('getPrivacySections', () => {
  it('provides the same sections and paragraph counts in every locale', () => {
    const [de, en] = locales.map(getPrivacySections)
    expect(en.map((section) => section.id)).toEqual(de.map((section) => section.id))
    expect(en.map((section) => section.paragraphs.length)).toEqual(
      de.map((section) => section.paragraphs.length),
    )
  })

  it('uses unique section ids, since they double as anchor targets', () => {
    const ids = getPrivacySections('de').map((section) => section.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
