import { createFileRoute } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { Placeholder, View } from '#/shell/View'

export const Route = createFileRoute('/$lang/')({ component: Overview })

function Overview() {
  const { t } = useLingui()
  return (
    <View title={t`Overview`} location={[]}>
      <Placeholder>{t`The Overview is being rebuilt.`}</Placeholder>
    </View>
  )
}
