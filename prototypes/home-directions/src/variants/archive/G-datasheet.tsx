// PROTOTYPE, throw away. G: Datasheet. Light, engineering-document look: numbered sections, hairline grid, spec tables.
// References: Teenage Engineering product pages, Swiss/International typographic style, technical datasheets
import { experience, formatDate, person, posts, projects, skills } from '../../content'

const cell = 'border-b border-r border-[#1a1a1a]/15 p-4'
const label = 'font-mono text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/45'

export function VariantG() {
  return (
    <div className="min-h-screen bg-[#f4f4f0] text-[#1a1a1a] selection:bg-[#ff4f00] selection:text-white">
      <div className="mx-auto max-w-6xl px-4 pb-40 pt-6 sm:px-8">
        <header
          className={`grid grid-cols-2 border-l border-t border-[#1a1a1a]/15 sm:grid-cols-4 ${label}`}
        >
          <div className={cell}>GB—001 / Portfolio</div>
          <div className={cell}>Rev. 2026.11</div>
          <div className={`${cell} hidden sm:block`}>{person.location}</div>
          <div className={`${cell} hidden sm:block text-right`}>EN / DE</div>
        </header>

        <section className="grid border-l border-[#1a1a1a]/15 lg:grid-cols-[1fr_380px]">
          <div className={`${cell} py-12`}>
            <p className={label}>00 — Designation</p>
            <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-7xl">
              Gwydion
              <br />
              Braunsdorf<span className="text-[#ff4f00]">.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-snug">
              {person.role}. {person.pitch}
            </p>
          </div>
          <div className="grid grid-rows-[auto_1fr_auto]">
            <div className={cell}>
              <p className={label}>Status</p>
              <p className="mt-2 flex items-center gap-2 font-medium">
                <span className="size-2 bg-[#ff4f00]" />
                {person.status}
              </p>
            </div>
            <div className={cell}>
              <img
                src="/portrait.webp"
                alt=""
                className="aspect-square w-full object-cover grayscale"
              />
            </div>
            <a
              href="#"
              className={`${cell} flex items-center justify-between bg-[#1a1a1a] font-mono text-sm text-white hover:bg-[#ff4f00]`}
            >
              DOWNLOAD CV.PDF <span>↓</span>
            </a>
          </div>
        </section>

        <SectionHead n="01" title="Projects" />
        <div className="grid border-l border-[#1a1a1a]/15 sm:grid-cols-2">
          {projects.map((p, i) => (
            <a
              key={p.slug}
              href="#"
              className={`${cell} group grid grid-cols-[3rem_1fr] gap-4 hover:bg-white`}
            >
              <span className="font-mono text-sm text-[#ff4f00]">1.{i + 1}</span>
              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-semibold tracking-tight">{p.title}</h3>
                  <span className={label}>{p.year}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#1a1a1a]/70">{p.summary}</p>
                <table className="mt-4 w-full font-mono text-[11px]">
                  <tbody>
                    <tr className="border-t border-[#1a1a1a]/10">
                      <td className="py-1 text-[#1a1a1a]/45">TYPE</td>
                      <td className="py-1 text-right">{p.kind}</td>
                    </tr>
                    <tr className="border-t border-[#1a1a1a]/10">
                      <td className="py-1 text-[#1a1a1a]/45">STACK</td>
                      <td className="py-1 text-right">{p.stack.join(' / ')}</td>
                    </tr>
                    {p.stats?.map((s) => (
                      <tr key={s.label} className="border-t border-[#1a1a1a]/10">
                        <td className="py-1 uppercase text-[#1a1a1a]/45">{s.label}</td>
                        <td className="py-1 text-right">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2">
          <div>
            <SectionHead n="02" title="Experience" />
            <div className="border-l border-[#1a1a1a]/15">
              {experience.map((e) => (
                <div
                  key={e.title}
                  className={`${cell} grid grid-cols-[7rem_1fr] gap-4 ${e.placeholder ? 'opacity-40' : ''}`}
                >
                  <span className="font-mono text-xs">{e.period}</span>
                  <div>
                    <p className="font-semibold">{e.title}</p>
                    <p className="text-sm text-[#1a1a1a]/60">
                      {e.org} — {e.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHead n="03" title="Specification" />
            <div className="grid grid-cols-2 border-l border-[#1a1a1a]/15">
              {skills.map((s, i) => (
                <div key={s} className={`${cell} flex justify-between py-2.5 text-sm`}>
                  <span>{s}</span>
                  <span className="font-mono text-[10px] text-[#1a1a1a]/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionHead n="04" title="Writing" />
        <div className="border-l border-[#1a1a1a]/15">
          {posts.map((p) => (
            <a
              key={p.title}
              href="#"
              className={`${cell} grid grid-cols-[7rem_1fr_3rem] items-baseline gap-4 hover:bg-white`}
            >
              <span className="font-mono text-xs">{formatDate(p.date)}</span>
              <span className="text-lg font-medium" lang={p.lang}>
                {p.title}
              </span>
              <span className="text-right font-mono text-xs uppercase text-[#1a1a1a]/45">
                {p.lang}
              </span>
            </a>
          ))}
        </div>

        <footer className={`grid grid-cols-2 border-l border-[#1a1a1a]/15 sm:grid-cols-4 ${label}`}>
          <a
            href={`mailto:${person.email}`}
            className={`${cell} col-span-2 text-base normal-case tracking-normal text-[#1a1a1a] hover:text-[#ff4f00]`}
          >
            {person.email} →
          </a>
          {person.links.slice(0, 2).map((l) => (
            <a key={l.label} href={l.href} className={cell}>
              {l.label}
            </a>
          ))}
          <div className={`${cell} col-span-2 sm:col-span-4`}>Impressum · Datenschutz · © 2026</div>
        </footer>
      </div>
    </div>
  )
}

function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="mt-14 flex items-baseline gap-4 border-b border-[#1a1a1a] pb-2">
      <span className="font-mono text-sm text-[#ff4f00]">{n}</span>
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em]">{title}</h2>
    </div>
  )
}
