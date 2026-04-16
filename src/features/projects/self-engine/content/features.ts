export type SelfEngineFeatureIcon = 'time' | 'finance' | 'calendar' | 'management'

export interface SelfEngineFeature {
  icon: SelfEngineFeatureIcon
  title: string
  desc: string
}

export const SELF_ENGINE_FEATURES: SelfEngineFeature[] = [
  {
    icon: 'time',
    title: 'Time tracking',
    desc: 'Record and categorize time spent on any project or task with precision.',
  },
  {
    icon: 'finance',
    title: 'Finance management',
    desc: 'Link hourly rates to tracked time. Understand what your work is worth.',
  },
  {
    icon: 'calendar',
    title: 'Calendar visualization',
    desc: 'See your work, projects, and appointments in a unified calendar view.',
  },
  {
    icon: 'management',
    title: 'Project management',
    desc: 'Organize tasks and milestones. Keep projects moving without the overhead.',
  },
]
