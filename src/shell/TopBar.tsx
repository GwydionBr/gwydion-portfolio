import { Identity } from './Identity'
import { LanguageSwitch } from './LanguageSwitch'

/** The phone top bar below the `md` breakpoint: identity and the Site language switch, which the sidebar holds on desktop. */
export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-sidebar/95 px-4 py-2 backdrop-blur md:hidden">
      <Identity />
      <LanguageSwitch />
    </header>
  )
}
