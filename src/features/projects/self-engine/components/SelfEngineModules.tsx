import type { CSSProperties } from 'react'
import * as m from '#/generated/paraglide/messages'
import { StaggerGroup, StaggerItem } from '#/shared/motion'
import {
  moduleColorVar,
  SELF_ENGINE_MODULE_CARDS,
  SELF_ENGINE_MODULE_ICONS,
} from '../content/modules'
import { SelfEngineShot } from './SelfEngineGallery'
import { SelfEngineSection, SelfEngineSectionHead } from './SelfEngineSection'
import classes from './SelfEngineStage.module.css'

export function SelfEngineModules() {
  return (
    <SelfEngineSection band>
      <SelfEngineSectionHead
        label={m.cs_mod_label()}
        title={m.cs_mod_heading()}
        lead={m.cs_mod_lead()}
      />
      <StaggerGroup trigger="inView" stagger={0.08} className={classes.bento}>
        {SELF_ENGINE_MODULE_CARDS.map(({ module, title, description, points, view }, index) => {
          const Icon = SELF_ENGINE_MODULE_ICONS[module]
          const featured = index === 0
          return (
            <StaggerItem
              key={module}
              preset="fade-up"
              distance={16}
              className={[classes.card, classes.lit, classes.module, featured && classes.featured]
                .filter(Boolean)
                .join(' ')}
              style={{ '--module-color': moduleColorVar(module) } as CSSProperties}
            >
              <div className={classes.moduleHead}>
                <span className={classes.iconTile}>
                  <Icon size={22} aria-hidden />
                </span>
                <h3 className={classes.moduleTitle}>{title()}</h3>
              </div>
              <p className={classes.cardBody}>{description()}</p>
              <ul className={classes.points}>
                {points.map((point) => (
                  <li key={point()}>{point()}</li>
                ))}
              </ul>
              <div className={classes.crop}>
                <SelfEngineShot
                  view={view}
                  sizes={
                    featured ? '(min-width: 992px) 760px, 100vw' : '(min-width: 992px) 640px, 100vw'
                  }
                  imageClassName={classes.cropImage}
                />
              </div>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </SelfEngineSection>
  )
}
