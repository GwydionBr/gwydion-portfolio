import { createFileRoute, Link } from '@tanstack/react-router'
import { Badge, Box, Group, Stack, Text } from '@mantine/core'
import { ArrowRightIcon, TimerIcon, CurrencyCircleDollarIcon, CalendarDotsIcon, CodeIcon } from '@phosphor-icons/react'
import { PageIntro, Reveal } from '../../components/motion'
import { AppCard, DisplayTitle, Eyebrow, PageContainer, PageMain } from '../../components/ui/Page'
import * as m from '../../paraglide/messages'

export const Route = createFileRoute('/projects/')({ component: ProjectsPage })

function ProjectsPage() {
  return (
    <PageMain>
      <PageContainer>
        <PageIntro
          eyebrow={<Eyebrow mb={16}>{m.projects_heading()}</Eyebrow>}
          title={
            <DisplayTitle>
              {m.projects_title_a()}<br />
              <em>{m.projects_title_b()}</em>
            </DisplayTitle>
          }
        />

        <Reveal delay={0.2} distance={28} duration={0.8}>
          <AppCard
            component={Link}
            to="/projects/self-engine"
            className="project-card"
            p={48}
            style={{
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              textDecoration: 'none',
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

            <Stack align="flex-start" gap={0} maw={620} style={{ position: 'relative' }}>
              <StatusBadge>{m.se_status()}</StatusBadge>
              <DisplayTitle order={2} size="clamp(2.2rem, 4vw, 3.2rem)" mb={16}>
                {m.se_title()}
              </DisplayTitle>
              <Text lh={1.7} c="var(--app-text-secondary)" mb={28}>
                {m.se_desc()}
              </Text>
              <ProjectTags mb={32} />
              <Group component="span" gap={8} c="var(--app-accent-green)" fw={500}>
                <Text component="span" size="sm">
                  {m.projects_view()}
                </Text>
                <ArrowRightIcon size={15} weight="bold" />
              </Group>
            </Stack>
          </AppCard>
        </Reveal>

        <Reveal trigger="inView" preset="fade-in" duration={0.6} delay={0.2}>
          <AppCard mt={16} p="xl" style={{ borderStyle: 'dashed' }}>
            <Group gap="md">
              <Eyebrow>{m.projects_more_heading()}</Eyebrow>
              <Box w={40} h={1} bg="var(--app-border)" />
              <Text size="xs" c="var(--app-text-muted)">
                {m.projects_more_desc()}
              </Text>
            </Group>
          </AppCard>
        </Reveal>
      </PageContainer>
    </PageMain>
  )
}

function StatusBadge({ children }: { children: string }) {
  return (
    <Badge color="gold" leftSection={<span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: 'currentColor', boxShadow: '0 0 6px currentColor' }} />} mb={24}>
      {children}
    </Badge>
  )
}

function ProjectTags({ mb }: { mb?: number }) {
  const tags = [
    { icon: <TimerIcon size={13} />, label: m.project_tag_time() },
    { icon: <CurrencyCircleDollarIcon size={13} />, label: m.project_tag_finance() },
    { icon: <CalendarDotsIcon size={13} />, label: m.project_tag_calendar() },
    { icon: <CodeIcon size={13} />, label: m.project_tag_management() },
  ]

  return (
    <Group gap={8} mb={mb}>
      {tags.map(({ icon, label }) => (
        <Badge key={label} variant="default" leftSection={icon}>
          {label}
        </Badge>
      ))}
    </Group>
  )
}
