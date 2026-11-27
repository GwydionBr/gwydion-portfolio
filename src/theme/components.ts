import {
  Alert,
  Anchor,
  AppShell,
  Badge,
  Button,
  Code,
  InputWrapper,
  Input,
  List,
  Modal,
  NavLink,
  Paper,
  SegmentedControl,
  Text,
  Title,
  Typography,
  type MantineThemeComponents,
} from '@mantine/core'
import classes from './components.module.css'

/**
 * The site's look, component by component: every Mantine component takes its
 * colours, radii and states from here, so a view only places components and
 * never styles them. Each entry prefers, in this order, `defaultProps`, the
 * component's CSS variables (`vars`), and a class from
 * components.module.css for what neither reaches (hover, `aria-current`, …).
 * Colours are always the site's tokens (src/styles/app.css).
 *
 * The semantic colours a component accepts besides Mantine's: `available`
 * (Badge: Gwydion is open to work) and `danger` (Alert: something failed).
 */
export const siteComponents: MantineThemeComponents = {
  AppShell: AppShell.extend({
    classNames: {
      root: classes.appShell,
      navbar: classes.appShellNavbar,
      header: classes.appShellBar,
      footer: classes.appShellBar,
    },
  }),

  /** A card: surface on the canvas, a hairline, the large radius. Modals and Tiles are Papers too. */
  Paper: Paper.extend({
    defaultProps: { radius: 'lg', withBorder: true },
    classNames: { root: classes.paper },
  }),

  Button: Button.extend({
    defaultProps: { variant: 'filled' },
    vars: (_theme, props) => {
      // `filled` is the one main action of a place: ink on canvas, in both themes.
      if (props.variant === 'filled' || props.variant === undefined)
        return {
          root: {
            '--button-bg': 'var(--ink)',
            '--button-hover': 'color-mix(in srgb, var(--ink) 88%, var(--canvas))',
            '--button-color': 'var(--canvas)',
          },
        }
      // `subtle` is a quiet control, such as a Back link: ink text, a faint hover.
      if (props.variant === 'subtle')
        return { root: { '--button-hover': 'var(--hover)', '--button-color': 'var(--ink)' } }
      return { root: {} }
    },
  }),

  /** Body text is 14px (Mantine's default is 16px); a place that wants more says so. */
  Text: Text.extend({ defaultProps: { size: 'sm' } }),
  List: List.extend({ defaultProps: { size: 'sm' } }),

  Anchor: Anchor.extend({ defaultProps: { underline: 'hover' } }),

  /** A navigation row: the sidebar's entries and the Profile links beside them. */
  NavLink: NavLink.extend({
    vars: () => ({
      root: {
        '--nl-bg': 'var(--selected)',
        '--nl-hover': 'var(--selected)',
        '--nl-color': 'var(--ink)',
      },
      children: {},
    }),
    classNames: { root: classes.navLink, section: classes.navLinkSection },
  }),

  SegmentedControl: SegmentedControl.extend({
    defaultProps: { size: 'xs', radius: 'md', fullWidth: true },
    vars: () => ({
      root: {
        '--sc-color': 'var(--surface)',
        '--sc-shadow': '0 1px 2px rgb(0 0 0 / 0.05), 0 0 0 1px var(--line)',
      },
    }),
    classNames: { root: classes.segmented, label: classes.segmentedLabel },
  }),

  Input: Input.extend({ classNames: { input: classes.input } }),
  InputWrapper: InputWrapper.extend({
    classNames: { label: classes.inputLabel, error: classes.inputError },
  }),

  Alert: Alert.extend({
    vars: (_theme, props) =>
      props.color === 'danger'
        ? {
            root: {
              '--alert-bg': 'var(--danger-surface)',
              '--alert-color': 'var(--danger)',
              '--alert-bd': '0',
            },
          }
        : { root: {} },
    classNames: { message: classes.alertMessage },
  }),

  /** A chip: tags, skills and status pills. */
  Badge: Badge.extend({
    defaultProps: { variant: 'light', radius: 'sm', tt: 'none' },
    vars: (_theme, props) => ({
      root:
        props.color === 'available'
          ? {
              '--badge-bg': 'var(--available-surface)',
              '--badge-color': 'var(--available)',
              '--badge-bd': '1px solid var(--available-line)',
              '--badge-dot-color': 'var(--available)',
            }
          : { '--badge-bg': 'var(--selected)', '--badge-color': 'var(--muted)' },
    }),
    // A status pill says a whole sentence: it wraps instead of cutting it off.
    classNames: (_theme, props) =>
      props.color === 'available'
        ? { root: `${classes.badge} ${classes.badgeWrap}`, label: classes.badgeWrapLabel }
        : { root: classes.badge },
  }),

  Title: Title.extend({ classNames: { root: classes.title } }),

  /** A Project's story and other long text written in Markdown. */
  Typography: Typography.extend({ classNames: { root: classes.typography } }),

  Code: Code.extend({ classNames: { root: classes.code } }),

  Modal: Modal.extend({ defaultProps: { radius: 'lg' } }),
}
