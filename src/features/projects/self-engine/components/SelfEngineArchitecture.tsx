import { Fragment } from 'react'
import { ArrowRightIcon, ArrowsLeftRightIcon, StackIcon } from '@phosphor-icons/react'
import * as m from '#/generated/paraglide/messages'
import { Reveal, StaggerGroup, StaggerItem } from '#/shared/motion'
import { SelfEngineSection, SelfEngineSectionHead } from './SelfEngineSection'
import classes from './SelfEngineStage.module.css'

const nodes = [
  { label: m.cs_diagram_app, sublabel: m.cs_diagram_app_sub },
  { label: m.cs_diagram_sqlite, sublabel: m.cs_diagram_sqlite_sub },
  { label: m.cs_diagram_powersync, sublabel: m.cs_diagram_powersync_sub },
  { label: m.cs_diagram_postgres, sublabel: m.cs_diagram_postgres_sub },
]

export function SelfEngineArchitecture() {
  return (
    <SelfEngineSection band>
      <SelfEngineSectionHead label={m.cs_arch_eyebrow()} title={m.cs_arch_heading()} />
      <Reveal trigger="inView" distance={16} delay={0.1}>
        <div className={classes.prose}>
          <p>{m.cs_arch_p1()}</p>
          <p>{m.cs_arch_p2()}</p>
          <p>{m.cs_arch_p3()}</p>
        </div>
      </Reveal>

      <StaggerGroup trigger="inView" stagger={0.08} className={classes.diagram}>
        {nodes.map(({ label, sublabel }, index) => (
          <Fragment key={label()}>
            <StaggerItem
              preset="fade-up"
              distance={12}
              className={`${classes.card} ${classes.node}`}
            >
              <span className={classes.nodeTitle}>{label()}</span>
              <span className={classes.nodeSub}>{sublabel()}</span>
            </StaggerItem>
            {index < nodes.length - 1 && (
              <StaggerItem preset="fade-in" className={classes.connector} aria-hidden>
                {/* PowerSync and Postgres talk both ways; the local writes only flow up. */}
                {index === 2 ? <ArrowsLeftRightIcon size={18} /> : <ArrowRightIcon size={18} />}
              </StaggerItem>
            )}
          </Fragment>
        ))}
        <StaggerItem preset="fade-up" distance={12} className={classes.port}>
          <StackIcon size={18} aria-hidden />
          {m.cs_diagram_port()}
        </StaggerItem>
      </StaggerGroup>
    </SelfEngineSection>
  )
}
