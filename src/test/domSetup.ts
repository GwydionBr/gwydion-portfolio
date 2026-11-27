/**
 * What jsdom lacks and Mantine's components measure with (ScrollArea and
 * others): a ResizeObserver that never reports, since jsdom lays nothing out.
 */
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
