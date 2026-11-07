/**
 * The site's button looks, for links that act as buttons: the view header's
 * action, the Overview hero, a Project's "Visit website", the CV download.
 * Every button-styled link takes its colours and padding from here.
 */
export const BUTTON_STYLES = {
  /** The one main action of a place: ink on canvas. */
  primary:
    'inline-flex items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-2 font-medium text-canvas hover:opacity-90',
  /** An action beside a primary one. */
  secondary:
    'inline-flex items-center justify-center gap-1.5 rounded-lg bg-surface px-3 py-2 font-medium text-ink ring-1 ring-line hover:bg-hover',
  /** Inside the Availability card. */
  available:
    'flex items-center justify-center gap-1.5 rounded-md bg-available px-3 py-1.5 font-medium text-available-surface hover:opacity-90',
} as const

export type ButtonStyle = keyof typeof BUTTON_STYLES
