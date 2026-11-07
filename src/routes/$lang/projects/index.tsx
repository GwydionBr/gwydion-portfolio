import { createFileRoute } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { Placeholder, View } from '#/shell/View'

export const Route = createFileRoute('/$lang/projects/')({ component: Projects })

function Projects() {
  const { t } = useLingui()
  return (
    <View title={t`Projects`}>
      <Placeholder>{t`The Projects are being rebuilt.`}</Placeholder>
    </View>
  )
}
