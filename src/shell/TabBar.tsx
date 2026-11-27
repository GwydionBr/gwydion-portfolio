import type { CSSProperties } from 'react'
import { useLingui } from '@lingui/react/macro'
import { AppShell, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { DotsThreeCircle, type Icon } from '@phosphor-icons/react'
import { SHELL_BREAKPOINT, useCloseWhenHidden } from './breakpoint'
import { MoreSheet } from './MoreSheet'
import { useNavigationEntries } from './navigation'
import { NavigationLink } from './NavigationLink'
import classes from './TabBar.module.css'

/**
 * The phone tab bar below the shell's breakpoint, in place of the sidebar:
 * the same navigation entries, then More, which opens the sheet with the
 * rest of the sidebar.
 */
export function TabBar() {
  const { t } = useLingui()
  const entries = useNavigationEntries()
  const [moreOpened, more] = useDisclosure(false)
  // The sheet closes when the window gets wide enough for the sidebar.
  useCloseWhenHidden('tabBar', more.close)
  return (
    <AppShell.Footer hiddenFrom={SHELL_BREAKPOINT}>
      <nav aria-label={t`Tab bar`}>
        <ul className={classes.tabs} style={{ '--tab-count': entries.length + 1 } as CSSProperties}>
          {entries.map((entry) => (
            <li key={entry.to} className={classes.item}>
              <NavigationLink entry={entry} className={classes.tab}>
                {(label) => <TabFace icon={entry.icon} label={label} />}
              </NavigationLink>
            </li>
          ))}
          <li className={classes.item}>
            <UnstyledButton
              className={classes.tab}
              aria-haspopup="dialog"
              aria-expanded={moreOpened}
              onClick={more.open}
            >
              <TabFace icon={DotsThreeCircle} label={t`More`} />
            </UnstyledButton>
          </li>
        </ul>
      </nav>
      <MoreSheet opened={moreOpened} onClose={more.close} />
    </AppShell.Footer>
  )
}

/** A tab's icon, outlined or filled while current, over its label. */
function TabFace({ icon: TabIcon, label }: { icon: Icon; label: string }) {
  return (
    <>
      <span className={classes.icons}>
        <TabIcon aria-hidden className={classes.outline} />
        <TabIcon aria-hidden weight="fill" className={classes.filled} />
      </span>
      <span className={classes.label}>{label}</span>
    </>
  )
}
