import { AppShell, Group } from '@mantine/core'
import { SHELL_BREAKPOINT } from './breakpoint'
import { Identity } from './Identity'
import { SearchButton } from './SiteSearch'

/** The phone top bar below the shell's breakpoint: who the site belongs to, and the search. The settings are in the tab bar's More sheet. */
export function TopBar() {
  return (
    <AppShell.Header hiddenFrom={SHELL_BREAKPOINT}>
      <Group h="100%" px="md" wrap="nowrap" justify="space-between">
        <Identity />
        <SearchButton />
      </Group>
    </AppShell.Header>
  )
}
