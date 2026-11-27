import { Box, Stack, Text } from '@mantine/core'
import { useProfile } from '#/content/react'
import { TagList } from './TagList'
import lists from './lists.module.css'

/** Gwydion's skills, group by group: each group's label over its skills as chips. */
export function SkillList() {
  const { skills } = useProfile()
  return (
    <Stack component="dl" mt="sm" gap="sm" className={lists.reset}>
      {skills.map((group) => (
        <div key={group.label}>
          <Text component="dt" size="xs" fw={500} c="var(--ink)">
            {group.label}
          </Text>
          <Box component="dd" m={0} mt={6}>
            <TagList label={group.label} tags={group.items} />
          </Box>
        </div>
      ))}
    </Stack>
  )
}
