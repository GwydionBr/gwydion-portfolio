// PROTOTYPE, throw away. M: Desktop. F taken literally: a desktop with icons, draggable windows and a dock.
// Several things can be open side by side (e.g. CV next to a project).
// References: OS-style portfolios (e.g. poolsuite.net, "macOS portfolio" sites), Self-Engine's desktop app
import { useRef, useState } from 'react'
import { experience, formatDate, person, posts, projects, skills } from '../content'

type Win = { id: string; title: string; x: number; y: number; w: number; z: number }

const apps: Record<
  string,
  { title: string; icon: string; w: number; body: () => React.ReactNode }
> = {
  about: {
    title: 'About',
    icon: '🙂',
    w: 440,
    body: () => (
      <div className="p-5">
        <div className="flex gap-4">
          <img src="/portrait.webp" alt="" className="size-16 rounded-xl object-cover" />
          <div>
            <p className="text-lg font-semibold text-neutral-900">{person.name}</p>
            <p>{person.role}</p>
            <p className="mt-1 text-emerald-600">● {person.status}</p>
          </div>
        </div>
        <p className="mt-4 leading-relaxed">{person.pitch}</p>
      </div>
    ),
  },
  projects: {
    title: 'Projects',
    icon: '📁',
    w: 520,
    body: () => (
      <div className="grid grid-cols-2 gap-3 p-4">
        {projects.map((p) => (
          <div key={p.slug} className="rounded-lg p-3 hover:bg-black/5">
            <div className="h-16 rounded-md" style={{ background: p.color }} />
            <p className="mt-2 font-medium text-neutral-900">{p.title}</p>
            <p className="text-xs">
              {p.kind} · {p.year}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  cv: {
    title: 'CV.pdf',
    icon: '📄',
    w: 460,
    body: () => (
      <div className="bg-neutral-100 p-4">
        <div className="bg-white p-5 shadow">
          <p className="text-base font-semibold text-neutral-900">{person.name}</p>
          <p className="text-xs">{person.role}</p>
          {experience.map((e) => (
            <div key={e.title} className={`mt-3 ${e.placeholder ? 'opacity-40' : ''}`}>
              <p className="font-medium text-neutral-900">
                {e.title} · {e.org}
              </p>
              <p className="text-xs">
                {e.period} · {e.summary}
              </p>
            </div>
          ))}
          <p className="mt-3 text-xs">{skills.join(' · ')}</p>
          <button className="mt-4 rounded-md bg-neutral-900 px-3 py-1.5 text-xs text-white">
            Download
          </button>
        </div>
      </div>
    ),
  },
  writing: {
    title: 'Writing',
    icon: '📝',
    w: 480,
    body: () => (
      <ul className="divide-y divide-black/5 p-2">
        {posts.map((p) => (
          <li key={p.title} className="rounded px-3 py-2.5 hover:bg-black/5">
            <p className="font-medium text-neutral-900" lang={p.lang}>
              {p.title}
            </p>
            <p className="text-xs">
              {p.lang.toUpperCase()} · {formatDate(p.date)}
            </p>
          </li>
        ))}
      </ul>
    ),
  },
  mail: {
    title: 'New Message',
    icon: '✉️',
    w: 420,
    body: () => (
      <div className="space-y-2 p-4">
        <p className="border-b border-black/10 pb-2 text-xs">To: {person.email}</p>
        <textarea
          rows={5}
          placeholder="Hi Gwydion, …"
          className="w-full resize-none bg-transparent outline-none"
        />
        <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs text-white">Send</button>
      </div>
    ),
  },
}

export function VariantM() {
  const [wins, setWins] = useState<Win[]>([
    { id: 'about', title: 'About', x: 140, y: 70, w: apps.about.w, z: 2 },
    { id: 'projects', title: 'Projects', x: 520, y: 200, w: apps.projects.w, z: 1 },
  ])
  const z = useRef(3)
  const focus = (id: string) =>
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, z: z.current++ } : w)))
  const open = (id: string) =>
    setWins((ws) =>
      ws.some((w) => w.id === id)
        ? ws.map((w) => (w.id === id ? { ...w, z: z.current++ } : w))
        : [
            ...ws,
            {
              id,
              title: apps[id].title,
              x: 180 + ws.length * 40,
              y: 90 + ws.length * 40,
              w: apps[id].w,
              z: z.current++,
            },
          ],
    )
  const close = (id: string) => setWins((ws) => ws.filter((w) => w.id !== id))
  const drag = (id: string, e: React.PointerEvent) => {
    focus(id)
    const start = { x: e.clientX, y: e.clientY }
    const win = wins.find((w) => w.id === id)!
    const move = (ev: PointerEvent) =>
      setWins((ws) =>
        ws.map((w) =>
          w.id === id
            ? {
                ...w,
                x: win.x + ev.clientX - start.x,
                y: Math.max(28, win.y + ev.clientY - start.y),
              }
            : w,
        ),
      )
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <div className="relative h-screen select-none overflow-hidden bg-[linear-gradient(160deg,#2f5d50,#14262a_55%,#a07a2c)] text-sm text-neutral-600">
      <div className="absolute inset-x-0 top-0 z-[999] flex items-center gap-5 bg-white/30 px-4 py-1 text-xs font-medium text-neutral-900 backdrop-blur-xl">
        <span className="font-bold">Gwydion</span>
        <span>File</span>
        <span>View</span>
        <span className="ml-auto text-emerald-900">● {person.status}</span>
        <span>EN · DE</span>
      </div>
      <div className="absolute right-6 top-12 flex flex-col gap-5">
        {Object.entries(apps).map(([id, a]) => (
          <button
            key={id}
            onDoubleClick={() => open(id)}
            onClick={() => open(id)}
            className="flex w-20 flex-col items-center gap-1 rounded-lg p-2 text-xs text-white hover:bg-white/10"
          >
            <span className="text-4xl drop-shadow">{a.icon}</span>
            {a.title}
          </button>
        ))}
      </div>
      {wins.map((w) => (
        <div
          key={w.id}
          onPointerDown={() => focus(w.id)}
          className="absolute overflow-hidden rounded-xl bg-white/95 shadow-2xl ring-1 ring-black/10"
          style={{ left: w.x, top: w.y, width: w.w, zIndex: w.z }}
        >
          <div
            onPointerDown={(e) => drag(w.id, e)}
            className="flex cursor-grab items-center gap-2 border-b border-black/10 bg-neutral-100 px-3 py-2 active:cursor-grabbing"
          >
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => close(w.id)}
              className="size-3 rounded-full bg-[#ff5f57]"
              aria-label="Close"
            />
            <span className="size-3 rounded-full bg-[#febc2e]" />
            <span className="size-3 rounded-full bg-[#28c840]" />
            <span className="flex-1 text-center text-xs font-medium text-neutral-700">
              {w.title}
            </span>
            <span className="w-12" />
          </div>
          <div className="max-h-[60vh] overflow-y-auto">{apps[w.id].body()}</div>
        </div>
      ))}
      <div className="absolute bottom-3 left-1/2 z-[998] flex -translate-x-1/2 gap-2 rounded-2xl bg-white/25 p-2 ring-1 ring-white/30 backdrop-blur-xl">
        {Object.entries(apps).map(([id, a]) => (
          <button
            key={id}
            onClick={() => open(id)}
            className="relative flex size-12 items-center justify-center rounded-xl bg-white/70 text-2xl transition hover:-translate-y-1"
            title={a.title}
          >
            {a.icon}
            {wins.some((w) => w.id === id) && (
              <span className="absolute -bottom-1.5 size-1 rounded-full bg-white" />
            )}
          </button>
        ))}
      </div>
      <p className="absolute bottom-1 right-3 text-[10px] text-white/50">Impressum · Datenschutz</p>
    </div>
  )
}
