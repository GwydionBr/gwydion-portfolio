import { describe, expect, it } from 'vite-plus/test'
import { currentSectionIndex } from './currentSection'

describe('The section being read', () => {
  it('is none while no heading has risen to the reading line', () => {
    expect(currentSectionIndex([400, 900, 1600], 300, false)).toBe(-1)
  })

  it('is the last section whose heading has passed the reading line', () => {
    expect(currentSectionIndex([-800, 120, 700], 300, false)).toBe(1)
    expect(currentSectionIndex([-800, -200, 300], 300, false)).toBe(2)
  })

  it('is the last section once the page is scrolled to its end, short as it may be', () => {
    expect(currentSectionIndex([-800, 120, 650], 300, true)).toBe(2)
  })

  it('is none for a story without sections', () => {
    expect(currentSectionIndex([], 300, true)).toBe(-1)
  })
})
