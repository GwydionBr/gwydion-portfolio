import { useLingui } from '@lingui/react/macro'

/**
 * Who the site belongs to: portrait, name and role, at the top of the sidebar
 * and the phone top bar. The Profile (name, role) moves into the content
 * module with #34.
 */
export function Identity({ className = '' }: { className?: string }) {
  const { t } = useLingui()
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <img src="/portrait.webp" alt="" className="size-9 shrink-0 rounded-lg object-cover" />
      <div className="min-w-0">
        <p className="truncate font-semibold text-ink">Gwydion Braunsdorf</p>
        <p className="truncate text-xs text-subtle">{t`Software developer`}</p>
      </div>
    </div>
  )
}
