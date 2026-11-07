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
    careerEntries: [
      {
        kind: 'freelance',
        start: '2022-03',
        end: '2024',
        title: { en: 'Freelance fixture maker', de: 'Freiberufliche Fixture-Bauerin' },
        organisation: 'Self-employed',
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
