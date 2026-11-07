// PROTOTYPE, throw away. C: Résumé split. Sticky identity column left, scrolling evidence right. Built for skimming recruiters.
// References: brittanychiang.com, read.cv profiles
import { useEffect, useState } from 'react'
import { experience, formatDate, person, posts, projects, skills } from '../../content'

const sections = ['about', 'experience', 'projects', 'writing'] as const

export function VariantC() {
  const [active, setActive] = useState<string>('about')
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-600 selection:bg-blue-100">
      <div className="mx-auto max-w-6xl px-6 lg:flex lg:gap-16 lg:px-12">
        <aside className="pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-20">
          <div>
            <img
              src="/portrait.webp"
              alt=""
              className="size-20 rounded-full object-cover ring-4 ring-slate-100"
            />
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {person.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-slate-800">{person.role}</p>
            <p className="mt-4 max-w-sm leading-relaxed">{person.pitch}</p>
            <div className="mt-6 flex flex-col items-start gap-2 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700 ring-1 ring-emerald-200">
                <span className="size-1.5 rounded-full bg-emerald-500" /> {person.status}
              </span>
              <span className="px-1 text-slate-400">{person.freelance}</span>
            </div>
            <nav className="mt-14 hidden flex-col gap-3 lg:flex">
              {sections.map((s) => (
                <a
                  key={s}
                  href={`#${s}`}
                  className={`group flex items-center gap-4 text-xs font-semibold uppercase tracking-widest ${active === s ? 'text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  <span
                    className={`h-px transition-all ${active === s ? 'w-16 bg-slate-900' : 'w-8 bg-slate-300 group-hover:w-16 group-hover:bg-slate-900'}`}
                  />
                  {s}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3 pb-10 lg:pb-0">
            <a
              href="#"
              className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Download CV
            </a>
            {person.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-slate-100 hover:text-slate-900"
              >
                {l.label}
              </a>
            ))}
            <span className="text-xs text-slate-300">EN · DE</span>
          </div>
        </aside>

        <main className="pb-40 lg:w-[58%] lg:py-20">
          <section id="about" className="scroll-mt-16 space-y-4 pt-8 leading-relaxed lg:pt-0">
            <p>
              For the past year I’ve designed, built and operated{' '}
              <b className="font-medium text-slate-900">Self-Engine</b> on my own: a productivity
              platform where time tracking, tasks, calendar, finance and habits share one data model
              and sync offline-first across web, macOS and iOS.
            </p>
            <p>
              Alongside it I build websites and web apps for studios and small businesses: from
              first conversation to deployment and ongoing care.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          <Heading id="experience">Experience</Heading>
          <ol className="space-y-2">
            {experience.map((e) => (
              <li
                key={e.title}
                className={`group grid gap-1 rounded-xl p-4 transition hover:bg-slate-50 sm:grid-cols-[120px_1fr] sm:gap-6 ${e.placeholder ? 'opacity-40' : ''}`}
              >
                <span className="pt-0.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {e.period}
                </span>
                <div>
                  <h3 className="font-medium text-slate-900 group-hover:text-blue-700">
                    {e.title} · {e.org}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed">{e.summary}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href="#"
            className="mt-4 inline-block px-4 text-sm font-semibold text-slate-900 hover:text-blue-700"
          >
            View full CV →
          </a>

          <Heading id="projects">Projects</Heading>
          <ul className="space-y-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <a
                  href="#"
                  className="group grid gap-4 rounded-xl p-4 transition hover:bg-slate-50 sm:grid-cols-[120px_1fr] sm:gap-6"
                >
                  <div
                    className="aspect-[4/3] rounded-lg ring-1 ring-black/5"
                    style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)` }}
                  />
                  <div>
                    <h3 className="font-medium text-slate-900 group-hover:text-blue-700">
                      {p.title} <span className="text-slate-300">↗</span>
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed">{p.summary}</p>
                    {p.stats && (
                      <p className="mt-2 text-xs font-medium text-slate-500">
                        {p.stats.map((s) => `${s.value} ${s.label}`).join(' · ')}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <Heading id="writing">Writing</Heading>
          <ul>
            {posts.map((p) => (
              <li key={p.title}>
                <a
                  href="#"
                  className="flex items-baseline justify-between gap-6 rounded-xl p-4 hover:bg-slate-50"
                >
                  <span className="font-medium text-slate-900" lang={p.lang}>
                    {p.title}
                    {p.lang === 'de' && (
                      <span className="ml-2 align-middle text-[10px] font-semibold text-slate-400">
                        DE
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 text-xs text-slate-400">{formatDate(p.date)}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-20 px-4 text-xs text-slate-400">Impressum · Datenschutz</p>
        </main>
      </div>
    </div>
  )
}

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mb-4 mt-24 scroll-mt-16 px-4 text-xs font-bold uppercase tracking-widest text-slate-900"
    >
      {children}
    </h2>
  )
}
