import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { Anchor, Box, Group, Stack, Text } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { GITHUB_PROFILE_URL } from '#/shared/config/links'
import { Reveal } from '#/shared/motion'
import { AppCard, Eyebrow } from '#/shared/ui/Page'

export function SelfEngineOpenSourceCard() {
  return (
    <Reveal trigger="inView" distance={16} duration={0.6}>
      <AppCard p="xl" mb={60} style={{ position: 'relative', overflow: 'hidden' }}>
        <Box
          aria-hidden
          style={{
            position: 'absolute',
            bottom: -60,
            right: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--app-accent-gold-dim), transparent 70%)',
          }}
        />
        <Stack align="flex-start" gap="sm" maw={520} style={{ position: 'relative' }}>
          <Eyebrow>{m.self_open_source()}</Eyebrow>
          <Text size="sm" lh={1.7} c="var(--app-text-secondary)">
            {m.self_open_source_desc()}
          </Text>
          <Anchor href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer" size="sm">
            <Group component="span" gap={6}>
              {m.self_follow()} <ArrowUpRightIcon size={13} />
            </Group>
          </Anchor>
        </Stack>
      </AppCard>
    </Reveal>
  )
}
