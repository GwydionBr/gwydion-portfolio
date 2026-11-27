import { Group, Text } from '@mantine/core'
import lists from './lists.module.css'

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
    <Group component="ul" aria-label={label} gap={6} className={`${lists.reset} ${className}`}>
      {tags.map((tag) => (
        <Text
          component="li"
          key={tag}
          size="xs"
          px={8}
          py={2}
          bg="var(--selected)"
          lh={4 / 3}
          style={{ borderRadius: 6 }}
        >
          {tag}
        </Text>
      ))}
    </Group>
  )
}
