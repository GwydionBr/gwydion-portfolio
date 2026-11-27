/**
 * What jsdom lacks and Mantine measures with (SegmentedControl's sliding
 * indicator): a ResizeObserver that never reports, since jsdom lays nothing out.
 */
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
