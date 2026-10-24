import { UnstyledButton, useComputedColorScheme } from '@mantine/core'
import { Lightbox, type LightboxSlideData } from '@mantine/lightbox'
import { createContext, use, useState, type ReactNode } from 'react'
import * as m from '#/generated/paraglide/messages'
import { getLocale } from '#/generated/paraglide/runtime'
import { lightboxLabels } from '#/shared/ui/lightboxLabels'
import {
  getScreenshot,
  SELF_ENGINE_SCREENSHOTS,
  screenshotSize,
  screenshotSource,
  type SelfEngineScreenshotView,
} from '../content/screenshots'
import { SelfEngineScreenshotImage } from './SelfEngineScreenshotImage'
import classes from './SelfEngineStage.module.css'

const OpenScreenshotContext = createContext<(view: SelfEngineScreenshotView) => void>(() => {})

/**
 * One lightbox for every screenshot on the page: a `SelfEngineShot` anywhere inside opens
 * it at its own view, and the visitor can page through all of them.
 */
export function SelfEngineGallery({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false)
  const [index, setIndex] = useState(0)
  // The lightbox only renders after a click, so reading the scheme here can't cause a
  // hydration mismatch — unlike the inline images, which render both schemes.
  const scheme = useComputedColorScheme('light')
  const locale = getLocale()

  const open = (view: SelfEngineScreenshotView) => {
    setIndex(SELF_ENGINE_SCREENSHOTS.findIndex((shot) => shot.view === view))
    setOpened(true)
  }

  const slides: LightboxSlideData[] = SELF_ENGINE_SCREENSHOTS.map((shot) => ({
    ...screenshotSource(shot.view, locale, scheme),
    sizes: `min(100vw, ${screenshotSize(shot.view).width}px)`,
    alt: shot.alt(),
    caption: shot.caption(),
  }))

  return (
    <OpenScreenshotContext value={open}>
      {children}
      <Lightbox
        opened={opened}
        onClose={() => setOpened(false)}
        slides={slides}
        currentIndex={index}
        onIndexChange={setIndex}
        labels={lightboxLabels()}
        withZoom
        withThumbnails
        loop
        closeOnClickOutside
      />
    </OpenScreenshotContext>
  )
}

interface SelfEngineShotProps {
  view: SelfEngineScreenshotView
  sizes: string
  className?: string
  imageClassName?: string
}

/** A screenshot that opens the page's gallery at itself. */
export function SelfEngineShot({ view, sizes, className, imageClassName }: SelfEngineShotProps) {
  const open = use(OpenScreenshotContext)
  const shot = getScreenshot(view)

  return (
    <UnstyledButton
      onClick={() => open(view)}
      aria-label={m.cs_shot_open({ caption: shot.caption() })}
      className={className ? `${classes.shot} ${className}` : classes.shot}
    >
      <SelfEngineScreenshotImage
        view={view}
        alt={shot.alt()}
        sizes={sizes}
        className={imageClassName}
        data-fit={'size' in shot ? 'close-up' : 'window'}
      />
    </UnstyledButton>
  )
}
