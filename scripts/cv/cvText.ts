import type { Localized } from '../../src/content/localized'

/**
 * What only the CV says. Everything the site already knows (name, links,
 * Career entries, project stacks) comes from the content data instead, so the
 * two cannot drift apart.
 */
export const cvText = {
  title: { en: 'CV', de: 'Lebenslauf' },
  headline: {
    en: ['Full-Stack Developer', 'React & TypeScript'],
    de: ['Full-Stack-Entwickler', 'React & TypeScript'],
  },
  location: { en: 'Schwangau, Germany', de: 'Schwangau, Deutschland' },
  availability: {
    en: ['Open to full-time roles.', 'On-site, hybrid or remote.', 'Available immediately.'],
    de: ['Offen für Festanstellungen.', 'Vor Ort, hybrid oder remote.', 'Ab sofort verfügbar.'],
  },
  intro: {
    en: 'Self-taught full-stack developer. I take products from the data model to the deployed app on my own: offline-first sync, web, mobile and desktop clients, content that non-technical owners edit themselves, and hosting. Freelancing since 2024; since December 2025 I have been building my own product, Self-Engine. I work with AI coding tools every day and built an MCP server that lets AI assistants work with an app’s data.',
    de: 'Autodidaktischer Full-Stack-Entwickler. Ich bringe Produkte allein vom Datenmodell bis zur ausgelieferten App: Offline-first-Sync, Web-, Mobil- und Desktop-Clients, Inhalte, die Nicht-Techniker selbst pflegen, und Hosting. Seit 2024 arbeite ich freiberuflich, seit Dezember 2025 baue ich mein eigenes Produkt Self-Engine. Ich arbeite täglich mit KI-Coding-Tools und habe einen MCP-Server gebaut, über den KI-Assistenten mit den Daten einer App arbeiten.',
  },
  sections: {
    contact: { en: 'Contact', de: 'Kontakt' },
    skills: { en: 'Skills', de: 'Kenntnisse' },
    languages: { en: 'Languages', de: 'Sprachen' },
    profile: { en: 'Profile', de: 'Profil' },
    experience: { en: 'Experience', de: 'Berufserfahrung' },
    projects: { en: 'Side projects', de: 'Weitere Projekte' },
    education: { en: 'Education', de: 'Ausbildung' },
  },
  contactLabels: {
    location: { en: 'Location', de: 'Wohnort' },
    email: { en: 'Email', de: 'E-Mail' },
    website: { en: 'Portfolio', de: 'Portfolio' },
    github: { en: 'GitHub', de: 'GitHub' },
    linkedin: { en: 'LinkedIn', de: 'LinkedIn' },
  },
  now: { en: 'present', de: 'heute' },
  /**
   * The highlights of a Career entry, by its organisation (in English); the entry's own
   * summary stands in for entries without any. `stackOf` names the Project
   * whose stack the entry lists.
   */
  experience: {
    'Self-Engine': {
      stackOf: 'self-engine',
      highlights: [
        {
          en: 'Offline-first productivity platform: time tracking, tasks, calendar, finances and habits on one data model, synced across web, macOS and iOS.',
          de: 'Offline-first-Produktivitätsplattform: Zeiterfassung, Aufgaben, Kalender, Finanzen und Gewohnheiten auf einem Datenmodell, synchron über Web, macOS und iOS.',
        },
        {
          en: 'Bun monorepo: TanStack Start web app, Expo / React Native mobile app and Electron desktop app sharing one domain layer (schemas, workflows, UI kit, i18n).',
          de: 'Bun-Monorepo: TanStack-Start-Web-App, Expo-/React-Native-App und Electron-Desktop-App auf einer gemeinsamen Domänenschicht (Schemas, Workflows, UI-Kit, i18n).',
        },
        {
          en: 'MCP server through which AI assistants read and write projects, tasks, time entries and finances; in-app AI features via TanStack AI.',
          de: 'MCP-Server, über den KI-Assistenten Projekte, Aufgaben, Zeiteinträge und Finanzen lesen und schreiben; KI-Funktionen in der App über TanStack AI.',
        },
        {
          en: '2,200+ commits, ~5,900 tests (Vitest), 50+ architecture decisions recorded as ADRs.',
          de: '2.200+ Commits, ~5.900 Tests (Vitest), 50+ Architekturentscheidungen als ADRs dokumentiert.',
        },
      ],
    },
    'Self-employed': {
      stack: ['TanStack Start', 'Sanity', 'Supabase', 'Resend', 'Vercel'],
      highlights: [
        {
          en: '<b>Endstation Tattoo:</b> studio website with artist portfolios and booking requests, which the studio edits itself in Sanity.',
          de: '<b>Endstation Tattoo:</b> Studio-Website mit Künstler-Portfolios und Terminanfragen, die das Studio selbst in Sanity pflegt.',
        },
        {
          en: 'Built in one monorepo with the sites of further tattoo studios and a portal for their booking requests; each site has its own CMS project and deployment.',
          de: 'Entstanden in einem Monorepo mit den Websites weiterer Tattoo-Studios und einem Portal für deren Terminanfragen; jede Website hat ein eigenes CMS-Projekt und Deployment.',
        },
        {
          en: '<b>KaWAna:</b> website for women’s circles and cooking classes, with sign-up forms and a CMS.',
          de: '<b>KaWAna:</b> Website für Frauenkreise und Kochkurse, mit Anmeldeformularen und CMS.',
        },
      ],
    },
  } satisfies Record<
    string,
    { stackOf?: string; stack?: string[]; highlights: Localized<string>[] }
  >,
  sideProjects: [
    {
      title: 'gwydion.dev',
      period: '2026',
      text: {
        en: 'Bilingual, server-rendered portfolio: TanStack Start, Tailwind CSS, Lingui, MDX.',
        de: 'Zweisprachiges, serverseitig gerendertes Portfolio: TanStack Start, Tailwind CSS, Lingui, MDX.',
      },
    },
    {
      title: 'Burgwacht',
      period: '2026',
      text: {
        en: 'Castle-building strategy game in Godot 4 (GDScript), built solo; 400+ commits.',
        de: 'Burgenbau-Strategiespiel in Godot 4 (GDScript), allein entwickelt; 400+ Commits.',
      },
    },
    {
      title: 'Work Manager',
      period: '2025',
      text: {
        en: 'Work and time management app with Next.js, Mantine and Supabase; predecessor of Self-Engine.',
        de: 'App für Arbeits- und Zeitmanagement mit Next.js, Mantine und Supabase; Vorgänger von Self-Engine.',
      },
    },
  ],
  courses: {
    en: 'Online courses in software development (Udemy, Zero To Mastery).',
    de: 'Online-Kurse in Softwareentwicklung (Udemy, Zero To Mastery).',
  },
  skills: [
    {
      label: { en: 'Languages', de: 'Sprachen' },
      items: [
        'TypeScript',
        'JavaScript',
        'SQL',
        { en: 'Python (basic)', de: 'Python (Grundlagen)' },
        'GDScript',
      ],
    },
    {
      label: { en: 'Frontend', de: 'Frontend' },
      items: [
        'React',
        'Next.js',
        'TanStack Start',
        'TanStack Query / DB',
        'Tailwind CSS',
        'Mantine',
      ],
    },
    {
      label: { en: 'Mobile & desktop', de: 'Mobil & Desktop' },
      items: ['Expo', 'React Native', 'Electron'],
    },
    {
      label: { en: 'Backend & data', de: 'Backend & Daten' },
      items: ['Supabase', 'Postgres', 'SQLite', 'PowerSync', 'Sanity CMS', 'Resend', 'Zod'],
    },
    {
      label: { en: 'AI', de: 'KI' },
      items: [{ en: 'MCP servers', de: 'MCP-Server' }, 'TanStack AI', 'Claude Code'],
    },
    {
      label: { en: 'Tooling', de: 'Werkzeuge' },
      items: ['Git & GitHub', 'Bun', 'Vite', 'Vitest', 'Vercel'],
    },
  ],
  spokenLanguages: [
    { name: { en: 'German', de: 'Deutsch' }, level: { en: 'native', de: 'Muttersprache' } },
    { name: { en: 'English', de: 'Englisch' }, level: { en: 'fluent (C1)', de: 'fließend (C1)' } },
  ],
}
