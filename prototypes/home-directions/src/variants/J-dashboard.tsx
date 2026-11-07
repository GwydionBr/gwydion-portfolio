// PROTOTYPE, throw away. J: Dashboard app. F's shell (sidebar) with E's bento tiles as the "home" view,
// like opening a productivity app on its overview screen. Light theme.
// References: Self-Engine's own dashboard, Linear "My issues", Vercel dashboard, Arc browser sidebar
import { useState } from 'react'
import { experience, formatDate, now, person, posts, projects, skills } from '../content'

const nav = [
  { id: 'overview', label: 'Overview', icon: '◎' },
  { id: 'projects', label: 'Projects', icon: '◆', count: projects.length },
  { id: 'writing', label: 'Writing', icon: '¶', count: posts.length },
  { id: 'cv', label: 'CV', icon: '★' },
  { id: 'contact', label: 'Contact', icon: '✉' },
]

const card = 'rounded-2xl bg-white p-5 ring-1 ring-black/[0.06]'

export function VariantJ() {
  const [view, setView] = useState('overview')
  return (
    <div className="flex min-h-screen bg-[#f3f3f1] text-sm text-neutral-600">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-black/[0.06] bg-[#fafaf9] p-3 md:flex">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <img src="/portrait.webp" alt="" className="size-9 rounded-lg object-cover" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-neutral-900">{person.name}</p>
            <p className="truncate text-xs text-neutral-400">{person.role}</p>
          </div>
        </div>
        <div className="my-3 rounded-lg bg-white px-3 py-1.5 text-neutral-400 ring-1 ring-black/[0.06]">
          Search <span className="float-right text-xs">⌘K</span>
        </div>
        <nav className="space-y-0.5">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setView(n.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-left ${view === n.id ? 'bg-black/[0.06] font-medium text-neutral-900' : 'hover:bg-black/[0.03]'}`}
            >
              <span className="w-4 text-center text-neutral-400">{n.icon}</span>
              {n.label}
              {n.count && <span className="ml-auto text-xs text-neutral-400">{n.count}</span>}
            </button>
          ))}
        </nav>
        <p className="mb-2 mt-6 px-3 text-xs font-medium text-neutral-400">Pinned</p>
        {projects.slice(0, 3).map((p) => (
          <button
            key={p.slug}
            onClick={() => setView('projects')}
            className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-left hover:bg-black/[0.03]"
          >
            <span className="size-2.5 rounded-sm" style={{ background: p.color }} />
            {p.title}
          </button>
        ))}
        <div className="mt-auto space-y-2 rounded-xl bg-emerald-50 p-3 text-xs ring-1 ring-emerald-100">
          <p className="flex items-center gap-2 font-medium text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {person.status}
          </p>
          <a
            href="#"
            className="block rounded-md bg-emerald-600 px-3 py-1.5 text-center font-medium text-white"
          >
            Download CV
          </a>
        </div>
        <p className="px-3 pt-3 text-xs text-neutral-400">EN · DE · Impressum · Datenschutz</p>
      </aside>

      <main className="min-w-0 flex-1 p-6 lg:p-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs text-neutral-400">gwydion.dev / {view}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
              {view === 'overview' ? 'Good to see you.' : nav.find((n) => n.id === view)!.label}
            </h1>
          </div>
          <a
            href={`mailto:${person.email}`}
            className="rounded-lg bg-neutral-900 px-3 py-2 font-medium text-white"
          >
            Get in touch
          </a>
        </div>

        {view === 'overview' ? (
          <div className="grid gap-4 lg:grid-cols-3">
            <div className={`${card} lg:col-span-2`}>
              <p className="text-xs font-medium text-neutral-400">About</p>
              <p className="mt-2 text-base leading-relaxed text-neutral-800">{person.pitch}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {skills.slice(0, 8).map((s) => (
                  <span key={s} className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className={card}>
              <p className="text-xs font-medium text-neutral-400">Now</p>
              <ul className="mt-2 space-y-2">
                {now.map((n) => (
                  <li key={n.label}>
                    <span className="font-medium text-neutral-900">{n.label}</span> · {n.text}
                  </li>
                ))}
              </ul>
            </div>
            {projects[0].stats!.map((s) => (
              <div key={s.label} className={card}>
                <p className="text-xs font-medium text-neutral-400">Self-Engine · {s.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">
                  {s.value}
                </p>
              </div>
            ))}
            <div className={`${card} lg:col-span-2`}>
              <div className="flex justify-between">
                <p className="text-xs font-medium text-neutral-400">Projects</p>
                <button
                  onClick={() => setView('projects')}
                  className="text-xs text-neutral-400 hover:text-neutral-900"
                >
                  View all
                </button>
              </div>
              <ul className="mt-2 divide-y divide-black/[0.05]">
                {projects.map((p) => (
                  <li key={p.slug} className="flex items-center gap-3 py-2.5">
                    <span className="size-2.5 rounded-sm" style={{ background: p.color }} />
                    <span className="font-medium text-neutral-900">{p.title}</span>
                    <span className="truncate text-neutral-400">{p.summary}</span>
                    <span className="ml-auto shrink-0 text-xs text-neutral-400">{p.year}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={card}>
              <p className="text-xs font-medium text-neutral-400">Latest writing</p>
              <ul className="mt-2 space-y-3">
                {posts.map((p) => (
                  <li key={p.title}>
                    <p className="font-medium text-neutral-900" lang={p.lang}>
                      {p.title}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {p.lang.toUpperCase()} · {formatDate(p.date)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : view === 'projects' ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <a key={p.slug} href="#" className={`${card} transition hover:-translate-y-0.5`}>
                <div
                  className="h-28 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}66)` }}
                />
                <p className="mt-4 font-semibold text-neutral-900">{p.title}</p>
                <p className="mt-1">{p.summary}</p>
              </a>
            ))}
          </div>
        ) : view === 'cv' ? (
          <div className={`${card} max-w-2xl`}>
            {experience.map((e) => (
              <div
                key={e.title}
                className={`grid grid-cols-[100px_1fr] gap-4 border-b border-black/[0.05] py-3 last:border-0 ${e.placeholder ? 'opacity-40' : ''}`}
              >
                <span className="text-xs text-neutral-400">{e.period}</span>
                <div>
                  <p className="font-medium text-neutral-900">
                    {e.title} · {e.org}
                  </p>
                  <p>{e.summary}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`${card} max-w-2xl`}>
            <p className="text-neutral-400">“{view}” view, same shell. Placeholder.</p>
          </div>
        )}
      </main>
    </div>
  )
}
