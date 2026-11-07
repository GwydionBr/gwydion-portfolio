import { createFileRoute } from '@tanstack/react-router'
import { useLingui } from '@lingui/react/macro'
import { Placeholder, View } from '#/shell/View'

export const Route = createFileRoute('/$lang/contact')({ component: Contact })

function Contact() {
  const { t } = useLingui()
  return (
    <View title={t`Contact`}>
      <Placeholder>{t`The contact form is being rebuilt.`}</Placeholder>
    </View>
  )
}
