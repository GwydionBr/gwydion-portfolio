import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { Anchor, Group, Stack, Text } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { Reveal } from '#/shared/motion'
import { Eyebrow } from '#/shared/ui/Page'
import { CONTACT_ITEMS } from '../content/contactItems'

export function ContactDetails() {
  return (
    <Reveal delay={0.2}>
      <Text size="lg" lh={1.75} c="var(--app-text-secondary)" mb={40}>
        {m.contact_sub()}
      </Text>

      <Stack gap="md">
        {CONTACT_ITEMS.map(({ label, value, href }) => (
          <Stack key={label} gap={6}>
            <Eyebrow>{label}</Eyebrow>
            {href ? (
              <Anchor href={href} target="_blank" rel="noopener noreferrer" c="inherit" underline="never">
                <Group component="span" gap={5}>
                  {value} <ArrowUpRightIcon size={13} />
                </Group>
              </Anchor>
            ) : (
              <Text size="sm">{value}</Text>
            )}
          </Stack>
        ))}
      </Stack>
    </Reveal>
  )
}
