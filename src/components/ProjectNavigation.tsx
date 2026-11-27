import { Box, Center, Text } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import type { Project } from '#/content'
import { RouterNavLink } from './links'
import { ProjectMeta } from './ProjectMeta'
import { useProjectPageLink } from './ProjectPageLink'
import { ProjectSwatch } from './ProjectSwatch'

/**
 * Every Project as a compact navigation row (title, kind and period), the
 * open Project's row selected: the list pane beside a Project page.
 */
export function ProjectNavigation({ projects }: { projects: readonly Project[] }) {
  const { t } = useLingui()
  return (
    <Box component="nav" aria-label={t`Projects`}>
      {/* In line with the detail's location line. */}
      <Text size="xs" c="var(--subtle)" px="sm" mb={6} aria-hidden>
        {t`Projects`}
      </Text>
      <Box component="ul" role="list" m={0} p={0} style={{ listStyle: 'none' }}>
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectRow project={project} />
          </li>
        ))}
      </Box>
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
