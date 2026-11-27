import { createFileRoute } from '@tanstack/react-router'
import { Box, SimpleGrid } from '@mantine/core'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { CareerList } from '#/components/CareerList'
import { CvTile } from '#/components/CvDownload'
import { SkillList } from '#/components/SkillList'
import { Tile } from '#/components/Tile'
import { useCareerEntries } from '#/content/react'
import { pageHead } from '#/seo/pageHead'
import { View } from '#/shell/View'
import classes from './about.module.css'

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
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing={16} className={classes.tiles}>
        <Tile title={t`Career`} className={classes.career}>
          <CareerList entries={entries} />
        </Tile>
        {/* On narrower screens the tiles share one column, with the CV first. */}
        <Box className={classes.profile}>
          <CvTile className={classes.cv} />
          <Tile title={t`Skills`}>
            <SkillList />
          </Tile>
        </Box>
      </SimpleGrid>
    </View>
  )
}
