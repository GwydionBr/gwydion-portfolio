import { isLanguage } from '#/i18n/language'
import type { Story, StorySource } from '../schema'

/**
 * Every Project's story, found by file name: `projects/<slug>.<language>.mdx`.
 * A file that is missing leaves a gap the content-integrity check reports.
 */
const files = import.meta.glob<Story>('./projects/*.mdx', { eager: true, import: 'default' })

export const stories: StorySource = {}
for (const [path, story] of Object.entries(files)) {
  const [, slug, language] = /\/([^/]+)\.([^./]+)\.mdx$/.exec(path) ?? []
  if (!slug || !isLanguage(language)) throw new Error(`Unexpected story file name: ${path}`)
  stories[slug] = { ...stories[slug], [language]: story }
}
