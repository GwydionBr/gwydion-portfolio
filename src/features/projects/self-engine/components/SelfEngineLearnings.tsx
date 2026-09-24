import { Box, SimpleGrid, Stack, Text } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { AppCard, Eyebrow } from '#/shared/ui/Page'

const learnings = [
  { title: () => m.cs_learn1_title(), body: () => m.cs_learn1_body() },
  { title: () => m.cs_learn2_title(), body: () => m.cs_learn2_body() },
  { title: () => m.cs_learn3_title(), body: () => m.cs_learn3_body() },
]

export function SelfEngineLearnings() {
  return (
    <Box mb={96}>
      <Reveal trigger="inView">
        <Eyebrow mb={24}>{m.cs_learn_heading()}</Eyebrow>
      </Reveal>
      <StaggerGroup trigger="inView" stagger={0.08}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={1}>
          {learnings.map(({ title, body }) => (
            <StaggerItem key={title()} preset="fade-in">
              <AppCard p="xl" radius={0} h="100%">
                <Stack gap="sm">
                  <Text ff="var(--mantine-font-family-headings)" size="lg" lh={1.3}>
                    {title()}
                  </Text>
                  <Text size="xs" lh={1.7} c="var(--app-text-muted)">
                    {body()}
                  </Text>
                </Stack>
              </AppCard>
            </StaggerItem>
          ))}
        </SimpleGrid>
      </StaggerGroup>
    </Box>
  )
}
