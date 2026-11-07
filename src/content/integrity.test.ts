import { describe, expect, it } from 'vite-plus/test'
import { createContent, siteContent, type ContentSource } from '#/content'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { assetProblems, integrityProblems } from './integrity'
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

  it('a Project without a German story is reported', () => {
    const source = fixtureSource()
    delete source.stories['fixture-studio']!.de

    expect(integrityProblems(createContent(source))).toEqual([
      'de: project.fixture-studio.story is missing',
    ])
  })

  it('a Project summary missing in English is reported', () => {
    const source = fixtureSource()
    source.projects[0]!.summary.en = ' '

    expect(integrityProblems(createContent(source))).toEqual([
      'en: projects.2.summary is empty',
      'en: project.fixture-kit.summary is empty',
    ])
  })

  it('two Projects with the same slug are reported', () => {
    const source = fixtureSource()
    source.projects[2]!.slug = 'fixture-kit'

    expect(integrityProblems(createContent(source))).toContain(
      'projects: slug "fixture-kit" is not unique',
    )
  })

  it('no featured or no pinned Project is reported', () => {
    const source = fixtureSource()
    for (const project of source.projects) {
      project.featured = false
      project.pinned = false
    }

    expect(integrityProblems(createContent(source))).toEqual([
      'projects: none is featured',
      'projects: none is pinned',
    ])
  })
})

describe('Screenshots', () => {
  it('a screenshot image file without a URL is reported by view, language and theme', () => {
    const source = fixtureSource()
    const set = source.screenshots['self-engine']!
    set.urls = { ...set.urls, 'timer-de-dark-440w.webp': undefined }

    expect(integrityProblems(createContent(source))).toEqual([
      'de: screenshots.self-engine.timer.images.dark is missing',
    ])
  })

  it('a screenshot without German alt text is reported', () => {
    const source = fixtureSource()
    source.screenshots['self-engine']!.shots[0]!.alt.de = ''

    expect(integrityProblems(createContent(source))).toEqual([
      'de: screenshots.self-engine.dashboard.alt is empty',
    ])
  })
})

describe('Career entries', () => {
  it('a Career entry missing a German text is reported', () => {
    const source = fixtureSource()
    // The newest entry, first in what the content module returns.
    const newest = source.careerEntries.find((entry) => entry.end === null)!
    newest.summary = { en: 'Leads fixtures.', de: '' }

    expect(integrityProblems(createContent(source))).toEqual([
      'de: careerEntries.0.summary is empty',
    ])
  })

  it.each([
    ['2024-13', null, 'en: careerEntries.0 has a malformed start "2024-13"'],
    ['2024-06', 'soon', 'en: careerEntries.0 has a malformed end "soon"'],
    ['2024-06', '2024-05', 'en: careerEntries.0 ends before it starts'],
    ['2024-06', '2023', 'en: careerEntries.0 ends before it starts'],
  ])('a period from %s to %s is reported', (start, end, problem) => {
    const source = fixtureSource()
    Object.assign(
      source.careerEntries.find((entry) => entry.kind === 'job')!,
      { start, end },
    )

    const problems = integrityProblems(createContent(source))
    expect(problems).toContain(problem)
    expect(problems).toContain(problem.replace('en:', 'de:'))
  })

  it('a period that starts and ends in the same year is fine', () => {
    const source = fixtureSource()
    Object.assign(
      source.careerEntries.find((entry) => entry.kind === 'job')!,
      {
        start: '2024-06',
        end: '2024',
      },
    )

    expect(integrityProblems(createContent(source))).toEqual([])
  })
})

describe('The CV', () => {
  /** Whether the static asset at URL path `href` is in `public/`. */
  const inPublic = (href: string) => existsSync(join(process.cwd(), 'public', href))

  it('the site CV exists as a static asset for every Site language', () => {
    expect(assetProblems(siteContent, inPublic)).toEqual([])
  })

  it('a CV file that is not in public/ is reported, for each Site language offering it', () => {
    const content = createContent(fixtureSource())

    expect(assetProblems(content, inPublic)).toEqual([
      'en: cv /cv/ada-example-cv-en.pdf does not exist',
      'de: cv /cv/ada-example-cv-en.pdf does not exist',
    ])
  })
})
