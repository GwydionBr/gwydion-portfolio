// PROTOTYPE, throw away. F: App shell. The site behaves like a native desktop app: sidebar, list, detail pane.
// References: Things 3, Linear, Raycast, macOS Mail/Notes three-pane layouts
import { useState } from 'react'
import { experience, formatDate, now, person, posts, projects, skills } from '../content'

type Item = { id: string; group: string; title: string; sub: string; body: React.ReactNode }

const items: Item[] = [
  {
    id: 'hello',
    group: 'Start',
    title: 'Hello',
    sub: person.role,
    body: (
      <>
        <img src="/portrait.webp" alt="" className="size-20 rounded-2xl object-cover" />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white">{person.name}</h1>
        <p className="mt-1 text-white/50">
          {person.role} · {person.location}
        </p>
        <p className="mt-6 max-w-xl leading-relaxed text-white/75">{person.pitch}</p>
        <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
          {projects[0].stats!.map((s) => (
            <div key={s.label} className="rounded-xl bg-white/[0.05] p-4 ring-1 ring-white/10">
              <div className="text-2xl font-semibold text-white">{s.value}</div>
              <div className="text-xs text-white/45">{s.label} · Self-Engine</div>
            </div>
          ))}
        </div>
        <h3 className="mt-10 text-xs font-medium uppercase tracking-wider text-white/35">Now</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {now.map((n) => (
            <li key={n.label}>
              <span className="text-white">{n.label}</span>{' '}
              <span className="text-white/55">{n.text}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  ...projects.map((p) => ({
    id: p.slug,
    group: 'Projects',
    title: p.title,
    sub: `${p.kind} · ${p.year}`,
    body: (
      <>
        <div
          className="h-48 rounded-2xl ring-1 ring-white/10"
          style={{ background: `linear-gradient(135deg, ${p.color}, #0000)` }}
        />
        <p className="mt-6 text-sm text-white/45">
          {p.kind} · {p.year}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">{p.title}</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-white/75">{p.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-md bg-white/[0.06] px-2 py-1 text-xs text-white/70">
              {s}
            </span>
          ))}
        </div>
        <a
          href="#"
          className="mt-8 inline-block rounded-lg bg-white px-4 py-2 text-sm font-medium text-black"
        >
          Read the case study →
        </a>
      </>
    ),
  })),
  ...posts.map((p) => ({
    id: p.title,
    group: 'Writing',
    title: p.title,
    sub: `${formatDate(p.date)} · ${p.lang.toUpperCase()} · ${p.minutes} min`,
    body: (
      <>
        <p className="text-sm text-white/45">
          {formatDate(p.date)} · {p.minutes} min read
        </p>
        <h1
          className="mt-2 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-white"
          lang={p.lang}
        >
          {p.title}
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-white/60">
          Placeholder excerpt. The first paragraph of the post would appear here, with a link to
          read it in full.
        </p>
      </>
    ),
  })),
  {
    id: 'cv',
    group: 'About',
    title: 'CV',
    sub: 'Experience & skills',
    body: (
      <>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Experience</h1>
          <a href="#" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black">
            Download PDF
          </a>
        </div>
        <ol className="mt-8 space-y-6 border-l border-white/10 pl-6">
          {experience.map((e) => (
            <li key={e.title} className={e.placeholder ? 'opacity-40' : ''}>
              <p className="text-xs text-white/40">{e.period}</p>
              <p className="font-medium text-white">
                {e.title} · {e.org}
              </p>
              <p className="text-sm text-white/60">{e.summary}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-md bg-white/[0.06] px-2 py-1 text-xs text-white/70">
              {s}
            </span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'contact',
    group: 'About',
    title: 'Contact',
    sub: person.email,
    body: (
      <>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Let’s talk</h1>
        <p className="mt-3 text-white/60">
          {person.status}. {person.freelance}.
        </p>
        <div className="mt-8 max-w-md space-y-3">
          <input
            placeholder="Your email"
            className="w-full rounded-lg bg-white/[0.06] px-3 py-2 text-sm text-white ring-1 ring-white/10 outline-none focus:ring-white/30"
          />
          <textarea
            placeholder="Message"
            rows={4}
            className="w-full rounded-lg bg-white/[0.06] px-3 py-2 text-sm text-white ring-1 ring-white/10 outline-none focus:ring-white/30"
          />
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black">
            Send
          </button>
        </div>
      </>
    ),
  },
]

const groups = ['Start', 'Projects', 'Writing', 'About']

export function VariantF() {
  const [sel, setSel] = useState('hello')
  const [group, setGroup] = useState('Start')
  const current = items.find((i) => i.id === sel)!
  const list = items.filter((i) => i.group === group)

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,#2a3340,#0d0f12)] p-3 text-sm text-white/80 sm:p-8">
      <div className="flex h-[calc(100vh-1.5rem)] w-full max-w-[1200px] overflow-hidden rounded-2xl bg-[#16181c]/95 shadow-2xl ring-1 ring-white/10 sm:h-[calc(100vh-4rem)]">
        <aside className="hidden w-52 shrink-0 flex-col border-r border-white/[0.07] bg-white/[0.02] p-3 md:flex">
          <div className="mb-6 flex gap-1.5 px-2 pt-1">
            <span className="size-3 rounded-full bg-[#ff5f57]" />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="mb-4 rounded-lg bg-white/[0.05] px-2.5 py-1.5 text-white/35 ring-1 ring-white/[0.07]">
            Search… <span className="float-right">⌘K</span>
          </div>
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => {
                setGroup(g)
                setSel(items.find((i) => i.group === g)!.id)
              }}
              className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-left ${group === g ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}
            >
              {g}
              <span className="text-xs text-white/30">
                {items.filter((i) => i.group === g).length}
              </span>
            </button>
          ))}
          <div className="mt-auto space-y-2 px-2.5 text-xs">
            <p className="flex items-center gap-2 text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {person.status}
            </p>
            <p className="text-white/30">EN · DE · Impressum · Datenschutz</p>
          </div>
        </aside>
        <div className="w-72 shrink-0 overflow-y-auto border-r border-white/[0.07]">
          <div className="sticky top-0 border-b border-white/[0.07] bg-[#16181c] px-4 py-3 font-medium text-white">
            {group}
          </div>
          {list.map((i) => (
            <button
              key={i.id}
              onClick={() => setSel(i.id)}
              className={`block w-full border-b border-white/[0.04] px-4 py-3 text-left ${sel === i.id ? 'bg-blue-500/20' : 'hover:bg-white/[0.03]'}`}
            >
              <div className="truncate font-medium text-white">{i.title}</div>
              <div className="truncate text-xs text-white/40">{i.sub}</div>
            </button>
          ))}
        </div>
        <main className="flex-1 overflow-y-auto p-8 sm:p-12">{current.body}</main>
      </div>
    </div>
  )
}
