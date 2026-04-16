import type { CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { Box, Group, Stack, Text } from '@mantine/core'
import { AppCard, DisplayTitle } from '#/shared/ui/Page'
import { ProjectStatusBadge } from './ProjectStatusBadge'
import { ProjectTagList, type ProjectTag } from './ProjectTagList'

interface ProjectCardProps {
  to: string
  status: string
  title: string
  description: string
  ctaLabel: string
  tags: ProjectTag[]
  titleSize?: string
  p?: number | string
  maw?: number | string
  className?: string
  style?: CSSProperties
}

export function ProjectCard({
  to,
  status,
  title,
  description,
  ctaLabel,
  tags,
  titleSize = 'clamp(2.2rem, 4vw, 3.2rem)',
  p = 48,
  maw = 620,
  className,
  style,
}: ProjectCardProps) {
  return (
    <AppCard
      component={Link}
      to={to}
      className={className}
      p={p}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        textDecoration: 'none',
        ...style,
      }}
    >
      <Box
        aria-hidden
        style={{
          position: 'absolute',
          top: -100,
          right: -60,
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--app-accent-green-dim), transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <Stack align="flex-start" gap={0} maw={maw} style={{ position: 'relative' }}>
        <ProjectStatusBadge>{status}</ProjectStatusBadge>
        <DisplayTitle order={2} size={titleSize} mb={16}>
          {title}
        </DisplayTitle>
        <Text lh={1.7} c="var(--app-text-secondary)" mb={28}>
          {description}
        </Text>
        <ProjectTagList items={tags} mb={32} />
        <Group component="span" gap={8} c="var(--app-accent-green)" fw={500}>
          <Text component="span" size="sm">
            {ctaLabel}
          </Text>
          <ArrowRightIcon size={15} weight="bold" />
        </Group>
      </Stack>
    </AppCard>
  )
}
