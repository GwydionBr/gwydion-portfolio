import { Link } from '@tanstack/react-router'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { Button } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { SELF_ENGINE_URL } from '#/shared/config/links'
import { Reveal } from '#/shared/motion'
import { NorthstarMark } from './NorthstarMark'
import { SelfEngineSection } from './SelfEngineSection'
import classes from './SelfEngineStage.module.css'

export function SelfEngineClosing() {
  return (
    <SelfEngineSection beam>
      <Reveal trigger="inView" distance={16}>
        <div className={classes.closing}>
          <NorthstarMark size="lg" />
          <h2 className={classes.headline}>{m.cs_cta_heading()}</h2>
          <p className={classes.lead}>{m.cs_cta_body()}</p>
          <div className={classes.heroActions}>
            <Button
              component="a"
              href={SELF_ENGINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              color="engine"
              radius="xl"
              size="md"
              rightSection={<ArrowUpRightIcon size={16} aria-hidden />}
            >
              {m.self_visit_site()}
            </Button>
            <Button
              component={Link}
              to="/contact"
              radius="xl"
              size="md"
              className={classes.ghostButton}
            >
              {m.cs_cta_contact()}
            </Button>
          </div>
          <p className={classes.closingNote}>{m.cs_cta_note()}</p>
        </div>
      </Reveal>
    </SelfEngineSection>
  )
}
