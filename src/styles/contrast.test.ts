import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vite-plus/test'
import { CHROME_COLORS, THEMES, type Theme } from '#/theme/theme'

/**
 * WCAG AA for text in both themes: every text colour token on every
 * background token of src/styles/app.css reaches 4.5:1. Tokens are written
 * `--name: light-dark(<light>, <dark>)` with hex colours.
 */
const css = readFileSync(new URL('./app.css', import.meta.url), 'utf8')

function token(name: string, theme: Theme) {
  const match = css.match(
    new RegExp(`--${name}:\\s*light-dark\\((#[0-9a-f]{6}),\\s*(#[0-9a-f]{6})\\)`),
  )
  if (!match) throw new Error(`--${name} is not a light-dark() pair of hex colours`)
  return theme === 'light' ? match[1] : match[2]
}

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (light + 0.05) / (dark + 0.05)
}

describe('Theme colours', () => {
  it('computes contrast like WCAG', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21)
    expect(contrast('#767676', '#ffffff')).toBeCloseTo(4.54, 2)
  })

  const pairs = THEMES.flatMap((theme) =>
    ['ink', 'muted', 'subtle'].flatMap((text) =>
      ['canvas', 'sidebar', 'surface'].map((background) => [theme, text, background] as const),
    ),
  )
  it.each(pairs)('%s: --%s on --%s reaches AA (4.5:1)', (theme, text, background) => {
    expect(contrast(token(text, theme), token(background, theme))).toBeGreaterThanOrEqual(4.5)
  })

  it.each(THEMES)(
    '%s: the Availability text reaches AA on its card (and the CV button, inverted)',
    (theme) => {
      expect(
        contrast(token('available', theme), token('available-surface', theme)),
      ).toBeGreaterThanOrEqual(4.5)
    },
  )

  // Field messages sit on a Tile (--surface); the send error on its own --danger-surface.
  it.each(
    THEMES.flatMap((theme) => [[theme, 'surface'] as const, [theme, 'danger-surface'] as const]),
  )("%s: the contact form's --danger text reaches AA on --%s", (theme, background) => {
    expect(contrast(token('danger', theme), token(background, theme))).toBeGreaterThanOrEqual(4.5)
  })
})

describe('Browser chrome colour', () => {
  it.each(THEMES)('%s: matches the sidebar and top bar (--sidebar)', (theme) => {
    expect(CHROME_COLORS[theme]).toBe(token('sidebar', theme))
  })
})
