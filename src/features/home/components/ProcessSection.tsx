import * as m from '#/generated/paraglide/messages'
import { HomeSection } from './HomeSection'

function getSteps() {
  return [
    { title: m.home_process_step_1_title(), desc: m.home_process_step_1_desc() },
    { title: m.home_process_step_2_title(), desc: m.home_process_step_2_desc() },
    { title: m.home_process_step_3_title(), desc: m.home_process_step_3_desc() },
  ]
}

export function ProcessSection() {
  return (
    <HomeSection id="process">
      <ol className="home-process">
        {getSteps().map(({ title, desc }, index) => (
          <li key={title}>
            <span className="home-process-step" aria-hidden>
              {index + 1}
            </span>
            <div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </HomeSection>
  )
}
