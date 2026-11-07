// PROTOTYPE, throw away. E: Bento. The home page as a dashboard of tiles: one glance shows profile, proof, writing and status.
// References: bento.me profiles, apple.com feature grids, "now" pages (nownownow.com)
import { experience, formatDate, now, person, posts, projects, skills } from '../../content'

const tile =
  'rounded-[28px] bg-white p-6 ring-1 ring-black/[0.04] shadow-[0_1px_2px_rgba(0,0,0,0.04)]'

export function VariantE() {
  const [se, ...rest] = projects
  return (
    <div className="min-h-screen bg-[#ecebe7] text-[#1a1a1a] selection:bg-amber-200">
      <div className="mx-auto max-w-6xl px-4 pb-40 pt-6 sm:px-6">
        <header className="mb-4 flex items-center justify-between rounded-full bg-white/70 px-5 py-3 text-sm ring-1 ring-black/5 backdrop-blur">
          <span className="font-semibold">Gwydion Braunsdorf</span>
          <nav className="flex gap-5 text-black/55">
            <a href="#">Work</a>
            <a href="#">Writing</a>
            <a href="#">CV</a>
            <span className="text-black/30">EN·DE</span>
          </nav>
        </header>

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className={`${tile} flex flex-col justify-between sm:col-span-2 lg:row-span-2`}>
            <img src="/portrait.webp" alt="" className="size-16 rounded-2xl object-cover" />
            <div>
              <h1 className="font-instrument text-5xl leading-[1.02] sm:text-6xl">
                Full-stack developer,
                <br />
                <em className="text-black/40">building alone, shipping often.</em>
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-black/60">
                {person.pitch}
              </p>
            </div>
          </div>

          <div className={`${tile} flex flex-col justify-between bg-emerald-600 text-white ring-0`}>
            <span className="inline-flex items-center gap-2 text-sm font-medium">
              <span className="size-2 animate-pulse rounded-full bg-white" /> Available
            </span>
            <div>
              <p className="text-2xl font-semibold leading-tight">{person.status}</p>
              <p className="mt-1 text-sm text-white/75">+ selected freelance</p>
            </div>
          </div>

          <a
            href="#"
            className={`${tile} flex flex-col justify-between bg-[#1a1a1a] text-white ring-0 transition hover:-translate-y-0.5`}
          >
            <span className="text-sm text-white/50">Résumé</span>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-semibold">Download CV</p>
              <span className="text-3xl">↓</span>
            </div>
          </a>

          <a
            href="#"
            className={`${tile} flex flex-col justify-between text-white ring-0 sm:col-span-2`}
            style={{ background: se.color }}
          >
            <div className="flex justify-between text-sm text-white/70">
              <span>Featured · {se.kind}</span>
              <span>{se.year}</span>
            </div>
            <div>
              <h2 className="text-4xl font-semibold tracking-tight">{se.title}</h2>
              <p className="mt-2 max-w-md text-sm text-white/80">{se.summary}</p>
              <div className="mt-5 flex gap-8">
                {se.stats?.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-semibold">{s.value}</div>
                    <div className="text-xs text-white/60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </a>

          {rest.slice(0, 2).map((p) => (
            <a
              key={p.slug}
              href="#"
              className={`${tile} group flex flex-col justify-between transition hover:-translate-y-0.5`}
            >
              <div
                className="h-20 rounded-2xl"
                style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}88)` }}
              />
              <div>
                <p className="text-xs text-black/40">{p.kind}</p>
                <h3 className="text-lg font-semibold">
                  {p.title} <span className="text-black/30 group-hover:text-black">↗</span>
                </h3>
              </div>
            </a>
          ))}

          <div className={`${tile} sm:col-span-2`}>
            <p className="mb-3 text-sm text-black/40">Latest writing</p>
            <ul className="divide-y divide-black/5">
              {posts.map((p) => (
                <li key={p.title}>
                  <a
                    href="#"
                    className="flex items-baseline justify-between gap-4 py-2.5 hover:text-amber-700"
                  >
                    <span className="font-medium" lang={p.lang}>
                      {p.title}
                    </span>
                    <span className="shrink-0 text-xs text-black/40">
                      {p.lang === 'de' ? 'DE · ' : ''}
                      {formatDate(p.date)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={tile}>
            <p className="mb-3 text-sm text-black/40">Now</p>
            <ul className="space-y-2.5 text-sm">
              {now.map((n) => (
                <li key={n.label}>
                  <b className="font-semibold">{n.label}.</b>{' '}
                  <span className="text-black/60">{n.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={tile}>
            <p className="mb-3 text-sm text-black/40">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 9).map((s) => (
                <span key={s} className="rounded-full bg-[#f2f1ed] px-2.5 py-1 text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className={`${tile} sm:col-span-2`}>
            <p className="mb-3 text-sm text-black/40">Experience</p>
            <ul className="space-y-3">
              {experience.map((e) => (
                <li
                  key={e.title}
                  className={`flex justify-between gap-4 text-sm ${e.placeholder ? 'opacity-40' : ''}`}
                >
                  <span>
                    <b className="font-semibold">{e.title}</b>{' '}
                    <span className="text-black/50">· {e.org}</span>
                  </span>
                  <span className="shrink-0 text-black/40">{e.period}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={`mailto:${person.email}`}
            className={`${tile} flex flex-col justify-between bg-amber-300 ring-0 sm:col-span-2 transition hover:-translate-y-0.5`}
          >
            <span className="text-sm text-black/60">Get in touch</span>
            <div className="flex items-end justify-between gap-4">
              <p className="font-instrument text-4xl">{person.email}</p>
              <div className="flex gap-3 text-sm font-medium">
                {person.links.slice(0, 2).map((l) => (
                  <span key={l.label}>{l.label}</span>
                ))}
              </div>
            </div>
          </a>
        </div>
        <p className="mt-8 text-center text-xs text-black/40">Impressum · Datenschutz</p>
      </div>
    </div>
  )
}
