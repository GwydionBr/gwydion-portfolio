import { describe, expect, it } from 'vite-plus/test'
import { createContent, siteContent, type ContentSource } from '#/content'
import { integrityProblems } from './integrity'
import { fixtureSource } from '#/test/contentFixtures'

describe('Content integrity', () => {
  it('the site content has every text, non-empty, in both Site languages', () => {
    expect(integrityProblems(siteContent)).toEqual([])
  })

  it('a Profile text missing in German is reported', () => {
    const source: ContentSource = fixtureSource()
    source.profile.pitch = { en: 'I build software.', de: '' }

    expect(integrityProblems(createContent(source))).toEqual(['de: profile.pitch is empty'])
  })

  it('a Profile text absent in English is reported', () => {
    const source = fixtureSource()
    // Content files are type-checked; this simulates content that slipped past the types.
    source.profile.now[1]!.label = { de: 'Lernen' } as never

    expect(integrityProblems(createContent(source))).toEqual(['en: profile.now.1.label is missing'])
  })

  it('a freelance note left out on purpose is not a problem', () => {
    const source = fixtureSource()
    source.profile.availability.freelance = null

    expect(integrityProblems(createContent(source))).toEqual([])
  })
})
