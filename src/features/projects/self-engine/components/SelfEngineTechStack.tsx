import * as m from '#/generated/paraglide/messages'
import { StaggerGroup, StaggerItem } from '#/shared/motion'
import { SELF_ENGINE_TECH } from '../content/tech'
import { SelfEngineSection, SelfEngineSectionHead } from './SelfEngineSection'
import classes from './SelfEngineStage.module.css'

export function SelfEngineTechStack() {
  return (
    <SelfEngineSection band>
      <SelfEngineSectionHead label={m.cs_tech_label()} title={m.cs_tech_heading()} />
      <StaggerGroup trigger="inView" stagger={0.06} className={classes.stack}>
        {SELF_ENGINE_TECH.map(({ title, items }) => (
          <StaggerItem
            key={title()}
            preset="fade-up"
            distance={12}
            className={`${classes.card} ${classes.stackGroup}`}
          >
            <h3 className={classes.stackTitle}>{title()}</h3>
            <ul className={classes.chips}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </SelfEngineSection>
  )
}
