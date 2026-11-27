import { useLingui } from '@lingui/react/macro'
import { Box, Group, type BoxProps } from '@mantine/core'
import { RouterAnchor } from '#/components/links'
import { useSiteLanguage } from '#/i18n/react'
import { LEGAL_PAGES } from '#/legal/pages'

/** Links to the Impressum and the privacy policy in the current Site language. Style props place it. */
export function LegalLinks(placement: BoxProps) {
  const { t, i18n } = useLingui()
  const lang = useSiteLanguage()
  return (
    <Box component="nav" aria-label={t`Legal`} {...placement}>
      <Group component="ul" gap="sm" m={0} p={0} style={{ listStyle: 'none' }}>
        {LEGAL_PAGES.map((page) => (
          <li key={page.to}>
            <RouterAnchor to={page.to} params={{ lang }} size="xs" c="var(--subtle)">
              {i18n._(page.title)}
            </RouterAnchor>
          </li>
        ))}
      </Group>
    </Box>
  )
}
