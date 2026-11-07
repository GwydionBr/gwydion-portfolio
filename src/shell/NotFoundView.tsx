import { useLingui } from '@lingui/react/macro'
import { Link } from '@tanstack/react-router'
import { useSiteLanguage } from '#/i18n/react'
import { Placeholder, View } from './View'

/** What an unknown path or an unsupported language prefix shows, inside the shell. */
export function NotFoundView() {
  const { t } = useLingui()
  const lang = useSiteLanguage()
  return (
    <View title={t`Page not found`}>
      <Placeholder>
        <p>{t`There is nothing at this address.`}</p>
        <Link
          to="/$lang"
          params={{ lang }}
          className="mt-3 inline-block font-medium text-ink underline"
        >
          {t`Back to the Overview`}
        </Link>
      </Placeholder>
    </View>
  )
}
