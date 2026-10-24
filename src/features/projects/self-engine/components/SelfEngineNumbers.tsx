import * as m from '#/generated/paraglide/messages'
import { Reveal } from '#/shared/motion'
import { PageContainer } from '#/shared/ui/Page'
import { SELF_ENGINE_NUMBERS } from '../content/numbers'
import { SELF_ENGINE_CONTAINER } from './SelfEngineSection'
import classes from './SelfEngineStage.module.css'

export function SelfEngineNumbers() {
  return (
    <PageContainer size={SELF_ENGINE_CONTAINER}>
      <Reveal trigger="inView" distance={16}>
        <dl className={`${classes.card} ${classes.stats}`} aria-label={m.cs_num_label()}>
          {SELF_ENGINE_NUMBERS.map(({ value, label }) => (
            <div key={label()} className={classes.stat}>
              <dt>{label()}</dt>
              <dd>{value()}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </PageContainer>
  )
}
