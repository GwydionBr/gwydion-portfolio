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
    // As of the old case study (November 2026); maintained by hand (spec #31).
    stats: [
      { value: '2,100+', label: { en: 'commits', de: 'Commits' } },
      { value: '79', label: { en: 'releases', de: 'Releases' } },
      { value: '~5,900', label: { en: 'tests', de: 'Tests' } },
    ],
    featured: true,
    pinned: true,
    order: 1,
    accent: '#2f5d50',
  },
  {
    slug: 'endstation-tattoo',
    title: 'Endstation Tattoo',
    kind: 'client-work',
    period: { start: '2026', end: '2026' },
    summary: {
      en: 'Studio website with artist portfolios and booking requests, editable by the studio through Sanity.',
      de: 'Studio-Website mit Künstler-Portfolios und Terminanfragen, vom Studio selbst über Sanity pflegbar.',
    },
    stack: ['TanStack Start', 'Sanity', 'Vercel'],
    featured: true,
    pinned: true,
    order: 2,
    accent: '#8a3b2e',
  },
  {
    slug: 'kawana',
    title: 'KaWAna',
    kind: 'client-work',
    period: { start: '2026', end: '2026' },
    summary: {
      en: 'Website for women’s circles and cooking classes, with sign-up forms and a CMS.',
      de: 'Website für Frauenkreise und Kochkurse, mit Anmeldeformularen und CMS.',
    },
    stack: ['TanStack Start', 'Sanity', 'Resend'],
    featured: true,
    pinned: true,
    order: 3,
    accent: '#a07a2c',
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
    stack: ['TanStack Start', 'Tailwind CSS', 'Base UI', 'Lingui', 'MDX'],
    featured: false,
    pinned: false,
    order: 4,
    accent: '#3b4a7a',
  },
]
