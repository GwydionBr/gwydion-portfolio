import { useId, useState } from 'react'
import { Group, Modal, Paper, SimpleGrid, Stack, Text, UnstyledButton } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import { useScreenshots } from '#/content/react'
import type { Screenshot } from '#/content'
import { useTheme } from '#/theme/react'
import classes from './ScreenshotGallery.module.css'
import { ScreenshotImage } from './ScreenshotImage'
import { useStoryProject } from './StoryProject'

/** Wide enough to take the whole row: a whole app window or a wide close-up. */
const isWide = (shot: Screenshot) => shot.width >= 900

/**
 * The story's Project's screenshots (`<ScreenshotGallery />`), or only
 * `views`, in that order (`<ScreenshotGallery views={['dashboard']} />`), in
 * the Site language and the theme shown. Each opens enlarged; the enlarged
 * view pages through this gallery's screenshots and closes with Escape.
 */
export function ScreenshotGallery({ views }: { views?: string[] }) {
  const { t } = useLingui()
  const { theme } = useTheme()
  const project = useStoryProject()
  const all = useScreenshots(project)
  const shots = views
    ? views.map((view) => {
        const shot = all.find((candidate) => candidate.view === view)
        if (!shot) throw new Error(`${project} has no screenshot "${view}".`)
        return shot
      })
    : all
  const dialogId = useId()
  const [triggerIndex, setTriggerIndex] = useState<number | null>(null)
  const [index, setIndex] = useState(0)
  const enlarged = shots[index]
  const step = (by: number) => setIndex((current) => (current + by + shots.length) % shots.length)

  return (
    <>
      <SimpleGrid
        component="ul"
        role="list"
        aria-label={t`Screenshots`}
        cols={{ base: 1, xs: 2 }}
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
            <UnstyledButton
              aria-label={t`Enlarge screenshot: ${shot.caption}`}
              aria-haspopup="dialog"
              aria-expanded={triggerIndex === position}
              aria-controls={triggerIndex === position ? dialogId : undefined}
              onClick={(event) => {
                event.currentTarget.focus({ preventScroll: true })
                setIndex(position)
                setTriggerIndex(position)
              }}
              w="100%"
              display="block"
              style={{
                overflow: 'hidden',
                cursor: 'zoom-in',
                borderRadius: 'var(--mantine-radius-md)',
              }}
            >
              <ScreenshotImage
                shot={shot}
                theme={theme}
                sizes={
                  isWide(shot) ? '(min-width: 1024px) 42rem, 100vw' : `min(100vw, ${shot.width}px)`
                }
                className={classes.thumbnail}
              />
            </UnstyledButton>
            <Text m={0} px={8} pt={8} pb={4} size="xs" lh="1rem" c="var(--subtle)">
              {shot.caption}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
      <Modal.Root
        opened={triggerIndex !== null && !!enlarged}
        onClose={() => setTriggerIndex(null)}
        fullScreen
        transitionProps={{ transition: 'fade', duration: 150 }}
        classNames={{ root: classes.lightbox, content: classes.content }}
        onKeyDown={(event) => {
          if (shots.length < 2) return
          if (event.key === 'ArrowLeft') step(-1)
          if (event.key === 'ArrowRight') step(1)
        }}
      >
        <Modal.Overlay className={classes.overlay} />
        <Modal.Content id={dialogId}>
          {enlarged && (
            <Stack align="center" justify="center" gap="sm" p="md" mih="100dvh">
              <Group justify="space-between" wrap="nowrap" gap="sm" w="100%" maw={1152}>
                <Modal.Title c="inherit" fz="sm" fw={500}>
                  {enlarged.caption}
                </Modal.Title>
                <Modal.CloseButton
                  aria-label={t`Close`}
                  icon={<X aria-hidden size={20} />}
                  className={classes.control}
                />
              </Group>
              <ScreenshotImage
                shot={enlarged}
                theme={theme}
                sizes={`min(100vw, ${enlarged.width}px)`}
                className={classes.enlarged}
              />
              {shots.length > 1 && (
                <Group gap={8}>
                  <UnstyledButton
                    aria-label={t`Previous screenshot`}
                    onClick={() => step(-1)}
                    className={classes.control}
                  >
                    <CaretLeft aria-hidden size={20} />
                  </UnstyledButton>
                  <UnstyledButton
                    aria-label={t`Next screenshot`}
                    onClick={() => step(1)}
                    className={classes.control}
                  >
                    <CaretRight aria-hidden size={20} />
                  </UnstyledButton>
                </Group>
              )}
            </Stack>
          )}
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
