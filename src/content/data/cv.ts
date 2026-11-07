import type { CvFile } from '../schema'

/**
 * The CV files, PDFs in `public/cv/`. To replace the CV, drop a new PDF over
 * the old one; to offer a German CV, add it here. A Site language without its
 * own CV is offered the English one.
 */
export const cv: CvFile[] = [{ language: 'en', href: '/cv/gwydion-braunsdorf-cv-en.pdf' }]
