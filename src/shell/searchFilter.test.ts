import { describe, expect, it } from 'vite-plus/test'
import { filterSearchGroups, type Searchable, type SearchGroup } from './searchFilter'

const groups: SearchGroup<Searchable>[] = [
  {
    label: 'Pages',
    entries: [{ label: 'Overview' }, { label: 'Über mich' }, { label: 'Kontakt' }],
  },
  {
    label: 'Projects',
    entries: [
      { label: 'Tattoo Booking Portal', description: 'Bookings for a self-run studio' },
      { label: 'Self-Engine', description: 'A personal operating system', keywords: ['React'] },
    ],
  },
  { label: 'Empty', entries: [] },
]

const labels = (found: SearchGroup<Searchable>[]) =>
  found.map((group) => [group.label, group.entries.map((entry) => entry.label)])

describe('filterSearchGroups', () => {
  it('keeps every entry for an empty query, but no empty group', () => {
    expect(labels(filterSearchGroups('  ', groups))).toEqual([
      ['Pages', ['Overview', 'Über mich', 'Kontakt']],
      ['Projects', ['Tattoo Booking Portal', 'Self-Engine']],
    ])
  })

  it('ignores case and accents', () => {
    expect(labels(filterSearchGroups('UBER', groups))).toEqual([['Pages', ['Über mich']]])
  })

  it('finds an entry by its description and keywords, every word anywhere', () => {
    expect(labels(filterSearchGroups('react system', groups))).toEqual([
      ['Projects', ['Self-Engine']],
    ])
  })

  it('lists label matches before other matches', () => {
    expect(labels(filterSearchGroups('book', groups))).toEqual([
      ['Projects', ['Tattoo Booking Portal']],
    ])
    expect(labels(filterSearchGroups('self', groups))).toEqual([
      ['Projects', ['Self-Engine', 'Tattoo Booking Portal']],
    ])
  })

  it('finds nothing for a query nothing holds', () => {
    expect(filterSearchGroups('kubernetes', groups)).toEqual([])
  })
})
