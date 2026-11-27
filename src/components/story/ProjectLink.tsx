import type { ReactNode } from 'react'
import { RouterAnchor } from '#/components/links'
import { useProjectPageLink } from '#/components/ProjectPageLink'

/**
 * A link inside a story to another Project's page, in the Site language
 * (`<ProjectLink slug="self-engine">Self-Engine</ProjectLink>`).
 */
export function ProjectLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <RouterAnchor {...useProjectPageLink(slug)} inherit underline="always" c="var(--ink)" fw={500}>
      {children}
    </RouterAnchor>
  )
}
