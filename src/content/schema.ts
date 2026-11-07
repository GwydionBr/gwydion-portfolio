import type { Language } from '#/i18n/language'
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

/** Everything the content module serves, as stored. */
export interface ContentSource {
  profile: ProfileSource
  posts: Post[]
}
