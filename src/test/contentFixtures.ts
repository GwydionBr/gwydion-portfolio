import { createContent, type ContentSource, type Post } from '#/content'

/** A Post as a test needs one; no real Post exists yet. */
export const FIXTURE_POST: Post = {
  slug: 'offline-first-is-a-data-model',
  title: 'Offline-first is a data model, not a feature',
  language: 'en',
  publishedAt: '2026-10-21',
}

/** A complete, valid content source; a fresh copy each call, so tests may break it. */
export function fixtureSource({ posts = [] }: { posts?: Post[] } = {}): ContentSource {
  return {
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
    posts,
  }
}

/** The content module over the fixture source. */
export function fixtureContent(options?: { posts?: Post[] }) {
  return createContent(fixtureSource(options))
}
