import { useId, type ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Stack, Text } from '@mantine/core'
import { LanguageSwitch } from './LanguageSwitch'
import { ThemeSwitch } from './ThemeSwitch'

/**
 * The visitor's settings, the Site language and the theme, each under a
 * visible label that names it. The desktop sidebar opens them from its
 * settings button, phones from the More sheet.
 */
export function SiteSettings() {
  const { t } = useLingui()
  return (
    <Stack gap="md">
      <Setting label={t`Site language`}>{(id) => <LanguageSwitch labelledBy={id} />}</Setting>
      <Setting label={t`Theme`}>{(id) => <ThemeSwitch labelledBy={id} />}</Setting>
    </Stack>
  )
}

/** One setting: its label, then the control the label names (given the label's id). */
function Setting({ label, children }: { label: string; children: (id: string) => ReactNode }) {
  const id = useId()
  return (
    <Stack gap={6}>
      <Text id={id} size="xs" fw={500} c="var(--subtle)">
        {label}
      </Text>
      {children(id)}
    </Stack>
  )
}
