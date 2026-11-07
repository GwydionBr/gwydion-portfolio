import type { Language } from '#/i18n/language'
import { posts } from './data/posts'
import { profile } from './data/profile'
import { projects } from './data/projects'
import { stories } from './data/stories'
import { inLanguage } from './localized'
import type { ContentSource, Post, Profile, Project, ProjectWithStory } from './schema'

export type { Localized } from './localized'
export type {
  ContentSource,
  Post,
  Profile,
  ProfileLink,
  ProfileSource,
  Project,
  ProjectKind,
  ProjectSource,
  ProjectWithStory,
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
  /** Every Post, newest first; none yet, which hides Writing. */
  getPosts(): readonly Post[]
}

/** The content module over `source`; tests pass fixtures, the site passes its content files. */
export function createContent(source: ContentSource): Content {
  const newestFirst = [...source.posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  const inOrder = [...source.projects].sort((a, b) => a.order - b.order)
  return {
    getProfile: (language) => inLanguage(source.profile, language),
    getProjects: (language, { featured, pinned } = {}) =>
      inOrder
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
    getPosts: () => newestFirst,
  }
}

/** The site's content: the content files in `./data`. */
export const siteContent = createContent({ profile, projects, stories, posts })
