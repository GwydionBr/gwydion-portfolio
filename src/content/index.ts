import { BASE_LANGUAGE, type Language } from '#/i18n/language'
import { newestFirst } from './career'
import { careerEntries } from './data/careerEntries'
import { cv } from './data/cv'
import { posts } from './data/posts'
import { profile } from './data/profile'
import { inLanguage } from './localized'
import type { CareerEntry, ContentSource, Cv, Post, Profile } from './schema'

export type { Localized } from './localized'
export type {
  CareerDate,
  CareerEntry,
  CareerEntrySource,
  ContentSource,
  Cv,
  CvFile,
  Post,
  Profile,
  ProfileLink,
  ProfileSource,
} from './schema'

/**
 * The content module (ADR 0004): the only way pages and components read
 * content. Every getter answers in one Site language; nothing outside this
 * module sees the stored, bilingual shapes. Read it in React through
 * `useContent()` (`#/content/react`), elsewhere from the router context.
 */
export interface Content {
  /** The Profile in `language`. */
  getProfile(language: Language): Profile
  /** Every Career entry in `language`, newest first. */
  getCareerEntries(language: Language): CareerEntry[]
  /**
   * The CV offered in `language`: its own when one exists, otherwise the one in
   * the Base language, otherwise any. Its `language` says which it is.
   */
  getCv(language: Language): Cv
  /** Every Post, newest first; none yet, which hides Writing. */
  getPosts(): readonly Post[]
}

/** The content module over `source`; tests pass fixtures, the site passes its content files. */
export function createContent(source: ContentSource): Content {
  const posts = [...source.posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  const careerEntries = [...source.careerEntries].sort(newestFirst)
  const cvIn = (language: Language) =>
    source.cv.find((file) => file.language === language) ??
    source.cv.find((file) => file.language === BASE_LANGUAGE) ??
    source.cv[0]
  return {
    getProfile: (language) => inLanguage(source.profile, language),
    getCareerEntries: (language) => inLanguage(careerEntries, language),
    getCv: (language) => {
      const file = cvIn(language)
      if (!file) throw new Error('The content has no CV; it needs at least one CV file.')
      return file
    },
    getPosts: () => posts,
  }
}

/** The site's content: the content files in `./data`. */
export const siteContent = createContent({ profile, careerEntries, cv, posts })
