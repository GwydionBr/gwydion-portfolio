import { Link } from '@tanstack/react-router'
import {
  AppleLogoIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CloudSlashIcon,
  DeviceMobileIcon,
  GlobeIcon,
} from '@phosphor-icons/react'
import { Button } from '@mantine/core'
import * as m from '#/generated/paraglide/messages'
import { SELF_ENGINE_URL } from '#/shared/config/links'
import { Reveal } from '#/shared/motion'
import { PageContainer } from '#/shared/ui/Page'
import { SelfEngineShot } from './SelfEngineGallery'
import { NorthstarMark } from './NorthstarMark'
import { SELF_ENGINE_CONTAINER } from './SelfEngineSection'
import classes from './SelfEngineStage.module.css'

/** Id of the first case-study section, the hero's secondary call to action. */
export const SELF_ENGINE_CASE_ID = 'case-study'

const platforms = [
  { icon: GlobeIcon, label: m.se_platform_web },
  { icon: AppleLogoIcon, label: m.se_platform_mac },
  { icon: DeviceMobileIcon, label: m.se_platform_mobile },
  { icon: CloudSlashIcon, label: m.se_platform_offline },
]

export function SelfEngineHero() {
  return (
    <section className={classes.hero}>
      <div className={classes.beam} aria-hidden />
      <div className={classes.grid} aria-hidden />
      <PageContainer size={SELF_ENGINE_CONTAINER}>
        <Reveal preset="fade-left" duration={0.5} distance={12}>
          <Link to="/" className={classes.back}>
            <ArrowLeftIcon size={14} aria-hidden />
            {m.self_back()}
          </Link>
        </Reveal>

        <Reveal duration={0.8}>
          <div className={classes.heroHead}>
            <div className={classes.brand}>
              <NorthstarMark />
              <span className={classes.wordmark}>{m.se_title()}</span>
            </div>

            <p className={classes.pill}>
              <span>{m.se_hero_label()}</span>
              <span className={classes.pillDivider} aria-hidden />
              <span className={classes.pillStatus}>{m.se_hero_status()}</span>
            </p>

            <h1 className={classes.heroTitle}>
              {m.se_hero_title_lead()}{' '}
              <span className={classes.accent}>{m.se_hero_title_accent()}</span>
            </h1>

            <p className={classes.heroLead}>{m.se_hero_lead()}</p>

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
                component="a"
                href={`#${SELF_ENGINE_CASE_ID}`}
                radius="xl"
                size="md"
                className={classes.ghostButton}
                rightSection={<ArrowDownIcon size={16} aria-hidden />}
              >
                {m.se_hero_cta_case()}
              </Button>
            </div>

            <ul className={classes.platforms}>
              {platforms.map(({ icon: Icon, label }) => (
                <li key={label()}>
                  <Icon size={16} aria-hidden />
                  {label()}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal duration={0.9} delay={0.2} distance={40}>
          <div className={classes.showcase}>
            <SelfEngineShot
              view="dashboard"
              sizes="(min-width: 1100px) 1040px, 100vw"
              className={classes.window}
            />
            <div className={classes.float} data-side="left">
              <SelfEngineShot
                view="time-tracking-cockpit"
                sizes="280px"
                className={classes.window}
              />
            </div>
            <div className={classes.float} data-side="right">
              <SelfEngineShot view="work-payout" sizes="236px" className={classes.window} />
            </div>
          </div>
        </Reveal>
      </PageContainer>
    </section>
  )
}
