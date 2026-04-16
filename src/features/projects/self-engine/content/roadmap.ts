export interface SelfEngineRoadmapItem {
  item: string
  done: boolean
}

export const SELF_ENGINE_ROADMAP: SelfEngineRoadmapItem[] = [
  { item: 'Time tracking core', done: true },
  { item: 'Project structure & management', done: true },
  { item: 'Finance & hourly rate tracking', done: true },
  { item: 'Calendar view', done: true },
  { item: 'Dashboard & analytics', done: false },
  { item: 'Mobile app', done: false },
  { item: 'Open source release', done: false },
  { item: 'Collaboration features', done: false },
]
