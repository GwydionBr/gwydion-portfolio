import type { ProfileSource } from '../schema'

/** Gwydion's Profile. Read it through the content module (`#/content`), never directly. */
export const profile: ProfileSource = {
  name: 'Gwydion Braunsdorf',
  role: { en: 'Full-stack developer', de: 'Full-Stack-Entwickler' },
  location: { en: 'Germany · remote', de: 'Deutschland · remote' },
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
        en: 'Self-Engine, which now has a paid Pro plan, and the new Endstation Tattoo website, which launches soon.',
        de: 'Self-Engine, das jetzt einen bezahlten Pro-Tarif hat, und die neue Website von Endstation Tattoo, die bald online geht.',
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
    { kind: 'linkedin', href: 'https://www.linkedin.com/in/gwydion-braunsdorf-860027399/' },
  ],
}
