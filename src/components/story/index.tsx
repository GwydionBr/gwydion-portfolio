import type { MDXComponents } from 'mdx/types'
import { Callout } from './Callout'
import { NumberTile, NumberTiles } from './NumberTiles'
import { ProjectLink } from './ProjectLink'
import { ScreenshotGallery } from './ScreenshotGallery'
import { Step, Steps } from './Steps'
import { storyTableParts } from './StoryTable'

export { Callout } from './Callout'
export { NumberTile, NumberTiles } from './NumberTiles'
export { ProjectLink } from './ProjectLink'
export { ScreenshotGallery } from './ScreenshotGallery'
export { Step, Steps } from './Steps'
export { StoryProject } from './StoryProject'

/**
 * What a Project's story (MDX) renders with: the story components it may use
 * by name without importing them (`NumberTiles`, `NumberTile`, `Callout`,
 * `ScreenshotGallery`, `Steps`, `Step`, `ProjectLink`), and the site's table
 * for a Markdown table. Render a story inside `<StoryProject slug>` for Project context and
 * themed Markdown.
 * Pass as `components` to a story.
 */
export const storyComponents: MDXComponents = {
  NumberTiles,
  NumberTile,
  Callout,
  ScreenshotGallery,
  Steps,
  Step,
  ProjectLink,
  ...storyTableParts,
}
