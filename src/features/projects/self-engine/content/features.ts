export type SelfEngineFeatureIcon = 'time' | 'tasks' | 'finance' | 'calendar' | 'habits' | 'ai'

export interface SelfEngineFeature {
  icon: SelfEngineFeatureIcon
  id: 1 | 2 | 3 | 4 | 5 | 6
}

export const SELF_ENGINE_FEATURES: SelfEngineFeature[] = [
  {
    icon: 'time',
    id: 1,
  },
  {
    icon: 'tasks',
    id: 2,
  },
  {
    icon: 'finance',
    id: 3,
  },
  {
    icon: 'calendar',
    id: 4,
  },
  {
    icon: 'habits',
    id: 5,
  },
  {
    icon: 'ai',
    id: 6,
  },
]
