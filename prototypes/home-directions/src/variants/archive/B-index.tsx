// PROTOTYPE, throw away. B: Index / Terminal. Monospace, dark, the whole site as one filterable index table.
// References: linear.app (precision), vercel.com/geist, terminal-style portfolios
import { useState } from 'react'
import { experience, formatDate, person, posts, projects, skills } from '../../content'

type Row = {
  type: 'work' | 'writing' | 'experience'
  title: string
  meta: string
  year: string
  dim?: boolean
}

const rows: Row[] = [
  ...projects.map((p) => ({
    type: 'work' as const,
    title: p.title,
    meta: p.stack.slice(0, 3).join(' · '),
    year: p.year,
  })),
  ...posts.map((p) => ({
    type: 'writing' as const,
    title: p.title,
    meta: `${p.minutes} min · ${p.lang}`,
    year: formatDate(p.date),
  })),
  ...experience.map((e) => ({
    type: 'experience' as const,
    title: `${e.title} @ ${e.org}`,
    meta: e.summary,
    year: e.period,
    dim: e.placeholder,
  })),
]

const filters = ['all', 'work', 'writing', 'experience'] as const

export function VariantB() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all')
  const visible = rows.filter((r) => filter === 'all' || r.type === filter)

  return (
    <div className="min-h-screen bg-[#0a0b0d] font-mono text-[13px] text-[#c9cdd3] selection:bg-[#7ee787]/30">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0a0b0d]/90 px-5 py-2.5 backdrop-blur">
        <span>
          <span className="text-[#7ee787]">gwydion</span>
          <span className="text-white/40">@dev</span> <span className="text-white/30">~/</span>
        </span>
        <nav className="flex gap-5 text-white/50">
          {['index', 'work', 'writing', 'cv', 'contact'].map((n) => (
            <a key={n} href="#" className="hover:text-white">
              /{n}
            </a>
          ))}
          <span className="text-white/25">[en|de]</span>
        </nav>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-40">
        <section className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-white/40">$ whoami</p>
            <h1 className="mt-3 text-3xl font-medium leading-tight text-white sm:text-[2.6rem]">
              {person.name}
              <br />
              <span className="text-white/45">{person.role.toLowerCase()}.</span>
              <span className="animate-blink ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-[#7ee787]" />
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-white/60">{person.pitch}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="border border-[#7ee787] bg-[#7ee787] px-4 py-2 text-black hover:bg-transparent hover:text-[#7ee787]"
              >
                ./cv.pdf ↓
              </a>
              <a
                href={`mailto:${person.email}`}
                className="border border-white/20 px-4 py-2 hover:border-white"
              >
                mail --to {person.email}
              </a>
            </div>
          </div>
          <dl className="grid content-start gap-px self-start border border-white/10 bg-white/10">
            {[
              ['status', <span className="text-[#7ee787]">● {person.status.toLowerCase()}</span>],
              ['freelance', 'selected projects'],
              ['location', person.location.toLowerCase()],
              ['commits', '2,100+ (self-engine)'],
              ['stack', skills.slice(0, 4).join(', ').toLowerCase()],
            ].map(([k, v]) => (
              <div
                key={k as string}
                className="grid grid-cols-[90px_1fr] gap-3 bg-[#0a0b0d] px-3 py-2"
              >
                <dt className="text-white/35">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="py-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-white/35">filter:</span>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`border px-2.5 py-1 ${filter === f ? 'border-[#7ee787] text-[#7ee787]' : 'border-white/15 text-white/50 hover:text-white'}`}
              >
                {f}{' '}
                <span className="text-white/30">
                  {f === 'all' ? rows.length : rows.filter((r) => r.type === f).length}
                </span>
              </button>
            ))}
          </div>
          <div className="border border-white/10">
            <div className="grid grid-cols-[110px_1fr_140px] gap-4 border-b border-white/10 px-4 py-2 text-[11px] uppercase tracking-widest text-white/30 md:grid-cols-[110px_1.2fr_1fr_140px]">
              <span>type</span>
              <span>title</span>
              <span className="hidden md:block">meta</span>
              <span className="text-right">date</span>
            </div>
            {visible.map((r) => (
              <a
                key={r.title}
                href="#"
                className={`group grid grid-cols-[110px_1fr_140px] gap-4 border-b border-white/5 px-4 py-3 last:border-0 hover:bg-white/[0.04] md:grid-cols-[110px_1.2fr_1fr_140px] ${r.dim ? 'opacity-40' : ''}`}
              >
                <span
                  className={
                    r.type === 'work'
                      ? 'text-[#7ee787]'
                      : r.type === 'writing'
                        ? 'text-[#79c0ff]'
                        : 'text-[#d2a8ff]'
                  }
                >
                  {r.type}
                </span>
                <span className="text-white group-hover:underline">{r.title}</span>
                <span className="hidden truncate text-white/40 md:block">{r.meta}</span>
                <span className="text-right tabular-nums text-white/40">{r.year}</span>
              </a>
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 text-white/35">
          <span>
            {person.links.map((l) => (
              <a key={l.label} href={l.href} className="mr-4 hover:text-white">
                {l.label.toLowerCase()}
              </a>
            ))}
          </span>
          <span>
            press <kbd className="border border-white/20 px-1">/</kbd> to search · impressum ·
            datenschutz
          </span>
        </footer>
      </div>
    </div>
  )
}
