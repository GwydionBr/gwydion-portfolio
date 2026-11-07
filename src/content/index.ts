import { BASE_LANGUAGE, type Language } from '#/i18n/language'
import { newestFirst } from './career'
import { careerEntries } from './data/careerEntries'
import { cv } from './data/cv'
import { posts } from './data/posts'
import { profile } from './data/profile'
import { projects } from './data/projects'
import { screenshots } from './data/screenshots'
import { stories } from './data/stories'
import { inLanguage } from './localized'
import { screenshotsIn } from './screenshots'
import type {
  CareerEntry,
  ContentSource,
  CvFile,
  Post,
  Profile,
  Project,
  ProjectWithStory,
  Screenshot,
} from './schema'

export type { Localized } from './localized'
export type {
  CareerDate,
  CareerEntry,
  CareerEntrySource,
  ContentSource,
  CvFile,
  Post,
  Profile,
  ProfileLink,
  ProfileSource,
  Project,
  ProjectKind,
  ProjectSource,
  ProjectWithStory,
  Screenshot,
  ScreenshotImage,
  ScreenshotSetSource,
  ScreenshotSource,
  ScreenshotsSource,
  Story,
  StorySource,
} from './schema'

/** The slug of Self-Engine, the Project whose numbers the Overview shows. */
export const SELF_ENGINE_SLUG = 'self-engine'

/** Which Projects `getProjects` returns; every Project by default. */
export interface ProjectFilter {
  featured?: boolean
  pinned?: boolean
}

/**
 * The content module (ADR 0004): the only way pages and components read
 * content. Every getter answers in one Site language; nothing outside this
 * module sees the stored, bilingual shapes. Read it in React through
 * `useContent()` (`#/content/react`), elsewhere from the router context.
 */
export interface Content {
  /** The Profile in `language`. */
  getProfile(language: Language): Profile
  /** The Projects matching `filter`, in their configured order, in `language`. */
  getProjects(language: Language, filter?: ProjectFilter): Project[]
  /** The Project at `slug` with its story in `language`, or undefined when there is none. */
  getProject(slug: string, language: Language): ProjectWithStory | undefined
  /**
   * The screenshots of the Project at `slug`, in gallery order, with their
   * texts in `language` and their image in each theme; none for most Projects.
   */
  getScreenshots(slug: string, language: Language): Screenshot[]
  /** Every Career entry in `language`, newest first. */
  getCareerEntries(language: Language): CareerEntry[]
  /**
   * The CV offered in `language`: its own when one exists, otherwise the one in
   * the Base language, otherwise any. Its `language` says which it is.
   */
  getCv(language: Language): CvFile
  /** Every Post, newest first; none yet, which hides Writing. */
  getPosts(): readonly Post[]
  /**
   * Whether Writing exists: at least one Post. Without it there is no Writing
   * page, navigation entry, sitemap entry or latest-Posts tile (spec #31).
   */
  hasWriting(): boolean
}

/** The content module over `source`; tests pass fixtures, the site passes its content files. */
export function createContent(source: ContentSource): Content {
  const posts = [...source.posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  const careerEntries = [...source.careerEntries].sort(newestFirst)
  const cvIn = (language: Language) =>
    source.cv.find((file) => file.language === language) ??
    source.cv.find((file) => file.language === BASE_LANGUAGE) ??
    source.cv[0]
  const projectsInOrder = [...source.projects].sort((a, b) => a.order - b.order)
  return {
    getProfile: (language) => inLanguage(source.profile, language),
    getProjects: (language, { featured, pinned } = {}) =>
      projectsInOrder
        .filter(
          (project) =>
            (featured === undefined || project.featured === featured) &&
            (pinned === undefined || project.pinned === pinned),
        )
        .map((project) => inLanguage(project, language)),
    getProject: (slug, language) => {
      const project = source.projects.find((candidate) => candidate.slug === slug)
      if (!project) return undefined
      return { ...inLanguage(project, language), story: source.stories[slug]?.[language] }
    },
    getScreenshots: (slug, language) => {
      const set = source.screenshots[slug]
      return set ? screenshotsIn(set, language) : []
    },
    getCareerEntries: (language) => inLanguage(careerEntries, language),
    getCv: (language) => {
      const file = cvIn(language)
      if (!file) throw new Error('The content has no CV; it needs at least one CV file.')
      return file
    },
    getPosts: () => posts,
    hasWriting: () => posts.length > 0,
  }
}

/** The site's content: the content files in `./data`. */
export const siteContent = createContent({
  profile,
  projects,
  stories,
  screenshots,
  careerEntries,
  cv,
  posts,
})
