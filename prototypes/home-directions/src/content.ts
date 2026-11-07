// PROTOTYPE, throw away. Shared sample content so the variants differ in design, not in data.
// Entries marked `placeholder: true` are invented and only stand in for real content.

export const person = {
  name: 'Gwydion Braunsdorf',
  first: 'Gwydion',
  role: 'Full-stack developer',
  location: 'Germany · remote',
  pitch:
    'I build software end to end, from the data model to the last pixel. Most recently Self-Engine: an offline-first productivity platform for web, macOS and iOS that I design, build and run on my own.',
  status: 'Open to full-time roles',
  freelance: 'Also available for selected freelance projects',
  email: 'hello@gwydion.dev',
  links: [
    { label: 'GitHub', href: 'https://github.com/GwydionBr' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Email', href: 'mailto:hello@gwydion.dev' },
  ],
}

export type Project = {
  slug: string
  title: string
  year: string
  kind: string
  summary: string
  stack: string[]
  stats?: { value: string; label: string }[]
  color: string
}

export const projects: Project[] = [
  {
    slug: 'self-engine',
    title: 'Self-Engine',
    year: '2025–now',
    kind: 'Own product',
    summary:
      'Time tracking, tasks, calendar, finance and habits on one data model. Offline-first sync across web, macOS and iOS.',
    stack: ['TypeScript', 'React', 'Expo', 'Postgres', 'PowerSync'],
    stats: [
      { value: '2,100+', label: 'commits' },
      { value: '79', label: 'releases' },
      { value: '~5,900', label: 'tests' },
    ],
    color: '#2f5d50',
  },
  {
    slug: 'endstation-tattoo',
    title: 'Endstation Tattoo',
    year: '2026',
    kind: 'Client work',
    summary:
      'Studio website with artist portfolios and booking requests, editable by the studio through Sanity.',
    stack: ['TanStack Start', 'Sanity', 'Vercel'],
    color: '#8a3b2e',
  },
  {
    slug: 'kawana',
    title: 'KaWAna',
    year: '2026',
    kind: 'Client work',
    summary: 'Website for women’s circles and cooking classes, with sign-up forms and a CMS.',
    stack: ['TanStack Start', 'Sanity', 'Resend'],
    color: '#a07a2c',
  },
  {
    slug: 'portfolio',
    title: 'This site',
    year: '2026',
    kind: 'Open source',
    summary: 'Bilingual, server-rendered portfolio with a headless CMS for writing.',
    stack: ['TanStack Start', 'Sanity', 'Lingui'],
    color: '#3b4a7a',
  },
]

export type Experience = {
  period: string
  title: string
  org: string
  summary: string
  placeholder?: boolean
}

export const experience: Experience[] = [
  {
    period: '2025–now',
    title: 'Founder & sole developer',
    org: 'Self-Engine',
    summary: 'Product, architecture, sync engine, web, desktop and mobile apps, operations.',
  },
  {
    period: '2024–now',
    title: 'Freelance full-stack developer',
    org: 'Self-employed',
    summary: 'Websites and web apps for studios and small businesses.',
  },
  {
    period: '20XX–20XX',
    title: 'Previous role',
    org: 'Company',
    summary: 'Placeholder: your earlier positions or education go here.',
    placeholder: true,
  },
]

export type Post = {
  title: string
  date: string
  lang: 'en' | 'de'
  minutes: number
  placeholder?: boolean
}

export const posts: Post[] = [
  {
    title: 'What 38 ADRs taught me about building alone',
    date: '2026-10-21',
    lang: 'en',
    minutes: 8,
    placeholder: true,
  },
  {
    title: 'Offline-first ist ein Datenmodell, kein Feature',
    date: '2026-09-30',
    lang: 'de',
    minutes: 12,
    placeholder: true,
  },
  {
    title: 'Shipping 79 releases in four months',
    date: '2026-08-14',
    lang: 'en',
    minutes: 6,
    placeholder: true,
  },
]

export const skills = [
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
]

export const now = [
  { label: 'Building', text: 'Self-Engine: new features across web, mobile and desktop.' },
  { label: 'Learning', text: 'Systems design and product ethics.' },
  { label: 'Training', text: 'Strength and endurance.' },
]

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
