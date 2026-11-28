/**
 * What jsdom lacks and Mantine measures with (SegmentedControl's sliding
 * indicator): a ResizeObserver that never reports, since jsdom lays nothing out.
 */
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

/**
 * What jsdom lacks and Embla, the carousel under Mantine's Lightbox, watches
 * its slides with: an IntersectionObserver that never reports, since nothing
 * is laid out. Embla pages by its own index, not by what is in view.
 */
globalThis.IntersectionObserver ??= class {
  readonly root = null
  readonly rootMargin = '0px'
  readonly thresholds = [0]
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
} as unknown as typeof IntersectionObserver

/** What jsdom lacks and Mantine's Spotlight calls to keep the selected result in view. */
if (!('scrollIntoView' in Element.prototype)) {
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    value: () => {},
    configurable: true,
  })
}
