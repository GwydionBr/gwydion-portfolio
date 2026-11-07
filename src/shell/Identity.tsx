import { useProfile } from '#/content/react'

/** Who the site belongs to: portrait, name and role, at the top of the sidebar and the phone top bar. */
export function Identity({ className = '' }: { className?: string }) {
  const { name, role } = useProfile()
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <img src="/portrait.webp" alt="" className="size-9 shrink-0 rounded-lg object-cover" />
      <div className="min-w-0">
        <p className="truncate font-semibold text-ink">{name}</p>
        <p className="truncate text-xs text-subtle">{role}</p>
      </div>
    </div>
  )
}
