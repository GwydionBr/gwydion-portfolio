import { CalendarDotsIcon, CodeIcon, CurrencyCircleDollarIcon, TimerIcon } from '@phosphor-icons/react'
import { Box, Group, Text } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { PageIntro, Reveal } from '#/shared/motion'
import { AppCard, DisplayTitle, Eyebrow, PageContainer, PageMain } from '#/shared/ui/Page'
import { ProjectCard } from './ProjectCard'
import type { ProjectTag } from './ProjectTagList'

const projectTags: ProjectTag[] = [
  { icon: <TimerIcon size={13} />, label: m.project_tag_time() },
  { icon: <CurrencyCircleDollarIcon size={13} />, label: m.project_tag_finance() },
  { icon: <CalendarDotsIcon size={13} />, label: m.project_tag_calendar() },
  { icon: <CodeIcon size={13} />, label: m.project_tag_management() },
]

export function ProjectsPageContent() {
  return (
    <PageMain>
      <PageContainer>
        <PageIntro
          eyebrow={<Eyebrow mb={16}>{m.projects_heading()}</Eyebrow>}
          title={
            <DisplayTitle>
              {m.projects_title_a()}
              <br />
              <em>{m.projects_title_b()}</em>
            </DisplayTitle>
          }
        />

        <Reveal delay={0.2} distance={28} duration={0.8}>
          <ProjectCard
            to="/projects/self-engine"
            status={m.se_status()}
            title={m.se_title()}
            description={m.se_desc()}
            ctaLabel={m.projects_view()}
            tags={projectTags}
            className="project-card"
          />
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
