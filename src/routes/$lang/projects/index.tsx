import { createFileRoute } from '@tanstack/react-router'
import { Paper } from '@mantine/core'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { ProjectList } from '#/components/ProjectList'
import { useProjects } from '#/content/react'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'
import classes from './Projects.module.css'

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
      <Paper radius="lg" px={20} py={8} fz="sm" lh="1.25rem" className={classes.list}>
        <ProjectList projects={useProjects()} label={t`Projects`} />
      </Paper>
    </View>
  )
}
