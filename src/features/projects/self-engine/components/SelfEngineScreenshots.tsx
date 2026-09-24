import { Box, SimpleGrid, Stack } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { AppCard, Eyebrow } from '#/shared/ui/Page'
import { SELF_ENGINE_SCREENSHOTS } from '../content/screenshots'

function getMessage(key: (typeof SELF_ENGINE_SCREENSHOTS)[number]['captionKey' | 'altKey']) {
  return m[key]()
}

function Screenshot({ shot }: { shot: (typeof SELF_ENGINE_SCREENSHOTS)[number] }) {
  return (
    <AppCard p="xs" radius={0} h="100%">
      <Box
        component="img"
        src={shot.src}
        alt={getMessage(shot.altKey)}
        w="100%"
        style={{
          display: 'block',
          aspectRatio: shot.aspect === 'wide' ? '16/10' : '9/19',
          objectFit: 'cover',
          borderRadius: 2,
          border: '1px solid var(--app-border)',
        }}
      />
      <Box px="xs" pt="md" pb={6}>
        <Eyebrow>{getMessage(shot.captionKey)}</Eyebrow>
      </Box>
    </AppCard>
  )
}

export function SelfEngineScreenshots() {
  const wide = SELF_ENGINE_SCREENSHOTS.filter((shot) => shot.aspect === 'wide')
  const phone = SELF_ENGINE_SCREENSHOTS.filter((shot) => shot.aspect === 'phone')

  return (
    <Box mb={104}>
      <Reveal trigger="inView">
        <Eyebrow mb={24}>{m.cs_shots_heading()}</Eyebrow>
      </Reveal>
      <Stack gap={16} mb={16}>
        {wide.map((shot) => (
          <Reveal key={shot.src} trigger="inView">
            <Screenshot shot={shot} />
          </Reveal>
        ))}
      </Stack>
      <StaggerGroup trigger="inView" stagger={0.1}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={16} maw={720} mx="auto">
          {phone.map((shot) => (
            <StaggerItem key={shot.src} preset="fade-in">
              <Screenshot shot={shot} />
            </StaggerItem>
          ))}
        </SimpleGrid>
      </StaggerGroup>
    </Box>
  )
}
