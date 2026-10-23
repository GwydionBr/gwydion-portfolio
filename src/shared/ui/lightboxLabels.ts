import type { LightboxLabels } from '@mantine/lightbox'
import * as m from '#/generated/paraglide/messages'

/** Mantine Lightbox labels in the visitor's language. Fullscreen and download stay off. */
export function lightboxLabels(): Partial<LightboxLabels> {
  return {
    lightboxLabel: m.lightbox_label(),
    slideLabel: (index, total) => m.lightbox_slide({ index, total }),
    slidesLabel: m.lightbox_slides(),
    previousSlideLabel: m.lightbox_prev(),
    nextSlideLabel: m.lightbox_next(),
    thumbnailLabel: (index, total) => m.lightbox_thumbnail({ index, total }),
    showThumbnailsLabel: m.lightbox_show_thumbnails(),
    hideThumbnailsLabel: m.lightbox_hide_thumbnails(),
    closeLabel: m.lightbox_close(),
  }
}
