import { Button, Group, Text } from '@mantine/core'
import type { ReactNode } from 'react'
import { useLingui } from '@lingui/react/macro'
import { DownloadSimple } from '@phosphor-icons/react'
import { trackEvent } from '#/analytics/umami'
import type { CvFile } from '#/content'
import { useCv, useCvs } from '#/content/react'
import { nativeNameOf } from '#/i18n/language'
import { useSiteLanguage } from '#/i18n/react'
import { Tile } from './Tile'

type ButtonStyle = 'primary' | 'secondary'

/** Counts a download of `file`. */
function trackCvDownload(file: CvFile) {
  trackEvent({ name: 'cv-download', data: { sprache: file.language } })
}

/**
 * Downloads `file` now, as a click on its link would, and counts it: for a
 * place that offers the download without showing the link, such as the search.
 */
export function downloadCv(file: CvFile) {
  trackCvDownload(file)
  const link = document.createElement('a')
  link.href = file.href
  link.download = ''
  // In the document: some browsers ignore a click on a link outside it.
  document.body.append(link)
  link.click()
  link.remove()
}

/** A download link to one CV file, marked with its language and type; counts its downloads. */
function CvFileLink({
  file,
  look,
  className,
  children,
}: {
  file: CvFile
  look: ButtonStyle
  className?: string
  children: ReactNode
}) {
  return (
    <Button
      component="a"
      variant={look === 'primary' ? 'filled' : 'default'}
      leftSection={<DownloadSimple aria-hidden size={16} />}
      href={file.href}
      download
      hrefLang={file.language}
      type="application/pdf"
      onClick={() => trackCvDownload(file)}
      className={className}
    >
      {children}
    </Button>
  )
}

/**
 * The CV download: the CV the Site language offers. Every place offering the
 * CV renders this one link, so all point at the same asset. A CV in another
 * language than the page names it.
 */
export function CvDownload({
  look = 'primary',
  className = '',
}: {
  /** The button look. */
  look?: ButtonStyle
  /** Placement only (margins, width). */
  className?: string
}) {
  const { t } = useLingui()
  const cv = useCv()
  const siteLanguage = useSiteLanguage()
  return (
    <CvFileLink file={cv} look={look} className={className}>
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
      <Text inherit mt={4}>{t`1 page · PDF`}</Text>
      <Group component="ul" role="list" m={0} mt="sm" p={0} gap={8} style={{ listStyle: 'none' }}>
        {files.map((file) => (
          <li key={file.href}>
            <CvFileLink file={file} look="secondary">
              <span lang={file.language}>{nativeNameOf(file.language)}</span>
            </CvFileLink>
          </li>
        ))}
      </Group>
    </Tile>
  )
}
