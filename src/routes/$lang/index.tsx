import { useId } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Box, Group, SimpleGrid, Stack, Text } from '@mantine/core'
import { RouterAnchor } from '#/components/links'
import { SHELL_BREAKPOINT } from '#/shell/breakpoint'
import { useLingui } from '@lingui/react/macro'
import { AvailabilityPill } from '#/components/AvailabilityPill'
import { CvDownload } from '#/components/CvDownload'
import { PostList } from '#/components/PostList'
import { ProjectCards } from '#/components/ProjectCards'
import { Tile } from '#/components/Tile'
import { useHasWriting, usePosts, useProfile, useProjects } from '#/content/react'
import { useSiteLanguage } from '#/i18n/react'
import { pageHead } from '#/seo/pageHead'
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

/**
 * The Overview: a hero with Gwydion's name, pitch, CV and Availability, then
 * the featured Projects as cards, then "Now" and the latest Posts.
 */
function Overview() {
  const { t } = useLingui()
  const { name, now } = useProfile()
  const featured = useProjects({ featured: true })
  const posts = usePosts()
  const hasWriting = useHasWriting()
  const featuredId = useId()
  return (
    <View title={name} location={[]} hero={<Hero />}>
      {featured.length > 0 && (
        <Box component="section" aria-labelledby={featuredId} mb={16}>
          <Group mb={12} align="baseline" justify="space-between" gap={12} px={4}>
            <Text component="h2" id={featuredId} size="xs" fw={500} c="var(--subtle)">
              {t`Featured Projects`}
            </Text>
            <ViewAllLink to="/$lang/projects" />
          </Group>
          <ProjectCards projects={featured} />
        </Box>
      )}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={16} className={classes.tiles}>
        {/* The Now tile takes the whole row until Writing exists. */}
        <Tile title={t`Now`} className={hasWriting ? undefined : classes.fullRow}>
          <Stack component="ul" mt={8} gap={8} className={classes.nowList}>
            {now.map((item) => (
              <li key={item.label}>
                <Text component="span" inherit fw={500} c="var(--ink)">
                  {item.label}
                </Text>{' '}
                · {item.text}
              </li>
            ))}
          </Stack>
        </Tile>
        {hasWriting && (
          <Tile title={t`Latest Posts`} action={<ViewAllLink to="/$lang/writing" />}>
            <PostList posts={posts.slice(0, LATEST_POSTS)} />
          </Tile>
        )}
      </SimpleGrid>
    </View>
  )
}

/**
 * Under Gwydion's name: role and location, the pitch, the CV and "Get in
 * touch", and on phones the Availability; from the shell breakpoint up the sidebar shows it.
 */
function Hero() {
  const { t } = useLingui()
  const { role, location, pitch, availability } = useProfile()
  return (
    <>
      <Text mt={4} size="md" lh={1.5}>
        {role} · {location}
      </Text>
      <Text mt={20} fz={{ base: 18, xs: 20 }} lh={1.625} c="var(--ink)">
        {pitch}
      </Text>
      <Group mt={24} gap={12}>
        <CvDownload look="primary" />
        <ContactAction look="secondary" />
      </Group>
      <Group
        component="section"
        mt={20}
        hiddenFrom={SHELL_BREAKPOINT}
        aria-label={t`Availability`}
        className={classes.availability}
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

/** A "View all" link to the full list a section previews. */
function ViewAllLink({ to }: { to: '/$lang/projects' | '/$lang/writing' }) {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    <RouterAnchor to={to} params={{ lang }} size="xs" underline="never" className={classes.viewAll}>
      {t`View all`}
    </RouterAnchor>
  )
}
