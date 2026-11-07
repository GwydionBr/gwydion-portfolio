import { Tooltip } from '@base-ui/react/tooltip'
import { useLingui } from '@lingui/react/macro'

/** Where search (⌘K) will open; a placeholder until it exists (spec #31). */
export function SearchPlaceholder() {
  const { t } = useLingui()
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          aria-disabled
          className="my-3 flex w-full cursor-not-allowed items-center justify-between rounded-lg bg-surface px-3 py-1.5 text-subtle ring-1 ring-line"
        >
          {t`Search`}
          <kbd className="font-sans text-xs">⌘K</kbd>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side="right" sideOffset={8}>
            <Tooltip.Popup className="rounded-md bg-ink px-2 py-1 text-xs text-canvas">
              {t`Search is coming soon`}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
