import * as m from '#/generated/paraglide/messages'
import { StaggerGroup, StaggerItem } from '#/shared/motion'
import { SelfEngineSection, SelfEngineSectionHead } from './SelfEngineSection'
import classes from './SelfEngineStage.module.css'

const learnings = [
  { title: m.cs_learn1_title, body: m.cs_learn1_body },
  { title: m.cs_learn2_title, body: m.cs_learn2_body },
  { title: m.cs_learn3_title, body: m.cs_learn3_body },
  { title: m.cs_learn4_title, body: m.cs_learn4_body },
]

export function SelfEngineLearnings() {
  return (
    <SelfEngineSection>
      <SelfEngineSectionHead label={m.cs_learn_label()} title={m.cs_learn_heading()} />
      <StaggerGroup trigger="inView" stagger={0.08} className={classes.learnings}>
        {learnings.map(({ title, body }, index) => (
          <StaggerItem
            key={title()}
            preset="fade-up"
            distance={16}
            className={`${classes.card} ${classes.learning}`}
          >
            <span className={classes.learningIndex}>{String(index + 1).padStart(2, '0')}</span>
            <h3 className={classes.cardTitle}>{title()}</h3>
            <p className={classes.cardBody}>{body()}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SelfEngineSection>
  )
}
