import { useId } from 'react'
import { useLingui } from '@lingui/react/macro'
import { useTheme } from '#/theme/react'
import { THEME_PREFERENCES, type ThemePreference } from '#/theme/theme'
import { SEGMENT, SEGMENTED_TRACK } from './segmented'

/**
 * Picks the theme: System (the default), Light or Dark. A choice overrides the
 * system setting and is remembered on the device; System goes back to it.
 */
export function ThemeSwitch() {
  const { t } = useLingui()
  const { preference, choose } = useTheme()
  const group = useId()
  const labels: Record<ThemePreference, string> = {
    system: t`System`,
    light: t`Light`,
    dark: t`Dark`,
  }
  return (
    <div role="radiogroup" aria-label={t`Theme`} className={SEGMENTED_TRACK}>
      {THEME_PREFERENCES.map((option) => (
        <label
          key={option}
          className={`${SEGMENT} has-focus-visible:outline-2 has-focus-visible:outline-focus`}
        >
          <input
            type="radio"
            name={group}
            checked={preference === option}
            onChange={() => choose(option)}
            className="sr-only"
          />
          {labels[option]}
        </label>
      ))}
    </div>
  )
}
