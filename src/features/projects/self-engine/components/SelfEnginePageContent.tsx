import * as m from '#/generated/paraglide/messages'
import { ProjectPageShell } from '#/features/projects/components/ProjectPageShell'
import { SelfEngineOpenSourceCard } from './SelfEngineOpenSourceCard'
import { SelfEngineFeatures, SelfEngineTechStack } from './SelfEngineFeatures'
import { SelfEngineArchitecture } from './SelfEngineArchitecture'
import { SelfEngineAssistant } from './SelfEngineAssistant'
import { SelfEngineLearnings } from './SelfEngineLearnings'
import { SelfEngineNumbers } from './SelfEngineNumbers'
import { SelfEngineProblem } from './SelfEngineProblem'
import { SelfEngineScreenshots } from './SelfEngineScreenshots'

export function SelfEnginePageContent() {
  return (
    <ProjectPageShell
      backLabel={m.self_back()}
      projectLabel={m.self_project_label()}
      statusLabel={m.self_active()}
      title={m.se_title()}
      description={m.self_intro()}
    >
      <SelfEngineNumbers />
      <SelfEngineProblem />
      <SelfEngineArchitecture />
      <SelfEngineScreenshots />
      <SelfEngineAssistant />
      <SelfEngineLearnings />
      <SelfEngineFeatures />
      <SelfEngineTechStack />
      <SelfEngineOpenSourceCard />
    </ProjectPageShell>
  )
}
