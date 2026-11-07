import { useLingui } from '@lingui/react/macro'
import { useCv } from '#/content/react'
import { nativeNameOf } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'

/**
 * The CV download. Every place offering the CV renders this one link, so all
 * point at the same asset. A CV in another language than the page names it.
 */
export function CvDownload({ className = '' }: { className?: string }) {
  const { t } = useLingui()
  const cv = useCv()
  const siteLanguage = useSiteLanguage()
  return (
    <a
      href={cv.href}
      download
      hrefLang={cv.language}
      type="application/pdf"
      className={`block rounded-md bg-available px-3 py-1.5 text-center font-medium text-canvas hover:opacity-90 ${className}`}
    >
      {t`Download CV`}
      {cv.language !== siteLanguage && (
        <span lang={cv.language}> · {nativeNameOf(cv.language)}</span>
      )}
    </a>
  )
}
