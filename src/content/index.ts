import type { Language } from '#/i18n/language'
import { posts } from './data/posts'
import { profile } from './data/profile'
import { inLanguage } from './localized'
import type { ContentSource, Post, Profile } from './schema'

export type { Localized } from './localized'
export type { ContentSource, Post, Profile, ProfileLink, ProfileSource } from './schema'

/**
 * The content module (ADR 0004): the only way pages and components read
 * content. Every getter answers in one Site language; nothing outside this
 * module sees the stored, bilingual shapes. Read it in React through
 * `useContent()` (`#/content/react`), elsewhere from the router context.
 */
export interface Content {
  /** The Profile in `language`. */
  getProfile(language: Language): Profile
  /** Every Post, newest first; none yet, which hides Writing. */
  getPosts(): readonly Post[]
}

/** The content module over `source`; tests pass fixtures, the site passes its content files. */
export function createContent(source: ContentSource): Content {
  const newestFirst = [...source.posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  return {
    getProfile: (language) => inLanguage(source.profile, language),
    getPosts: () => newestFirst,
  }
}

/** The site's content: the content files in `./data`. */
export const siteContent = createContent({ profile, posts })
