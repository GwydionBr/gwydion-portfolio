import { useLingui } from '@lingui/react/macro'
import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from '#/theme/react'

/**
 * Switches between the light and the dark theme. Pressed means dark. The
 * choice overrides the system setting and is remembered on the device.
 */
export function ThemeToggle() {
  const { t } = useLingui()
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      aria-pressed={theme === 'dark'}
      aria-label={t`Dark theme`}
      onClick={toggle}
      className="rounded-md p-1.5 text-subtle hover:bg-hover hover:text-ink"
    >
      {/* The icon follows the stylesheet, so it is right before hydration too. */}
      <Sun aria-hidden className="size-4 dark:hidden" />
      <Moon aria-hidden className="hidden size-4 dark:block" />
    </button>
  )
}
