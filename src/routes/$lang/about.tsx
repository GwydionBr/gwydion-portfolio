import { createFileRoute } from '@tanstack/react-router'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { CareerList } from '#/components/CareerList'
import { CvDownload, CvTile } from '#/components/CvDownload'
import { SkillList } from '#/components/SkillList'
import { Tile } from '#/components/Tile'
import { useCareerEntries } from '#/content/react'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'

export const Route = createFileRoute('/$lang/about')({
  head: ({ match }) =>
    pageHead(match, () => ({
      title: msg`About`,
      description: msg`Gwydion's path as a developer: his Career entries, his skills and his CV to download.`,
    })),
  component: About,
})

/**
 * About: Gwydion's path as Career entries, his skills and the CV, for
 * Recruiters. The CV download is the view's action: beside the title, and on
 * phones the first thing under it.
 */
function About() {
  const { t } = useLingui()
  const entries = useCareerEntries()
  return (
    <View title={t`About`} action={<CvDownload look="primary" className="max-sm:w-full" />}>
      <div className="grid max-w-4xl items-start gap-4 lg:grid-cols-3">
        <Tile title={t`Career`} className="lg:col-span-2">
          <CareerList entries={entries} />
        </Tile>
        <div className="grid gap-4">
          <Tile title={t`Skills`}>
            <SkillList />
          </Tile>
          <CvTile />
        </div>
      </div>
    </View>
  )
}
