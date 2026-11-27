import type { ProfileSource } from '../schema'

/** Gwydion's Profile. Read it through the content module (`#/content`), never directly. */
export const profile: ProfileSource = {
  name: 'Gwydion Braunsdorf',
  role: { en: 'Full-stack developer', de: 'Full-Stack-Entwickler' },
  location: { en: 'Schwangau, Germany', de: 'Schwangau, Deutschland' },
  pitch: {
    en: 'I build complete products on my own, including the data model, sync, interface and operations. My current one is Self-Engine, an offline-first productivity platform for web, macOS and iOS.',
    de: 'Ich baue komplette Produkte allein, mit Datenmodell, Sync, Oberfläche und Betrieb. Mein aktuelles ist Self-Engine, eine Offline-first-Produktivitätsplattform für Web, macOS und iOS.',
  },
  availability: {
    headline: { en: 'Open to full-time roles', de: 'Offen für Festanstellungen' },
    freelance: {
      en: 'Also available for selected freelance projects',
      de: 'Auch offen für ausgewählte Freelance-Projekte',
    },
  },
  now: [
    {
      label: { en: 'Building', de: 'Bauen' },
      text: {
        en: 'Self-Engine, which I am rebuilding as an open-source project, and the websites and booking portal of a tattoo studio.',
        de: 'Self-Engine, das ich gerade als Open-Source-Projekt neu aufbaue, und die Websites und das Anfragen-Portal eines Tattoo-Studios.',
      },
    },
    {
      label: { en: 'Learning', de: 'Lernen' },
      text: { en: 'Systems design and product ethics.', de: 'Systemdesign und Produktethik.' },
    },
    {
      label: { en: 'Training', de: 'Training' },
      text: { en: 'Strength and endurance.', de: 'Kraft und Ausdauer.' },
    },
  ],
  skills: [
    { label: { en: 'Languages', de: 'Sprachen' }, items: ['TypeScript', 'JavaScript', 'SQL'] },
    {
      label: { en: 'Frontend', de: 'Frontend' },
      items: [
        'React',
        'Next.js',
        'TanStack Start, Router & Query',
        'Tailwind CSS',
        'Mantine',
        'Lingui',
      ],
    },
    {
      label: { en: 'Mobile & desktop', de: 'Mobil & Desktop' },
      items: ['Expo', 'React Native', 'Electron'],
    },
    {
      label: { en: 'Backend & data', de: 'Backend & Daten' },
      items: ['Supabase', 'Postgres', 'SQLite', 'PowerSync', 'Kysely', 'oRPC', 'Zod', 'Sanity'],
    },
    {
      label: { en: 'AI', de: 'KI' },
      items: [
        { en: 'MCP servers', de: 'MCP-Server' },
        'TanStack AI',
        'Claude Code',
        'Codex',
        'Grok',
      ],
    },
    {
      label: { en: 'Testing', de: 'Testen' },
      items: ['Vitest', 'Playwright', 'Testing Library', 'Storybook'],
    },
    {
      label: { en: 'Tooling', de: 'Werkzeuge' },
      items: [
        'Vite+',
        'Oxlint',
        'Oxfmt',
        'Bun',
        'pnpm',
        'Turborepo',
        'Git',
        'GitHub Actions',
        'Docker',
        'Sentry',
        'Vercel',
      ],
    },
  ],
  links: [
    { kind: 'email', href: 'mailto:hello@gwydion.dev' },
    { kind: 'github', href: 'https://github.com/GwydionBr' },
    { kind: 'linkedin', href: 'https://www.linkedin.com/in/gwydion-braunsdorf-860027399/' },
  ],
}
