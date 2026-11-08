/**
 * The look of the shell's segmented controls (Site language, theme). A
 * segment is active through `aria-current` on a link or a checked radio in it
 * (the `segment-active` variant in src/styles/app.css).
 */
export const SEGMENTED_TRACK =
  'grid auto-cols-fr grid-flow-col gap-0.5 rounded-lg bg-selected p-0.5 text-xs'

export const SEGMENT =
  'flex cursor-pointer items-center justify-center rounded-md px-2 py-1 text-subtle hover:text-ink segment-active:bg-surface segment-active:font-medium segment-active:text-ink segment-active:shadow-xs segment-active:ring-1 segment-active:ring-line'
