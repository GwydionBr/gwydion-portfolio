// PROTOTYPE, throw away: floating variant switcher (← / → keys cycle).
import { useEffect } from 'react'

type Props = {
  variants: readonly { key: string; name: string }[]
  current: string
  onChange: (key: string) => void
}

export function Switcher({ variants, current, onChange }: Props) {
  const i = variants.findIndex((v) => v.key === current)
  const go = (d: number) => onChange(variants[(i + d + variants.length) % variants.length].key)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('input, textarea, [contenteditable]')) return
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="fixed bottom-5 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-fuchsia-600 p-1 font-mono text-sm text-white shadow-2xl shadow-black/40">
      <button
        onClick={() => go(-1)}
        className="rounded-full px-3 py-1.5 hover:bg-white/20"
        aria-label="Previous variant"
      >
        ←
      </button>
      <div className="flex gap-1">
        {variants.map((v) => (
          <button
            key={v.key}
            onClick={() => onChange(v.key)}
            className={`rounded-full px-2.5 py-1.5 ${v.key === current ? 'bg-white text-fuchsia-700' : 'hover:bg-white/20'}`}
          >
            {v.key === current ? `${v.key} · ${v.name}` : v.key}
          </button>
        ))}
      </div>
      <button
        onClick={() => go(1)}
        className="rounded-full px-3 py-1.5 hover:bg-white/20"
        aria-label="Next variant"
      >
        →
      </button>
    </div>
  )
}
