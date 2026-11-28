import { Box, Group, Text, type MantineSpacing } from '@mantine/core'
import { useLingui } from '@lingui/react/macro'
import { CheckCircle } from '@phosphor-icons/react'
import type { Project } from '#/content'

/** How each look draws the check beside a key point. */
const LOOKS = {
  lead: { check: 18, weight: 'fill', color: 'var(--available)', gap: 'sm' },
  quiet: { check: 14, weight: 'regular', color: 'var(--subtle)', gap: 8 },
} as const

/**
 * A Project's key points, each beside a check, as a list named "Key
 * points". `lead` as its page opens: larger, green checks; `quiet` on its
 * Overview card: small, grey checks. `className` lays the list out (one
 * column by default).
 */
export function KeyPoints({
  points,
  look,
  mt,
  className,
}: {
  points: Project['keyPoints']
  look: keyof typeof LOOKS
  mt?: MantineSpacing
  className?: string
}) {
  const { t } = useLingui()
  const { check, weight, color, gap } = LOOKS[look]
  return (
    <Box
      component="ul"
      role="list"
      aria-label={t`Key points`}
      display={className ? undefined : 'grid'}
      m={0}
      mt={mt}
      p={0}
      style={{ listStyle: 'none', rowGap: className ? undefined : 8 }}
      className={className}
    >
      {points.map((point) => (
        <Group component="li" key={point} gap={gap} wrap="nowrap" align="flex-start">
          {/* Beside the point's first line. */}
          <CheckCircle
            aria-hidden
            size={check}
            weight={weight}
            color={color}
            style={{ flexShrink: 0, marginTop: look === 'lead' ? 2 : 3 }}
          />
          <Text c="var(--ink)">{point}</Text>
        </Group>
      ))}
    </Box>
  )
}
