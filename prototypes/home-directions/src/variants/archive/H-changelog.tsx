// PROTOTYPE, throw away. H: Changelog. Home page as one reverse-chronological stream (releases, posts, career)
// drawn like a git graph, beside a compact profile header. Shows momentum rather than a static brochure.
// References: linear.app/changelog, GitHub contribution graph, git log --graph
import { useState } from 'react'
import { person, skills } from '../../content'

type Kind = 'release' | 'post' | 'career' | 'project'
type Event = { date: string; kind: Kind; title: string; body?: string; tag?: string; dim?: boolean }

const events: Event[] = [
  {
    date: '2026-11-02',
    kind: 'release',
    title: 'Self-Engine v1.4.43',
    body: 'Habit streaks across devices, faster cold start on iOS.',
    tag: 'self-engine',
  },
  {
    date: '2026-10-21',
    kind: 'post',
    title: 'What 38 ADRs taught me about building alone',
    tag: 'EN · 8 min',
    dim: true,
  },
  {
    date: '2026-10-05',
    kind: 'project',
    title: 'Shipped Endstation Tattoo',
    body: 'Artist portfolios and booking requests, editable via Sanity.',
    tag: 'client',
  },
  {
    date: '2026-09-30',
    kind: 'post',
    title: 'Offline-first ist ein Datenmodell, kein Feature',
    tag: 'DE · 12 min',
    dim: true,
  },
  {
    date: '2026-08-20',
    kind: 'project',
    title: 'Shipped KaWAna',
    body: 'Website with sign-up forms and a CMS for two course leaders.',
    tag: 'client',
  },
  {
    date: '2026-07-01',
    kind: 'release',
    title: 'Self-Engine goes live',
    body: 'Web and macOS, with offline sync from day one.',
    tag: 'self-engine',
  },
  {
    date: '2025-12-01',
    kind: 'career',
    title: 'Started Self-Engine',
    body: 'Founder & sole developer.',
    tag: 'career',
  },
  {
    date: '2024-01-01',
    kind: 'career',
    title: 'Went freelance',
    body: 'Websites and web apps for studios and small businesses.',
    tag: 'career',
  },
  { date: '20XX', kind: 'career', title: 'Previous role (placeholder)', tag: 'career', dim: true },
]

const color: Record<Kind, string> = {
  release: '#22c55e',
  post: '#3b82f6',
  project: '#f59e0b',
  career: '#a855f7',
}

// Fake 52-week activity grid for the header.
const weeks = Array.from({ length: 52 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => ((w * 7 + d) * 2654435761) % 5),
)

export function VariantH() {
  const [kinds, setKinds] = useState<Kind[]>(['release', 'post', 'project', 'career'])
  const toggle = (k: Kind) =>
    setKinds((ks) => (ks.includes(k) ? ks.filter((x) => x !== k) : [...ks, k]))
  const visible = events.filter((e) => kinds.includes(e.kind))
  const years = [...new Set(visible.map((e) => e.date.slice(0, 4)))]

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-700 selection:bg-amber-100">
      <div className="mx-auto max-w-3xl px-6 pb-40 pt-14">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img src="/portrait.webp" alt="" className="size-16 rounded-full object-cover" />
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-stone-900">{person.name}</h1>
            <p className="text-stone-500">
              {person.role} · {person.location}
            </p>
          </div>
          <div className="flex gap-2 text-sm">
            <a href="#" className="rounded-md bg-stone-900 px-3 py-1.5 font-medium text-white">
              CV ↓
            </a>
            <a
              href={`mailto:${person.email}`}
              className="rounded-md px-3 py-1.5 font-medium ring-1 ring-stone-200 hover:bg-white"
            >
              Contact
            </a>
          </div>
        </header>
        <p className="mt-6 leading-relaxed">{person.pitch}</p>
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-700">
          <span className="size-2 rounded-full bg-emerald-500" />
          {person.status}{' '}
          <span className="font-normal text-stone-400">· {person.freelance.toLowerCase()}</span>
        </p>

        <div className="mt-10 rounded-xl bg-white p-4 ring-1 ring-stone-200">
          <div className="flex justify-between text-xs text-stone-400">
            <span>2,100+ commits in the last year</span>
            <span>Self-Engine · GitHub</span>
          </div>
          <div className="mt-3 flex gap-[3px] overflow-hidden">
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {w.map((v, j) => (
                  <span
                    key={j}
                    className="size-[9px] rounded-[2px]"
                    style={{
                      background: ['#f0efec', '#bbf7d0', '#86efac', '#22c55e', '#15803d'][v],
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skills.slice(0, 8).map((s) => (
              <span key={s} className="rounded bg-stone-100 px-2 py-0.5 text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-2 text-sm">
          {(Object.keys(color) as Kind[]).map((k) => (
            <button
              key={k}
              onClick={() => toggle(k)}
              className={`flex items-center gap-2 rounded-full px-3 py-1 ring-1 ${kinds.includes(k) ? 'bg-white ring-stone-300' : 'text-stone-400 ring-stone-200'}`}
            >
              <span
                className="size-2 rounded-full"
                style={{ background: kinds.includes(k) ? color[k] : '#d6d3d1' }}
              />
              {k}
            </button>
          ))}
          <span className="ml-auto text-xs text-stone-400">EN · DE</span>
        </div>

        <div className="mt-6">
          {years.map((y) => (
            <div key={y}>
              <h2 className="sticky top-0 z-10 -mx-2 bg-[#fafaf9]/90 px-2 py-2 font-mono text-sm font-semibold text-stone-900 backdrop-blur">
                {y}
              </h2>
              <ol className="relative ml-[7px] border-l-2 border-stone-200">
                {visible
                  .filter((e) => e.date.startsWith(y))
                  .map((e) => (
                    <li
                      key={e.title}
                      className={`group relative pb-8 pl-8 ${e.dim ? 'opacity-50' : ''}`}
                    >
                      <span
                        className="absolute -left-[9px] top-1.5 size-4 rounded-full border-[3px] border-[#fafaf9]"
                        style={{ background: color[e.kind] }}
                      />
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <a href="#" className="font-medium text-stone-900 group-hover:underline">
                          {e.title}
                        </a>
                        <span className="font-mono text-xs text-stone-400">
                          {e.date.length > 4 ? e.date.slice(5) : ''} · {e.tag}
                        </span>
                      </div>
                      {e.body && <p className="mt-1 text-sm text-stone-500">{e.body}</p>}
                    </li>
                  ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-stone-400">Impressum · Datenschutz</p>
      </div>
    </div>
  )
}
