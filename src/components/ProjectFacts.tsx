import { Anchor, Box, Button, Text } from '@mantine/core'
import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { eventAttributes } from '#/analytics/umami'
import type { Project } from '#/content'
import { PeriodText } from './PeriodText'
import { ProjectKindText } from './ProjectMeta'
import { TagList } from './TagList'
import { Tile } from './Tile'

/**
 * A Project's facts at a glance, for a Recruiter who reads no further: a
 * link to the running product, then kind, period, role, status and whether
 * the source code is public, then the stack. The rail beside a Project's
 * story; `className` places it.
 */
export function ProjectFacts({ project, className }: { project: Project; className?: string }) {
  const { t } = useLingui()
  const { live, source } = project.links
  const data = { projekt: project.slug }
  return (
    <Tile title={t`Facts`} className={className}>
      {live && (
        <Button
          component="a"
          mt="sm"
          fullWidth
          rightSection={<span aria-hidden>↗</span>}
          href={live}
          {...eventAttributes({ name: 'projekt-website-klick', data })}
        >
          {t`Visit website`}
        </Button>
      )}
      <Box component="dl" m={0} mt="sm">
        <Fact term={t`Kind`} first>
          <ProjectKindText kind={project.kind} />
        </Fact>
        <Fact term={t`Period`}>
          <PeriodText period={project.period} />
        </Fact>
        <Fact term={t`Role`}>{project.role}</Fact>
        <Fact term={t`Status`}>{project.status}</Fact>
        <Fact term={t`Source code`}>
          {source ? (
            <Anchor
              href={source}
              {...eventAttributes({ name: 'projekt-code-klick', data })}
              inherit
              c="var(--ink)"
              underline="always"
              style={{ textUnderlineOffset: 2 }}
            >
              {t`Public on GitHub`}
              <span aria-hidden> ↗</span>
            </Anchor>
          ) : (
            t`Not public`
          )}
        </Fact>
      </Box>
      <TagList label={t`Stack`} tags={project.stack} mt="sm" />
    </Tile>
  )
}

/** One term of the facts and its value. */
function Fact({ term, first, children }: { term: string; first?: boolean; children: ReactNode }) {
  return (
    <Box py={8} style={{ borderTop: first ? undefined : '1px solid var(--line)' }}>
      <Text component="dt" size="xs" c="var(--subtle)">
        {term}
      </Text>
      <Text component="dd" inherit m={0} mt={2} c="var(--ink)">
        {children}
      </Text>
    </Box>
  )
}
