import type { ComponentProps } from 'react'
import { Table } from '@mantine/core'

/** Narrower than this a story's table scrolls sideways instead of squeezing its columns. */
const MIN_WIDTH = 560

/**
 * A Markdown table in a story (`| who | sees |`), as the site's table; on
 * phones it scrolls sideways on its own, so the page never does.
 */
export function StoryTable(props: ComponentProps<'table'>) {
  return (
    <Table.ScrollContainer minWidth={MIN_WIDTH} mt="md">
      <Table {...props} />
    </Table.ScrollContainer>
  )
}

/** The parts of a Markdown table, as the site's table parts. */
export const storyTableParts = {
  table: StoryTable,
  thead: Table.Thead,
  tbody: Table.Tbody,
  tr: Table.Tr,
  th: Table.Th,
  td: Table.Td,
}
