import { Box, SimpleGrid, Text } from '@mantine/core'
import { StaggerGroup, StaggerItem } from '#/shared/motion'
import { AppCard, Eyebrow } from '#/shared/ui/Page'
import { SELF_ENGINE_NUMBERS } from '../content/numbers'

export function SelfEngineNumbers() {
  return (
    <StaggerGroup stagger={0.06} delayChildren={0.15}>
      <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing={1} mb={96}>
        {SELF_ENGINE_NUMBERS.map(({ value, label }) => (
          <StaggerItem key={label()} preset="fade-in" duration={0.45}>
            <AppCard p="lg" radius={0} h="100%">
              <Text
                ff="var(--mantine-font-family-headings)"
                fz="clamp(1.75rem, 4vw, 2.5rem)"
                lh={1}
                mb={12}
              >
                {value()}
              </Text>
              <Box style={{ lineHeight: 1.5 }}>
                <Eyebrow>{label()}</Eyebrow>
              </Box>
            </AppCard>
          </StaggerItem>
        ))}
      </SimpleGrid>
    </StaggerGroup>
  )
}
