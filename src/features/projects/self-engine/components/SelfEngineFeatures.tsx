import type { ReactElement } from 'react'
import { CalendarDotsIcon, CheckCircleIcon, CodeIcon, CurrencyCircleDollarIcon, TimerIcon } from '@phosphor-icons/react'
import { Badge, Group, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { AppCard, Eyebrow } from '#/shared/ui/Page'
import { SELF_ENGINE_FEATURES, type SelfEngineFeatureIcon } from '../content/features'
import { SELF_ENGINE_ROADMAP } from '../content/roadmap'
import { SELF_ENGINE_TECH } from '../content/tech'

const iconMap: Record<SelfEngineFeatureIcon, ReactElement> = {
  time: <TimerIcon size={20} weight="light" />,
  finance: <CurrencyCircleDollarIcon size={20} weight="light" />,
  calendar: <CalendarDotsIcon size={20} weight="light" />,
  management: <CodeIcon size={20} weight="light" />,
}

export function SelfEngineFeatures() {
  return (
    <div style={{ marginBottom: 72 }}>
      <Reveal delay={0.2}>
        <Eyebrow mb={24}>{m.self_features()}</Eyebrow>
      </Reveal>
      <StaggerGroup stagger={0.08} delayChildren={0.3}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={1}>
          {SELF_ENGINE_FEATURES.map(({ icon, title, desc }) => (
            <StaggerItem key={title} preset="fade-in" duration={0.5}>
              <AppCard p="xl" radius={0} h="100%">
                <Stack gap="sm">
                  <ThemeIcon color="forest" size={40}>
                    {iconMap[icon]}
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
  )
}

export function SelfEngineRoadmap() {
  return (
    <div style={{ marginBottom: 72 }}>
      <Reveal trigger="inView">
        <Eyebrow mb={24}>{m.self_roadmap()}</Eyebrow>
      </Reveal>
      <StaggerGroup trigger="inView" stagger={0.07}>
        <Stack gap="sm">
          {SELF_ENGINE_ROADMAP.map(({ item, done }) => (
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
  )
}

export function SelfEngineTechStack() {
  return (
    <Reveal trigger="inView" distance={16} duration={0.6} style={{ marginBottom: 72 }}>
      <Eyebrow mb={20}>{m.self_built_with()}</Eyebrow>
      <Group gap={8}>
        {SELF_ENGINE_TECH.map((tech) => (
          <Badge key={tech} variant="default">
            {tech}
          </Badge>
        ))}
      </Group>
    </Reveal>
  )
}
