import type { CSSProperties } from 'react'
import { useLingui } from '@lingui/react/macro'
import { AppShell } from '@mantine/core'
import { SHELL_BREAKPOINT } from './breakpoint'
import { useNavigationEntries } from './navigation'
import { NavigationLink } from './NavigationLink'
import classes from './TabBar.module.css'

/**
 * The phone tab bar below the shell's breakpoint, in place of the sidebar:
 * the same navigation entries.
 */
export function TabBar() {
  const { t } = useLingui()
  const entries = useNavigationEntries()
  return (
    <AppShell.Footer hiddenFrom={SHELL_BREAKPOINT}>
      <nav aria-label={t`Tab bar`}>
        <ul className={classes.tabs} style={{ '--tab-count': entries.length } as CSSProperties}>
          {entries.map((entry) => (
            <li key={entry.to} className={classes.item}>
              <NavigationLink entry={entry} className={classes.tab}>
                {(label) => (
                  <>
                    <span className={classes.icons}>
                      <entry.icon aria-hidden className={classes.outline} />
                      <entry.icon aria-hidden weight="fill" className={classes.filled} />
                    </span>
                    <span className={classes.label}>{label}</span>
                  </>
                )}
              </NavigationLink>
            </li>
          ))}
        </ul>
      </nav>
    </AppShell.Footer>
  )
}
