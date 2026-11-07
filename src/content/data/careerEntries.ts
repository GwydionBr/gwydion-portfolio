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
    project: 'self-engine',
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
    organisation: { en: 'Self-employed', de: 'Selbstständig' },
    project: 'endstation-tattoo',
    summary: {
      en: 'Websites and web apps for studios and small businesses.',
      de: 'Websites und Web-Apps für Studios und kleine Unternehmen.',
    },
  },
  {
    kind: 'job',
    start: '2025-06',
    end: '2026-10',
    title: { en: 'Service staff (part-time)', de: 'Servicekraft (Teilzeit)' },
    organisation: 'Dávid-Ristobar, Ottobeuren',
    summary: {
      en: 'Alongside freelancing: a steady income and time among people.',
      de: 'Neben dem Freelancing: ein festes Einkommen und Zeit unter Menschen.',
    },
  },
  {
    kind: 'education',
    start: '2021',
    end: '2024',
    title: {
      en: 'Wood engineering studies (5 semesters, no degree)',
      de: 'Studium Holzingenieurwesen (5 Semester, ohne Abschluss)',
    },
    organisation: 'Hochschule für nachhaltige Entwicklung Eberswalde',
    summary: {
      en: 'First contact with programming during my studies. I left to build software full-time.',
      de: 'Im Studium kam ich zum ersten Mal mit Programmieren in Berührung. Ich habe abgebrochen, um ganz Software zu bauen.',
    },
  },
  {
    kind: 'job',
    start: '2016',
    end: '2020',
    title: { en: 'Customer service', de: 'Kundenservice' },
    organisation: 'Ticket-Center Hohenschwangau (Neuschwanstein)',
    summary: {
      en: 'Ticket sales and visitor service for Neuschwanstein Castle, interrupted by two semesters of mechanical engineering. Winters spent travelling.',
      de: 'Ticketverkauf und Besucherservice für Schloss Neuschwanstein, unterbrochen von zwei Semestern Maschinenbau. Die Winter über war ich auf Reisen.',
    },
  },
  {
    kind: 'education',
    start: '2017',
    end: '2018',
    title: {
      en: 'Mechanical engineering studies (2 semesters, no degree)',
      de: 'Studium Maschinenbau (2 Semester, ohne Abschluss)',
    },
    organisation: 'Hochschule Kempten',
    summary: {
      en: 'Two semesters of mechanical engineering, then back to the ticket centre.',
      de: 'Zwei Semester Maschinenbau, danach zurück ins Ticket-Center.',
    },
  },
  {
    kind: 'education',
    start: '2014',
    end: '2016-07',
    title: {
      en: 'Advanced technical college entrance qualification (Fachabitur), business',
      de: 'Fachabitur, Zweig Wirtschaft und Verwaltung',
    },
    organisation: 'FOS Kempten',
    summary: {
      en: 'Two years at the Fachoberschule after Realschule.',
      de: 'Zwei Jahre Fachoberschule nach der Realschule.',
    },
  },
]
