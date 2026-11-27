import type { MDXContent } from 'mdx/types'
import { isLanguage } from '#/i18n/language'
import type { StorySource } from '../schema'
import type { StorySection } from '../storySections'

/**
 * Every Project's story, found by file name: `projects/<slug>.<language>.mdx`.
 * A file that is missing leaves a gap the content-integrity check reports.
 * Each module exports its content and its sections (`remarkStorySections`).
 */
const files = import.meta.glob<{ default: MDXContent; sections: StorySection[] }>(
  './projects/*.mdx',
  { eager: true },
)

export const stories: StorySource = {}
for (const [path, story] of Object.entries(files)) {
  const [, slug, language] = /\/([^/]+)\.([^./]+)\.mdx$/.exec(path) ?? []
  if (!slug || !isLanguage(language)) throw new Error(`Unexpected story file name: ${path}`)
  stories[slug] = {
    ...stories[slug],
    [language]: { Content: story.default, sections: story.sections },
  }
}
