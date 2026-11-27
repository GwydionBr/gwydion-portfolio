import { useLingui } from '@lingui/react/macro'
import { SegmentedControl } from '@mantine/core'
import { useTheme } from '#/theme/react'
import { THEME_PREFERENCES, type ThemePreference } from '#/theme/theme'

/**
 * Picks the theme: System (the default), Light or Dark. A choice overrides the
 * system setting and is remembered on the device; System goes back to it.
 * Until the page knows the preference (it lives on the device) no option is
 * picked. `labelledBy` is the id of the visible label that names it.
 */
export function ThemeSwitch({ labelledBy }: { labelledBy: string }) {
  const { preference, choose } = useTheme()
  const labels = useThemePreferenceLabels()
  return (
    <SegmentedControl
      aria-labelledby={labelledBy}
      value={preference ?? ''}
      onChange={(value) => choose(value as ThemePreference)}
      data={THEME_PREFERENCES.map((option) => ({ value: option, label: labels[option] }))}
    />
  )
}

/** What each theme preference is called. */
export function useThemePreferenceLabels(): Record<ThemePreference, string> {
  const { t } = useLingui()
  return { system: t`System`, light: t`Light`, dark: t`Dark` }
}
