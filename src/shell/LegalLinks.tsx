import { useLingui } from '@lingui/react/macro'
import { Group } from '@mantine/core'
import { RouterAnchor } from '#/components/links'
import { useSiteLanguage } from '#/i18n/react'
import { LEGAL_PAGES } from '#/legal/pages'
import classes from './LegalLinks.module.css'

/** Links to the Impressum and the privacy policy in the current Site language. */
export function LegalLinks({ className }: { className?: string }) {
  const { t, i18n } = useLingui()
  const lang = useSiteLanguage()
  return (
    <nav aria-label={t`Legal`} className={className}>
      <Group component="ul" gap="sm" className={classes.list}>
        {LEGAL_PAGES.map((page) => (
          <li key={page.to}>
            <RouterAnchor
              to={page.to}
              params={{ lang }}
              size="xs"
              underline="never"
              className={classes.link}
            >
              {i18n._(page.title)}
            </RouterAnchor>
          </li>
        ))}
      </Group>
    </nav>
  )
}
