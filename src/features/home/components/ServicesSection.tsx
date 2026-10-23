import * as m from '#/generated/paraglide/messages'
import { HomeSection } from './HomeSection'

function getServices() {
  return [
    { title: m.home_service_1_title(), desc: m.home_service_1_desc() },
    { title: m.home_service_2_title(), desc: m.home_service_2_desc() },
    { title: m.home_service_3_title(), desc: m.home_service_3_desc() },
  ]
}

export function ServicesSection() {
  return (
    <HomeSection id="services">
      <ul className="home-service-cards">
        {getServices().map(({ title, desc }) => (
          <li key={title} className="home-service-card">
            <h3>{title}</h3>
            <p>{desc}</p>
            <p className="home-service-price">{m.home_service_price()}</p>
          </li>
        ))}
      </ul>
    </HomeSection>
  )
}
