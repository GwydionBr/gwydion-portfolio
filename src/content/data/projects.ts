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
    role: {
      en: 'Sole developer: design, build, operations',
      de: 'Alleinentwickler: Design, Entwicklung, Betrieb',
    },
    status: { en: 'Live, commercial', de: 'Live, kommerziell' },
    links: { live: 'https://self-engine.com' },
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
  },
  {
    slug: 'tattoo-booking-portal',
    title: 'Tattoo Booking Portal',
    kind: 'client-work',
    period: { start: '2026', end: '2026' },
    summary: {
      en: 'Websites for a tattoo studio and its artists, with a portal where the artists handle every booking request.',
      de: 'Websites für ein Tattoo-Studio und seine Künstler, mit einem Portal, in dem die Künstler alle Terminanfragen bearbeiten.',
    },
    role: { en: 'Design and development', de: 'Design und Entwicklung' },
    status: { en: 'Launch 2026', de: 'Launch 2026' },
    links: { live: 'https://endstation-tattoo.com' },
    stack: ['TanStack Start', 'Sanity', 'Supabase', 'Mantine', 'Vercel'],
    featured: true,
    order: 2,
    accent: '#8a3b2e',
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
    role: {
      en: 'Sole developer: design and build',
      de: 'Alleinentwickler: Design und Entwicklung',
    },
    status: { en: 'Live', de: 'Live' },
    links: {
      live: 'https://gwydion.dev',
      source: 'https://github.com/GwydionBr/gwydion-portfolio',
    },
    stack: ['TanStack Start', 'Tailwind CSS', 'Base UI', 'Lingui', 'MDX'],
    featured: false,
    order: 3,
    accent: '#3b4a7a',
  },
]
