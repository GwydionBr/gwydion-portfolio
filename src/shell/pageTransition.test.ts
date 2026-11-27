import { describe, expect, it } from 'vite-plus/test'
import {
  CROSSFADE_TRANSITION_TYPE,
  PAGE_TRANSITION_TYPE,
  pageTransitionTypes,
  type PageTransitionConditions,
} from './pageTransition'

const calm: PageTransitionConditions = {
  reducedMotion: false,
  dialogShown: false,
  browserAnimated: false,
  keepsLayout: true,
  scrolled: false,
}

const nextPage = { firstPage: false, pathChanged: true }

describe('The page transition', () => {
  it('crossfades to another page standing in the same place', () => {
    expect(pageTransitionTypes(nextPage, calm)).toEqual([
      PAGE_TRANSITION_TYPE,
      CROSSFADE_TRANSITION_TYPE,
    ])
  })

  it('only fades the next page in when the old page was scrolled', () => {
    expect(pageTransitionTypes(nextPage, { ...calm, scrolled: true })).toEqual([
      PAGE_TRANSITION_TYPE,
    ])
  })

  it('only fades the next page in when the main pane narrows or widens with it', () => {
    expect(pageTransitionTypes(nextPage, { ...calm, keepsLayout: false })).toEqual([
      PAGE_TRANSITION_TYPE,
    ])
  })

  it('does not run on the first page, nor when only the search or hash changes', () => {
    expect(pageTransitionTypes({ firstPage: true, pathChanged: true }, calm)).toBe(false)
    expect(pageTransitionTypes({ firstPage: false, pathChanged: false }, calm)).toBe(false)
  })

  it.each<keyof PageTransitionConditions>(['reducedMotion', 'dialogShown', 'browserAnimated'])(
    'does not run when %s',
    (condition) => {
      expect(pageTransitionTypes(nextPage, { ...calm, [condition]: true })).toBe(false)
    },
  )
})
