import { Box, SimpleGrid, UnstyledButton, useComputedColorScheme } from '@mantine/core'
import { Lightbox, type LightboxSlideData } from '@mantine/lightbox'
import { useState } from 'react'
import * as m from '#/generated/paraglide/messages'
import { getLocale } from '#/generated/paraglide/runtime'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { lightboxLabels } from '#/shared/ui/lightboxLabels'
import { AppCard, Eyebrow } from '#/shared/ui/Page'
import {
  SELF_ENGINE_SCREENSHOTS,
  screenshotSource,
  type SelfEngineScreenshot,
} from '../content/screenshots'
import { SelfEngineScreenshotImage } from './SelfEngineScreenshotImage'

interface ScreenshotProps {
  shot: SelfEngineScreenshot
  sizes: string
  onOpen: () => void
}

function Screenshot({ shot, sizes, onOpen }: ScreenshotProps) {
  return (
    <AppCard p="xs" radius={0} h="100%">
      <UnstyledButton
        onClick={onOpen}
        aria-label={m.cs_shot_open({ caption: shot.caption() })}
        display="block"
        w="100%"
        style={{ cursor: 'zoom-in' }}
      >
        <SelfEngineScreenshotImage
          view={shot.view}
          alt={shot.alt()}
          sizes={sizes}
          style={{
            verticalAlign: 'bottom',
            borderRadius: 2,
            border: '1px solid var(--app-border)',
          }}
        />
      </UnstyledButton>
      <Box px="xs" pt="md" pb={6}>
        <Eyebrow>{shot.caption()}</Eyebrow>
      </Box>
    </AppCard>
  )
}

export function SelfEngineScreenshots() {
  const [hero, ...rest] = SELF_ENGINE_SCREENSHOTS
  const [opened, setOpened] = useState(false)
  const [index, setIndex] = useState(0)
  const open = (shotIndex: number) => {
    setIndex(shotIndex)
    setOpened(true)
  }
  // The lightbox only renders after a click, so reading the scheme here can't cause a
  // hydration mismatch — unlike the inline images, which render both schemes.
  const scheme = useComputedColorScheme('light')
  const locale = getLocale()

  const slides: LightboxSlideData[] = SELF_ENGINE_SCREENSHOTS.map((shot) => ({
    ...screenshotSource(shot.view, locale, scheme),
    sizes: '100vw',
    alt: shot.alt(),
    caption: shot.caption(),
  }))

  return (
    <Box mb={104}>
      <Reveal trigger="inView">
        <Eyebrow mb={24}>{m.cs_shots_heading()}</Eyebrow>
      </Reveal>
      <Reveal trigger="inView">
        <Box mb={16}>
          <Screenshot
            shot={hero}
            sizes="(min-width: 1080px) 1024px, 100vw"
            onOpen={() => open(0)}
          />
        </Box>
      </Reveal>
      <StaggerGroup trigger="inView" stagger={0.1}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={16}>
          {rest.map((shot, restIndex) => (
            <StaggerItem key={shot.view} preset="fade-in">
              <Screenshot
                shot={shot}
                sizes="(min-width: 1080px) 504px, (min-width: 768px) 50vw, 100vw"
                onOpen={() => open(restIndex + 1)}
              />
            </StaggerItem>
          ))}
        </SimpleGrid>
      </StaggerGroup>
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
    </Box>
  )
}
