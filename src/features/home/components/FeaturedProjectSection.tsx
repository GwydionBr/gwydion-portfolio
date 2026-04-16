import { CalendarDotsIcon, CodeIcon, CurrencyCircleDollarIcon, TimerIcon } from '@phosphor-icons/react'
import { Box, Container } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { ProjectCard } from '#/features/projects/components/ProjectCard'
import type { ProjectTag } from '#/features/projects/components/ProjectTagList'
import { Reveal } from '#/shared/motion'
import { Eyebrow } from '#/shared/ui/Page'

const projectTags: ProjectTag[] = [
  { icon: <TimerIcon size={13} />, label: m.project_tag_time() },
  { icon: <CurrencyCircleDollarIcon size={13} />, label: m.project_tag_finance() },
  { icon: <CalendarDotsIcon size={13} />, label: m.project_tag_calendar() },
  { icon: <CodeIcon size={13} />, label: m.project_tag_management() },
]

export function FeaturedProjectSection() {
  return (
    <Box component="section" pt={120} px={28}>
      <Container size={1080} px={0}>
        <Reveal trigger="inView" viewport={{ margin: '-80px' }} duration={0.7}>
          <Eyebrow>{m.projects_heading()}</Eyebrow>
        </Reveal>

        <Reveal trigger="inView" distance={28} duration={0.8} delay={0.1}>
          <ProjectCard
            to="/projects"
            status={m.se_status()}
            title={m.se_title()}
            description={m.se_desc()}
            ctaLabel={m.se_cta()}
            tags={projectTags}
            titleSize="clamp(2rem, 4vw, 3rem)"
            maw={520}
            style={{ marginTop: 20 }}
          />
        </Reveal>
      </Container>
    </Box>
  )
}
