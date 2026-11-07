import { createContext, use, type ReactNode } from 'react'

const StoryProjectContext = createContext<string | null>(null)

/** Tells the story components inside whose story they are in: the Project at `slug`. */
export function StoryProject({ slug, children }: { slug: string; children: ReactNode }) {
  return <StoryProjectContext value={slug}>{children}</StoryProjectContext>
}

/** The slug of the Project whose story is being rendered. */
export function useStoryProject(): string {
  const slug = use(StoryProjectContext)
  if (slug === null) throw new Error('A story component is rendered outside <StoryProject>.')
  return slug
}
