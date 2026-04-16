import * as m from '#/generated/paraglide/messages'
import { ProjectPageShell } from '#/features/projects/components/ProjectPageShell'
import { SelfEngineOpenSourceCard } from './SelfEngineOpenSourceCard'
import { SelfEngineFeatures, SelfEngineRoadmap, SelfEngineTechStack } from './SelfEngineFeatures'

export function SelfEnginePageContent() {
  return (
    <ProjectPageShell
      backLabel={m.self_back()}
      projectLabel={m.self_project_label()}
      statusLabel={m.self_active()}
      title={m.se_title()}
      description={m.self_intro()}
    >
      <SelfEngineFeatures />
      <SelfEngineRoadmap />
      <SelfEngineTechStack />
      <SelfEngineOpenSourceCard />
    </ProjectPageShell>
  )
}
