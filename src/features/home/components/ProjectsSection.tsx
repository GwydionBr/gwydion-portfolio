import * as m from '#/generated/paraglide/messages'
import { ProjectRow, type ProjectRowProps } from '#/features/projects/components/ProjectRow'
import { GITHUB_SITE_REPO_URL, SELF_ENGINE_URL } from '#/shared/config/links'
import { HomeSection } from './HomeSection'

function getProjects(): ProjectRowProps[] {
  return [
    {
      title: m.se_title(),
      description: m.se_desc(),
      image: { src: '/self-engine/web-dashboard.svg', alt: m.cs_shot_web_dashboard_alt() },
      primaryLink: { label: m.se_cta(), to: '/self-engine' },
      secondaryLinks: [{ label: m.self_visit_site(), href: SELF_ENGINE_URL }],
      tags: [m.se_status(), 'TanStack Start', 'Expo', 'Electron', 'PowerSync'],
    },
    {
      title: 'gwydion.dev',
      description: m.home_project_site_desc(),
      image: { src: '/og-image.png', alt: 'gwydion.dev' },
      primaryLink: { label: m.home_project_source(), href: GITHUB_SITE_REPO_URL },
      tags: [m.self_open_source(), 'TanStack Start', 'Mantine', 'Paraglide'],
    },
  ]
}

export function ProjectsSection() {
  return (
    <HomeSection id="projects">
      {getProjects().map((project) => (
        <ProjectRow key={project.title} {...project} />
      ))}
    </HomeSection>
  )
}
