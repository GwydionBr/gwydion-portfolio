import { Paper, SimpleGrid, Text } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { useScreenshots } from '#/content/react'
import type { Screenshot } from '#/content'
import classes from './ScreenshotGallery.module.css'
import { EnlargeableScreenshot, useScreenshotViewer } from './ScreenshotViewer'
import { useStoryProject } from './StoryProject'

/** Wide enough to take the whole row: a whole app window or a wide close-up. */
const isWide = (shot: Screenshot) => shot.width >= 900

/** Taller than wide: a phone screen. */
const isPortrait = (shot: Screenshot) => shot.height > shot.width

/** How many phone screens stand side by side, at most. */
const PHONES_PER_ROW = 4

/**
 * The story's Project's screenshots (`<ScreenshotGallery />`), or only
 * `views`, in that order (`<ScreenshotGallery views={['dashboard']} />`), in
 * the Site language and the theme shown. A gallery of phone screens only
 * sets them side by side, up to four in a row. Each opens enlarged; the
 * enlarged view pages through this gallery's screenshots and closes with Escape.
 */
export function ScreenshotGallery({ views }: { views?: string[] }) {
  const { t } = useLingui()
  const project = useStoryProject()
  const all = useScreenshots(project)
  const shots = views
    ? views.map((view) => {
        const shot = all.find((candidate) => candidate.view === view)
        if (!shot) throw new Error(`${project} has no screenshot "${view}".`)
        return shot
      })
    : all
  const phones = shots.length > 0 && shots.every(isPortrait)
  const { enlarge, viewer } = useScreenshotViewer(shots)

  return (
    <>
      <SimpleGrid
        component="ul"
        role="list"
        aria-label={t`Screenshots`}
        cols={phones ? { base: 2, xs: Math.min(shots.length, PHONES_PER_ROW) } : { base: 1, xs: 2 }}
        spacing="sm"
        p={0}
        mb={0}
        style={{ listStyle: 'none' }}
      >
        {shots.map((shot, position) => (
          <Paper
            component="li"
            key={shot.view}
            mt={0}
            p={8}
            className={isWide(shot) ? classes.wide : undefined}
          >
            <EnlargeableScreenshot
              shot={shot}
              enlarge={enlarge(position)}
              sizes={
                isWide(shot) ? '(min-width: 1024px) 42rem, 100vw' : `min(100vw, ${shot.width}px)`
              }
              className={classes.thumbnail}
            />
            <Text m={0} px={8} pt={8} pb={4} size="xs" lh="1rem" c="var(--subtle)">
              {shot.caption}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
      {viewer}
    </>
  )
}
