import * as m from '#/generated/paraglide/messages'

/** Self-Engine's stack, by the layer each tool serves. */
export const SELF_ENGINE_TECH = [
  {
    title: m.cs_tech_web,
    items: [
      'TanStack Start',
      'TanStack Router',
      'TanStack DB',
      'TanStack Query',
      'Mantine',
      'Paraglide',
    ],
  },
  {
    title: m.cs_tech_mobile,
    items: ['Expo', 'React Native', 'Expo Router', 'HeroUI Native', 'EAS Updates'],
  },
  { title: m.cs_tech_desktop, items: ['Electron', 'electron-builder', 'electron-updater'] },
  {
    title: m.cs_tech_data,
    items: ['SQLite', 'PowerSync', 'Supabase', 'Postgres', 'Clerk', 'Zod'],
  },
  { title: m.cs_tech_ai, items: ['TanStack AI', 'OpenRouter', 'Model Context Protocol'] },
  {
    title: m.cs_tech_quality,
    items: ['TypeScript', 'Bun', 'Turborepo', 'Vitest', 'pgTAP', 'Oxlint', 'Knip', 'Sentry'],
  },
] as const
