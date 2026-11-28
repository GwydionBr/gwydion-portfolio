import { useId, type ReactNode } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Group, Stack, Text, Title } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { AvailabilityPill } from '#/components/AvailabilityPill'
import { CvDownload } from '#/components/CvDownload'
import { RouterAnchor } from '#/components/links'
import { PostList } from '#/components/PostList'
import { ProjectCard } from '#/components/ProjectCard'
import { RailLayout } from '#/components/RailLayout'
import { TagList } from '#/components/TagList'
import { Tile } from '#/components/Tile'
import { useHasWriting, usePosts, useProfile, useProjects } from '#/content/react'
import { useSiteLanguage } from '#/i18n/react'
import { pageHead } from '#/seo/pageHead'
import { SHELL_BREAKPOINT } from '#/shell/breakpoint'
import { ContactAction, View } from '#/shell/View'
import classes from './index.module.css'

export const Route = createFileRoute('/$lang/')({
  // Titled and described by the Profile itself.
  head: ({ match }) =>
    pageHead(match, ({ language, content }) => ({
      description: content.getProfile(language).pitch,
    })),
  component: Overview,
})

/** How many Posts the "latest Posts" tile shows. */
const LATEST_POSTS = 3

/** How many skills the rail names, the first in the configured order; About lists them all. */
const RAIL_SKILLS = 12

/**
 * The Overview, Gwydion's start page, built so a visitor sees real work
 * within the first screen. Under the name, role and location: every Project
 * as a card led by its screenshot, each card one link to its page, and the
 * latest Posts once Writing exists. Beside them, where there is room, a
 * rail stays in view (RailLayout): the pitch, the CV and "Get in touch",
 * then "Now" and skills. Narrower, the pitch and its actions come first,
 * the Projects right after them, and "Now" and skills last.
 */
function Overview() {
  const { name, role, location } = useProfile()
  return (
    <View
      title={name}
      location={[]}
      hero={
        <Text mt={4} size="md" lh={1.5}>
          {role} · {location}
        </Text>
      }
    >
      <RailLayout
        side="start"
        className={classes.layout}
        lead={<Intro />}
        main={<Work />}
        tail={<NowAndSkills />}
      />
    </View>
  )
}

/**
 * The pitch, the CV and "Get in touch", and on phones the Availability;
 * from the shell breakpoint up the sidebar shows it.
 */
function Intro() {
  const { t } = useLingui()
  const { pitch, availability } = useProfile()
  return (
    <>
      <Text component="p" m={0} size="md" lh={1.6} c="var(--ink)">
        {pitch}
      </Text>
      <Group mt="lg" gap={8} className={classes.actions}>
        <CvDownload look="primary" />
        <ContactAction look="secondary" />
      </Group>
      <Group
        component="section"
        mt="md"
        hiddenFrom={SHELL_BREAKPOINT}
        aria-label={t`Availability`}
        gap="sm"
        style={{ rowGap: '0.25rem' }}
      >
        <AvailabilityPill headline={availability.headline} />
        {availability.freelance && (
          <Text size="sm" c="var(--subtle)">
            {availability.freelance}
          </Text>
        )}
      </Group>
    </>
  )
}

/** Every Project as a card in the configured order, the first one's cover fetched first; then the latest Posts. */
function Work() {
  const { t } = useLingui()
  const projects = useProjects()
  const posts = usePosts()
  const hasWriting = useHasWriting()
  const id = useId()
  return (
    <Stack gap="xl">
      <section aria-labelledby={id}>
        <Label id={id}>{t`What I built`}</Label>
        <Stack
          component="ul"
          role="list"
          gap="md"
          m={0}
          mt={12}
          p={0}
          style={{ listStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} priority={index === 0} />
            </li>
          ))}
        </Stack>
      </section>
      {hasWriting && (
        <Tile title={t`Latest Posts`} action={<ViewAllLink to="/$lang/writing" />}>
          <PostList posts={posts.slice(0, LATEST_POSTS)} />
        </Tile>
      )}
    </Stack>
  )
}

/**
 * "Now" and the first skills, each under a hairline. Nothing here takes the
 * focus: narrow, this shows after the Projects but comes before them in the
 * page, and a link would be tabbed to out of turn. The sidebar leads to About.
 */
function NowAndSkills() {
  const { t } = useLingui()
  const { now, skills } = useProfile()
  const nowId = useId()
  const skillsId = useId()
  return (
    <Stack gap="lg">
      <section aria-labelledby={nowId} className={classes.part}>
        <Label id={nowId}>{t`Now`}</Label>
        <Stack component="ul" role="list" gap={8} m={0} mt={8} p={0} style={{ listStyle: 'none' }}>
          {now.map((item) => (
            <li key={item.label}>
              <Text component="span" inherit fw={500} c="var(--ink)">
                {item.label}
              </Text>{' '}
              · {item.text}
            </li>
          ))}
        </Stack>
      </section>
      <section aria-labelledby={skillsId} className={classes.part}>
        <Label id={skillsId}>{t`Skills`}</Label>
        <TagList
          label={t`Skills`}
          tags={skills.flatMap((group) => group.items).slice(0, RAIL_SKILLS)}
          mt={10}
        />
      </section>
    </Stack>
  )
}

/** A section's name: small and quiet, as the site's tiles name theirs. */
function Label({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Title order={2} id={id} fz="xs" fw={500} c="var(--subtle)">
      {children}
    </Title>
  )
}

/** A "View all" link to the full list a section previews. */
function ViewAllLink({ to }: { to: '/$lang/writing' }) {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    <RouterAnchor to={to} params={{ lang }} size="xs" c="var(--subtle)">
      {t`View all`}
    </RouterAnchor>
  )
}
