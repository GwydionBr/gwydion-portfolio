import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Link } from '@tanstack/react-router'
import { CaretLeft } from '@phosphor-icons/react'
import { useSiteLanguage } from '#/i18n/react'

/** A list view a detail view leads back to. */
export interface BackTarget {
  to: '/$lang/projects'
  /** The Back control's accessible name, for example "Back to Projects". */
  label: string
  /** What the control shows beside its arrow: the list's name. */
  text: string
}

/**
 * A view in the main pane: the location line, the view's title (its one
 * `h1`) and the "Get in touch" action, then the view's content. Every page
 * renders through it. A detail view passes `back`: on phones, where the
 * sidebar is gone, it shows a Back control to its list instead of the location line.
 */
export function View({
  title,
  location = [title],
  back,
  children,
}: {
  title: string
  /** The location line after the site's name; the title by default, empty on the Overview. */
  location?: string[]
  /** The list this detail view belongs to. */
  back?: BackTarget
  children: ReactNode
}) {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    <>
      <header className="mb-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          {back && (
            <Link
              to={back.to}
              params={{ lang }}
              aria-label={back.label}
              // It leads up to the list; the list is not the page shown.
              activeOptions={{ exact: true }}
              className="-ml-1 mb-1 inline-flex items-center gap-1 rounded-md px-1 py-0.5 font-medium text-ink hover:bg-hover md:hidden"
            >
              <CaretLeft aria-hidden className="size-4" />
              {back.text}
            </Link>
          )}
          <p className={`truncate text-xs text-subtle ${back ? 'hidden md:block' : ''}`}>
            {['gwydion.dev', ...location].join(' / ')}
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        </div>
        <Link
          to="/$lang/contact"
          params={{ lang }}
          className="shrink-0 rounded-lg bg-ink px-3 py-2 font-medium text-canvas hover:opacity-90"
        >
          {t`Get in touch`}
        </Link>
      </header>
      {children}
    </>
  )
}

/** A card standing in for a view's content until its ticket builds it. */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl rounded-2xl bg-surface p-5 text-subtle ring-1 ring-line">
      {children}
    </div>
  )
}
