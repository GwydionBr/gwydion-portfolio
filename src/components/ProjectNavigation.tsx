import { Box, Center, Group, Stack, Text } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import type { Project } from '#/content'
import { useProjects } from '#/content/react'
import { RouterNavLink } from './links'
import { ProjectMeta } from './ProjectMeta'
import { useProjectPageLink } from './ProjectPageLink'
import { ProjectSwatch } from './ProjectSwatch'

/**
 * Every Project as a compact navigation row (title, kind and period), the
 * open Project's row selected: the shell's second sidebar beside the Projects.
 */
export function ProjectNavigation() {
  const { t } = useLingui()
  const projects = useProjects()
  return (
    <Box component="nav" aria-label={t`Projects`}>
      {/* As tall as the sidebar's identity, so the lists below start level. */}
      <Group h={56} px="sm" justify="space-between" aria-hidden>
        <Text size="sm" fw={600} c="var(--ink)">
          {t`Projects`}
        </Text>
        <Text size="xs" c="var(--subtle)">
          {projects.length}
        </Text>
      </Group>
      <Stack component="ul" role="list" gap={2} m={0} mt="md" p={0} style={{ listStyle: 'none' }}>
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectRow project={project} />
          </li>
        ))}
      </Stack>
    </Box>
  )
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <RouterNavLink
      {...useProjectPageLink(project.slug)}
      label={project.title}
      description={<ProjectMeta project={project} />}
      // As tall as the label's line, so the swatch sits beside the title (the theme tops the section).
      leftSection={
        <Center component="span" h="calc(var(--mantine-font-size-sm) * var(--mantine-line-height))">
          <ProjectSwatch accent={project.accent} />
        </Center>
      }
    />
  )
}
