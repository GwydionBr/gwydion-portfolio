import type { ReactNode } from 'react'
import { trackEvent } from '#/analytics/umami'
import { useSiteLanguage } from '#/i18n/react'
import { RouterAnchor } from './links'

/** Counts a visit to the Project at `slug`'s page, from wherever it was opened. */
export function trackProjectClick(slug: string) {
  trackEvent({ name: 'projekt-klick', data: { projekt: slug } })
}

/**
 * The link props of the page of the Project at `slug`, in the Site language,
 * with the click counted. Every link into a Project page takes them, whatever
 * it looks like.
 */
export function useProjectPageLink(slug: string) {
  const lang = useSiteLanguage()
  return {
    to: '/$lang/projects/$slug',
    params: { lang, slug },
    onClick: () => trackProjectClick(slug),
  } as const
}

/** A text link (or a row its CSS Module styles) to the page of the Project at `slug`. */
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
  return (
    <RouterAnchor {...useProjectPageLink(slug)} className={className} inherit underline={underline}>
      {children}
    </RouterAnchor>
  )
}
