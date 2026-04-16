import type { ReactNode } from 'react'
import { Badge, Group } from '@mantine/core'

export interface ProjectTag {
  icon?: ReactNode
  label: string
}

interface ProjectTagListProps {
  items: ProjectTag[]
  mb?: number | string
}

export function ProjectTagList({ items, mb }: ProjectTagListProps) {
  return (
    <Group gap={8} mb={mb}>
      {items.map(({ icon, label }) => (
        <Badge key={label} variant="default" leftSection={icon}>
          {label}
        </Badge>
      ))}
    </Group>
  )
}
