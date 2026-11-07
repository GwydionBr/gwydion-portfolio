// A `.po` catalog, compiled on import by the Lingui Vite plugin.
declare module '*.po' {
  import type { Messages } from '@lingui/core'
  export const messages: Messages
}
