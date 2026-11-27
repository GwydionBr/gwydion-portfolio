import {
  ActionIcon,
  Alert,
  Anchor,
  AppShell,
  Badge,
  Button,
  Code,
  Drawer,
  InputWrapper,
  Input,
  Kbd,
  List,
  Modal,
  NavLink,
  Notification,
  Paper,
  Popover,
  SegmentedControl,
  Table,
  Text,
  Timeline,
  Title,
  Tooltip,
  Typography,
  type MantineThemeComponents,
} from '@mantine/core'
import { Spotlight } from '@mantine/spotlight'
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
  Tooltip: Tooltip.extend({
    defaultProps: { radius: 'md', offset: 8 },
    classNames: { tooltip: classes.tooltip },
  }),

  AppShell: AppShell.extend({
    classNames: {
      root: classes.appShell,
      navbar: classes.appShellNavbar,
      resizeHandle: classes.appShellResizeHandle,
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

  /** A panel that opens beside its trigger, such as the settings: a card that floats. */
  Popover: Popover.extend({
    defaultProps: { radius: 'lg', shadow: 'md' },
    classNames: { dropdown: classes.popover },
  }),

  /**
   * A sheet, such as the phone's More sheet: a card on the canvas. From the
   * bottom it rounds only its top corners and keeps clear of the home indicator.
   */
  Drawer: Drawer.extend({
    defaultProps: { radius: 'lg' },
    classNames: (_theme, props) => ({
      header: classes.sheetHeader,
      title: classes.sheetTitle,
      ...(props.position === 'bottom' && {
        content: classes.bottomSheet,
        body: classes.bottomSheetBody,
      }),
    }),
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
    classNames: {
      root: classes.navLink,
      section: classes.navLinkSection,
      description: classes.navLinkDescription,
    },
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

  /**
   * A toast (src/shell/toast.tsx): a small floating card, its icon in the
   * toast's colour (`available` for done, `danger` for failed).
   */
  Notification: Notification.extend({
    defaultProps: { radius: 'lg', withBorder: true },
    vars: (_theme, props) => ({
      root: {
        '--notification-color': props.color === 'danger' ? 'var(--danger)' : 'var(--available)',
      },
    }),
    classNames: {
      root: classes.toast,
      icon: classes.toastIcon,
      description: classes.toastDescription,
      closeButton: classes.toastCloseButton,
    },
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

  /** A table in a story: hairlines between rows, the head in ink. */
  Table: Table.extend({
    defaultProps: { verticalSpacing: 'xs', horizontalSpacing: 'sm', fz: 'inherit' },
    vars: () => ({ table: { '--table-border-color': 'var(--line)' } }),
    classNames: { th: classes.tableHead },
  }),

  /** The steps of a flow in a story: numbered, joined by a hairline, none marked as reached. */
  Timeline: Timeline.extend({
    defaultProps: { bulletSize: 24, lineWidth: 1 },
    vars: () => ({ root: { '--tl-color': 'var(--line)' } }),
    classNames: {
      itemBullet: classes.stepBullet,
      itemTitle: classes.stepTitle,
      item: classes.step,
    },
  }),

  Modal: Modal.extend({ defaultProps: { radius: 'lg' } }),

  /** An icon-only control, such as the phone's search button: ink, a faint hover. */
  ActionIcon: ActionIcon.extend({
    vars: (_theme, props) =>
      props.variant === 'subtle'
        ? { root: { '--ai-color': 'var(--ink)', '--ai-hover': 'var(--hover)' } }
        : { root: {} },
  }),

  /** A key, such as the search's shortcut in the sidebar. */
  Kbd: Kbd.extend({ defaultProps: { size: 'xs' }, classNames: { root: classes.kbd } }),

  /**
   * The site search: a floating card whose field sits on it, the results
   * below a hairline, the selected one marked like an open view in the sidebar.
   * Its title only names the dialog.
   */
  Spotlight: Spotlight.extend({
    defaultProps: { radius: 'lg' },
    classNames: {
      header: classes.visuallyHidden,
      search: classes.spotlightSearch,
      actionsList: classes.spotlightList,
      actionsGroup: classes.spotlightGroup,
      action: classes.spotlightAction,
      actionDescription: classes.spotlightDescription,
      empty: classes.spotlightEmpty,
    },
  }),
}

/**
 * What a resize handle wears: Mantine's AppShell handle in the site's look,
 * for the shell's own handles beside Mantine's (src/shell/PaneResizeHandle.tsx).
 */
export const RESIZE_HANDLE_CLASS_NAME = `${AppShell.classes.resizeHandle} ${classes.appShellResizeHandle}`
