import { useLingui } from '@lingui/react/macro'
import { useProfile } from '#/content/react'

/** Gwydion's skills, as a list named "Skills". */
export function SkillList() {
  const { t } = useLingui()
  const { skills } = useProfile()
  return (
    <ul aria-label={t`Skills`} className="mt-4 flex flex-wrap gap-1.5">
      {skills.map((skill) => (
        <li key={skill} className="rounded-md bg-selected px-2 py-0.5 text-xs">
          {skill}
        </li>
      ))}
    </ul>
  )
}
