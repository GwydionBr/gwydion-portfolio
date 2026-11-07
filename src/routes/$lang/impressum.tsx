import { createFileRoute } from '@tanstack/react-router'
import { legalRoute } from '#/legal/LegalPage'
import { IMPRESSUM_PAGE } from '#/legal/pages'

export const Route = createFileRoute('/$lang/impressum')(legalRoute(IMPRESSUM_PAGE))
