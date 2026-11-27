import { describe, expect, it } from 'vite-plus/test'
import {
  PAGE_TRANSITION_TYPE,
  pageTransitionTypes,
  type PageTransitionConditions,
} from './pageTransition'

const calm: PageTransitionConditions = {
  reducedMotion: false,
  dialogShown: false,
  browserAnimated: false,
}

describe('The page transition', () => {
  it('runs when the visitor goes to another page', () => {
    expect(pageTransitionTypes({ pathChanged: true }, calm)).toEqual([PAGE_TRANSITION_TYPE])
  })

  it('does not run when the page stays and only its search or hash changes', () => {
    expect(pageTransitionTypes({ pathChanged: false }, calm)).toBe(false)
  })

  it.each<keyof PageTransitionConditions>(['reducedMotion', 'dialogShown', 'browserAnimated'])(
    'does not run when %s',
    (condition) => {
      expect(pageTransitionTypes({ pathChanged: true }, { ...calm, [condition]: true })).toBe(false)
    },
  )
})
