import { Stack, Text } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { Reveal } from '#/shared/motion'
import { Eyebrow } from '#/shared/ui/Page'

export function SelfEngineProblem() {
  return (
    <Reveal trigger="inView" distance={16} style={{ marginBottom: 96 }}>
      <Eyebrow mb={24}>{m.cs_problem_heading()}</Eyebrow>
      <Stack gap="md" maw={760}>
        <Text component="p" size="md" lh={1.8} c="var(--app-text-secondary)">
          {m.cs_problem_p1()}
        </Text>
        <Text component="p" size="md" lh={1.8} c="var(--app-text-secondary)">
          {m.cs_problem_p2()}
        </Text>
      </Stack>
    </Reveal>
  )
}
