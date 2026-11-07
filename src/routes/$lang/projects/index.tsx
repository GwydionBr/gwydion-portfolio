import { createFileRoute } from '@tanstack/react-router'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { ProjectList } from '#/components/ProjectList'
import { useProjects } from '#/content/react'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'

export const Route = createFileRoute('/$lang/projects/')({
  head: ({ match }) =>
    pageHead(match, () => ({
      title: msg`Projects`,
      description: msg`Own products, client work and open source: the Projects Gwydion built and the story behind each.`,
    })),
  component: Projects,
})

/** Every Project, in the configured order; each row opens its Project page. */
function Projects() {
  const { t } = useLingui()
  return (
    <View title={t`Projects`}>
      <div className="max-w-3xl rounded-2xl bg-surface px-5 py-2 ring-1 ring-line">
        <ProjectList projects={useProjects()} label={t`Projects`} />
      </div>
    </View>
  )
}
