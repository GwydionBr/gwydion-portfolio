import { useEffect } from 'react'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { Paper } from '@mantine/core'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { ProjectList } from '#/components/ProjectList'
import { useProjects } from '#/content/react'
import { useSiteLanguage } from '#/i18n/react'
import { pageHead } from '#/seo/pageHead'
import { secondaryNavbarFits, useSecondaryNavbarFits } from '#/shell/breakpoint'
import { View } from '#/shell/View'

export const Route = createFileRoute('/$lang/projects/')({
  // Where the second sidebar lists the Projects, the first one opens beside
  // it, as a mail app opens the first message. Only the browser knows the
  // width: a page the server rendered here moves on once it does (`Projects`).
  beforeLoad: ({ context, params }) => {
    const first = context.content.getProjects(params.lang)[0]
    if (first && secondaryNavbarFits())
      throw redirect({
        to: '/$lang/projects/$slug',
        params: { lang: params.lang, slug: first.slug },
        replace: true,
      })
  },
  head: ({ match }) =>
    pageHead(match, () => ({
      title: msg`Projects`,
      description: msg`Own products, client work and open source: the Projects Gwydion built and the story behind each.`,
    })),
  staticData: { secondaryNavigation: 'projects' },
  component: Projects,
})

/**
 * Every Project, in the configured order; each row opens its Project page.
 * The view of narrower windows: once the window is wide enough for the
 * second sidebar, the first Project opens instead.
 */
function Projects() {
  const { t } = useLingui()
  const projects = useProjects()
  const lang = useSiteLanguage()
  const navigate = useNavigate()
  const fits = useSecondaryNavbarFits()
  const first = projects[0]?.slug
  useEffect(() => {
    if (fits && first)
      void navigate({ to: '/$lang/projects/$slug', params: { lang, slug: first }, replace: true })
  }, [fits, first, lang, navigate])
  return (
    <View title={t`Projects`}>
      <Paper px="lg" py="xs" fz="sm" lh="1.25rem">
        <ProjectList projects={projects} label={t`Projects`} />
      </Paper>
    </View>
  )
}
