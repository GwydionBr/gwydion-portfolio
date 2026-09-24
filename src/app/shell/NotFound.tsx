import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { Button, Text } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { AccentRule, DisplayTitle, Eyebrow, PageContainer, PageMain } from '#/shared/ui/Page'

export function NotFound() {
  return (
    <PageMain pt={160}>
      <PageContainer pb={160}>
        <Eyebrow mb={16}>{m.not_found_label()}</Eyebrow>
        <DisplayTitle size="page">
          {m.not_found_title()}
          <Text component="span" c="gold">
            .
          </Text>
        </DisplayTitle>
        <AccentRule my={32} />
        <Text maw={480} size="lg" lh={1.7} c="var(--app-text-secondary)" mb={40}>
          {m.not_found_desc()}
        </Text>
        <Button component={Link} to="/" leftSection={<ArrowLeftIcon size={15} weight="bold" />}>
          {m.not_found_cta()}
        </Button>
      </PageContainer>
    </PageMain>
  )
}
