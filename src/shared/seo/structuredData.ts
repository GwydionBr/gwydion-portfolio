import * as m from '#/generated/paraglide/messages'
import { SITE_URL } from './sitePages'

const PERSON_ID = `${SITE_URL}/#person`
const SERVICE_ID = `${SITE_URL}/#professional-service`

function serviceOffers() {
  return [
    { title: m.home_service_1_title(), description: m.home_service_1_desc() },
    { title: m.home_service_2_title(), description: m.home_service_2_desc() },
    { title: m.home_service_3_title(), description: m.home_service_3_desc() },
  ].map((service) => ({
    '@type': 'Offer' as const,
    itemOffered: {
      '@type': 'Service' as const,
      name: service.title,
      description: service.description,
    },
  }))
}

export function buildStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Gwydion Braunsdorf',
        url: SITE_URL,
        image: `${SITE_URL}/portrait.webp`,
        jobTitle: m.home_role(),
        sameAs: ['https://github.com/GwydionBr'],
      },
      {
        '@type': 'ProfessionalService',
        '@id': SERVICE_ID,
        name: 'Gwydion Braunsdorf',
        url: SITE_URL,
        provider: { '@id': PERSON_ID },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: m.home_nav_services(),
          itemListElement: serviceOffers(),
        },
      },
    ],
  }
}
