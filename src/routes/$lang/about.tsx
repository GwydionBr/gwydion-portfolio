import { createFileRoute } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { Placeholder, View } from '#/shell/View'

export const Route = createFileRoute('/$lang/about')({ component: About })

function About() {
  const { t } = useLingui()
  return (
    <View title={t`About`}>
      <Placeholder>{t`The About view is being rebuilt.`}</Placeholder>
    </View>
  )
}
