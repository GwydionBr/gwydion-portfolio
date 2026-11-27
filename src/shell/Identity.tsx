import { Avatar, Box, Group, Text } from '@mantine/core'
import { useProfile } from '#/content/react'

/** Who the site belongs to: portrait, name and role, at the top of the sidebar and the phone top bar. */
export function Identity() {
  const { name, role } = useProfile()
  return (
    <Group gap="sm" wrap="nowrap" miw={0}>
      <Avatar src="/portrait.webp" alt="" radius="md" size={36} />
      <Box miw={0}>
        <Text size="sm" fw={600} c="var(--ink)" truncate>
          {name}
        </Text>
        <Text size="xs" c="var(--subtle)" truncate>
          {role}
        </Text>
      </Box>
    </Group>
  )
}
