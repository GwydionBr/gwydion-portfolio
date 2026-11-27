import type { MDXComponents } from 'mdx/types'
import { Callout } from './Callout'
import { NumberTile, NumberTiles } from './NumberTiles'
import { ScreenshotGallery } from './ScreenshotGallery'

export { Callout } from './Callout'
export { NumberTile, NumberTiles } from './NumberTiles'
export { ScreenshotGallery } from './ScreenshotGallery'
export { StoryProject } from './StoryProject'

/**
 * What a Project's story (MDX) renders with: the story components it may use
 * by name without importing them (`NumberTiles`, `NumberTile`, `Callout`,
 * `ScreenshotGallery`). Render a story inside `<StoryProject slug>` for
 * Project context and themed Markdown.
 * Pass as `components` to a story.
 */
export const storyComponents: MDXComponents = {
  NumberTiles,
  NumberTile,
  Callout,
  ScreenshotGallery,
}
