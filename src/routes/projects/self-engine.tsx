import { createFileRoute, Link } from '@tanstack/react-router'
import { Anchor, Badge, Box, Button, Group, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import { motion } from 'motion/react'
import {
  TimerIcon, CurrencyCircleDollarIcon, CalendarDotsIcon, CodeIcon,
  ArrowLeftIcon, ArrowUpRightIcon, CheckCircleIcon,
} from '@phosphor-icons/react'
import { AccentRule, AppCard, DisplayTitle, Eyebrow, PageContainer, PageMain } from '../../components/ui/Page'
import * as m from '../../paraglide/messages'
import { GITHUB_PROFILE_URL } from '../../lib/githubUrls'

export const Route = createFileRoute('/projects/self-engine')({ component: SelfEnginePage })

function SelfEnginePage() {
  return (
    <PageMain>
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 48 }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Group gap={12} mb={20}>
            <Eyebrow>{m.self_project_label()}</Eyebrow>
            <Box w={24} h={1} bg="var(--app-border)" />
            <Badge color="gold" leftSection={<span className="status-dot" />}>
              {m.self_active()}
            </Badge>
          </Group>

          <DisplayTitle size="clamp(3rem, 8vw, 7rem)" mb={24}>
            {m.se_title()}
          </DisplayTitle>

          <Text maw={560} size="lg" lh={1.7} c="var(--app-text-secondary)">
            {m.self_intro()}
          </Text>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        >
          <AccentRule my={48} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72 }}
        >
          <Eyebrow mb={24}>{m.self_features()}</Eyebrow>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={1}>
            {FEATURES.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <AppCard p="xl" radius={0} h="100%">
                  <Stack gap="sm">
                    <ThemeIcon color="forest" size={40}>
                      {icon}
                    </ThemeIcon>
                    <Text size="sm" fw={500} c="var(--app-text-primary)">
                      {title}
                    </Text>
                    <Text size="xs" lh={1.65} c="var(--app-text-muted)">
                      {desc}
                    </Text>
                  </Stack>
                </AppCard>
              </motion.div>
            ))}
          </SimpleGrid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72 }}
        >
          <Eyebrow mb={24}>{m.self_roadmap()}</Eyebrow>
          <Stack gap="sm">
            {ROADMAP.map(({ item, done }, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <AppCard p="md">
                  <Group gap="md" wrap="nowrap">
                    <ThemeIcon color={done ? 'forest' : 'gray'} variant={done ? 'light' : 'default'} size={34}>
                      <CheckCircleIcon size={18} weight={done ? 'fill' : 'light'} />
                    </ThemeIcon>
                    <Text size="sm" c={done ? 'var(--app-text-primary)' : 'var(--app-text-muted)'}>
                      {item}
                    </Text>
                    {done && (
                      <Badge color="forest" ml="auto">
                        {m.status_done()}
                      </Badge>
                    )}
                  </Group>
                </AppCard>
              </motion.div>
            ))}
          </Stack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 72 }}
        >
          <Eyebrow mb={20}>{m.self_built_with()}</Eyebrow>
          <Group gap={8}>
            {TECH.map((t) => (
              <Badge key={t} variant="default">
                {t}
              </Badge>
            ))}
          </Group>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
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
        </motion.div>
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
