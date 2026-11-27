import { describe, expect, it } from 'vite-plus/test'
import { renderToStaticMarkup } from 'react-dom/server'
import Story, { sections } from '#/test/fixtures/story.mdx'
import { sectionId } from './storySections'

describe('A compiled story', () => {
  it('exports its sections: the text of each `##` heading and a unique, plain id', () => {
    expect(sections).toEqual([
      { id: 'what-it-is', title: 'What it is' },
      { id: 'was-die-websites-koennen', title: 'Was die Websites können' },
      { id: 'what-it-is-2', title: 'What it is' },
      { id: 'ca-marche', title: 'Ça marche' },
    ])
  })

  it('renders each section heading with its id, as a target that can take the focus', () => {
    const html = renderToStaticMarkup(<Story />)

    expect(html).toContain('<h2 id="what-it-is" tabindex="-1">What it <em>is</em></h2>')
    expect(html).toContain('<h2 id="what-it-is-2" tabindex="-1">What it is</h2>')
    expect(html).toContain('<h3>A detail, not a section</h3>')
  })
})

describe('A section id', () => {
  it.each([
    ['Wer sieht was', 'wer-sieht-was'],
    ['Straße & Größe', 'strasse-groesse'],
    ['  Now: an open-source rebuild!  ', 'now-an-open-source-rebuild'],
    ['???', 'section'],
  ])('of "%s" is %s', (title, id) => {
    expect(sectionId(title, new Set())).toBe(id)
  })

  it('counts up past the ids already taken', () => {
    expect(sectionId('Setup', new Set(['setup', 'setup-2']))).toBe('setup-3')
  })
})
