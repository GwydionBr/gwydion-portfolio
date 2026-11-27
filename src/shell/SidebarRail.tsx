import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { ActionIcon, Group, Text, Tooltip } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { SidebarSimple } from '@phosphor-icons/react'
import { useShellNavigation } from './breakpoint'
import { useShortcutLabel } from './shortcut'
import {
  SIDEBAR_ARIA_SHORTCUTS,
  SIDEBAR_ICON_SIZE,
  SIDEBAR_SHORTCUT,
  toggleSidebar,
  useSidebarCollapsed,
} from './sidebarLayout'

/** A tooltip beside the sidebar, shown on hover and on keyboard focus. */
const TOOLTIP = { position: 'right', events: { hover: true, focus: true, touch: false } } as const

/**
 * Names a sidebar row in a tooltip while the sidebar is collapsed to its icon
 * rail, where the row shows only its icon (its label stays, unseen, as its
 * accessible name). `disabled` holds it back, say while the row's own panel
 * is open.
 */
export function RailTooltip({
  label,
  disabled = false,
  children,
}: {
  label: string
  disabled?: boolean
  children: ReactNode
}) {
  const collapsed = useSidebarCollapsed()
  return (
    <Tooltip label={label} disabled={!collapsed || disabled} {...TOOLTIP}>
      <div>{children}</div>
    </Tooltip>
  )
}

/**
 * The button that collapses the sidebar to its icon rail and opens it again,
 * also on ⌘B (Ctrl+B) while the sidebar is shown. Its tooltip names it with
 * the shortcut.
 */
export function SidebarToggle({ className }: { className?: string }) {
  const { t } = useLingui()
  const collapsed = useSidebarCollapsed()
  const shortcut = useShortcutLabel('B')
  const sidebarShown = useShellNavigation() === 'sidebar'
  useHotkeys(sidebarShown ? [[SIDEBAR_SHORTCUT, toggleSidebar]] : [])
  const label = collapsed ? t`Expand sidebar` : t`Collapse sidebar`
  return (
    <Tooltip
      label={
        <Group gap={6} wrap="nowrap">
          {label}
          {shortcut && (
            <Text span inherit opacity={0.6}>
              {shortcut}
            </Text>
          )}
        </Group>
      }
      {...TOOLTIP}
    >
      <ActionIcon
        variant="subtle"
        onClick={toggleSidebar}
        aria-label={label}
        aria-keyshortcuts={SIDEBAR_ARIA_SHORTCUTS}
        className={className}
      >
        <SidebarSimple aria-hidden size={SIDEBAR_ICON_SIZE} />
      </ActionIcon>
    </Tooltip>
  )
}
