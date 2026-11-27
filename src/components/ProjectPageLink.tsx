import type { ReactNode } from 'react'
import { trackEvent } from '#/analytics/umami'
import { useSiteLanguage } from '#/i18n/react'
import { RouterAnchor } from './links'

/**
 * A link to the page of the Project at `slug`, in the Site language. Every
 * link into a Project page renders this one, so each such click is counted.
 */
export function ProjectPageLink({
  slug,
  className,
  underline = 'never',
  children,
}: {
  slug: string
  className?: string
  underline?: 'never' | 'hover'
  children: ReactNode
}) {
  const lang = useSiteLanguage()
  return (
    <RouterAnchor
      to="/$lang/projects/$slug"
      params={{ lang, slug }}
      onClick={() => trackEvent({ name: 'projekt-klick', data: { projekt: slug } })}
      className={className}
      inherit
      underline={underline}
    >
      {children}
    </RouterAnchor>
  )
}
