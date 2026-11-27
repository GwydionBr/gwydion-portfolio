/**
 * The share image every page's link preview shows (spec #31: per-Project
 * images are out of scope). `bun run og:build` renders it at this size
 * (scripts/og/renderOgImage.ts), and the page head declares the same size, so
 * the two can't drift apart. Plain data: the build script imports it outside
 * the app's Vite pipeline.
 */
export const SHARE_IMAGE = {
  path: '/og-image.png',
  width: 1200,
  height: 630,
  type: 'image/png',
} as const
