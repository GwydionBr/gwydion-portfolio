import { useOs } from '@mantine/hooks'

/**
 * A ⌘-key shortcut (`mod + <key>` to Mantine) as this device writes it:
 * "⌘ K" on Apple devices, "Ctrl K" elsewhere; unknown until the page knows
 * the device.
 */
export function useShortcutLabel(key: string): string | undefined {
  const os = useOs()
  if (os === 'undetermined') return undefined
  return os === 'macos' || os === 'ios' ? `⌘ ${key}` : `Ctrl ${key}`
}
