export type SelfEngineFeatureIcon = 'time' | 'finance' | 'calendar' | 'management' | 'habits' | 'mobile' | 'web'

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
  {
    icon: 'habits',
    title: 'Habit tracker',
    desc: 'Build routines that stick with a dedicated habit tracking system woven into daily work.',
  },
  {
    icon: 'mobile',
    title: 'Mobile app',
    desc: 'Capture time, habits, and plans on the go with a native mobile experience.',
  },
  {
    icon: 'web',
    title: 'Web app',
    desc: 'Review, plan, and manage the full system from a focused desktop-friendly web interface.',
  },
]
