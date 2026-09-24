import { Box, Flex, Stack, Text } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { Reveal } from '#/shared/motion'
import { AppCard, DisplayTitle, Eyebrow } from '#/shared/ui/Page'

const nodes = [
  { label: () => m.cs_diagram_app(), sublabel: () => m.cs_diagram_app_sub() },
  { label: () => m.cs_diagram_sqlite(), sublabel: () => m.cs_diagram_sqlite_sub() },
  { label: () => m.cs_diagram_powersync(), sublabel: () => m.cs_diagram_powersync_sub() },
  { label: () => m.cs_diagram_postgres(), sublabel: () => m.cs_diagram_postgres_sub() },
]

function Connector({ bidirectional = false }: { bidirectional?: boolean }) {
  return (
    <>
      <Text visibleFrom="sm" ff="monospace" c="var(--app-text-muted)" aria-hidden>
        {bidirectional ? '⇄' : '→'}
      </Text>
      <Text hiddenFrom="sm" ff="monospace" c="var(--app-text-muted)" aria-hidden>
        ↓
      </Text>
    </>
  )
}

export function SelfEngineArchitecture() {
  return (
    <Box mb={104}>
      <Reveal trigger="inView" distance={16}>
        <Eyebrow mb={16}>{m.cs_arch_eyebrow()}</Eyebrow>
        <DisplayTitle order={2} size="clamp(2.25rem, 5vw, 4.5rem)" mb={32}>
          {m.cs_arch_heading()}
        </DisplayTitle>
        <Stack gap="md" maw={820} mb={40}>
          <Text component="p" size="sm" lh={1.8} c="var(--app-text-secondary)">
            {m.cs_arch_p1()}
          </Text>
          <Text component="p" size="sm" lh={1.8} c="var(--app-text-secondary)">
            {m.cs_arch_p2()}
          </Text>
          <Text component="p" size="sm" lh={1.8} c="var(--app-text-secondary)">
            {m.cs_arch_p3()}
          </Text>
        </Stack>
      </Reveal>

      <Reveal trigger="inView" delay={0.15}>
        <Flex direction={{ base: 'column', sm: 'row' }} align="center" gap={{ base: 8, sm: 10 }}>
          {nodes.map(({ label, sublabel }, index) => (
            <Flex
              key={label()}
              direction={{ base: 'column', sm: 'row' }}
              align="center"
              gap={{ base: 8, sm: 10 }}
              style={{ flex: index < nodes.length - 1 ? 1 : undefined, width: '100%' }}
            >
              <AppCard radius={0} p="md" h="100%" style={{ flex: 1, width: '100%' }}>
                <Text ff="monospace" size="xs" fw={600} mb={6}>
                  {label()}
                </Text>
                <Text ff="monospace" fz={10} lh={1.45} c="var(--app-text-muted)">
                  {sublabel()}
                </Text>
              </AppCard>
              {index < nodes.length - 1 && <Connector bidirectional={index === 2} />}
            </Flex>
          ))}
        </Flex>
      </Reveal>
    </Box>
  )
}
