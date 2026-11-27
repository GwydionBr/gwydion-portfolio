import { useId, useState, type MouseEvent } from 'react'
import { Group, Modal, Stack, UnstyledButton } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import type { Screenshot } from '#/content'
import { useTheme } from '#/theme/react'
import classes from './ScreenshotViewer.module.css'
import { ScreenshotImage } from './ScreenshotImage'

/**
 * Screenshots that open enlarged: `enlarge(position)` gives the props of the
 * button that enlarges `shots[position]`, `viewer` is the enlarged view to
 * render beside the buttons. It pages through `shots` with the arrow keys and
 * its own controls, closes with Escape or Close, and gives the focus back to
 * the button that opened it.
 */
export function useScreenshotViewer(shots: readonly Screenshot[]) {
  const { t } = useLingui()
  const { theme } = useTheme()
  const dialogId = useId()
  const [triggerIndex, setTriggerIndex] = useState<number | null>(null)
  const [index, setIndex] = useState(0)
  const enlarged = shots[index]
  const step = (by: number) => setIndex((current) => (current + by + shots.length) % shots.length)

  const enlarge = (position: number) => {
    const shot = shots[position]
    return {
      'aria-label': shot ? t`Enlarge screenshot: ${shot.caption}` : undefined,
      'aria-haspopup': 'dialog' as const,
      'aria-expanded': triggerIndex === position,
      'aria-controls': triggerIndex === position ? dialogId : undefined,
      onClick: (event: MouseEvent<HTMLButtonElement>) => {
        event.currentTarget.focus({ preventScroll: true })
        setIndex(position)
        setTriggerIndex(position)
      },
    }
  }

  const viewer = (
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
  )

  return { enlarge, viewer }
}

/**
 * A screenshot as the button that enlarges it, in the theme shown; `enlarge`
 * comes from `useScreenshotViewer`. `className` sizes the image. A `flush`
 * one fills a frame edge to edge: no rounding of its own, its focus ring inside.
 */
export function EnlargeableScreenshot({
  shot,
  sizes,
  enlarge,
  flush = false,
  className,
}: {
  shot: Screenshot
  sizes: string
  enlarge: ReturnType<ReturnType<typeof useScreenshotViewer>['enlarge']>
  flush?: boolean
  className?: string
}) {
  const { theme } = useTheme()
  return (
    <UnstyledButton {...enlarge} className={classes.trigger} data-flush={flush || undefined}>
      <ScreenshotImage shot={shot} theme={theme} sizes={sizes} className={className} />
    </UnstyledButton>
  )
}
