import type { CareerEntrySource } from '../schema'

/**
 * Gwydion's Career entries, in any order (the content module sorts them).
 * Read them through the content module (`#/content`), never directly.
 */
export const careerEntries: CareerEntrySource[] = [
  {
    kind: 'job',
    start: '2025-12',
    end: null,
    title: { en: 'Founder & sole developer', de: 'Gründer & alleiniger Entwickler' },
    organisation: 'Self-Engine',
    summary: {
      en: 'Product, architecture, sync engine, web, desktop and mobile apps, operations.',
      de: 'Produkt, Architektur, Sync-Engine, Web-, Desktop- und Mobil-Apps, Betrieb.',
    },
  },
  {
    kind: 'freelance',
    start: '2024',
    end: null,
    title: { en: 'Freelance full-stack developer', de: 'Freiberuflicher Full-Stack-Entwickler' },
    organisation: 'Self-employed',
    summary: {
      en: 'Websites and web apps for studios and small businesses.',
      de: 'Websites und Web-Apps für Studios und kleine Unternehmen.',
    },
  },
  // PLACEHOLDER: earlier positions and education are still missing (spec #31, "real content still needed").
  {
    kind: 'job',
    start: '2021',
    end: '2024',
    title: { en: 'Earlier position (placeholder)', de: 'Frühere Station (Platzhalter)' },
    organisation: 'To be supplied',
    summary: {
      en: 'Placeholder: an earlier position goes here.',
      de: 'Platzhalter: Hier steht eine frühere Station.',
    },
    placeholder: true,
  },
  {
    kind: 'education',
    start: '2017',
    end: '2021',
    title: { en: 'Education (placeholder)', de: 'Ausbildung (Platzhalter)' },
    organisation: 'To be supplied',
    summary: {
      en: 'Placeholder: education goes here.',
      de: 'Platzhalter: Hier steht die Ausbildung.',
    },
    placeholder: true,
  },
]
