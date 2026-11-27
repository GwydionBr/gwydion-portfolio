/**
 * How the shell moves, fast with a soft landing: the second sidebar sliding
 * in and out, the sidebar collapsing to its rail and opening, and the main
 * pane making room for both. The shell hands it to Mantine's AppShell, whose
 * CSS variables (`--app-shell-transition-duration`, `-timing-function`) the
 * stylesheets read, so all of it moves in the same frames.
 */
export const SHELL_MOTION = {
  duration: 280,
  timingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
}
