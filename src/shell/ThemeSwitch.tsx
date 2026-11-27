import { useLingui } from '@lingui/react/macro'
import { SegmentedControl } from '@mantine/core'
import { useTheme } from '#/theme/react'
import { THEME_PREFERENCES, type ThemePreference } from '#/theme/theme'

/**
 * Picks the theme: System (the default), Light or Dark. A choice overrides the
 * system setting and is remembered on the device; System goes back to it.
 * Until the page knows the preference (it lives on the device) no option is
 * picked.
 */
export function ThemeSwitch() {
  const { t } = useLingui()
  const { preference, choose } = useTheme()
  const labels: Record<ThemePreference, string> = {
    system: t`System`,
    light: t`Light`,
    dark: t`Dark`,
  }
  return (
    <SegmentedControl
      aria-label={t`Theme`}
      value={preference ?? ''}
      onChange={(value) => choose(value as ThemePreference)}
      data={THEME_PREFERENCES.map((option) => ({ value: option, label: labels[option] }))}
    />
  )
}
