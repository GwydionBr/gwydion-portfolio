import { PageMain } from '#/shared/ui/Page'
import { AboutTeaser } from './AboutTeaser'
import { CurrentlySection } from './CurrentlySection'
import { FeaturedProjectSection } from './FeaturedProjectSection'
import { HeroSection } from './HeroSection'

export function HomePageContent() {
  return (
    <PageMain pt={0}>
      <HeroSection />
      <CurrentlySection />
      <FeaturedProjectSection />
      <AboutTeaser />
    </PageMain>
  )
}
