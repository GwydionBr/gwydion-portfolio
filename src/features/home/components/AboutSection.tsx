import * as m from '#/generated/paraglide/messages'
import { HomeSection } from './HomeSection'

export function AboutSection() {
  return (
    <HomeSection id="about">
      <div className="home-prose">
        <p className="home-lead">{m.home_about_lead()}</p>
        <p>{m.home_about_p2()}</p>
        <p>{m.home_about_p3()}</p>
      </div>
    </HomeSection>
  )
}
