import { createTheme, rem } from '@mantine/core'

export const theme = createTheme({
  // ── Typography ─────────────────────────────────────────────────────
  fontFamily: 'var(--font-body)',
  fontFamilyMonospace: 'var(--font-mono)',
  headings: {
    fontFamily: 'var(--font-display)',
    fontWeight: '400',
    sizes: {
      h1: { fontSize: rem(72), lineHeight: '1.0' },
      h2: { fontSize: rem(48), lineHeight: '1.1' },
      h3: { fontSize: rem(32), lineHeight: '1.2' },
    },
  },

  // ── Color palette ───────────────────────────────────────────────────
  colors: {
    forest: [
      '#f0f7f3', // 0 – lightest
      '#d5eade', // 1
      '#a8d4b8', // 2
      '#72bc91', // 3
      '#4aa870', // 4
      '#2d8a55', // 5
      '#1f6e42', // 6 – primary
      '#165230', // 7
      '#0e3820', // 8
      '#072014', // 9 – darkest
    ],
    gold: [
      '#fdf8ed', // 0
      '#f8edca', // 1
      '#f0d87a', // 2
      '#e8c46a', // 3
      '#dba83e', // 4
      '#c8941a', // 5 – primary gold
      '#a87810', // 6
      '#865e0a', // 7
      '#634506', // 8
      '#3d2b03', // 9
    ],
    dark: [
      '#e6ede9', // 0 – text primary dark mode
      '#8da896', // 1 – text secondary
      '#506458', // 2 – text muted
      '#1e2d28', // 3 – borders
      '#1a2520', // 4 – surface hover
      '#141d1a', // 5 – elevated surface
      '#0f1612', // 6 – base bg
      '#0b100e', // 7 – deepest
      '#080d0b', // 8
      '#050807', // 9
    ],
  },

  primaryColor: 'forest',
  primaryShade: { light: 6, dark: 4 },

  // ── Spacing & radius ────────────────────────────────────────────────
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(20),
    lg: rem(32),
    xl: rem(52),
  },
  radius: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(20),
    xl: rem(32),
  },

  // ── Component defaults ──────────────────────────────────────────────
  components: {
    Button: {
      defaultProps: { radius: 'sm' },
    },
    TextInput: {
      defaultProps: { radius: 'sm' },
    },
    Textarea: {
      defaultProps: { radius: 'sm' },
    },
  },
})
