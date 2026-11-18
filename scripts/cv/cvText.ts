import type { Localized } from '../../src/content/localized'

/**
 * What only the CV says. Everything the site already knows (name, links,
 * Career entries, skills) comes from the content data instead, so the
 * two cannot drift apart.
 */
export const cvText = {
  title: { en: 'CV', de: 'Lebenslauf' },
  headline: {
    en: ['Full-Stack Developer', 'React & TypeScript'],
    de: ['Full-Stack-Entwickler', 'React & TypeScript'],
  },
  /**
   * Whether the CV shows Gwydion's photo: customary in German applications,
   * left out of English ones (UK, US and international employers expect none).
   */
  photo: { en: false, de: true },
  /** Under the Availability headline, which comes from the Profile. */
  availabilityDetails: {
    en: ['On-site, hybrid or remote', 'Available immediately'],
    de: ['Vor Ort, hybrid oder remote', 'Ab sofort verfügbar'],
  },
  intro: {
    en: 'Self-taught full-stack developer focused on React and TypeScript. I take products from the data model to the deployed app on my own: web, mobile and desktop, offline-capable. Freelancing since 2024; since December 2025 I have been building my own product, Self-Engine.',
    de: 'Autodidaktischer Full-Stack-Entwickler mit Schwerpunkt React und TypeScript. Ich bringe Produkte allein vom Datenmodell bis zur ausgelieferten App: Web, Mobil und Desktop, offline-fähig. Seit 2024 arbeite ich freiberuflich, seit Dezember 2025 baue ich mein eigenes Produkt Self-Engine.',
  },
  sections: {
    contact: { en: 'Contact', de: 'Kontakt' },
    skills: { en: 'Skills', de: 'Kenntnisse' },
    languages: { en: 'Languages', de: 'Sprachen' },
    profile: { en: 'Profile', de: 'Profil' },
    experience: { en: 'Experience', de: 'Berufserfahrung' },
    otherWork: { en: 'Other work', de: 'Weitere Tätigkeiten' },
    projects: { en: 'Projects', de: 'Projekte' },
    education: { en: 'Education', de: 'Ausbildung' },
  },
  now: { en: 'present', de: 'heute' },
  /**
   * The development work, by organisation (in English): the Career entries listed
   * under Experience, with their highlights. Every other job goes under Other
   * work, as a single line.
   */
  experience: {
    'Self-Engine': {
      highlights: [
        {
          en: 'Offline-first productivity platform for the self-employed: time tracking, tasks, calendar, finances and habits, synced across web, macOS and iOS. Now being rebuilt as open source (AGPL), with self-hostable sync.',
          de: 'Offline-first-Produktivitätsplattform für Selbstständige: Zeiterfassung, Aufgaben, Kalender, Finanzen und Gewohnheiten, synchron über Web, macOS und iOS. Wird gerade als Open Source (AGPL) neu gebaut, mit selbst hostbarem Sync.',
        },
        {
          en: 'One monorepo, three apps: TanStack Start (web), Expo / React Native (iOS) and Electron (macOS) on a shared domain layer.',
          de: 'Ein Monorepo, drei Apps: TanStack Start (Web), Expo / React Native (iOS) und Electron (macOS) auf einer gemeinsamen Domänenschicht.',
        },
        {
          en: 'Built-in AI assistant with typed capabilities across all modules, plus an MCP server through which external AI agents work with the app’s data.',
          de: 'Eingebauter KI-Assistent mit typisierten Capabilities über alle Module, dazu ein MCP-Server, über den externe KI-Agenten mit den Daten der App arbeiten.',
        },
      ],
    },
    'Self-employed': {
      highlights: [
        {
          en: '<b>DataAnnotation:</b> AI training data, mainly programming tasks.',
          de: '<b>DataAnnotation:</b> KI-Trainingsdaten, vor allem Programmieraufgaben.',
        },
        {
          en: '<b>Tattoo Booking Portal:</b> websites for a tattoo studio and its artists, with a portal where the artists handle every booking request.',
          de: '<b>Tattoo Booking Portal:</b> Websites für ein Tattoo-Studio und seine Künstler, mit einem Portal, in dem die Künstler alle Terminanfragen bearbeiten.',
        },
        {
          en: 'One monorepo: each site with its own Sanity CMS and deployment, the portal on Supabase with a separate access area per artist.',
          de: 'Ein Monorepo: jede Website mit eigenem Sanity-CMS und Deployment, das Portal auf Supabase mit getrenntem Zugriffsbereich je Künstler.',
        },
      ],
    },
  } satisfies Record<string, { highlights: Localized<string>[] }>,
  sideProjects: [
    {
      title: 'gwydion.dev',
      period: '2026',
      text: {
        en: 'Bilingual portfolio with TanStack Start, Tailwind CSS and MDX.',
        de: 'Zweisprachiges Portfolio mit TanStack Start, Tailwind CSS und MDX.',
      },
    },
    {
      title: 'Work Manager',
      period: '2025',
      text: {
        en: 'Work and time management with Next.js and Supabase; predecessor of Self-Engine.',
        de: 'Zeit- und Arbeitsmanagement mit Next.js und Supabase; Vorgänger von Self-Engine.',
      },
    },
  ],
  courses: {
    en: 'Online courses in software development (Udemy, Zero To Mastery)',
    de: 'Online-Kurse in Softwareentwicklung (Udemy, Zero To Mastery)',
  },
  spokenLanguages: [
    { name: { en: 'German', de: 'Deutsch' }, level: { en: 'native', de: 'Muttersprache' } },
    { name: { en: 'English', de: 'Englisch' }, level: { en: 'fluent (C1)', de: 'fließend (C1)' } },
  ],
}
