import { ArrowUpRightIcon, BarbellIcon, CodeIcon, HeartIcon } from '@phosphor-icons/react'
import { Button, Group, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { GITHUB_PROFILE_URL } from '#/shared/config/links'
import { PageIntro, Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { AppCard, DisplayTitle, Eyebrow, PageContainer, PageMain } from '#/shared/ui/Page'

const LINKS = [
  { label: 'GitHub', href: GITHUB_PROFILE_URL },
  { label: 'Self-Engine', href: 'https://self-engine.app' },
]

function getFocusAreas() {
  return [
    {
      icon: <CodeIcon size={18} weight="light" />,
      title: m.about_focus_software_title(),
      desc: m.about_focus_software_desc(),
    },
    {
      icon: <HeartIcon size={18} weight="light" />,
      title: m.about_focus_practice_title(),
      desc: m.about_focus_practice_desc(),
    },
    {
      icon: <BarbellIcon size={18} weight="light" />,
      title: m.about_focus_training_title(),
      desc: m.about_focus_training_desc(),
    },
  ]
}

function getNowItems() {
  return [
    { label: m.about_now_project(), value: m.se_title() },
    { label: m.about_now_learning(), value: m.about_now_learning_value() },
    { label: m.about_now_reading(), value: 'Dhammapada' },
    { label: m.about_now_location(), value: 'Germany' },
  ]
}

export function AboutPageContent() {
  const focusAreas = getFocusAreas()
  const nowItems = getNowItems()

  return (
    <PageMain>
      <PageContainer>
        <PageIntro
          eyebrow={<Eyebrow mb={16}>{m.about_heading()}</Eyebrow>}
          title={
            <DisplayTitle>
              {m.about_title_a()}
              <br />
              <em>{m.about_title_b()}</em>
              <br />
              {m.about_title_c()}
            </DisplayTitle>
          }
        />

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={80} verticalSpacing={60} mb={100}>
          <Reveal delay={0.2}>
            <Text component="p" ff="var(--mantine-font-family-headings)" size="xl" lh={1.6} mb={28}>
              "{m.about_p1()}"
            </Text>
            <Text component="p" size="sm" lh={1.8} c="var(--app-text-secondary)" mb={20}>
              {m.about_p2()}
            </Text>
            <Text component="p" size="sm" lh={1.8} c="var(--app-text-secondary)">
              {m.about_p3()}
            </Text>
          </Reveal>

          <Reveal delay={0.35}>
            <Eyebrow mb={24}>{m.about_focus_heading()}</Eyebrow>
            <StaggerGroup stagger={0.08} delayChildren={0.05}>
              <Stack gap="md">
                {focusAreas.map(({ icon, title, desc }) => (
                  <StaggerItem key={title} preset="fade-right" distance={16} duration={0.5}>
                    <AppCard p="md">
                      <Group align="flex-start" gap="md" wrap="nowrap">
                        <ThemeIcon color="forest" size={36}>
                          {icon}
                        </ThemeIcon>
                        <Stack gap={4}>
                          <Text size="sm" fw={500}>
                            {title}
                          </Text>
                          <Text size="xs" lh={1.6} c="var(--app-text-muted)">
                            {desc}
                          </Text>
                        </Stack>
                      </Group>
                    </AppCard>
                  </StaggerItem>
                ))}
              </Stack>
            </StaggerGroup>
          </Reveal>
        </SimpleGrid>

        <div style={{ marginBottom: 100 }}>
          <Reveal trigger="inView">
            <Eyebrow mb={24}>{m.about_now_heading()}</Eyebrow>
          </Reveal>
          <StaggerGroup trigger="inView" stagger={0.07}>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={1}>
              {nowItems.map(({ label, value }) => (
                <StaggerItem key={label} preset="fade-in" duration={0.5}>
                  <AppCard p="lg" radius={0} h="100%">
                    <Eyebrow mb={10}>{label}</Eyebrow>
                    <Text size="sm" lh={1.5}>
                      {value}
                    </Text>
                  </AppCard>
                </StaggerItem>
              ))}
            </SimpleGrid>
          </StaggerGroup>
        </div>

        <Reveal trigger="inView" distance={16} duration={0.6}>
          <Group gap={12} pb={40}>
            {LINKS.map(({ label, href }) => (
              <Button
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                rightSection={<ArrowUpRightIcon size={13} />}
              >
                {label}
              </Button>
            ))}
          </Group>
        </Reveal>
      </PageContainer>
    </PageMain>
  )
}
