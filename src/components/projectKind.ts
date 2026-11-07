import { msg } from '@lingui/core/macro'
import type { MessageDescriptor } from '@lingui/core'
import type { ProjectKind } from '#/content'

/** What each kind of Project is called in the interface. */
export const PROJECT_KIND_LABELS: Record<ProjectKind, MessageDescriptor> = {
  'own-product': msg`Own product`,
  'client-work': msg`Client work`,
  'open-source': msg`Open source`,
}
