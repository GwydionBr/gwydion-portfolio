import * as m from '#/generated/paraglide/messages'
import { HomeSection } from './HomeSection'

function getNowItems() {
  return [
    { label: m.home_now_building(), desc: m.home_now_building_desc() },
    { label: m.home_now_learning(), desc: m.home_now_learning_desc() },
    { label: m.home_now_training(), desc: m.home_now_training_desc() },
  ]
}

export function NowSection() {
  return (
    <HomeSection id="now">
      <ol className="home-timeline">
        {getNowItems().map(({ label, desc }) => (
          <li key={label}>
            <strong>{label}</strong>
            <p>{desc}</p>
          </li>
        ))}
      </ol>
    </HomeSection>
  )
}
