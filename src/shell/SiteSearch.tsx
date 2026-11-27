import { useCallback, useEffect, useId, useState } from 'react'
import { useLingui } from '@lingui/react/macro'
import { ActionIcon, Input, Kbd } from '@mantine/core'
import { useOs } from '@mantine/hooks'
import { createSpotlight, Spotlight, useSpotlight } from '@mantine/spotlight'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useSearchGroups } from './searchEntries'
import { filterSearchGroups } from './searchFilter'

const [searchStore, search] = createSpotlight()

/** The keyboard shortcut that opens the search: ⌘K, Ctrl+K off Apple devices. */
const SHORTCUT = 'mod + K'
const ARIA_SHORTCUTS = 'Meta+K Control+K'

/**
 * The site search (Mantine Spotlight): a dialog that finds the views,
 * Projects, ways to get in touch and settings (`useSearchGroups`) as the
 * visitor types, and runs the one chosen. The arrow keys move through the
 * results and Enter runs the selected one; to a screen reader the field is a
 * combobox over a listbox of them. Rendered once, by the app shell.
 */
export function SiteSearch() {
  const { t } = useLingui()
  const { query } = useSpotlight(searchStore)
  const [activeId, observeList] = useSelectedOption()
  const groups = filterSearchGroups(query, useSearchGroups())
  // Mantine finds the list with a CSS selector: an id without React's special characters.
  const listId = `search-${useId().replace(/[^\w-]/g, '')}`
  const optionId = (index: number) => `${listId}-${index}`
  const count = groups.reduce((sum, group) => sum + group.entries.length, 0)
  // Gone with the shell, it starts afresh when the shell comes back.
  useEffect(
    () => () =>
      searchStore.updateState((state) => ({ ...state, opened: false, query: '', selected: -1 })),
    [],
  )
  let index = 0
  return (
    <Spotlight.Root
      store={searchStore}
      shortcut={SHORTCUT}
      // Names the dialog; the theme hides it, the field says the same.
      title={t`Search`}
      scrollable
      maxHeight={440}
    >
      <Spotlight.Search
        data-autofocus
        role="combobox"
        aria-label={t`Search`}
        aria-autocomplete="list"
        aria-expanded={count > 0}
        aria-controls={count > 0 ? listId : undefined}
        aria-activedescendant={activeId}
        placeholder={t`Pages, projects, settings…`}
        leftSection={<MagnifyingGlass aria-hidden size={20} />}
      />
      {count > 0 ? (
        <Spotlight.ActionsList ref={observeList} id={listId} role="listbox" aria-label={t`Results`}>
          {groups.map((group) => (
            <Spotlight.ActionsGroup
              key={group.label}
              label={group.label}
              role="group"
              aria-label={group.label}
            >
              {group.entries.map((entry) => {
                const id = optionId(index++)
                return (
                  <Spotlight.Action
                    key={entry.id}
                    // Spotlight keeps an `id` prop to itself; the field points at this one.
                    renderRoot={(props) => <button {...props} id={id} />}
                    role="option"
                    aria-selected={id === activeId}
                    label={entry.label}
                    description={entry.description}
                    leftSection={entry.leading}
                    rightSection={entry.trailing}
                    onClick={entry.run}
                  />
                )
              })}
            </Spotlight.ActionsGroup>
          ))}
        </Spotlight.ActionsList>
      ) : (
        <Spotlight.Empty>{t`Nothing found`}</Spotlight.Empty>
      )}
    </Spotlight.Root>
  )
}

/**
 * The id of the result Spotlight has selected, and the ref for its list.
 * Spotlight marks the selected result in the document (`data-selected`) as
 * the arrow keys move and the query changes, without telling React; this
 * watches the list so the field and the results can say which it is.
 */
function useSelectedOption() {
  const [activeId, setActiveId] = useState<string>()
  const observeList = useCallback((list: HTMLDivElement | null) => {
    if (!list) return
    const read = () => setActiveId(list.querySelector('[data-selected]')?.id || undefined)
    read()
    const observer = new MutationObserver(read)
    observer.observe(list, { subtree: true, childList: true, attributeFilter: ['data-selected'] })
    return () => {
      observer.disconnect()
      setActiveId(undefined)
    }
  }, [])
  return [activeId, observeList] as const
}

/** The shortcut as this device writes it; unknown until the page knows the device. */
function useShortcutLabel(): string | undefined {
  const os = useOs()
  if (os === 'undetermined') return undefined
  return os === 'macos' || os === 'ios' ? '⌘ K' : 'Ctrl K'
}

/** The sidebar's way into the search: a button shaped like a search field, naming the shortcut. */
export function SearchField() {
  const { t } = useLingui()
  const shortcut = useShortcutLabel()
  return (
    <Input
      component="button"
      type="button"
      pointer
      onClick={search.open}
      aria-haspopup="dialog"
      aria-keyshortcuts={ARIA_SHORTCUTS}
      leftSection={<MagnifyingGlass aria-hidden size={16} />}
      rightSection={shortcut && <Kbd aria-hidden>{shortcut}</Kbd>}
      rightSectionWidth={56}
      rightSectionPointerEvents="none"
    >
      <Input.Placeholder>{t`Search`}</Input.Placeholder>
    </Input>
  )
}

/** The phone top bar's way into the search. */
export function SearchButton() {
  const { t } = useLingui()
  return (
    <ActionIcon
      onClick={search.open}
      aria-label={t`Search`}
      aria-haspopup="dialog"
      size="lg"
      variant="subtle"
    >
      <MagnifyingGlass aria-hidden size={20} />
    </ActionIcon>
  )
}
