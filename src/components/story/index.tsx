import type { MDXComponents } from 'mdx/types'
import { Callout } from './Callout'
import { NumberTile, NumberTiles } from './NumberTiles'

export { Callout } from './Callout'
export { NumberTile, NumberTiles } from './NumberTiles'

/**
 * What a Project's story (MDX) renders with: the story components it may use
 * by name without importing them (`NumberTiles`, `NumberTile`, `Callout`),
 * and the site's styling for plain Markdown. Pass as `components` to a story.
 */
export const storyComponents: MDXComponents = {
  NumberTiles,
  NumberTile,
  Callout,
  h2: (props) => (
    <h2 className="mt-8 text-base font-semibold tracking-tight text-ink first:mt-0" {...props} />
  ),
  h3: (props) => <h3 className="mt-6 font-semibold text-ink" {...props} />,
  p: (props) => <p className="mt-3 leading-relaxed first:mt-0" {...props} />,
  ul: (props) => <ul className="mt-3 list-disc space-y-1 pl-5" {...props} />,
  ol: (props) => <ol className="mt-3 list-decimal space-y-1 pl-5" {...props} />,
  a: (props) => <a className="font-medium text-ink underline underline-offset-2" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  code: (props) => <code className="rounded bg-selected px-1 py-0.5 text-[0.9em]" {...props} />,
}
