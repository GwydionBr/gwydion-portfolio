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
  /** His skills, in groups ("Frontend": React, …); the site and the CV both list exactly these. */
  skills: SkillGroupSource[]
  links: ProfileLink[]
}

/** Skills that belong together, under a label; an item is localized only where its name differs. */
export interface SkillGroupSource {
  label: Localized<string>
  items: (string | Localized<string>)[]
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

/** A month (`YYYY-MM`) or, when the month does not matter, a year (`YYYY`). */
export type PeriodDate = string

/**
 * When something happened: Career entries and Projects. Stored without
 * words, so each Site language shows it in its own words ("2025–now",
 * "2025–heute"). A single year is `start` and `end` the same.
 */
export interface Period {
  start: PeriodDate
  /** `null` while it is ongoing. */
  end: PeriodDate | null
}

/** What kind of work a Project is. */
export type ProjectKind = 'own-product' | 'client-work' | 'open-source'

/** A piece of Gwydion's work presented as evidence (glossary: Project), without its story. */
export interface ProjectSource {
  /** Its address: `/$lang/projects/$slug`. Unique. */
  slug: string
  title: string
  kind: ProjectKind
  /** When he worked on it. */
  period: Period
  /** One line, for lists. */
  summary: Localized<string>
  /** What Gwydion did on it ("Sole developer: design, build, operations"). */
  role: Localized<string>
  /** Where it stands now ("Live, commercial", "Launch 2026"). */
  status: Localized<string>
  /** Where to see it: the running product, and the source code when it is public. */
  links: ProjectLinks
  stack: string[]
  /** Its numbers, if any; shown on its page and its Overview card. */
  stats?: ProjectStatSource[]
  /** Shown on the Overview and in the share image. */
  featured: boolean
  /** Position in every list, ascending. */
  order: number
  /** Its colour (a CSS colour), for its swatch. */
  accent: string
}

/**
 * One of a Project's numbers, stored as a number so each Site language writes
 * it its own way ("2,200", "2.200").
 */
export interface ProjectStatSource {
  value: number
  /** Exact unless it says otherwise: "2,200+" (at least), "~2,200" (about). */
  precision?: 'at-least' | 'about'
  label: Localized<string>
}

/** One of a Project's numbers in one Site language, written out. */
export interface ProjectStat {
  value: string
  label: string
}

/** Where a Project can be seen; each left out when there is none. */
export interface ProjectLinks {
  /** The running website or product. */
  live?: string
  /** The public source code. */
  source?: string
}

/** A Project in one Site language, as lists receive it. */
export type Project = Omit<InLanguage<ProjectSource>, 'stats'> & { stats?: ProjectStat[] }

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

/** One stage of Gwydion's path (glossary: Career entry). */
export interface CareerEntrySource extends Period {
  kind: 'job' | 'freelance' | 'education'
  title: Localized<string>
  /** Where it took place; localized only where the name itself differs ("Self-employed"). */
  organisation: string | Localized<string>
  summary: Localized<string>
  /** The slug of the Project this stage was about, if any; the entry links to its page. */
  project?: string
  /** Stands in for an entry Gwydion has not supplied yet; shown dimmed. */
  placeholder?: true
}

/** A Career entry in one Site language, as pages receive it. */
export type CareerEntry = InLanguage<CareerEntrySource>

/**
 * One CV file (glossary: CV): a PDF under `public/`, written in `language`.
 * A Site language without its own CV is offered another one, so `language`
 * also says which one a Site language offers.
 */
export interface CvFile {
  language: Language
  /** The asset's URL path, for example `/cv/gwydion-braunsdorf-cv-en.pdf`. */
  href: string
}

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
