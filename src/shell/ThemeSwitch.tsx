import { useId } from 'react'
import { useLingui } from '@lingui/react/macro'
import { useTheme } from '#/theme/react'
import { THEME_PREFERENCES, type ThemePreference } from '#/theme/theme'
import classes from './Segmented.module.css'

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
    <div role="radiogroup" aria-label={t`Theme`} className={classes.track}>
      {THEME_PREFERENCES.map((option) => (
        <label key={option} className={classes.segment}>
          <input
            type="radio"
            name={group}
            checked={preference === option}
            onChange={() => choose(option)}
            className={classes.radio}
          />
          {labels[option]}
        </label>
      ))}
    </div>
  )
}
