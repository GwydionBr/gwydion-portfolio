import type { CvFile } from '../schema'

/**
 * The CV files, PDFs in `public/cv/` built by `bun run cv:build`
 * (scripts/build-cv.ts). A Site language without its own CV is offered the
 * English one.
 */
export const cv: CvFile[] = [
  { language: 'en', href: '/cv/gwydion-braunsdorf-cv-en.pdf' },
  { language: 'de', href: '/cv/gwydion-braunsdorf-cv-de.pdf' },
]
