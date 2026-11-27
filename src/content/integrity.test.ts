import { describe, expect, it } from 'vite-plus/test'
import { createContent, siteContent, type ContentSource } from '#/content'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { assetProblems, integrityProblems } from './integrity'
import { localScreenshotSet } from './screenshots'
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

  it('a Project role missing in German is reported', () => {
    const source = fixtureSource()
    source.projects[2]!.role.de = ''

    expect(integrityProblems(createContent(source))).toEqual([
      'de: projects.1.role is empty',
      'de: project.fixture-studio.role is empty',
    ])
  })

  it('a Project status missing in German is reported', () => {
    const source = fixtureSource()
    source.projects[2]!.status.label.de = ''

    expect(integrityProblems(createContent(source))).toEqual([
      'de: projects.1.status.label is empty',
      'de: project.fixture-studio.status.label is empty',
    ])
  })

  it('a Project key point missing in German is reported', () => {
    const source = fixtureSource()
    source.projects[2]!.keyPoints[1].de = ' '

    expect(integrityProblems(createContent(source))).toEqual([
      'de: projects.1.keyPoints.1 is empty',
      'de: project.fixture-studio.keyPoints.1 is empty',
    ])
  })

  it('a Project cover that names none of its screenshots is reported', () => {
    const source = fixtureSource()
    source.projects[1]!.cover = 'nowhere'

    expect(integrityProblems(createContent(source))).toEqual([
      'en: project.self-engine.cover is missing',
      'de: project.self-engine.cover is missing',
    ])
  })

  it('a Project without screenshots needs no cover', () => {
    const source = fixtureSource()
    delete source.projects[1]!.cover

    expect(integrityProblems(createContent(source))).toEqual([])
  })

  it('a story section without a title is reported', () => {
    const source = fixtureSource()
    source.stories['fixture-kit']!.en!.sections[0]!.title = ''

    expect(integrityProblems(createContent(source))).toEqual([
      'en: project.fixture-kit.story.sections.0.title is empty',
    ])
  })

  it('a Project period that ends before it starts is reported', () => {
    const source = fixtureSource()
    source.projects[0]!.period = { start: '2024', end: '2023' }

    expect(integrityProblems(createContent(source))).toContain(
      'projects: "fixture-kit" ends before it starts',
    )
  })

  it('two Projects with the same slug are reported', () => {
    const source = fixtureSource()
    source.projects[2]!.slug = 'fixture-kit'

    expect(integrityProblems(createContent(source))).toContain(
      'projects: slug "fixture-kit" is not unique',
    )
  })

  it('no featured Project is reported', () => {
    const source = fixtureSource()
    for (const project of source.projects) project.featured = false

    expect(integrityProblems(createContent(source))).toEqual(['projects: none is featured'])
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

  it('a Career entry linking to a Project that does not exist is reported', () => {
    const source = fixtureSource()
    source.careerEntries.find((entry) => entry.kind === 'freelance')!.project = 'nowhere'

    const problems = integrityProblems(createContent(source))
    expect(problems).toContain('en: careerEntries.1 links to no Project "nowhere"')
    expect(problems).toContain('de: careerEntries.1 links to no Project "nowhere"')
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

  it('the site CV and every screenshot kept in this repo exist as static assets', () => {
    expect(assetProblems(siteContent, inPublic)).toEqual([])
  })

  it('a screenshot file that is not in public/ is reported, for each Site language showing it', () => {
    const source = fixtureSource()
    const [shot] = source.screenshots['self-engine']!.shots
    source.screenshots['self-engine'] = localScreenshotSet('/screenshots/fixture', 'de', [shot!])
    const problems = assetProblems(createContent(source), inPublic)

    expect(problems).toContain(
      'en: screenshots.self-engine.dashboard /screenshots/fixture/dashboard-de-dark.webp does not exist',
    )
    // Both files of both themes, in both Site languages.
    expect(problems.filter((problem) => problem.includes('screenshots.'))).toHaveLength(8)
  })

  it('a CV file that is not in public/ is reported, for each Site language offering it', () => {
    const content = createContent(fixtureSource())

    expect(assetProblems(content, inPublic)).toEqual([
      'en: cv /cv/ada-example-cv-en.pdf does not exist',
      'de: cv /cv/ada-example-cv-en.pdf does not exist',
    ])
  })
})
