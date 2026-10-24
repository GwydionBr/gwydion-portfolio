import {
  CalendarIcon,
  ClockCountdownIcon,
  CoinsIcon,
  HandCoinsIcon,
  TimerIcon,
  type Icon,
} from '@phosphor-icons/react'
import * as m from '#/generated/paraglide/messages'
import type { SelfEngineModule } from './modules'

/** The chain that links the Modules: one hour of work, from plan to money. */
export const SELF_ENGINE_FLOW = [
  { module: 'calendar', icon: CalendarIcon, title: m.cs_flow_step_1, sub: m.cs_flow_step_1_sub },
  { module: 'work', icon: TimerIcon, title: m.cs_flow_step_2, sub: m.cs_flow_step_2_sub },
  { module: 'work', icon: ClockCountdownIcon, title: m.cs_flow_step_3, sub: m.cs_flow_step_3_sub },
  { module: 'finance', icon: HandCoinsIcon, title: m.cs_flow_step_4, sub: m.cs_flow_step_4_sub },
  { module: 'finance', icon: CoinsIcon, title: m.cs_flow_step_5, sub: m.cs_flow_step_5_sub },
] as const satisfies ReadonlyArray<{
  module: SelfEngineModule
  icon: Icon
  title: () => string
  sub: () => string
}>
