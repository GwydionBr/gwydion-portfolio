import { useProfile } from '#/content/react'
import { TagList } from './TagList'

/** Gwydion's skills, group by group: each group's label over its skills as chips. */
export function SkillList() {
  const { skills } = useProfile()
  return (
    <dl className="mt-3 space-y-3">
      {skills.map((group) => (
        <div key={group.label}>
          <dt className="text-xs font-medium text-ink">{group.label}</dt>
          <dd className="mt-1.5">
            <TagList label={group.label} tags={group.items} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
