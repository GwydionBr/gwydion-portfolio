import { useLingui } from '@lingui/react/macro'
import { Text } from '@mantine/core'
import { RouterAnchor } from '#/components/links'
import { useSiteLanguage } from '#/i18n/react'
import { Placeholder, View } from './View'

/** What an unknown path or an unsupported language prefix shows, inside the shell. */
export function NotFoundView() {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    <View title={t`Page not found`}>
      <Placeholder>
        <Text size="sm">{t`There is nothing at this address.`}</Text>
        <RouterAnchor
          to="/$lang"
          params={{ lang }}
          size="sm"
          fw={500}
          underline="always"
          mt="sm"
          display="inline-block"
        >
          {t`Back to the Overview`}
        </RouterAnchor>
      </Placeholder>
    </View>
  )
}
