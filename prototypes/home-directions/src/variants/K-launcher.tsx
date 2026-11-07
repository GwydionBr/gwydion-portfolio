// PROTOTYPE, throw away. K: Launcher. The home page IS a command palette: type or arrow through everything,
// with a live preview pane on the right. Keyboard first, but fully clickable.
// References: Raycast, Spotlight, Alfred, Superhuman command bar
import { useMemo, useState } from 'react'
import { experience, formatDate, person, posts, projects } from '../content'

type Entry = {
  id: string
  section: string
  title: string
  hint: string
  icon: string
  preview: React.ReactNode
}

const entries: Entry[] = [
  {
    id: 'about',
    section: 'Suggested',
    title: `About ${person.first}`,
    hint: person.role,
    icon: '◎',
    preview: (
      <>
        <img src="/portrait.webp" alt="" className="size-16 rounded-2xl object-cover" />
        <h2 className="mt-4 text-xl font-semibold text-white">{person.name}</h2>
        <p className="text-white/50">
          {person.role} · {person.location}
        </p>
        <p className="mt-4 leading-relaxed text-white/70">{person.pitch}</p>
        <p className="mt-4 flex items-center gap-2 text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          {person.status}
        </p>
      </>
    ),
  },
  {
    id: 'cv',
    section: 'Suggested',
    title: 'Download CV',
    hint: 'PDF',
    icon: '↓',
    preview: (
      <ul className="space-y-3">
        {experience.map((e) => (
          <li key={e.title} className={e.placeholder ? 'opacity-40' : ''}>
            <p className="text-white">
              {e.title} · {e.org}
            </p>
            <p className="text-xs text-white/40">{e.period}</p>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'mail',
    section: 'Suggested',
    title: 'Send an email',
    hint: person.email,
    icon: '✉',
    preview: (
      <p className="text-white/70">
        Opens your mail client to {person.email}. {person.freelance}.
      </p>
    ),
  },
  ...projects.map((p) => ({
    id: p.slug,
    section: 'Projects',
    title: p.title,
    hint: p.kind,
    icon: '◆',
    preview: (
      <>
        <div
          className="h-32 rounded-xl"
          style={{ background: `linear-gradient(135deg, ${p.color}, transparent)` }}
        />
        <h2 className="mt-4 text-xl font-semibold text-white">{p.title}</h2>
        <p className="text-xs text-white/40">
          {p.kind} · {p.year}
        </p>
        <p className="mt-3 leading-relaxed text-white/70">{p.summary}</p>
        {p.stats && (
          <p className="mt-3 text-sm text-white/50">
            {p.stats.map((s) => `${s.value} ${s.label}`).join(' · ')}
          </p>
        )}
      </>
    ),
  })),
  ...posts.map((p) => ({
    id: p.title,
    section: 'Writing',
    title: p.title,
    hint: `${p.lang.toUpperCase()} · ${formatDate(p.date)}`,
    icon: '¶',
    preview: (
      <>
        <p className="text-xs text-white/40">
          {formatDate(p.date)} · {p.minutes} min
        </p>
        <h2 className="mt-2 text-xl font-semibold text-white" lang={p.lang}>
          {p.title}
        </h2>
        <p className="mt-3 text-white/60">Placeholder excerpt.</p>
      </>
    ),
  })),
  ...person.links
    .filter((l) => l.label !== 'Email')
    .map((l) => ({
      id: l.label,
      section: 'Links',
      title: l.label,
      hint: 'Open profile',
      icon: '↗',
      preview: <p className="text-white/60">Opens {l.label} in a new tab.</p>,
    })),
]

export function VariantK() {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const results = useMemo(
    () =>
      entries.filter((e) =>
        `${e.title} ${e.hint} ${e.section}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  )
  const current = results[Math.min(sel, results.length - 1)]
  const sections = [...new Set(results.map((r) => r.section))]

  return (
    <div className="flex min-h-screen flex-col items-center bg-[radial-gradient(circle_at_30%_20%,#3b2a5a,#0b0b10_60%)] px-4 pt-[10vh] text-sm text-white/70">
      <p className="mb-6 text-center text-white/50">
        <span className="font-semibold text-white">{person.name}</span> · {person.role}
      </p>
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-[#1b1b22]/90 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <span className="text-white/40">⌕</span>
          <input
            autoFocus
            value={q}
            placeholder="Search projects, writing, CV…"
            onChange={(e) => {
              setQ(e.target.value)
              setSel(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSel((s) => Math.min(s + 1, results.length - 1))
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSel((s) => Math.max(s - 1, 0))
              }
            }}
            className="flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/30"
          />
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/40">EN · DE</span>
        </div>
        <div className="grid h-[420px] md:grid-cols-[1fr_1.1fr]">
          <div className="overflow-y-auto p-2">
            {sections.map((s) => (
              <div key={s}>
                <p className="px-3 pb-1 pt-3 text-xs font-medium text-white/35">{s}</p>
                {results
                  .filter((r) => r.section === s)
                  .map((r) => {
                    const i = results.indexOf(r)
                    return (
                      <button
                        key={r.id}
                        onMouseEnter={() => setSel(i)}
                        onClick={() => setSel(i)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left ${i === sel ? 'bg-white/10 text-white' : ''}`}
                      >
                        <span className="flex size-6 items-center justify-center rounded-md bg-white/10 text-xs">
                          {r.icon}
                        </span>
                        <span className="truncate">{r.title}</span>
                        <span className="ml-auto shrink-0 truncate text-xs text-white/35">
                          {r.hint}
                        </span>
                      </button>
                    )
                  })}
              </div>
            ))}
            {!results.length && <p className="p-6 text-white/40">No results for “{q}”.</p>}
          </div>
          <div className="hidden overflow-y-auto border-l border-white/10 p-6 md:block">
            {current?.preview}
          </div>
        </div>
        <div className="flex items-center gap-4 border-t border-white/10 px-5 py-2.5 text-xs text-white/35">
          <span>
            <kbd className="rounded bg-white/10 px-1">↑↓</kbd> navigate
          </span>
          <span>
            <kbd className="rounded bg-white/10 px-1">↵</kbd> open
          </span>
          <span className="ml-auto">Impressum · Datenschutz</span>
        </div>
      </div>
      <p className="mt-6 text-xs text-white/30">
        Tip: press ⌘K anywhere on the site to come back here.
      </p>
    </div>
  )
}
