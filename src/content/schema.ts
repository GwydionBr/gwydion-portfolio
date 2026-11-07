import type { MDXContent } from 'mdx/types'
import type { Language } from '#/i18n/language'
import type { Theme } from '#/theme/theme'
import type { InLanguage, Localized } from './localized'

/**
 * The content shapes, as stored in the content files. Each could map one to
 * one onto a Sanity document type later (ADR 0004).
 */

/** How to reach Gwydion. */
export interface ProfileLink {
  kind: 'email' | 'github' | 'linkedin'
  href: string
  /** Stands in for a real value that is still missing; shown dimmed, never as a working link. */
  placeholder?: true
}

/** The single set of facts about Gwydion himself (glossary: Profile). */
export interface ProfileSource {
  name: string
  role: Localized<string>
  location: Localized<string>
  pitch: Localized<string>
  /** What he is open to (glossary: Availability); `freelance` is null when he takes no freelance work. */
  availability: { headline: Localized<string>; freelance: Localized<string> | null }
  /** What he is doing now. */
  now: { label: Localized<string>; text: Localized<string> }[]
  skills: string[]
  links: ProfileLink[]
}

/** The Profile in one Site language, as pages receive it. */
export type Profile = InLanguage<ProfileSource>

/**
 * A piece of Gwydion's writing (glossary: Post). Not built yet: no Post is
 * written and no source is chosen (ADR 0004). This is the least the shell
 * needs to show Writing; the real type comes with the first Post.
 */
export interface Post {
  slug: string
  /** In the Post language: a Post is never translated. */
  title: string
  /** The one language the Post is written in (glossary: Post language). */
  language: Language
  /** ISO date, `YYYY-MM-DD`. */
  publishedAt: string
}

/** What kind of work a Project is. */
export type ProjectKind = 'own-product' | 'client-work' | 'open-source'

/** A piece of Gwydion's work presented as evidence (glossary: Project), without its story. */
export interface ProjectSource {
  /** Its address: `/$lang/projects/$slug`. Unique. */
  slug: string
  title: string
  kind: ProjectKind
  /** When he worked on it, as shown: `"2026"`, `"2025–now"`. */
  years: string
  /** One line, for lists. */
  summary: Localized<string>
  stack: string[]
  /** Its numbers, if any; Self-Engine's also become Overview tiles. */
  stats?: { value: string; label: Localized<string> }[]
  /** Shown on the Overview. */
  featured: boolean
  /** Shown in the sidebar. */
  pinned: boolean
  /** Position in every list, ascending. */
  order: number
  /** Its colour (a CSS colour), for its swatch. */
  accent: string
}

/** A Project in one Site language, as lists receive it. */
export type Project = InLanguage<ProjectSource>

/**
 * A Project's story: one MDX document, rendered with the story components
 * (`#/components/story`) passed as `components`.
 */
export type Story = MDXContent

/**
 * Every Project's story, by slug, then by Site language. Stories are MDX
 * files (`data/projects/<slug>.<language>.mdx`), so one can be missing; the
 * content-integrity check reports it.
 */
export type StorySource = Partial<Record<string, Partial<Record<Language, Story>>>>

/** A Project with its story in one Site language, as its page receives it. */
export interface ProjectWithStory extends Project {
  /** Undefined only when the story is missing, which the content-integrity check reports. */
  story: Story | undefined
}

/**
 * One screenshot of a Project's app, as stored: which view it shows, its
 * size, and the texts that go with it. Its image files live elsewhere (for
 * Self-Engine: Vercel Blob, captured by the Self-Engine repo); the set's
 * `urls` say where.
 */
export interface ScreenshotSource {
  /** The view's name in the file names (`<view>-<language>-<theme>.webp`). */
  view: string
  /** CSS-pixel size: a whole app window, or a close-up of one element. */
  size: { width: number; height: number }
  /** A short title, shown under the image and in the enlarged view. */
  caption: Localized<string>
  /** What the image shows, for visitors who cannot see it. */
  alt: Localized<string>
}

/**
 * A Project's screenshots, in gallery order, and the URL of each image file
 * by file name. `urls` is written by `bun run screenshots:sync`, never by hand.
 */
export interface ScreenshotSetSource {
  shots: ScreenshotSource[]
  urls: Readonly<Partial<Record<string, string>>>
}

/** Every Project's screenshots, by slug; most Projects have none. */
export type ScreenshotsSource = Partial<Record<string, ScreenshotSetSource>>

/** One image file of a screenshot at both resolutions: `src` is the 2× file. */
export interface ScreenshotImage {
  src: string
  /** The 1× and the 2× file, by width. */
  srcSet: string
}

/** A screenshot in one Site language, with its image in each theme. */
export interface Screenshot {
  view: string
  width: number
  height: number
  caption: string
  alt: string
  /** Undefined only when a file's URL is missing, which the content-integrity check reports. */
  images: Record<Theme, ScreenshotImage | undefined>
}

/**
 * A month (`YYYY-MM`) or, when the month does not matter, a year (`YYYY`).
 * Career entry periods use it.
 */
export type CareerDate = string

/** One stage of Gwydion's path (glossary: Career entry). */
export interface CareerEntrySource {
  kind: 'job' | 'freelance' | 'education'
  start: CareerDate
  /** `null` while the entry is ongoing. */
  end: CareerDate | null
  title: Localized<string>
  organisation: string
  summary: Localized<string>
  /** Stands in for an entry Gwydion has not supplied yet; shown dimmed. */
  placeholder?: true
}

/** A Career entry in one Site language, as pages receive it. */
export type CareerEntry = InLanguage<CareerEntrySource>

/**
 * One CV file (glossary: CV): a PDF under `public/`, written in `language`.
 * A Site language without its own CV is offered another one.
 */
export interface CvFile {
  language: Language
  /** The asset's URL path, for example `/cv/gwydion-braunsdorf-cv-en.pdf`. */
  href: string
}

/** The CV a Site language offers: the file to download and the language it is written in. */
export type Cv = CvFile

/** Everything the content module serves, as stored. */
export interface ContentSource {
  profile: ProfileSource
  projects: ProjectSource[]
  stories: StorySource
  screenshots: ScreenshotsSource
  /** In any order; the content module sorts them newest first. */
  careerEntries: CareerEntrySource[]
  /** At least one; at most one per Site language. */
  cv: CvFile[]
  posts: Post[]
}
