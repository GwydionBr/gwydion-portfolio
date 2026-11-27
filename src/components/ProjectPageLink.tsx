import type { ReactNode } from 'react'
import { trackEvent } from '#/analytics/umami'
import { useSiteLanguage } from '#/i18n/react'
import { RouterUnstyled } from './links'

/**
 * A link to the page of the Project at `slug`, in the Site language. Every
 * link into a Project page renders this one, so each such click is counted.
 */
export function ProjectPageLink({
  slug,
  className,
  children,
}: {
  slug: string
  className?: string
  children: ReactNode
}) {
  const lang = useSiteLanguage()
  return (
    <RouterUnstyled
      to="/$lang/projects/$slug"
      params={{ lang, slug }}
      onClick={() => trackEvent({ name: 'projekt-klick', data: { projekt: slug } })}
      className={className}
    >
      {children}
    </RouterUnstyled>
  )
}
