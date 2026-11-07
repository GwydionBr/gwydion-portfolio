import { createFileRoute } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { CareerList } from '#/components/CareerList'
import { CvDownload } from '#/components/CvDownload'
import { SkillList } from '#/components/SkillList'
import { Tile } from '#/components/Tile'
import { useCareerEntries } from '#/content/react'
import { View } from '#/shell/View'

export const Route = createFileRoute('/$lang/about')({ component: About })

/** About: Gwydion's path as Career entries, his skills and the CV download, for Recruiters. */
function About() {
  const { t } = useLingui()
  const entries = useCareerEntries()
  return (
    <View title={t`About`}>
      <div className="grid max-w-4xl gap-4 lg:grid-cols-3">
        <Tile title={t`Career`} className="lg:col-span-2 lg:row-span-2">
          <CareerList entries={entries} />
        </Tile>
        <Tile title={t`Skills`}>
          <SkillList />
        </Tile>
        <Tile title={t`CV`}>
          <CvDownload className="mt-3" />
        </Tile>
      </div>
    </View>
  )
}
