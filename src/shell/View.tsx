import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Link } from '@tanstack/react-router'
import { CaretLeft } from '@phosphor-icons/react'
import { BUTTON_STYLES } from '#/components/buttonStyles'
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
 * `h1`) and the view's action, then the view's content. Every page renders
 * through it.
 *
 * - `action` sits beside the title: "Get in touch" unless the view passes its
 *   own, or `null` for none. On phones a full-width action wraps below the title.
 * - `hero` turns the header into the Overview's hero: a larger title with the
 *   hero's content (pitch, calls to action) under it, and no action beside it.
 * - `back` (a detail view): on phones, where the sidebar is gone, a Back
 *   control to its list instead of the location line.
 */
export function View({
  title,
  location = [title],
  back,
  action,
  hero,
  children,
}: {
  title: string
  /** The location line after the site's name; the title by default, empty on the Overview. */
  location?: string[]
  /** The list this detail view belongs to. */
  back?: BackTarget
  /** Beside the title; "Get in touch" when left out, nothing when `null`. */
  action?: ReactNode
  /** Under a larger title, instead of an action. */
  hero?: ReactNode
  children: ReactNode
}) {
  const lang = useSiteLanguage()
  const locationLine = (
    <p className={`truncate text-xs text-subtle ${back ? 'hidden md:block' : ''}`}>
      {['gwydion.dev', ...location].join(' / ')}
    </p>
  )
  if (hero)
    return (
      <>
        <header className="mb-10 max-w-3xl">
          {locationLine}
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h1>
          {hero}
        </header>
        {children}
      </>
    )
  return (
    <>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
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
          {locationLine}
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink">{title}</h1>
        </div>
        {action === undefined ? <ContactAction className="shrink-0" /> : action}
      </header>
      {children}
    </>
  )
}

/** "Get in touch": a button-styled link to Contact. */
export function ContactAction({
  look = 'primary',
  className = '',
}: {
  look?: 'primary' | 'secondary'
  /** Placement only. */
  className?: string
}) {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    <Link to="/$lang/contact" params={{ lang }} className={`${BUTTON_STYLES[look]} ${className}`}>
      {t`Get in touch`}
    </Link>
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
