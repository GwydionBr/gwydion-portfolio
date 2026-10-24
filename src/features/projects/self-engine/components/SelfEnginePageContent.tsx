import { PageMain } from '#/shared/ui/Page'
import { SelfEngineAi } from './SelfEngineAi'
import { SelfEngineArchitecture } from './SelfEngineArchitecture'
import { SelfEngineClosing } from './SelfEngineClosing'
import { SelfEngineFlow } from './SelfEngineFlow'
import { SelfEngineGallery } from './SelfEngineGallery'
import { SelfEngineHero } from './SelfEngineHero'
import { SelfEngineLearnings } from './SelfEngineLearnings'
import { SelfEngineModules } from './SelfEngineModules'
import { SelfEngineNumbers } from './SelfEngineNumbers'
import { SelfEngineTechStack } from './SelfEngineTechStack'
import classes from './SelfEngineStage.module.css'

/** The Self-Engine case study, staged in the app's own look (see `SelfEngineStage.module.css`). */
export function SelfEnginePageContent() {
  return (
    <PageMain className={classes.stage}>
      <SelfEngineGallery>
        <SelfEngineHero />
        <SelfEngineNumbers />
        <SelfEngineFlow />
        <SelfEngineModules />
        <SelfEngineAi />
        <SelfEngineArchitecture />
        <SelfEngineLearnings />
        <SelfEngineTechStack />
        <SelfEngineClosing />
      </SelfEngineGallery>
    </PageMain>
  )
}
