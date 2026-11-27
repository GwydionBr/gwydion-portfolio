/**
 * An inline `<head>` script that runs while the document is parsed, before
 * the first paint: it puts what the visitor chose on this device (the theme,
 * the sidebar width) on `<html>`, so a reload never shows the defaults first.
 * `script` must be built from the site's own constants, never from input.
 */
export function PrePaintScript({ script }: { script: string }) {
  // oxlint-disable-next-line react/no-danger -- a fixed script built from our own constants
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
