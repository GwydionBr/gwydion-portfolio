import { Typography } from '@mantine/core'
import { createContext, use, type ReactNode } from 'react'

const StoryProjectContext = createContext<string | null>(null)

/** Provides Project context to story components and applies the site's Markdown theme. */
export function StoryProject({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <StoryProjectContext value={slug}>
      <Typography>{children}</Typography>
    </StoryProjectContext>
  )
}

/** The slug of the Project whose story is being rendered. */
export function useStoryProject(): string {
  const slug = use(StoryProjectContext)
  if (slug === null) throw new Error('A story component is rendered outside <StoryProject>.')
  return slug
}
