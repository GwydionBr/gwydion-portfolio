import { Badge, Group, type MantineSpacing } from '@mantine/core'

/** Short labels as a row of chips, for example skills or a Project's stack. */
export function TagList({
  label,
  tags,
  mt = 0,
  pt = 0,
}: {
  /** The list's accessible name. */
  label: string
  tags: readonly string[]
  mt?: MantineSpacing
  pt?: MantineSpacing
}) {
  return (
    <Group
      component="ul"
      role="list"
      aria-label={label}
      gap={6}
      m={0}
      mt={mt}
      p={0}
      pt={pt}
      style={{ listStyle: 'none' }}
    >
      {tags.map((tag) => (
        <Badge component="li" key={tag}>
          {tag}
        </Badge>
      ))}
    </Group>
  )
}
