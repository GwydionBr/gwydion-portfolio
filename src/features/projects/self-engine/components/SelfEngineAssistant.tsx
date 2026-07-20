import { Box, Group, Text } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { AppCard, Eyebrow } from '#/shared/ui/Page'

const facts = [() => m.cs_ai_fact1(), () => m.cs_ai_fact2(), () => m.cs_ai_fact3()]

export function SelfEngineAssistant() {
  return (
    <Box mb={96}>
      <Reveal trigger="inView" distance={16}>
        <Eyebrow mb={24}>{m.cs_ai_heading()}</Eyebrow>
        <Text component="p" size="md" lh={1.8} c="var(--app-text-secondary)" maw={820} mb={28}>{m.cs_ai_p1()}</Text>
      </Reveal>
      <StaggerGroup trigger="inView" stagger={0.08}>
        <Group gap={1} align="stretch">
          {facts.map((fact) => (
            <StaggerItem key={fact()} preset="fade-in">
              <AppCard radius={0} px="md" py="sm"><Eyebrow>{fact()}</Eyebrow></AppCard>
            </StaggerItem>
          ))}
        </Group>
      </StaggerGroup>
    </Box>
  )
}
