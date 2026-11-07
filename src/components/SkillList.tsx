import { useLingui } from '@lingui/react/macro'
import { useProfile } from '#/content/react'
import { TagList } from './TagList'

/** Gwydion's skills, as a list named "Skills". */
export function SkillList() {
  const { t } = useLingui()
  const { skills } = useProfile()
  return <TagList label={t`Skills`} tags={skills} className="mt-4" />
}
