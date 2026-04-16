import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { Box, Button, Group, Text } from '@mantine/core'
import { AnimatedAccentRule, Reveal } from '#/shared/motion'
import { DisplayTitle, Eyebrow, PageContainer, PageMain } from '#/shared/ui/Page'
import { ProjectStatusBadge } from './ProjectStatusBadge'

interface ProjectPageShellProps {
  backLabel: string
  title: ReactNode
  description: ReactNode
  projectLabel: string
  statusLabel: string
  children: ReactNode
  backTo?: string
  titleSize?: string
}

export function ProjectPageShell({
  backLabel,
  title,
  description,
  projectLabel,
  statusLabel,
  children,
  backTo = '/projects',
  titleSize = 'clamp(3rem, 8vw, 7rem)',
}: ProjectPageShellProps) {
  return (
    <PageMain>
      <PageContainer>
        <Reveal preset="fade-left" duration={0.5} distance={12} style={{ marginBottom: 48 }}>
          <Button
            component={Link}
            to={backTo}
            variant="subtle"
            color="gray"
            leftSection={<ArrowLeftIcon size={14} />}
            px={0}
          >
            {backLabel}
          </Button>
        </Reveal>

        <Reveal duration={0.8}>
          <Group gap={12} mb={20}>
            <Eyebrow>{projectLabel}</Eyebrow>
            <Box w={24} h={1} bg="var(--app-border)" />
            <ProjectStatusBadge mb={0}>{statusLabel}</ProjectStatusBadge>
          </Group>

          <DisplayTitle size={titleSize} mb={24}>
            {title}
          </DisplayTitle>

          <Text maw={560} size="lg" lh={1.7} c="var(--app-text-secondary)">
            {description}
          </Text>
        </Reveal>

        <AnimatedAccentRule my={48} />

        {children}
      </PageContainer>
    </PageMain>
  )
}
