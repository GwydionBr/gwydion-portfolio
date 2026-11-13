import { createFileRoute } from '@tanstack/react-router'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { CareerList } from '#/components/CareerList'
import { CvTile } from '#/components/CvDownload'
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
 * Recruiters. The CV tile is the one place the view offers the CV; on phones
 * it comes first, above the Career entries.
 */
function About() {
  const { t } = useLingui()
  const entries = useCareerEntries()
  return (
    <View title={t`About`}>
      <div className="grid items-start gap-4 lg:grid-cols-3">
        <Tile title={t`Career`} className="lg:col-span-2">
          <CareerList entries={entries} />
        </Tile>
        {/* A column of its own from lg; below it its tiles join the one column, the CV first. */}
        <div className="grid gap-4 max-lg:contents">
          <CvTile className="max-lg:order-first" />
          <Tile title={t`Skills`}>
            <SkillList />
          </Tile>
        </div>
      </div>
    </View>
  )
}
