/** Short labels as a row of chips, for example skills or a Project's stack. */
export function TagList({
  label,
  tags,
  className = '',
}: {
  /** The list's accessible name. */
  label: string
  tags: readonly string[]
  /** Placement only (margins). */
  className?: string
}) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <li key={tag} className="rounded-md bg-selected px-2 py-0.5 text-xs">
          {tag}
        </li>
      ))}
    </ul>
  )
}
