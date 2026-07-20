import type { ReactElement } from 'react'
import { CalendarDotsIcon, CheckSquareOffsetIcon, CurrencyCircleDollarIcon, ListChecksIcon, SparkleIcon, TimerIcon } from '@phosphor-icons/react'
import { Badge, Group, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { AppCard, Eyebrow } from '#/shared/ui/Page'
import { SELF_ENGINE_FEATURES, type SelfEngineFeatureIcon } from '../content/features'
import { SELF_ENGINE_TECH } from '../content/tech'

const iconMap: Record<SelfEngineFeatureIcon, ReactElement> = {
  time: <TimerIcon size={20} weight="light" />,
  tasks: <ListChecksIcon size={20} weight="light" />,
  finance: <CurrencyCircleDollarIcon size={20} weight="light" />,
  calendar: <CalendarDotsIcon size={20} weight="light" />,
  habits: <CheckSquareOffsetIcon size={20} weight="light" />,
  ai: <SparkleIcon size={20} weight="light" />,
}

const featureText = {
  1: { title: m.cs_feat_1_title, desc: m.cs_feat_1_desc },
  2: { title: m.cs_feat_2_title, desc: m.cs_feat_2_desc },
  3: { title: m.cs_feat_3_title, desc: m.cs_feat_3_desc },
  4: { title: m.cs_feat_4_title, desc: m.cs_feat_4_desc },
  5: { title: m.cs_feat_5_title, desc: m.cs_feat_5_desc },
  6: { title: m.cs_feat_6_title, desc: m.cs_feat_6_desc },
}

export function SelfEngineFeatures() {
  return (
    <div style={{ marginBottom: 72 }}>
      <Reveal delay={0.2}>
        <Eyebrow mb={24}>{m.self_features()}</Eyebrow>
      </Reveal>
      <StaggerGroup stagger={0.08} delayChildren={0.3}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={1}>
          {SELF_ENGINE_FEATURES.map(({ icon, id }) => (
            <StaggerItem key={id} preset="fade-in" duration={0.5}>
              <AppCard p="xl" radius={0} h="100%">
                <Stack gap="sm">
                  <ThemeIcon color="forest" size={40}>
                    {iconMap[icon]}
                  </ThemeIcon>
                  <Text size="sm" fw={500}>
                    {featureText[id].title()}
                  </Text>
                  <Text size="xs" lh={1.65} c="var(--app-text-muted)">
                    {featureText[id].desc()}
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
