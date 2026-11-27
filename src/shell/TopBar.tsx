import { AppShell, Group } from '@mantine/core'
import { SHELL_BREAKPOINT } from './breakpoint'
import { Identity } from './Identity'

/** The phone top bar below the shell's breakpoint: who the site belongs to. The settings are in the tab bar's More sheet. */
export function TopBar() {
  return (
    <AppShell.Header hiddenFrom={SHELL_BREAKPOINT}>
      <Group h="100%" px="md" wrap="nowrap">
        <Identity />
      </Group>
    </AppShell.Header>
  )
}
