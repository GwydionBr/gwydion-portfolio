import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Link } from '@tanstack/react-router'
import { useSiteLanguage } from '#/i18n/react'

/**
 * A view in the main pane: the location line, the view's title (its one
 * `h1`) and the "Get in touch" action, then the view's content. Every page
 * renders through it.
 */
export function View({
  title,
  location = [title],
  children,
}: {
  title: string
  /** The location line after the site's name; the title by default, empty on the Overview. */
  location?: string[]
  children: ReactNode
}) {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    <>
      <header className="mb-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-xs text-subtle">{['gwydion.dev', ...location].join(' / ')}</p>
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
