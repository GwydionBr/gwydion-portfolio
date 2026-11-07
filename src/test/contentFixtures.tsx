import {
  createContent,
  type ContentSource,
  type Post,
  type ProjectSource,
  type StorySource,
} from '#/content'

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
      years: '2024',
      summary: { en: 'A kit of fixtures.', de: 'Ein Baukasten für Fixtures.' },
      stack: ['Kit'],
      featured: false,
      pinned: false,
      order: 3,
      accent: '#3b4a7a',
    },
    {
      // Self-Engine's slug, so the Overview shows its numbers.
      slug: 'self-engine',
      title: 'Fixture Engine',
      kind: 'own-product',
      years: '2025–now',
      summary: { en: 'An engine for fixtures.', de: 'Ein Motor für Fixtures.' },
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
      years: '2026',
      summary: { en: 'A studio for fixtures.', de: 'Ein Studio für Fixtures.' },
      stack: ['Sanity'],
      featured: true,
      pinned: false,
      order: 2,
      accent: '#8a3b2e',
    },
  ]
}

/** A story per Project and Site language: a paragraph naming both. */
function fixtureStories(projects: ProjectSource[]): StorySource {
  return Object.fromEntries(
    projects.map(({ slug, title }) => [
      slug,
      {
        en: () => <p>The story of {title}.</p>,
        de: () => <p>Die Geschichte von {title}.</p>,
      },
    ]),
  )
}

/** A complete, valid content source; a fresh copy each call, so tests may break it. */
export function fixtureSource({ posts = [] }: { posts?: Post[] } = {}): ContentSource {
  const projects = fixtureProjects()
  return {
    projects,
    stories: fixtureStories(projects),
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
      links: [{ kind: 'email', href: 'mailto:ada@example.com' }],
    },
    posts,
  }
}

/** The content module over the fixture source. */
export function fixtureContent(options?: { posts?: Post[] }) {
  return createContent(fixtureSource(options))
}
