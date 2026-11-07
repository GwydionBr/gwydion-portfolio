import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { DownloadSimple } from '@phosphor-icons/react'
import type { CvFile } from '#/content'
import { useCv, useCvs } from '#/content/react'
import { nativeNameOf } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'
import { BUTTON_STYLES, type ButtonStyle } from './buttonStyles'
import { Tile } from './Tile'

/** A download link to one CV file, marked with its language and type. */
function CvFileLink({
  file,
  className,
  children,
}: {
  file: CvFile
  className: string
  children: ReactNode
}) {
  return (
    <a
      href={file.href}
      download
      hrefLang={file.language}
      type="application/pdf"
      className={className}
    >
      {children}
    </a>
  )
}

/**
 * The CV download: the CV the Site language offers. Every place offering the
 * CV renders this one link, so all point at the same asset. A CV in another
 * language than the page names it.
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
    <CvFileLink file={cv} className={`${BUTTON_STYLES[look]} ${className}`}>
      {t`Download CV`}
      {cv.language !== siteLanguage && (
        <span lang={cv.language}> · {nativeNameOf(cv.language)}</span>
      )}
    </CvFileLink>
  )
}

/** The CV tile: what the CV is (one page, PDF) and a download in each language it exists in. */
export function CvTile({ className }: { className?: string }) {
  const { t } = useLingui()
  const files = useCvs()
  return (
    <Tile title={t`CV`} className={className}>
      <p className="mt-1">{t`1 page · PDF`}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {files.map((file) => (
          <li key={file.href}>
            <CvFileLink file={file} className={BUTTON_STYLES.secondary}>
              <DownloadSimple aria-hidden className="size-4" />
              <span lang={file.language}>{nativeNameOf(file.language)}</span>
            </CvFileLink>
          </li>
        ))}
      </ul>
    </Tile>
  )
}
