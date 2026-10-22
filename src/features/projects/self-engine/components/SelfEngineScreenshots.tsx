import { Box, SimpleGrid } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { AppCard, Eyebrow } from '#/shared/ui/Page'
import { SELF_ENGINE_SCREENSHOTS, type SelfEngineScreenshot } from '../content/screenshots'
import { SelfEngineScreenshotImage } from './SelfEngineScreenshotImage'

function Screenshot({ shot, sizes }: { shot: SelfEngineScreenshot; sizes: string }) {
  return (
    <AppCard p="xs" radius={0} h="100%">
      <SelfEngineScreenshotImage
        view={shot.view}
        alt={shot.alt()}
        sizes={sizes}
        style={{ verticalAlign: 'bottom', borderRadius: 2, border: '1px solid var(--app-border)' }}
      />
      <Box px="xs" pt="md" pb={6}>
        <Eyebrow>{shot.caption()}</Eyebrow>
      </Box>
    </AppCard>
  )
}

export function SelfEngineScreenshots() {
  const [hero, ...rest] = SELF_ENGINE_SCREENSHOTS

  return (
    <Box mb={104}>
      <Reveal trigger="inView">
        <Eyebrow mb={24}>{m.cs_shots_heading()}</Eyebrow>
      </Reveal>
      <Reveal trigger="inView">
        <Box mb={16}>
          <Screenshot shot={hero} sizes="(min-width: 1080px) 1024px, 100vw" />
        </Box>
      </Reveal>
      <StaggerGroup trigger="inView" stagger={0.1}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={16}>
          {rest.map((shot) => (
            <StaggerItem key={shot.view} preset="fade-in">
              <Screenshot
                shot={shot}
                sizes="(min-width: 1080px) 504px, (min-width: 768px) 50vw, 100vw"
              />
            </StaggerItem>
          ))}
        </SimpleGrid>
      </StaggerGroup>
    </Box>
  )
}
