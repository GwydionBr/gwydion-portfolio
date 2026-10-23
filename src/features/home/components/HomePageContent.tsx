import { MAIN_CONTENT_ID } from '#/shared/ui/Page'
import { AboutSection } from './AboutSection'
import { ContactSection } from './ContactSection'
import { HomeSidebar } from './HomeSidebar'
import { NowSection } from './NowSection'
import { ProcessSection } from './ProcessSection'
import { ProjectsSection } from './ProjectsSection'
import { ServicesSection } from './ServicesSection'

export function HomePageContent() {
  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className="home-layout">
      <HomeSidebar />
      <div className="home-content">
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <ProjectsSection />
        <NowSection />
        <ContactSection />
      </div>
    </main>
  )
}
