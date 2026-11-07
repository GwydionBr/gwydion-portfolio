import { describe, expect, it } from 'vite-plus/test'
import { LANGUAGES } from '#/i18n/language'
import { IMPRESSUM } from './impressum'

describe('The Impressum', () => {
  it('has the same sections and paragraph counts in every Site language', () => {
    const shape = (language: 'en' | 'de') =>
      IMPRESSUM[language].map((section) => [section.id, section.paragraphs.length])
    expect(shape('en')).toEqual(shape('de'))
  })

  it.each(LANGUAGES)('cites the DDG instead of the repealed TMG (%s)', (language) => {
    const text = JSON.stringify(IMPRESSUM[language])
    expect(text).toContain('§ 5 DDG')
    expect(text).not.toMatch(/\bTMG\b/)
    expect(text).not.toContain('MStV')
  })

  it('uses unique section ids, since they double as anchor targets', () => {
    const ids = IMPRESSUM.de.map((section) => section.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
