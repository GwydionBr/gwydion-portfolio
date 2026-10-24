import {
  CalendarIcon,
  CardsThreeIcon,
  CoinsIcon,
  ListChecksIcon,
  TargetIcon,
  type Icon,
} from '@phosphor-icons/react'
import * as m from '#/generated/paraglide/messages'
import type { SelfEngineScreenshotView } from './screenshots'

/**
 * Self-Engine's Modules and the Mantine color each one wears in the app
 * (`DEFAULT_MODULE_COLORS` in the self-engine repo); `engine` is the brand color.
 */
export const SELF_ENGINE_MODULE_COLORS = {
  work: 'engine',
  tasks: 'indigo',
  calendar: 'lime',
  finance: 'teal',
  habits: 'pink',
} as const

export type SelfEngineModule = keyof typeof SELF_ENGINE_MODULE_COLORS

/** Each Module's icon in the app's rail. */
export const SELF_ENGINE_MODULE_ICONS: Record<SelfEngineModule, Icon> = {
  work: CardsThreeIcon,
  tasks: ListChecksIcon,
  calendar: CalendarIcon,
  finance: CoinsIcon,
  habits: TargetIcon,
}

/** The `--module-color` a Module's element paints its accents with. */
export function moduleColorVar(module: SelfEngineModule) {
  return `var(--mantine-color-${SELF_ENGINE_MODULE_COLORS[module]}-filled)`
}

interface SelfEngineModuleCard {
  module: SelfEngineModule
  title: () => string
  description: () => string
  points: ReadonlyArray<() => string>
  view: SelfEngineScreenshotView
}

/** The Modules section's cards, in bento order: the first one is featured. */
export const SELF_ENGINE_MODULE_CARDS: ReadonlyArray<SelfEngineModuleCard> = [
  {
    module: 'work',
    title: m.cs_mod_work_title,
    description: m.cs_mod_work_desc,
    points: [m.cs_mod_work_point_1, m.cs_mod_work_point_2, m.cs_mod_work_point_3],
    view: 'work-dashboard',
  },
  {
    module: 'tasks',
    title: m.cs_mod_tasks_title,
    description: m.cs_mod_tasks_desc,
    points: [m.cs_mod_tasks_point_1, m.cs_mod_tasks_point_2, m.cs_mod_tasks_point_3],
    view: 'tasks-board',
  },
  {
    module: 'calendar',
    title: m.cs_mod_calendar_title,
    description: m.cs_mod_calendar_desc,
    points: [m.cs_mod_calendar_point_1, m.cs_mod_calendar_point_2, m.cs_mod_calendar_point_3],
    view: 'calendar',
  },
  {
    module: 'finance',
    title: m.cs_mod_finance_title,
    description: m.cs_mod_finance_desc,
    points: [m.cs_mod_finance_point_1, m.cs_mod_finance_point_2, m.cs_mod_finance_point_3],
    view: 'finance',
  },
  {
    module: 'habits',
    title: m.cs_mod_habits_title,
    description: m.cs_mod_habits_desc,
    points: [m.cs_mod_habits_point_1, m.cs_mod_habits_point_2, m.cs_mod_habits_point_3],
    view: 'habits',
  },
]
