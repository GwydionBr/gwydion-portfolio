import type { CSSProperties } from 'react'
import * as m from '#/generated/paraglide/messages'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { SELF_ENGINE_FLOW } from '../content/flow'
import { moduleColorVar, SELF_ENGINE_MODULE_ICONS } from '../content/modules'
import { SELF_ENGINE_CASE_ID } from './SelfEngineHero'
import { SelfEngineSection, SelfEngineSectionHead } from './SelfEngineSection'
import classes from './SelfEngineStage.module.css'

const HabitsIcon = SELF_ENGINE_MODULE_ICONS.habits

export function SelfEngineFlow() {
  return (
    <SelfEngineSection id={SELF_ENGINE_CASE_ID}>
      <div className={classes.flowIntro}>
        <SelfEngineSectionHead label={m.cs_flow_label()} title={m.cs_flow_heading()} />
        <Reveal trigger="inView" distance={16} delay={0.1}>
          <div className={classes.prose}>
            <p>{m.cs_flow_p1()}</p>
            <p>{m.cs_flow_p2()}</p>
          </div>
        </Reveal>
      </div>

      <StaggerGroup as="ol" trigger="inView" stagger={0.1} className={classes.chain}>
        {SELF_ENGINE_FLOW.map(({ module, icon: Icon, title, sub }, index) => (
          <StaggerItem
            key={title()}
            as="li"
            preset="fade-up"
            distance={12}
            className={`${classes.card} ${classes.lit} ${classes.step}`}
            style={{ '--module-color': moduleColorVar(module) } as CSSProperties}
          >
            <span className={classes.iconTile}>
              <Icon size={22} aria-hidden />
            </span>
            <span className={classes.stepIndex}>{String(index + 1).padStart(2, '0')}</span>
            <h3 className={classes.cardTitle}>{title()}</h3>
            <p className={classes.cardBody}>{sub()}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal trigger="inView" distance={12} delay={0.2}>
        <div
          className={`${classes.card} ${classes.flowNote}`}
          style={{ '--module-color': moduleColorVar('habits') } as CSSProperties}
        >
          <span className={classes.iconTile}>
            <HabitsIcon size={22} aria-hidden />
          </span>
          <p>{m.cs_flow_note()}</p>
        </div>
      </Reveal>
    </SelfEngineSection>
  )
}
