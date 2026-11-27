import type { Heading, Root, RootContent } from 'mdast'
import { toString } from 'mdast-util-to-string'

/** One section of a Project's story: the text of its heading, and the id the heading carries. */
export interface StorySection {
  /** Unique within the story; the address of the section (`#what-it-is`). */
  id: string
  title: string
}

/** German letters as they are written without umlauts. */
const GERMAN_LETTERS: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' }

/**
 * The id of a heading titled `title`, plain ASCII so an address with it reads
 * the same everywhere: lower case, words joined by hyphens, German letters
 * written out ("Was die Websites können" → `was-die-websites-koennen`), other
 * accents dropped, and a number added when `taken` has it already.
 */
export function sectionId(title: string, taken: ReadonlySet<string>): string {
  const base =
    title
      .toLowerCase()
      .replace(/[äöüß]/g, (letter) => GERMAN_LETTERS[letter]!)
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'section'
  let id = base
  for (let number = 2; taken.has(id); number++) id = `${base}-${number}`
  return id
}

const isSectionHeading = (node: RootContent): node is Heading =>
  node.type === 'heading' && node.depth === 2

/**
 * A remark plugin for the Project stories (MDX, compiled in vite.config.ts):
 * gives each section heading (`##`) its id, as a jump target, and exports the
 * sections from the story module (`export const sections`), so a page knows
 * them before it renders, on the server too.
 */
export function remarkStorySections() {
  return (tree: Root) => {
    const sections: StorySection[] = []
    const taken = new Set<string>()
    for (const node of tree.children.filter(isSectionHeading)) {
      const title = toString(node)
      const id = sectionId(title, taken)
      taken.add(id)
      sections.push({ id, title })
      // tabIndex -1: a jump to the section can move the focus to its heading.
      node.data = { ...node.data, hProperties: { id, tabIndex: -1 } }
    }
    tree.children.push(exportConst('sections', sections) as unknown as RootContent)
  }
}

/** An MDX ESM node (remark-mdx) for `export const <name> = <value>`, `value` being plain data. */
function exportConst(name: string, value: unknown) {
  return {
    type: 'mdxjsEsm',
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            specifiers: [],
            source: null,
            attributes: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name },
                  init: literal(value),
                },
              ],
            },
          },
        ],
      },
    },
  }
}

/** `value` (strings, numbers, booleans, null, arrays and plain objects of them) as an ESTree expression. */
function literal(value: unknown): object {
  if (Array.isArray(value)) return { type: 'ArrayExpression', elements: value.map(literal) }
  if (value !== null && typeof value === 'object')
    return {
      type: 'ObjectExpression',
      properties: Object.entries(value).map(([key, field]) => ({
        type: 'Property',
        kind: 'init',
        method: false,
        shorthand: false,
        computed: false,
        key: { type: 'Literal', value: key },
        value: literal(field),
      })),
    }
  return { type: 'Literal', value }
}
