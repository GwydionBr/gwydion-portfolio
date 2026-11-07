import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { Sidebar } from './Sidebar'
import { TabBar } from './TabBar'
import { TopBar } from './TopBar'

/** The id of the main content landmark, the skip link's target. */
const MAIN_ID = 'main'

/**
 * The app shell (ADR 0003, prototype J): a sidebar from the `md` breakpoint
 * up; below it a top bar (identity, Site language switch) and a bottom tab
 * bar; the main pane in between. Views render
 * into the main pane through `View`.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLingui()
  return (
    <div className="flex min-h-dvh bg-canvas text-sm text-muted">
      <a
        href={`#${MAIN_ID}`}
        className="fixed left-3 top-3 z-50 -translate-y-[200%] rounded-lg bg-ink px-3 py-2 font-medium text-canvas focus:translate-y-0"
      >
        {t`Skip to content`}
      </a>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main
          id={MAIN_ID}
          tabIndex={-1}
          className="flex-1 p-4 pb-24 outline-none sm:p-6 sm:pb-24 md:pb-6 lg:p-10"
        >
          {children}
        </main>
      </div>
      <TabBar />
    </div>
  )
}
