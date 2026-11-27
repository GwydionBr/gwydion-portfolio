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
import lists from './lists.module.css'

type ButtonStyle = 'primary' | 'secondary'

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
      px="sm"
      leftSection={<DownloadSimple aria-hidden size={16} />}
      styles={{ section: { marginInlineEnd: 6 } }}
      fw={500}
      href={file.href}
      download
      hrefLang={file.language}
      type="application/pdf"
      onClick={() => trackEvent({ name: 'cv-download', data: { sprache: file.language } })}
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
      <Group component="ul" mt="sm" gap={8} className={lists.reset}>
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
