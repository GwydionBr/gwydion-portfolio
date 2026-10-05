import * as m from '#/generated/paraglide/messages'
import { MAIN_CONTENT_ID } from '#/shared/ui/Page'

export function SkipLink() {
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className="skip-link">
      {m.skip_to_content()}
    </a>
  )
}
