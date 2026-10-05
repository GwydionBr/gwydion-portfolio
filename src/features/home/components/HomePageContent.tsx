import { AboutSection } from './AboutSection'
import { ContactSection } from './ContactSection'
import { HighlightsSection } from './HighlightsSection'
import { HomeSidebar } from './HomeSidebar'
import { NowSection } from './NowSection'
import { ProjectsSection } from './ProjectsSection'

export function HomePageContent() {
  return (
    <main className="home-layout">
      <HomeSidebar />
      <div className="home-content">
        <AboutSection />
        <HighlightsSection />
        <ProjectsSection />
        <NowSection />
        <ContactSection />
      </div>
    </main>
  )
}
