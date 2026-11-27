import { AppShell, Group } from '@mantine/core'
import { SHELL_BREAKPOINT } from './breakpoint'
import { Identity } from './Identity'
import { LanguageSwitch } from './LanguageSwitch'

/** The phone top bar below the shell's breakpoint: identity and the Site language switch, which the sidebar holds on desktop. */
export function TopBar() {
  return (
    <AppShell.Header hiddenFrom={SHELL_BREAKPOINT}>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap" gap="sm">
        <Identity />
        <LanguageSwitch short />
      </Group>
    </AppShell.Header>
  )
}
