import type { ReactNode } from 'react'
import { PageContainer } from '#/shared/ui/Page'
import { Reveal } from '#/shared/motion'
import classes from './SelfEngineStage.module.css'

/** The stage's content width, wider than the portfolio's prose pages. */
export const SELF_ENGINE_CONTAINER = 1200

interface SelfEngineSectionProps {
  children: ReactNode
  id?: string
  /** Set the section one step off the stage. */
  band?: boolean
  /** Light the section with the brand beam. */
  beam?: boolean
}

export function SelfEngineSection({ children, id, band, beam }: SelfEngineSectionProps) {
  const className = band ? `${classes.section} ${classes.band}` : classes.section
  return (
    <section id={id} className={className}>
      {beam && (
        <>
          <div className={classes.beam} data-strength="soft" aria-hidden />
          <div className={classes.grid} aria-hidden />
        </>
      )}
      <PageContainer size={SELF_ENGINE_CONTAINER}>{children}</PageContainer>
    </section>
  )
}

interface SelfEngineSectionHeadProps {
  label: string
  title: string
  lead?: string
  align?: 'start' | 'center'
}

export function SelfEngineSectionHead({
  label,
  title,
  lead,
  align = 'start',
}: SelfEngineSectionHeadProps) {
  return (
    <Reveal trigger="inView" distance={16}>
      <div className={classes.sectionHead} data-align={align}>
        <span className={classes.label}>{label}</span>
        <h2 className={classes.headline}>{title}</h2>
        {lead && <p className={classes.lead}>{lead}</p>}
      </div>
    </Reveal>
  )
}
