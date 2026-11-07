import type { ProfileSource } from '../schema'

/** Gwydion's Profile. Read it through the content module (`#/content`), never directly. */
export const profile: ProfileSource = {
  name: 'Gwydion Braunsdorf',
  role: { en: 'Full-stack developer', de: 'Full-Stack-Entwickler' },
  location: { en: 'Germany · remote', de: 'Deutschland · remote' },
  pitch: {
    en: 'I build software end to end, from the data model to the last pixel. Most recently Self-Engine: an offline-first productivity platform for web, macOS and iOS that I design, build and run on my own.',
    de: 'Ich baue Software von Anfang bis Ende, vom Datenmodell bis zum letzten Pixel. Zuletzt Self-Engine: eine Offline-first-Produktivitätsplattform für Web, macOS und iOS, die ich allein entwerfe, entwickle und betreibe.',
  },
  availability: {
    headline: { en: 'Open to full-time roles', de: 'Offen für Festanstellungen' },
    freelance: {
      en: 'Also available for selected freelance projects',
      de: 'Außerdem verfügbar für ausgewählte freiberufliche Projekte',
    },
  },
  now: [
    {
      label: { en: 'Building', de: 'Bauen' },
      text: {
        en: 'Self-Engine: new features across web, mobile and desktop.',
        de: 'Self-Engine: neue Funktionen für Web, Mobil und Desktop.',
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
    'TypeScript',
    'React',
    'TanStack',
    'React Native / Expo',
    'Node & Bun',
    'Postgres',
    'Supabase',
    'Offline sync',
    'Sanity',
    'Testing',
    'CI/CD',
    'Product design',
  ],
  links: [
    { kind: 'email', href: 'mailto:hello@gwydion.dev' },
    { kind: 'github', href: 'https://github.com/GwydionBr' },
    // PLACEHOLDER: the LinkedIn URL is still missing (spec #31, "real content still needed").
    { kind: 'linkedin', href: 'https://www.linkedin.com/', placeholder: true },
  ],
}
