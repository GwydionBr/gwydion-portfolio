/**
 * What jsdom lacks and Mantine measures with (SegmentedControl's sliding
 * indicator): a ResizeObserver that never reports, since jsdom lays nothing out.
 */
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

/** What jsdom lacks and Mantine's Spotlight calls to keep the selected result in view. */
if (!('scrollIntoView' in Element.prototype)) {
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    value: () => {},
    configurable: true,
  })
}
