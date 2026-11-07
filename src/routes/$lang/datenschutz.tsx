import { createFileRoute } from '@tanstack/react-router'
import { legalRoute } from '#/legal/LegalPage'
import { PRIVACY_PAGE } from '#/legal/pages'

export const Route = createFileRoute('/$lang/datenschutz')(legalRoute(PRIVACY_PAGE))
