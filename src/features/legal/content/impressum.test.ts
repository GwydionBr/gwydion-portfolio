import { describe, expect, it } from 'vite-plus/test'
import { getImpressumBlocks } from './impressum'

const locales = ['de', 'en'] as const

describe('getImpressumBlocks', () => {
  it('provides the same structure in every locale', () => {
    const [de, en] = locales.map(getImpressumBlocks)
    expect(en.map((block) => block.paragraphs.length)).toEqual(
      de.map((block) => block.paragraphs.length),
    )
  })

  it.each(locales)('cites the DDG instead of the repealed TMG (%s)', (locale) => {
    const text = JSON.stringify(getImpressumBlocks(locale))
    expect(text).toContain('§ 5 DDG')
    expect(text).not.toMatch(/\bTMG\b/)
    expect(text).not.toContain('MStV')
  })
})
