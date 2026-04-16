import { createFileRoute, Link } from '@tanstack/react-router'
import { Anchor, Badge, Box, Button, Group, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import {
  TimerIcon, CurrencyCircleDollarIcon, CalendarDotsIcon, CodeIcon,
  ArrowLeftIcon, ArrowUpRightIcon, CheckCircleIcon,
} from '@phosphor-icons/react'
import { AnimatedAccentRule, Reveal, StaggerGroup, StaggerItem } from '../../components/motion'
import { AppCard, DisplayTitle, Eyebrow, PageContainer, PageMain } from '../../components/ui/Page'
import * as m from '../../paraglide/messages'
import { GITHUB_PROFILE_URL } from '../../lib/githubUrls'

export const Route = createFileRoute('/projects/self-engine')({ component: SelfEnginePage })

function SelfEnginePage() {
  return (
    <PageMain>
      <PageContainer>
        <Reveal preset="fade-left" duration={0.5} distance={12} style={{ marginBottom: 48 }}>
          <Button
            component={Link}
            to="/projects"
            variant="subtle"
            color="gray"
            leftSection={<ArrowLeftIcon size={14} />}
            px={0}
          >
            {m.self_back()}
          </Button>
        </Reveal>

        <Reveal duration={0.8}>
          <Group gap={12} mb={20}>
            <Eyebrow>{m.self_project_label()}</Eyebrow>
            <Box w={24} h={1} bg="var(--app-border)" />
            <Badge color="gold" leftSection={<span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: 'currentColor', boxShadow: '0 0 6px currentColor' }} />}>
              {m.self_active()}
            </Badge>
          </Group>

          <DisplayTitle size="clamp(3rem, 8vw, 7rem)" mb={24}>
            {m.se_title()}
          </DisplayTitle>

          <Text maw={560} size="lg" lh={1.7} c="var(--app-text-secondary)">
            {m.self_intro()}
          </Text>
        </Reveal>

        <AnimatedAccentRule my={48} />

        <div style={{ marginBottom: 72 }}>
          <Reveal delay={0.2}>
            <Eyebrow mb={24}>{m.self_features()}</Eyebrow>
          </Reveal>
          <StaggerGroup stagger={0.08} delayChildren={0.3}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={1}>
              {FEATURES.map(({ icon, title, desc }) => (
                <StaggerItem key={title} preset="fade-in" duration={0.5}>
                  <AppCard p="xl" radius={0} h="100%">
                    <Stack gap="sm">
                      <ThemeIcon color="forest" size={40}>
                        {icon}
                      </ThemeIcon>
                      <Text size="sm" fw={500}>
                        {title}
                      </Text>
                      <Text size="xs" lh={1.65} c="var(--app-text-muted)">
                        {desc}
                      </Text>
                    </Stack>
                  </AppCard>
                </StaggerItem>
              ))}
            </SimpleGrid>
          </StaggerGroup>
        </div>

        <div style={{ marginBottom: 72 }}>
          <Reveal trigger="inView">
            <Eyebrow mb={24}>{m.self_roadmap()}</Eyebrow>
          </Reveal>
          <StaggerGroup trigger="inView" stagger={0.07}>
            <Stack gap="sm">
              {ROADMAP.map(({ item, done }) => (
                <StaggerItem key={item} preset="fade-left" distance={12} duration={0.5}>
                  <AppCard p="md">
                    <Group gap="md" wrap="nowrap">
                      <ThemeIcon color={done ? 'forest' : 'gray'} variant={done ? 'light' : 'default'} size={34}>
                        <CheckCircleIcon size={18} weight={done ? 'fill' : 'light'} />
                      </ThemeIcon>
                      <Text size="sm" c={done ? 'inherit' : 'var(--app-text-muted)'}>
                        {item}
                      </Text>
                      {done && (
                        <Badge color="forest" ml="auto">
                          {m.status_done()}
                        </Badge>
                      )}
                    </Group>
                  </AppCard>
                </StaggerItem>
              ))}
            </Stack>
          </StaggerGroup>
        </div>

        <Reveal trigger="inView" distance={16} duration={0.6} style={{ marginBottom: 72 }}>
          <Eyebrow mb={20}>{m.self_built_with()}</Eyebrow>
          <Group gap={8}>
            {TECH.map((t) => (
              <Badge key={t} variant="default">
                {t}
              </Badge>
            ))}
          </Group>
        </Reveal>

        <Reveal trigger="inView" distance={16} duration={0.6}>
          <AppCard p="xl" mb={60} style={{ position: 'relative', overflow: 'hidden' }}>
            <Box
              aria-hidden
              style={{
                position: 'absolute',
                bottom: -60,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--app-accent-gold-dim), transparent 70%)',
              }}
            />
            <Stack align="flex-start" gap="sm" maw={520} style={{ position: 'relative' }}>
              <Eyebrow>{m.self_open_source()}</Eyebrow>
              <Text size="sm" lh={1.7} c="var(--app-text-secondary)">
                {m.self_open_source_desc()}
              </Text>
              <Anchor href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" size="sm">
                <Group component="span" gap={6}>
                  {m.self_follow()} <ArrowUpRightIcon size={13} />
                </Group>
              </Anchor>
            </Stack>
          </AppCard>
        </Reveal>
      </PageContainer>
    </PageMain>
  )
}

const FEATURES = [
  {
    icon: <TimerIcon size={20} weight="light" />,
    title: 'Time tracking',
    desc: 'Record and categorize time spent on any project or task with precision.',
  },
  {
    icon: <CurrencyCircleDollarIcon size={20} weight="light" />,
    title: 'Finance management',
    desc: 'Link hourly rates to tracked time. Understand what your work is worth.',
  },
  {
    icon: <CalendarDotsIcon size={20} weight="light" />,
    title: 'Calendar visualization',
    desc: 'See your work, projects, and appointments in a unified calendar view.',
  },
  {
    icon: <CodeIcon size={20} weight="light" />,
    title: 'Project management',
    desc: 'Organize tasks and milestones. Keep projects moving without the overhead.',
  },
]

const ROADMAP = [
  { item: 'Time tracking core', done: true },
  { item: 'Project structure & management', done: true },
  { item: 'Finance & hourly rate tracking', done: true },
  { item: 'Calendar view', done: true },
  { item: 'Dashboard & analytics', done: false },
  { item: 'Mobile app', done: false },
  { item: 'Open source release', done: false },
  { item: 'Collaboration features', done: false },
]

const TECH = [
  'TypeScript', 'React', 'TanStack', 'Mantine', 'Bun',
  'SQLite', 'Drizzle ORM', 'Zod',
]
