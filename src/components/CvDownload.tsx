import { useLingui } from '@lingui/react/macro'
import { useCv } from '#/content/react'
import { nativeNameOf } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'
import { BUTTON_STYLES, type ButtonStyle } from './buttonStyles'

/**
 * The CV download. Every place offering the CV renders this one link, so all
 * point at the same asset. A CV in another language than the page names it.
 */
export function CvDownload({
  look = 'available',
  className = '',
}: {
  /** The button look: green in the Availability card, `primary` as a view's main action. */
  look?: ButtonStyle
  /** Placement only (margins, width). */
  className?: string
}) {
  const { t } = useLingui()
  const cv = useCv()
  const siteLanguage = useSiteLanguage()
  return (
    <a
      href={cv.href}
      download
      hrefLang={cv.language}
      type="application/pdf"
      className={`${BUTTON_STYLES[look]} ${className}`}
    >
      {t`Download CV`}
      {cv.language !== siteLanguage && (
        <span lang={cv.language}> · {nativeNameOf(cv.language)}</span>
      )}
    </a>
  )
}
