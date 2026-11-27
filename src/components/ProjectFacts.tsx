import { Box, Group, Text } from '@mantine/core'
import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import {
  CalendarBlank,
  GithubLogo,
  LockSimple,
  Stack as StackIcon,
  UserCircle,
  type Icon,
} from '@phosphor-icons/react'
import type { Project } from '#/content'
import { PeriodText } from './PeriodText'
import classes from './ProjectFacts.module.css'
import { TagList } from './TagList'
import { Tile } from './Tile'

/**
 * A Project's facts as a quiet list, for a Recruiter who wants them while
 * reading on: period, role, whether the source code is public, and the stack.
 * Its kind and status open the page (ProjectEntry), so they are not repeated.
 * Each term has a small icon in its line. Where there is room the facts
 * stand side by side; `className` places the card.
 */
export function ProjectFacts({ project, className }: { project: Project; className?: string }) {
  const { t } = useLingui()
  const { source } = project.links
  return (
    <Tile title={t`Facts`} density="snug" className={className}>
      <Box component="dl" m={0} mt="sm" className={classes.facts}>
        <Fact icon={CalendarBlank} term={t`Period`}>
          <PeriodText period={project.period} />
        </Fact>
        <Fact icon={UserCircle} term={t`Role`}>
          {project.role}
        </Fact>
        <Fact icon={source ? GithubLogo : LockSimple} term={t`Source code`}>
          {source ? t`Public on GitHub` : t`Not public`}
        </Fact>
        <Fact icon={StackIcon} term={t`Stack`} wide>
          <TagList label={t`Stack`} tags={project.stack} mt={4} />
        </Fact>
      </Box>
    </Tile>
  )
}

/** One term of the facts, its icon in the term's line, and its value; a `wide` one takes the whole row. */
function Fact({
  icon: Glyph,
  term,
  wide,
  children,
}: {
  icon: Icon
  term: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <div className={wide ? classes.wide : undefined}>
      <Group component="dt" gap={6} wrap="nowrap" c="var(--subtle)" fz="xs" lh="1rem">
        <Glyph aria-hidden size={14} style={{ flexShrink: 0 }} />
        {term}
      </Group>
      <Text component="dd" inherit m={0} mt={4} c="var(--ink)">
        {children}
      </Text>
    </div>
  )
}
