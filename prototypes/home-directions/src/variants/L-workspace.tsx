// PROTOTYPE, throw away. L: Light workspace. F's sidebar, but the main pane is one long readable page
// (C's résumé content), so it scrolls like a site and the sidebar acts as table of contents. Light, warm, calm.
// References: Notion pages, Things 3 (light), Craft docs, Bear
import { useEffect, useState } from 'react'
import { experience, formatDate, now, person, posts, projects, skills } from '../content'

const toc = [
  { id: 'intro', label: 'Introduction', icon: '👋' },
  { id: 'projects', label: 'Projects', icon: '◆' },
  { id: 'experience', label: 'Experience', icon: '★' },
  { id: 'writing', label: 'Writing', icon: '¶' },
  { id: 'contact', label: 'Contact', icon: '✉' },
]

export function VariantL() {
  const [active, setActive] = useState('intro')
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    )
    toc.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#fbfaf8] text-[15px] text-[#37352f]">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-[#f4f2ee] p-3 text-sm md:flex">
        <div className="flex items-center gap-2.5 rounded-md p-2">
          <img src="/portrait.webp" alt="" className="size-6 rounded object-cover" />
          <span className="font-medium">Gwydion’s Workspace</span>
        </div>
        <div className="mt-2 rounded-md px-2 py-1 text-[#9b9a97] hover:bg-black/5">
          ⌕ Search <span className="float-right text-xs">⌘K</span>
        </div>
        <p className="mt-5 px-2 text-xs font-medium text-[#9b9a97]">On this page</p>
        {toc.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`mt-0.5 flex items-center gap-2.5 rounded-md px-2 py-1 ${active === t.id ? 'bg-black/[0.07] font-medium text-[#191919]' : 'text-[#5f5e5b] hover:bg-black/5'}`}
          >
            <span className="w-5 text-center text-xs">{t.icon}</span>
            {t.label}
          </a>
        ))}
        <p className="mt-5 px-2 text-xs font-medium text-[#9b9a97]">Projects</p>
        {projects.map((p) => (
          <a
            key={p.slug}
            href="#"
            className="mt-0.5 flex items-center gap-2.5 rounded-md px-2 py-1 text-[#5f5e5b] hover:bg-black/5"
          >
            <span className="ml-1.5 size-2 rounded-full" style={{ background: p.color }} />
            <span className="ml-1">{p.title}</span>
          </a>
        ))}
        <div className="mt-auto px-2 text-xs text-[#9b9a97]">
          EN · DE
          <br />
          Impressum · Datenschutz
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="h-44 bg-[linear-gradient(120deg,#2f5d50,#a07a2c)]" />
        <article className="mx-auto max-w-[720px] px-8 pb-40">
          <img
            src="/portrait.webp"
            alt=""
            className="-mt-12 size-24 rounded-xl object-cover ring-4 ring-[#fbfaf8]"
          />
          <section id="intro" className="scroll-mt-10">
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#191919]">{person.name}</h1>
            <div className="mt-4 grid grid-cols-[120px_1fr] gap-y-2 text-sm">
              <span className="text-[#9b9a97]">Role</span>
              <span>{person.role}</span>
              <span className="text-[#9b9a97]">Status</span>
              <span>
                <span className="rounded bg-[#dbeddb] px-1.5 py-0.5 text-[#1c3829]">
                  {person.status}
                </span>
              </span>
              <span className="text-[#9b9a97]">Location</span>
              <span>{person.location}</span>
              <span className="text-[#9b9a97]">Skills</span>
              <span className="flex flex-wrap gap-1">
                {skills.slice(0, 6).map((s) => (
                  <span key={s} className="rounded bg-[#e9e5e3] px-1.5 py-0.5 text-xs">
                    {s}
                  </span>
                ))}
              </span>
            </div>
            <hr className="my-8 border-[#e9e9e7]" />
            <p className="leading-relaxed">{person.pitch}</p>
            <div className="mt-6 rounded-md bg-[#f1f1ef] p-4 text-sm">
              <b>💡 Now.</b> {now.map((n) => `${n.label}: ${n.text}`).join(' ')}
            </div>
          </section>

          <H2 id="projects">Projects</H2>
          <div className="grid gap-3 sm:grid-cols-2">
            {projects.map((p) => (
              <a
                key={p.slug}
                href="#"
                className="overflow-hidden rounded-md ring-1 ring-[#e9e9e7] transition hover:bg-[#f7f6f3]"
              >
                <div className="h-20" style={{ background: p.color }} />
                <div className="p-3">
                  <p className="font-medium text-[#191919]">{p.title}</p>
                  <p className="mt-1 text-sm text-[#5f5e5b]">{p.summary}</p>
                  <p className="mt-2 text-xs text-[#9b9a97]">
                    {p.kind} · {p.year}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <H2 id="experience">Experience</H2>
          <table className="w-full text-sm">
            <tbody>
              {experience.map((e) => (
                <tr
                  key={e.title}
                  className={`border-b border-[#e9e9e7] ${e.placeholder ? 'opacity-40' : ''}`}
                >
                  <td className="w-28 py-2.5 align-top text-[#9b9a97]">{e.period}</td>
                  <td className="py-2.5">
                    <b className="font-medium text-[#191919]">{e.title}</b> · {e.org}
                    <br />
                    <span className="text-[#5f5e5b]">{e.summary}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm ring-1 ring-[#e9e9e7] hover:bg-[#f1f1ef]"
          >
            📄 CV.pdf
          </a>

          <H2 id="writing">Writing</H2>
          {posts.map((p) => (
            <a
              key={p.title}
              href="#"
              className="flex items-baseline gap-3 rounded-md px-2 py-1.5 hover:bg-[#f1f1ef]"
            >
              <span>📝</span>
              <span className="underline decoration-[#e9e9e7] underline-offset-4" lang={p.lang}>
                {p.title}
              </span>
              <span className="ml-auto shrink-0 text-xs text-[#9b9a97]">
                {p.lang === 'de' ? 'DE · ' : ''}
                {formatDate(p.date)}
              </span>
            </a>
          ))}

          <H2 id="contact">Contact</H2>
          <p>
            {person.freelance}. Reach me at{' '}
            <a href={`mailto:${person.email}`} className="underline underline-offset-4">
              {person.email}
            </a>
            , or on{' '}
            {person.links
              .slice(0, 2)
              .map((l) => l.label)
              .join(' and ')}
            .
          </p>
        </article>
      </main>
    </div>
  )
}

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="mb-4 mt-14 scroll-mt-10 text-2xl font-semibold tracking-tight text-[#191919]"
  >
    {children}
  </h2>
)
