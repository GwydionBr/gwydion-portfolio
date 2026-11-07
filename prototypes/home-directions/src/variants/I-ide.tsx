// PROTOTYPE, throw away. I: IDE. App shell in the shape of a code editor (B's terminal energy inside F's shell):
// file tree, tabs, content rendered like a markdown preview, status bar with availability.
// References: VS Code, Zed, Cursor
import { useState } from 'react'
import { experience, formatDate, now, person, posts, projects, skills } from '../content'

type File = { path: string; name: string; icon: string; render: () => React.ReactNode }

const files: File[] = [
  { path: 'README.md', name: 'README.md', icon: 'ⓘ', render: () => null },
  ...projects.map((p) => ({
    path: `projects/${p.slug}.md`,
    name: `${p.slug}.md`,
    icon: '◆',
    render: () => (
      <Doc>
        <Meta>
          {p.kind} · {p.year}
        </Meta>
        <H1>{p.title}</H1>
        <P>{p.summary}</P>
        {p.stats && (
          <div className="my-6 flex gap-8">
            {p.stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl text-white">{s.value}</div>
                <div className="text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        )}
        <pre className="mt-6 rounded-md bg-black/40 p-4 text-[12px] leading-relaxed text-[#9cdcfe]">{`stack:\n${p.stack.map((s) => `  - ${s}`).join('\n')}`}</pre>
        <a href="#" className="mt-6 inline-block text-[#7ee787] hover:underline">
          → open case study
        </a>
      </Doc>
    ),
  })),
  ...posts.map((p) => ({
    path: `writing/${p.date}.md`,
    name: `${p.date}.md`,
    icon: '¶',
    render: () => (
      <Doc>
        <Meta>
          {formatDate(p.date)} · {p.lang.toUpperCase()} · {p.minutes} min
        </Meta>
        <H1>
          <span lang={p.lang}>{p.title}</span>
        </H1>
        <P>
          Placeholder excerpt of the post. Opening a post in the real site would show the full
          article here.
        </P>
      </Doc>
    ),
  })),
  {
    path: 'cv.md',
    name: 'cv.md',
    icon: '★',
    render: () => (
      <Doc>
        <div className="flex items-start justify-between">
          <H1>Experience</H1>
          <a
            href="#"
            className="rounded border border-[#7ee787] px-3 py-1 text-xs text-[#7ee787] hover:bg-[#7ee787] hover:text-black"
          >
            cv.pdf ↓
          </a>
        </div>
        {experience.map((e) => (
          <div key={e.title} className={`mt-5 ${e.placeholder ? 'opacity-40' : ''}`}>
            <p className="text-white">
              <span className="text-[#c586c0]">##</span> {e.title}{' '}
              <span className="text-white/40">@ {e.org}</span>
            </p>
            <p className="text-xs text-white/40">{e.period}</p>
            <P>{e.summary}</P>
          </div>
        ))}
        <p className="mt-8 text-white">
          <span className="text-[#c586c0]">##</span> Skills
        </p>
        <p className="mt-2 text-white/60">{skills.join(' · ')}</p>
      </Doc>
    ),
  },
  { path: 'contact.ts', name: 'contact.ts', icon: '✉', render: Contact },
]

const tree = [
  { dir: null, files: ['README.md'] },
  {
    dir: 'projects',
    files: files.filter((f) => f.path.startsWith('projects/')).map((f) => f.path),
  },
  { dir: 'writing', files: files.filter((f) => f.path.startsWith('writing/')).map((f) => f.path) },
  { dir: null, files: ['cv.md', 'contact.ts'] },
]

export function VariantI() {
  const [tabs, setTabs] = useState(['README.md'])
  const [active, setActive] = useState('README.md')
  const open = (path: string) => {
    setTabs((t) => (t.includes(path) ? t : [...t, path]))
    setActive(path)
  }
  const close = (path: string) => {
    const next = tabs.filter((t) => t !== path)
    setTabs(next.length ? next : ['README.md'])
    if (active === path) setActive(next.at(-1) ?? 'README.md')
  }
  const file = files.find((f) => f.path === active)!

  return (
    <div className="flex h-screen flex-col bg-[#1e1e1e] font-mono text-[13px] text-white/70">
      <div className="flex items-center gap-2 border-b border-black/40 bg-[#2a2a2a] px-3 py-1.5 text-xs text-white/40">
        <span className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex-1 text-center">gwydion — {active}</span>
        <span>EN · DE</span>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-60 shrink-0 overflow-y-auto border-r border-black/40 bg-[#252526] py-2 md:block">
          <p className="px-4 pb-2 text-[11px] uppercase tracking-wider text-white/40">
            Explorer · gwydion
          </p>
          {tree.map((g, i) => (
            <div key={i}>
              {g.dir && <p className="px-4 py-1 text-white/80">▾ {g.dir}/</p>}
              {g.files.map((p) => {
                const f = files.find((x) => x.path === p)!
                return (
                  <button
                    key={p}
                    onClick={() => open(p)}
                    className={`flex w-full items-center gap-2 py-1 text-left ${g.dir ? 'pl-8' : 'pl-4'} ${active === p ? 'bg-[#37373d] text-white' : 'hover:bg-white/5'}`}
                  >
                    <span className="w-3 text-[#7ee787]">{f.icon}</span>
                    <span className="truncate">{f.name}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex overflow-x-auto border-b border-black/40 bg-[#252526]">
            {tabs.map((t) => (
              <div
                key={t}
                className={`group flex shrink-0 items-center gap-2 border-r border-black/40 px-3 py-2 ${active === t ? 'bg-[#1e1e1e] text-white' : 'text-white/45'}`}
              >
                <button onClick={() => setActive(t)}>
                  {files.find((f) => f.path === t)!.name}
                </button>
                <button
                  onClick={() => close(t)}
                  className="text-white/30 opacity-0 hover:text-white group-hover:opacity-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <p className="border-b border-white/5 px-6 py-1 text-xs text-white/30">
            gwydion › {active.replace('/', ' › ')}
          </p>
          <main className="flex-1 overflow-y-auto">
            {active === 'README.md' ? Readme() : file.render()}
          </main>
        </div>
      </div>
      <footer className="flex items-center gap-4 bg-[#007acc] px-3 py-0.5 text-xs text-white">
        <span>⎇ main</span>
        <span>● {person.status.toLowerCase()}</span>
        <span className="hidden sm:inline">{person.location.toLowerCase()}</span>
        <span className="ml-auto">impressum · datenschutz</span>
        <span>UTF-8</span>
      </footer>
    </div>
  )

  function Readme() {
    return (
      <Doc>
        <div className="flex items-center gap-4">
          <img src="/portrait.webp" alt="" className="size-14 rounded-md object-cover" />
          <div>
            <H1>{person.name}</H1>
            <Meta>
              {person.role} · {person.location}
            </Meta>
          </div>
        </div>
        <P>{person.pitch}</P>
        <p className="mt-6 text-white">
          <span className="text-[#c586c0]">##</span> Now
        </p>
        {now.map((n) => (
          <p key={n.label} className="mt-1">
            <span className="text-[#dcdcaa]">- {n.label}:</span> {n.text}
          </p>
        ))}
        <p className="mt-6 text-white">
          <span className="text-[#c586c0]">##</span> Quick links
        </p>
        <p className="mt-1">
          -{' '}
          <button onClick={() => open('cv.md')} className="text-[#4fc1ff] hover:underline">
            cv.md
          </button>{' '}
          ·{' '}
          <button
            onClick={() => open('projects/self-engine.md')}
            className="text-[#4fc1ff] hover:underline"
          >
            projects/self-engine.md
          </button>{' '}
          ·{' '}
          <button onClick={() => open('contact.ts')} className="text-[#4fc1ff] hover:underline">
            contact.ts
          </button>
        </p>
      </Doc>
    )
  }
}

function Contact() {
  return (
    <div className="p-6 leading-7">
      {[
        <>
          <span className="text-[#c586c0]">export const</span>{' '}
          <span className="text-[#4fc1ff]">contact</span> = {'{'}
        </>,
        <>
          {' '}
          email: <span className="text-[#ce9178]">'{person.email}'</span>,
        </>,
        <>
          {' '}
          status: <span className="text-[#ce9178]">'{person.status}'</span>,
        </>,
        <>
          {' '}
          freelance: <span className="text-[#569cd6]">true</span>,
        </>,
        <>
          {' '}
          links: [
          {person.links.map((l, i) => (
            <span key={l.label}>
              <a href={l.href} className="text-[#ce9178] hover:underline">
                '{l.label}'
              </a>
              {i < person.links.length - 1 ? ', ' : ''}
            </span>
          ))}
          ],
        </>,
        <>{'}'}</>,
      ].map((line, i) => (
        <div key={i} className="flex">
          <span className="w-10 shrink-0 select-none pr-4 text-right text-white/20">{i + 1}</span>
          <span className="whitespace-pre">{line}</span>
        </div>
      ))}
    </div>
  )
}

const Doc = ({ children }: { children: React.ReactNode }) => (
  <article className="max-w-2xl p-8 font-sans text-[15px] leading-relaxed sm:p-12">
    {children}
  </article>
)
const H1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-2xl font-semibold tracking-tight text-white">{children}</h1>
)
const Meta = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-xs text-white/40">{children}</p>
)
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-3 text-white/65">{children}</p>
)
