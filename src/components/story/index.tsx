import { Anchor } from '@mantine/core'
import type { MDXComponents } from 'mdx/types'
import { Callout } from './Callout'
import { NumberTile, NumberTiles } from './NumberTiles'
import { ScreenshotGallery } from './ScreenshotGallery'
import classes from './StoryMarkdown.module.css'

export { Callout } from './Callout'
export { NumberTile, NumberTiles } from './NumberTiles'
export { ScreenshotGallery } from './ScreenshotGallery'
export { StoryProject } from './StoryProject'

/**
 * What a Project's story (MDX) renders with: the story components it may use
 * by name without importing them (`NumberTiles`, `NumberTile`, `Callout`,
 * `ScreenshotGallery`), and the site's styling for plain Markdown. Render a
 * story inside `<StoryProject slug>`, which tells them whose story it is.
 * Pass as `components` to a story.
 */
export const storyComponents: MDXComponents = {
  NumberTiles,
  NumberTile,
  Callout,
  ScreenshotGallery,
  h2: (props) => <h2 className={classes.h2} {...props} />,
  h3: (props) => <h3 className={classes.h3} {...props} />,
  p: (props) => <p className={classes.paragraph} {...props} />,
  ul: (props) => <ul className={classes.bullets} {...props} />,
  ol: (props) => <ol className={classes.numbered} {...props} />,
  a: (props) => <Anchor className={classes.link} {...props} />,
  strong: (props) => <strong className={classes.strong} {...props} />,
  code: (props) => <code className={classes.code} {...props} />,
}
