/** What the search reads of an entry: what it is called, and what else finds it. */
export interface Searchable {
  label: string
  description?: string
  /** Words that find it without being shown, such as a Project's stack. */
  keywords?: readonly string[]
}

/** A heading in the search results and the entries under it. */
export interface SearchGroup<Entry extends Searchable> {
  label: string
  entries: Entry[]
}

/** `text` as the search compares it: lower case, accents gone ("Über" → "uber"). */
function folded(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase()
}

/**
 * The entries matching `query`, in their groups; a group with none left is
 * left out. An entry matches when every word of the query appears in its
 * label, description or keywords, whatever the case or accents ("uber" finds
 * "Über mich"). Within a group, entries whose label holds the whole query come
 * first. An empty query matches everything.
 */
export function filterSearchGroups<Entry extends Searchable>(
  query: string,
  groups: readonly SearchGroup<Entry>[],
): SearchGroup<Entry>[] {
  const wanted = folded(query.trim())
  if (!wanted) return groups.filter((group) => group.entries.length > 0)
  const words = wanted.split(/\s+/)
  return groups
    .map((group) => {
      const byLabel: Entry[] = []
      const byRest: Entry[] = []
      for (const entry of group.entries) {
        const label = folded(entry.label)
        const text = [label, entry.description, ...(entry.keywords ?? [])]
          .filter((part): part is string => Boolean(part))
          .map(folded)
          .join(' ')
        if (!words.every((word) => text.includes(word))) continue
        ;(label.includes(wanted) ? byLabel : byRest).push(entry)
      }
      return { label: group.label, entries: [...byLabel, ...byRest] }
    })
    .filter((group) => group.entries.length > 0)
}
