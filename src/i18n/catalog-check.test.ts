import { describe, expect, it } from 'vite-plus/test'
import { checkCatalogs, type CatalogEntry } from './catalog-check'

const entry = (message: string, translation: string, context?: string): CatalogEntry => ({
  message,
  translation,
  context,
})

describe('checkCatalogs', () => {
  it('accepts complete catalogs with matching placeholders', () => {
    expect(
      checkCatalogs({
        catalogs: {
          en: [entry('Hello {name}', 'Hello {name}')],
          de: [entry('Hello {name}', 'Hallo {name}')],
        },
      }),
    ).toEqual([])
  })

  it('fails on a missing German translation', () => {
    expect(
      checkCatalogs({
        catalogs: {
          en: [entry('Projects', 'Projects'), entry('Get in touch', 'Get in touch')],
          de: [entry('Projects', 'Projekte'), entry('Get in touch', '', 'primary action')],
        },
      }),
    ).toEqual(['de: "Get in touch" (primary action) is not translated'])
  })

  it("fails when a translation's placeholders differ from the message", () => {
    expect(
      checkCatalogs({
        catalogs: {
          en: [entry('Hello {name}', 'Hello {name}')],
          de: [entry('Hello {name}', 'Hallo {nme}')],
        },
      }),
    ).toEqual(['de: "Hello {name}" has placeholders {nme}, the message has {name}'])
  })

  it('compares the numbered tags of rich-text messages too', () => {
    expect(
      checkCatalogs({
        catalogs: {
          en: [entry('Read the <0>CV</0>', 'Read the <0>CV</0>')],
          de: [entry('Read the <0>CV</0>', 'Lies den Lebenslauf')],
        },
      }),
    ).toEqual(['de: "Read the <0>CV</0>" has placeholders (none), the message has <0>'])
  })

  it('fails on invalid ICU syntax', () => {
    const errors = checkCatalogs({
      catalogs: {
        en: [
          entry('{count, plural, one {# project} other {# projects}}', '{count, plural, one {#}'),
        ],
        de: [],
      },
    })
    expect(errors).toHaveLength(1)
    expect(errors[0]).toMatch(/^en: "\{count, plural.*" is not valid ICU: /)
  })
})
