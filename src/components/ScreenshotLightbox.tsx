import {
  createContext,
  use,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { UnstyledButton } from '@mantine/core'
import {
  Lightbox,
  type LightboxLabels,
  type LightboxSlideData,
  type ToolbarItemsPayload,
} from '@mantine/lightbox'
import { SquaresFour, X } from '@phosphor-icons/react'
import { useLingui } from '@lingui/react/macro'
import { useLocation } from '@tanstack/react-router'
import type { Screenshot } from '#/content'
import { useTheme } from '#/theme/react'
import type { Theme } from '#/theme/theme'
import { ScreenshotImage } from './story/ScreenshotImage'
import classes from './ScreenshotLightbox.module.css'

/** A screenshot shown on the page, as the button that enlarges it. */
interface Shown {
  element: HTMLElement
  shot: Screenshot
}

interface ScreenshotLightboxContext {
  /** Adds a shown screenshot under the button's `id`; the returned function takes it off again. */
  show: (id: string, shown: Shown) => () => void
  /** Opens the lightbox on the screenshot of the button `id`. */
  open: (id: string) => void
  /** The button the open lightbox was opened from. */
  openedBy: string | null
  dialogId: string
}

const LightboxContext = createContext<ScreenshotLightboxContext | null>(null)

/**
 * One screenshot file, whichever place shows it: the cover and a gallery
 * hold separate copies of the same screenshot, so object identity won't do.
 */
const screenshotKey = (shot: Screenshot) =>
  [shot.images.light?.src, shot.images.dark?.src, shot.view].join(' ')

const inPageOrder = (a: Shown, b: Shown) =>
  a.element.compareDocumentPosition(b.element) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1

/**
 * The page's screenshots in the order they appear, each once, and where the
 * one at `key` is among them.
 */
function collect(shown: Iterable<Shown>) {
  const keys: string[] = []
  const shots: Screenshot[] = []
  for (const { shot } of [...shown].sort(inPageOrder)) {
    const key = screenshotKey(shot)
    if (keys.includes(key)) continue
    keys.push(key)
    shots.push(shot)
  }
  return { shots, indexOf: (shot: Screenshot) => keys.indexOf(screenshotKey(shot)) }
}

/** A slide of the lightbox: the screenshot in `theme`, never larger than it was captured. */
function slideOf(shot: Screenshot, theme: Theme | null): LightboxSlideData {
  const image = shot.images[theme ?? 'light']
  return {
    src: image?.src ?? '',
    srcSet: image?.srcSet,
    sizes: `min(100vw, ${shot.width}px)`,
    alt: shot.alt,
    caption: shot.caption,
    // Its 1× file, which the page mostly has already, not the 2× file `src` is.
    renderThumb: () => (
      <ScreenshotImage shot={shot} theme={theme} sizes="6rem" className={classes.thumbnail} />
    ),
  }
}

/**
 * The toolbar's buttons, Mantine's own (the thumbnail strip's toggle, Close)
 * with the site's icons.
 */
const toolbarItems = ({
  slides,
  thumbnailsVisible,
  toggleThumbnails,
  close,
  labels,
}: ToolbarItemsPayload) => [
  ...(slides.length > 1
    ? [
        {
          key: 'thumbnails',
          position: 'left' as const,
          icon: <SquaresFour aria-hidden size={20} />,
          label: thumbnailsVisible ? labels.hideThumbnailsLabel : labels.showThumbnailsLabel,
          onClick: toggleThumbnails,
        },
      ]
    : []),
  { key: 'close', icon: <X aria-hidden size={20} />, label: labels.closeLabel, onClick: close },
]

/**
 * The page's one lightbox (Mantine's Lightbox) for its screenshots. Every
 * `EnlargeableScreenshot` inside adds itself while it is shown; opening one
 * collects them at that moment, in the order they appear on the page and each
 * screenshot once, so the lightbox pages through all of them, whichever
 * component shows them and however a story orders its galleries. It closes
 * when the visitor goes to another page (Back, another Project, the other
 * Site language), whose screenshots are others. It shows the theme the page
 * is shown in; its look and paging defaults are in the theme
 * (src/theme/components.ts).
 */
export function ScreenshotLightbox({ children }: { children: ReactNode }) {
  const { t } = useLingui()
  const { theme } = useTheme()
  const dialogId = useId()
  const shown = useRef(new Map<string, Shown>())
  const [openedBy, setOpenedBy] = useState<string | null>(null)
  const [shots, setShots] = useState<Screenshot[]>([])
  const [index, setIndex] = useState(0)

  // The page's frame may stay mounted from one page to the next, and what it had open with it.
  const path = useLocation({ select: (location) => location.pathname })
  const [lastPath, setLastPath] = useState(path)
  if (lastPath !== path) {
    setLastPath(path)
    setOpenedBy(null)
  }

  const show = useCallback((id: string, entry: Shown) => {
    shown.current.set(id, entry)
    return () => {
      shown.current.delete(id)
    }
  }, [])
  const open = useCallback((id: string) => {
    const opener = shown.current.get(id)
    if (!opener) return
    const page = collect(shown.current.values())
    setShots(page.shots)
    setIndex(page.indexOf(opener.shot))
    setOpenedBy(id)
  }, [])
  const context = useMemo(
    () => ({ show, open, openedBy, dialogId }),
    [show, open, openedBy, dialogId],
  )

  const several = shots.length > 1
  const labels: Partial<LightboxLabels> = {
    lightboxLabel: t`Screenshots`,
    slidesLabel: t`Screenshots`,
    slideLabel: (position, total) => t`Screenshot ${position} of ${total}`,
    thumbnailLabel: (position) => {
      const caption = shots[position - 1]?.caption ?? ''
      return t`Show screenshot: ${caption}`
    },
    previousSlideLabel: t`Previous screenshot`,
    nextSlideLabel: t`Next screenshot`,
    showThumbnailsLabel: t`Show thumbnails`,
    hideThumbnailsLabel: t`Hide thumbnails`,
    closeLabel: t`Close`,
  }

  return (
    <LightboxContext value={context}>
      {children}
      <Lightbox
        id={dialogId}
        opened={openedBy !== null}
        onClose={() => setOpenedBy(null)}
        slides={shots.map((shot) => slideOf(shot, theme))}
        currentIndex={index}
        onIndexChange={setIndex}
        withNavigation={several}
        withThumbnails={several}
        labels={labels}
        toolbarItems={toolbarItems}
      />
    </LightboxContext>
  )
}

/** The page's lightbox, from `ScreenshotLightbox`. */
function useScreenshotLightbox() {
  const lightbox = use(LightboxContext)
  if (!lightbox) throw new Error('A screenshot is enlargeable only inside <ScreenshotLightbox>.')
  return lightbox
}

/**
 * A screenshot as the button that opens it in the page's lightbox
 * (`ScreenshotLightbox`), in the theme shown. `className` sizes the image. A
 * `flush` one fills a frame edge to edge: no rounding of its own, its focus
 * ring inside.
 */
export function EnlargeableScreenshot({
  shot,
  sizes,
  flush = false,
  className,
}: {
  shot: Screenshot
  sizes: string
  flush?: boolean
  className?: string
}) {
  const { t } = useLingui()
  const { theme } = useTheme()
  const { show, open, openedBy, dialogId } = useScreenshotLightbox()
  const id = useId()
  const opened = openedBy === id
  const ref = useCallback(
    (element: HTMLButtonElement | null) => (element ? show(id, { element, shot }) : undefined),
    [show, id, shot],
  )
  return (
    <UnstyledButton
      ref={ref}
      aria-label={t`Enlarge screenshot: ${shot.caption}`}
      aria-haspopup="dialog"
      aria-expanded={opened}
      aria-controls={opened ? dialogId : undefined}
      onClick={(event) => {
        // Safari does not focus a button on click; the lightbox gives the focus back to what had it.
        event.currentTarget.focus({ preventScroll: true })
        open(id)
      }}
      className={classes.trigger}
      data-flush={flush || undefined}
    >
      <ScreenshotImage shot={shot} theme={theme} sizes={sizes} className={className} />
    </UnstyledButton>
  )
}
