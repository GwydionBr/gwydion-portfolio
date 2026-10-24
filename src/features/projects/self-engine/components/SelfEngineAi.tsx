import * as m from '#/generated/paraglide/messages'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { SelfEngineShot } from './SelfEngineGallery'
import { SelfEngineSection, SelfEngineSectionHead } from './SelfEngineSection'
import classes from './SelfEngineStage.module.css'

const approvalSteps = [
  { title: m.cs_ai_step_1_title, body: m.cs_ai_step_1_body },
  { title: m.cs_ai_step_2_title, body: m.cs_ai_step_2_body },
  { title: m.cs_ai_step_3_title, body: m.cs_ai_step_3_body },
]

export function SelfEngineAi() {
  return (
    <SelfEngineSection>
      <div className={classes.split}>
        <div>
          <SelfEngineSectionHead label={m.cs_ai_label()} title={m.cs_ai_heading()} />
          <Reveal trigger="inView" distance={16} delay={0.1}>
            <div className={classes.prose}>
              <p>{m.cs_ai_p1()}</p>
              <p>{m.cs_ai_p2()}</p>
            </div>
          </Reveal>
          <StaggerGroup
            as="ol"
            trigger="inView"
            stagger={0.1}
            className={classes.approval}
            aria-label={m.cs_ai_steps_label()}
          >
            {approvalSteps.map(({ title, body }) => (
              <StaggerItem
                key={title()}
                as="li"
                preset="fade-up"
                distance={12}
                className={classes.card}
              >
                <span className={classes.approvalTitle}>{title()}</span>
                <span className={classes.approvalBody}>{body()}</span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal trigger="inView" distance={32} delay={0.15}>
          <div className={classes.panel}>
            <SelfEngineShot view="ai-assistant-panel" sizes="380px" className={classes.window} />
          </div>
        </Reveal>
      </div>
    </SelfEngineSection>
  )
}
