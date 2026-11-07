import type { ReactNode } from 'react'

const TONES = {
  note: 'bg-selected ring-line',
  /** Marks text that stands in for content still to be written; dimmed. */
  placeholder: 'bg-surface ring-line opacity-60 border-dashed',
}

/** A highlighted aside inside a story (`<Callout title="…">…</Callout>`). */
export function Callout({
  title,
  tone = 'note',
  children,
}: {
  title?: string
  tone?: keyof typeof TONES
  children: ReactNode
}) {
  return (
    <aside className={`mt-6 rounded-2xl p-4 ring-1 ${TONES[tone]}`}>
      {title && <p className="font-medium text-ink">{title}</p>}
      <div className="[&>p:first-child]:mt-0 [&>p]:mt-2">{children}</div>
    </aside>
  )
}
