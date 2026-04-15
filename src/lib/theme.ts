import { createTheme, rem, type CSSVariablesResolver } from '@mantine/core'

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
    paper: [
      '#f7f3ea',
      '#f3efe4',
      '#ebe6da',
      '#e3ddd0',
      '#d4ccbd',
      '#b9af9e',
      '#968b7a',
      '#6f6658',
      '#4a4339',
      '#29241e',
    ],
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
  defaultRadius: 'sm',

  shadows: {
    xs: '0 1px 2px color-mix(in srgb, var(--mantine-color-black) 8%, transparent)',
    sm: '0 8px 24px color-mix(in srgb, var(--mantine-color-black) 10%, transparent)',
    md: '0 14px 40px color-mix(in srgb, var(--mantine-color-black) 12%, transparent)',
    lg: '0 22px 70px color-mix(in srgb, var(--mantine-color-black) 14%, transparent)',
    xl: '0 28px 96px color-mix(in srgb, var(--mantine-color-black) 18%, transparent)',
  },

  // ── Component defaults ──────────────────────────────────────────────
  components: {
    ActionIcon: {
      defaultProps: { radius: 'sm', variant: 'default' },
      styles: {
        root: {
          borderColor: 'var(--app-border)',
          color: 'var(--app-text-muted)',
          background: 'transparent',
        },
      },
    },
    Anchor: {
      defaultProps: { underline: 'hover' },
      styles: {
        root: {
          color: 'var(--app-accent-green)',
        },
      },
    },
    Badge: {
      defaultProps: { radius: 'sm', variant: 'light' },
      styles: {
        root: {
          fontFamily: 'var(--font-mono)',
          fontWeight: 400,
          letterSpacing: '0.04em',
          textTransform: 'none',
        },
      },
    },
    Button: {
      defaultProps: { radius: 'sm' },
      styles: {
        root: {
          fontWeight: 500,
          letterSpacing: '0.02em',
        },
      },
    },
    Menu: {
      styles: {
        dropdown: {
          borderColor: 'var(--app-border)',
          background: 'color-mix(in srgb, var(--app-header-bg) 92%, transparent)',
          backdropFilter: 'blur(14px) saturate(180%)',
        },
        item: {
          color: 'var(--app-text-secondary)',
        },
      },
    },
    Paper: {
      defaultProps: { radius: 'lg' },
      styles: {
        root: {
          background: 'var(--app-bg-elevated)',
          borderColor: 'var(--app-border)',
        },
      },
    },
    Select: {
      defaultProps: { radius: 'sm' },
      styles: {
        input: {
          background: 'transparent',
          borderColor: 'var(--app-border)',
          color: 'var(--app-text-muted)',
        },
        dropdown: {
          background: 'var(--app-bg-elevated)',
          borderColor: 'var(--app-border)',
        },
        option: {
          color: 'var(--app-text-secondary)',
        },
      },
    },
    TextInput: {
      defaultProps: { radius: 'sm' },
      styles: {
        input: {
          background: 'var(--app-bg-elevated)',
          borderColor: 'var(--app-border)',
          color: 'var(--app-text-primary)',
        },
        label: {
          color: 'var(--app-text-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: rem(12),
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        },
      },
    },
    Textarea: {
      defaultProps: { radius: 'sm' },
      styles: {
        input: {
          background: 'var(--app-bg-elevated)',
          borderColor: 'var(--app-border)',
          color: 'var(--app-text-primary)',
        },
        label: {
          color: 'var(--app-text-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: rem(12),
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        },
      },
    },
    ThemeIcon: {
      defaultProps: { radius: 'sm', variant: 'light' },
    },
  },
})

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--app-font-display': 'var(--font-display)',
  },
  light: {
    '--app-bg-base': theme.colors.paper[1],
    '--app-bg-elevated': theme.colors.paper[2],
    '--app-bg-surface': theme.colors.paper[3],
    '--app-text-primary': theme.colors.forest[9],
    '--app-text-secondary': theme.colors.forest[7],
    '--app-text-muted': theme.colors.forest[4],
    '--app-accent-green': theme.colors.forest[6],
    '--app-accent-green-bright': theme.colors.forest[5],
    '--app-accent-green-dim': 'rgba(31, 110, 66, 0.1)',
    '--app-accent-gold': theme.colors.gold[6],
    '--app-accent-gold-bright': theme.colors.gold[5],
    '--app-accent-gold-dim': 'rgba(168, 120, 16, 0.12)',
    '--app-border': 'rgba(20, 40, 28, 0.1)',
    '--app-border-subtle': 'rgba(20, 40, 28, 0.05)',
    '--app-header-bg': 'rgba(243, 239, 228, 0.88)',
    '--app-grain-opacity': '0.04',
  },
  dark: {
    '--app-bg-base': theme.colors.dark[6],
    '--app-bg-elevated': theme.colors.dark[5],
    '--app-bg-surface': theme.colors.dark[4],
    '--app-text-primary': theme.colors.dark[0],
    '--app-text-secondary': theme.colors.dark[1],
    '--app-text-muted': theme.colors.dark[2],
    '--app-accent-green': theme.colors.forest[4],
    '--app-accent-green-bright': theme.colors.forest[3],
    '--app-accent-green-dim': 'rgba(74, 168, 112, 0.1)',
    '--app-accent-gold': theme.colors.gold[5],
    '--app-accent-gold-bright': theme.colors.gold[3],
    '--app-accent-gold-dim': 'rgba(200, 148, 26, 0.12)',
    '--app-border': 'rgba(200, 240, 210, 0.07)',
    '--app-border-subtle': 'rgba(200, 240, 210, 0.04)',
    '--app-header-bg': 'rgba(12, 18, 16, 0.84)',
    '--app-grain-opacity': '0.06',
  },
})
