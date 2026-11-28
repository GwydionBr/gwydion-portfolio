import { msg } from '@lingui/core/macro'
import type { MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react/macro'
import { Badge, Group } from '@mantine/core'
import { Briefcase, Cube, GitBranch, type Icon } from '@phosphor-icons/react'
import type { Project, ProjectKind } from '#/content'
import { PeriodText } from './PeriodText'
import { StatusPill } from './StatusPill'

/** What each kind of Project is called in the interface. */
const PROJECT_KIND_LABELS: Record<ProjectKind, MessageDescriptor> = {
  'own-product': msg`Own product`,
  'client-work': msg`Client work`,
  'open-source': msg`Open source`,
}

/** The icon of each kind of Project, beside its name in a badge. */
const PROJECT_KIND_ICONS: Record<ProjectKind, Icon> = {
  'own-product': Cube,
  'client-work': Briefcase,
  'open-source': GitBranch,
}

/** What a Project's kind is called in the Site language ("Own product"). */
export function ProjectKindText({ kind }: { kind: ProjectKind }) {
  const { i18n } = useLingui()
  return <>{i18n._(PROJECT_KIND_LABELS[kind])}</>
}

/** A Project's kind as a chip with its icon, as its page opens. */
export function ProjectKindBadge({ kind }: { kind: ProjectKind }) {
  const Glyph = PROJECT_KIND_ICONS[kind]
  return (
    <Badge leftSection={<Glyph aria-hidden size={12} />}>
      <ProjectKindText kind={kind} />
    </Badge>
  )
}

/** A Project's kind and period ("Own product · 2025–now"), as text for the caller to place. */
export function ProjectMeta({ project }: { project: Pick<Project, 'kind' | 'period'> }) {
  return (
    <>
      <ProjectKindText kind={project.kind} /> · <PeriodText period={project.period} />
    </>
  )
}

/** A Project's kind and its status, side by side as chips: how its page and its Overview card name them. */
export function ProjectKindAndStatus({ project }: { project: Pick<Project, 'kind' | 'status'> }) {
  return (
    <Group gap="xs">
      <ProjectKindBadge kind={project.kind} />
      <StatusPill live={project.status.live}>{project.status.label}</StatusPill>
    </Group>
  )
}
