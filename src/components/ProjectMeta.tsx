import { msg } from '@lingui/core/macro'
import type { MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react/macro'
import type { Project, ProjectKind } from '#/content'

/** What each kind of Project is called in the interface. */
const PROJECT_KIND_LABELS: Record<ProjectKind, MessageDescriptor> = {
  'own-product': msg`Own product`,
  'client-work': msg`Client work`,
  'open-source': msg`Open source`,
}

/** A Project's kind and years ("Own product · 2025–now"), as text for the caller to place. */
export function ProjectMeta({ project }: { project: Pick<Project, 'kind' | 'years'> }) {
  const { i18n } = useLingui()
  return (
    <>
      {i18n._(PROJECT_KIND_LABELS[project.kind])} · {project.years}
    </>
  )
}
