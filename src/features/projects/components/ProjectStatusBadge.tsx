import type { ReactNode } from 'react'
import { Badge } from '@mantine/core'

interface ProjectStatusBadgeProps {
  children: ReactNode
  mb?: number | string
}

export function ProjectStatusBadge({ children, mb = 24 }: ProjectStatusBadgeProps) {
  return (
    <Badge
      color="gold"
      mb={mb}
      leftSection={
        <span
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: 999,
            background: 'currentColor',
            boxShadow: '0 0 6px currentColor',
          }}
        />
      }
    >
      {children}
    </Badge>
  )
}
