import { useState } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { useLingui } from '@lingui/react/macro'
import { CaretLeft, CaretRight, X } from '@phosphor-icons/react'
import { useScreenshots } from '#/content/react'
import type { Screenshot } from '#/content'
import { useTheme } from '#/theme/react'
import { ScreenshotImage } from './ScreenshotImage'
import { useStoryProject } from './StoryProject'

/** Wide enough to take the whole row: a whole app window or a wide close-up. */
const isWide = (shot: Screenshot) => shot.width >= 900

/**
 * The story's Project's screenshots (`<ScreenshotGallery />`), or only
 * `views`, in that order (`<ScreenshotGallery views={['dashboard']} />`), in
 * the Site language and the theme shown. Each opens enlarged; the enlarged
 * view pages through this gallery's screenshots and closes with Escape.
 */
export function ScreenshotGallery({ views }: { views?: string[] }) {
  const { t } = useLingui()
  const { theme } = useTheme()
  const project = useStoryProject()
  const all = useScreenshots(project)
  const shots = views
    ? views.map((view) => {
        const shot = all.find((candidate) => candidate.view === view)
        if (!shot) throw new Error(`${project} has no screenshot "${view}".`)
        return shot
      })
    : all
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const enlarged = shots[index]
  const step = (by: number) => setIndex((current) => (current + by + shots.length) % shots.length)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <ul aria-label={t`Screenshots`} className="not-first:mt-6 grid gap-3 sm:grid-cols-2">
        {shots.map((shot, position) => (
          <li
            key={shot.view}
            className={`rounded-2xl bg-surface p-2 ring-1 ring-line ${isWide(shot) ? 'sm:col-span-2' : ''}`}
          >
            <Dialog.Trigger
              aria-label={t`Enlarge screenshot: ${shot.caption}`}
              onClick={() => setIndex(position)}
              className="block w-full cursor-zoom-in overflow-hidden rounded-xl"
            >
              <ScreenshotImage
                shot={shot}
                theme={theme}
                sizes={
                  isWide(shot) ? '(min-width: 1024px) 42rem, 100vw' : `min(100vw, ${shot.width}px)`
                }
                className="mx-auto h-auto w-full"
              />
            </Dialog.Trigger>
            <p className="px-2 pt-2 pb-1 text-xs text-subtle">{shot.caption}</p>
          </li>
        ))}
      </ul>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/70" />
        <Dialog.Popup
          onKeyDown={(event) => {
            if (shots.length < 2) return
            if (event.key === 'ArrowLeft') step(-1)
            if (event.key === 'ArrowRight') step(1)
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 outline-none"
        >
          {enlarged && (
            <>
              <div className="flex w-full max-w-6xl items-center justify-between gap-3 text-sm text-white">
                <Dialog.Title className="font-medium">{enlarged.caption}</Dialog.Title>
                <Dialog.Close aria-label={t`Close`} className="rounded-md p-1.5 hover:bg-white/10">
                  <X aria-hidden className="size-5" />
                </Dialog.Close>
              </div>
              <ScreenshotImage
                shot={enlarged}
                theme={theme}
                sizes={`min(100vw, ${enlarged.width}px)`}
                className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain"
              />
              {shots.length > 1 && (
                <div className="flex gap-2 text-white">
                  <button
                    type="button"
                    aria-label={t`Previous screenshot`}
                    onClick={() => step(-1)}
                    className="rounded-md p-1.5 hover:bg-white/10"
                  >
                    <CaretLeft aria-hidden className="size-5" />
                  </button>
                  <button
                    type="button"
                    aria-label={t`Next screenshot`}
                    onClick={() => step(1)}
                    className="rounded-md p-1.5 hover:bg-white/10"
                  >
                    <CaretRight aria-hidden className="size-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
