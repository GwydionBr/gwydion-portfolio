import {
  createContent,
  type ContentSource,
  type Post,
  type ProjectSource,
  type ScreenshotSetSource,
  type StorySource,
} from '#/content'
import { ScreenshotGallery } from '#/components/story'
import { LANGUAGES } from '#/i18n/language'
import { THEMES } from '#/theme/theme'

/** A Post as a test needs one; no real Post exists yet. */
export const FIXTURE_POST: Post = {
  slug: 'offline-first-is-a-data-model',
  title: 'Offline-first is a data model, not a feature',
  language: 'en',
  publishedAt: '2026-10-21',
}

/**
 * Three Projects, stored out of order so tests see the configured order win.
 * Only Fixture Engine is pinned; Fixture Kit is not featured either.
 */
function fixtureProjects(): ProjectSource[] {
  return [
    {
      slug: 'fixture-kit',
      title: 'Fixture Kit',
      kind: 'open-source',
      period: { start: '2024', end: '2024' },
      summary: { en: 'A kit of fixtures.', de: 'Ein Baukasten für Fixtures.' },
      role: { en: 'Maintainer', de: 'Maintainerin' },
      status: { en: 'Archived', de: 'Archiviert' },
      links: { source: 'https://github.com/ada-example/fixture-kit' },
      stack: ['Kit'],
      featured: false,
      pinned: false,
      order: 3,
      accent: '#3b4a7a',
    },
    {
      // Self-Engine's slug, so its story's screenshot gallery finds the screenshots.
      slug: 'self-engine',
      title: 'Fixture Engine',
      kind: 'own-product',
      period: { start: '2025', end: null },
      summary: { en: 'An engine for fixtures.', de: 'Ein Motor für Fixtures.' },
      role: { en: 'Sole developer', de: 'Alleinige Entwicklerin' },
      status: { en: 'Live, commercial', de: 'Live, kommerziell' },
      links: { live: 'https://engine.example' },
      stack: ['TypeScript', 'Postgres'],
      stats: [
        { value: '1,234', label: { en: 'commits', de: 'Commits' } },
        { value: '56', label: { en: 'releases', de: 'Releases' } },
      ],
      featured: true,
      pinned: true,
      order: 1,
      accent: '#2f5d50',
    },
    {
      slug: 'fixture-studio',
      title: 'Fixture Studio',
      kind: 'client-work',
      period: { start: '2026', end: '2026' },
      summary: { en: 'A studio for fixtures.', de: 'Ein Studio für Fixtures.' },
      role: { en: 'Design and development', de: 'Design und Entwicklung' },
      status: { en: 'Launching soon', de: 'Bald live' },
      links: {},
      stack: ['Sanity'],
      featured: true,
      pinned: false,
      order: 2,
      accent: '#8a3b2e',
    },
  ]
}

/**
 * A story per Project and Site language: a paragraph naming both. Fixture
 * Engine's (at Self-Engine's slug) also shows its screenshot gallery.
 */
function fixtureStories(projects: ProjectSource[]): StorySource {
  return Object.fromEntries(
    projects.map(({ slug, title }) => {
      const gallery = slug === 'self-engine' && <ScreenshotGallery />
      return [
        slug,
        {
          en: () => (
            <>
              <p>The story of {title}.</p>
              {gallery}
            </>
          ),
          de: () => (
            <>
              <p>Die Geschichte von {title}.</p>
              {gallery}
            </>
          ),
        },
      ]
    }),
  )
}

/**
 * Fixture Engine's two screenshots, a whole window and a close-up, with every
 * image file at `https://blob.example/<file>`.
 */
function fixtureScreenshots(): ScreenshotSetSource {
  const shots = [
    {
      view: 'dashboard',
      size: { width: 1440, height: 900 },
      caption: { en: 'Dashboard', de: 'Dashboard' },
      alt: { en: 'The fixture dashboard', de: 'Das Fixture-Dashboard' },
    },
    {
      view: 'timer',
      size: { width: 440, height: 360 },
      caption: { en: 'Timer', de: 'Timer' },
      alt: { en: 'A running fixture timer', de: 'Ein laufender Fixture-Timer' },
    },
  ]
  const urls: Record<string, string> = {}
  for (const { view, size } of shots)
    for (const language of LANGUAGES)
      for (const theme of THEMES)
        for (const file of [
          `${view}-${language}-${theme}.webp`,
          `${view}-${language}-${theme}-${size.width}w.webp`,
        ])
          urls[file] = `https://blob.example/${file}`
  return { shots, urls }
}

/** A complete, valid content source; a fresh copy each call, so tests may break it. */
export function fixtureSource({ posts = [] }: { posts?: Post[] } = {}): ContentSource {
  const projects = fixtureProjects()
  return {
    projects,
    stories: fixtureStories(projects),
    screenshots: { 'self-engine': fixtureScreenshots() },
    profile: {
      name: 'Ada Example',
      role: { en: 'Fixture developer', de: 'Fixture-Entwicklerin' },
      location: { en: 'Testland', de: 'Testland' },
      pitch: { en: 'I am a fixture.', de: 'Ich bin ein Fixture.' },
      availability: {
        headline: { en: 'Open to fixtures', de: 'Offen für Fixtures' },
        freelance: { en: 'Also fixtures on the side', de: 'Nebenbei auch Fixtures' },
      },
      now: [
        { label: { en: 'Building', de: 'Bauen' }, text: { en: 'Tests.', de: 'Tests.' } },
        { label: { en: 'Learning', de: 'Lernen' }, text: { en: 'More tests.', de: 'Mehr Tests.' } },
      ],
      skills: ['Testing'],
      links: [
        { kind: 'email', href: 'mailto:ada@example.com' },
        { kind: 'github', href: 'https://github.com/ada-example' },
        { kind: 'linkedin', href: 'https://www.linkedin.com/', placeholder: true },
      ],
    },
    careerEntries: [
      {
        kind: 'freelance',
        start: '2022-03',
        end: '2024',
        title: { en: 'Freelance fixture maker', de: 'Freiberufliche Fixture-Bauerin' },
        organisation: 'Self-employed',
        project: 'fixture-studio',
        summary: { en: 'Built fixtures.', de: 'Baute Fixtures.' },
      },
      {
        kind: 'job',
        start: '2024-06',
        end: null,
        title: { en: 'Lead fixture', de: 'Leitendes Fixture' },
        organisation: 'Example GmbH',
        summary: { en: 'Leads fixtures.', de: 'Leitet Fixtures.' },
      },
      {
        kind: 'education',
        start: '2018',
        end: '2022',
        title: { en: 'Degree in fixtures', de: 'Studium der Fixtures' },
        organisation: 'Example University',
        summary: { en: 'Studied fixtures.', de: 'Studierte Fixtures.' },
      },
    ],
    cv: [{ language: 'en', href: '/cv/ada-example-cv-en.pdf' }],
    posts,
  }
}

/** The content module over the fixture source. */
export function fixtureContent(options?: { posts?: Post[] }) {
  return createContent(fixtureSource(options))
}
