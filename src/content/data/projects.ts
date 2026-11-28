import type { ProjectSource } from '../schema'

/**
 * Gwydion's Projects. Each one's story is an MDX file per Site language in
 * `./projects/<slug>.<language>.mdx`. Read them through the content module
 * (`#/content`), never directly.
 */
export const projects: ProjectSource[] = [
  {
    slug: 'self-engine',
    title: 'Self-Engine',
    kind: 'own-product',
    period: { start: '2025', end: null },
    summary: {
      en: 'Time tracking, tasks, calendar, finance and habits on one data model. Offline-first sync across web, macOS and iOS.',
      de: 'Zeiterfassung, Aufgaben, Kalender, Finanzen und Gewohnheiten auf einem Datenmodell. Offline-first-Sync über Web, macOS und iOS.',
    },
    keyPoints: [
      { en: 'Web, macOS and iOS', de: 'Web, macOS und iOS' },
      { en: 'Offline-first sync', de: 'Offline-first-Sync' },
      { en: 'Built-in AI assistant', de: 'Eingebauter KI-Assistent' },
    ],
    role: {
      en: 'Sole developer: design, build, operations',
      de: 'Alleinentwickler: Design, Entwicklung, Betrieb',
    },
    status: { label: { en: 'Open-source rebuild', de: 'Open-Source-Neubau' }, live: false },
    links: {
      live: 'https://self-engine.com',
      source: 'https://github.com/Self-Engine/self-engine',
    },
    stack: [
      'TypeScript',
      'TanStack Start',
      'React Native / Expo',
      'Electron',
      'SQLite',
      'PowerSync',
      'Supabase',
      'Postgres',
      'Clerk',
    ],
    // Checked against the Self-Engine repo on 2026-11-07; maintained by hand.
    stats: [
      {
        value: 2200,
        precision: 'at-least',
        label: { en: 'commits', de: 'Commits' },
      },
      { value: 88, label: { en: 'releases', de: 'Releases' } },
    ],
    featured: true,
    order: 1,
    accent: '#2f5d50',
    cover: 'dashboard',
  },
  {
    slug: 'tattoo-sites',
    title: 'Tattoo Sites',
    kind: 'client-work',
    period: { start: '2025', end: null },
    summary: {
      en: 'The website of a tattoo studio and the personal website of one of its artists, each with its own look, edited by their owners.',
      de: 'Die Website eines Tattoo-Studios und die eigene Website eines seiner Künstler, jede mit eigenem Aussehen und von ihren Inhabern selbst gepflegt.',
    },
    keyPoints: [
      { en: 'Guided booking form in four steps', de: 'Geführtes Terminformular in vier Schritten' },
      { en: 'The studio edits its own content', de: 'Das Studio pflegt seine Inhalte selbst' },
      { en: 'One package for all artist websites', de: 'Ein Package für alle Künstler-Websites' },
    ],
    role: { en: 'Design and development', de: 'Design und Entwicklung' },
    status: {
      label: { en: 'Two websites live, two in progress', de: 'Zwei Websites live, zwei in Arbeit' },
      live: true,
    },
    links: { live: 'https://endstation-tattoo.com' },
    stack: ['TanStack Start', 'Mantine', 'Sanity', 'Zod', 'Vercel'],
    featured: true,
    order: 2,
    accent: '#8a3b2e',
    cover: 'endstation-start',
  },
  {
    slug: 'tattoo-booking-portal',
    title: 'Tattoo Booking Portal',
    kind: 'client-work',
    period: { start: '2026', end: null },
    summary: {
      en: 'The portal where the artists of a tattoo studio handle every booking request, with strict rules for who sees what.',
      de: 'Das Portal, in dem die Künstler eines Tattoo-Studios alle Terminanfragen bearbeiten, mit strengen Regeln dafür, wer was sieht.',
    },
    keyPoints: [
      { en: 'Built for phones and iPads first', de: 'Zuerst für Handy und iPad gebaut' },
      { en: 'Access rules in the database', de: 'Zugriffsregeln in der Datenbank' },
      { en: 'Deletion after six months', de: 'Löschung nach sechs Monaten' },
    ],
    role: {
      en: 'Design, development and operations',
      de: 'Design, Entwicklung und Betrieb',
    },
    status: { label: { en: 'Live', de: 'Live' }, live: true },
    links: {},
    stack: ['TanStack Start', 'Supabase', 'Postgres', 'Mantine', 'Vercel'],
    // Checked against the tattoo-sites repo on 2026-11-27; maintained by hand.
    stats: [
      { value: 37, label: { en: 'database migrations', de: 'Datenbank-Migrationen' } },
      { value: 30, label: { en: 'SQL test files', de: 'SQL-Testdateien' } },
      {
        value: 9,
        label: { en: 'architecture decisions (ADRs)', de: 'Architektur-Entscheidungen (ADRs)' },
      },
    ],
    // Two Projects are featured: the share image is laid out for two.
    featured: false,
    order: 3,
    accent: '#17777a',
    cover: 'postfach',
  },
  {
    slug: 'gwydion-dev',
    title: 'gwydion.dev',
    kind: 'open-source',
    period: { start: '2026', end: '2026' },
    summary: {
      en: 'This site: a bilingual, server-rendered portfolio built like an app.',
      de: 'Diese Website: ein zweisprachiges, serverseitig gerendertes Portfolio im Stil einer App.',
    },
    keyPoints: [
      { en: 'English and German', de: 'Deutsch und Englisch' },
      { en: 'Server-rendered', de: 'Serverseitig gerendert' },
      { en: 'Content as typed data', de: 'Inhalte als typisierte Daten' },
    ],
    role: {
      en: 'Sole developer: design and build',
      de: 'Alleinentwickler: Design und Entwicklung',
    },
    status: { label: { en: 'Live', de: 'Live' }, live: true },
    links: {
      live: 'https://gwydion.dev',
      source: 'https://github.com/GwydionBr/gwydion-portfolio',
    },
    stack: ['TanStack Start', 'Mantine', 'Lingui', 'MDX'],
    featured: false,
    order: 4,
    accent: '#3b4a7a',
  },
]
