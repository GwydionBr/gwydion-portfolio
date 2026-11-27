// Captures the screenshots of the two tattoo Projects into public/screenshots/:
// the Tattoo Booking Portal from its local demo data, never from production, and
// the Tattoo Sites from the live websites. Each view in both themes, as the 2×
// WebP and its 1× copy, named as src/content/screenshots.ts expects.
//
//   bun run screenshots:tattoo [path/to/tattoo-sites] [view …]   (default: ../tattoo-sites)
//
// Before running it, in the tattoo-sites repo: `bun run db:dev` in apps/portal
// (demo data; the request ids below are its) and `bun run dev portal` (port
// 3200, with Mailpit on 55324 for the sign-in codes). Playwright and sharp are
// taken from that repo, so this one needs neither.
import { existsSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

const rootDir = path.resolve(import.meta.dirname, '..')
const [tattooSitesArg, ...only] = process.argv.slice(2)
const tattooSitesDir = path.resolve(tattooSitesArg ?? path.join(rootDir, '../tattoo-sites'))
const require = createRequire(path.join(tattooSitesDir, 'package.json'))
const { chromium } = require('playwright-core')
const sharp = require('sharp')

const PORTAL = 'http://localhost:3200'
const MAILPIT = 'http://127.0.0.1:55324'
const THEMES = ['light', 'dark']
/** The sizes src/content/data/screenshots/ names. */
const TABLET = { width: 1180, height: 820 }
const PHONE = { width: 390, height: 844 }
const WINDOW = { width: 1440, height: 900 }
/** Hides what is not part of the app: the query devtools button, the progress bar, the caret. */
const HIDE = `.tsqd-parent-container, .mantine-NavigationProgress-root { display: none !important; }
  * { caret-color: transparent !important; }`

const browser = await chromium.launch()
/** One signed-in session per demo person, so each signs in once. */
const sessions = new Map()

/** Signs `page` in to the local portal as `email` with the code Mailpit received. */
async function signIn(page, email) {
  await fetch(`${MAILPIT}/api/v1/messages`, { method: 'DELETE' })
  await page.goto(`${PORTAL}/anmelden`)
  await page.waitForLoadState('networkidle')
  await page.getByRole('textbox').first().fill(email)
  await page.keyboard.press('Enter')
  let code
  for (let attempt = 0; attempt < 40 && !code; attempt++) {
    await page.waitForTimeout(250)
    const list = await (await fetch(`${MAILPIT}/api/v1/messages?limit=1`)).json()
    code = /\b(\d{6})\b/.exec(list.messages?.[0]?.Snippet ?? '')?.[1]
  }
  if (!code) throw new Error(`No sign-in code for ${email} in Mailpit.`)
  await page.locator('input').first().click()
  await page.keyboard.type(code)
  await page.waitForURL((url) => !url.pathname.startsWith('/anmelden'))
}

async function sessionOf(email) {
  if (!sessions.has(email)) {
    const context = await browser.newContext()
    await signIn(await context.newPage(), email)
    sessions.set(email, await context.storageState())
    await context.close()
  }
  return sessions.get(email)
}

/** Waits until the page has loaded its data and the images in view. */
async function settle(page) {
  await page.waitForLoadState('networkidle').catch(() => {})
  await page.evaluate(() =>
    Promise.all(
      [...document.images]
        .filter((image) => !image.complete && image.loading !== 'lazy')
        .map((image) => new Promise((done) => (image.onload = image.onerror = done))),
    ),
  )
  await page.waitForTimeout(900)
}

/** Writes the page as `<view>-de-<theme>.webp` (2×) and its 1× copy into the Project's folder. */
async function save(page, project, view, theme) {
  const directory = path.join(rootDir, 'public/screenshots', project)
  mkdirSync(directory, { recursive: true })
  const image = sharp(await page.screenshot())
  const { width } = await image.metadata()
  const base = path.join(directory, `${view}-de-${theme}`)
  await image.clone().webp({ quality: 82, effort: 6 }).toFile(`${base}.webp`)
  await image
    .clone()
    .resize({ width: width / 2 })
    .webp({ quality: 84, effort: 6 })
    .toFile(`${base}-${width / 2}w.webp`)
  console.log(project, view, theme)
}

const wanted = (view) => only.length === 0 || only.includes(view)

/** A portal view as the demo person `email` sees it, after `steps`. */
async function portalShot(view, email, viewport, steps) {
  if (!wanted(view)) return
  for (const theme of THEMES) {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 2,
      colorScheme: theme,
      locale: 'de-DE',
      storageState: await sessionOf(email),
    })
    const page = await context.newPage()
    const go = async (address) => {
      await page.goto(PORTAL + address)
      await settle(page)
      await page.addStyleTag({ content: HIDE })
    }
    await steps(page, go)
    await settle(page)
    await save(page, 'tattoo-booking-portal', view, theme)
    await context.close()
  }
}

/** A page of a live website. */
async function siteShot(view, url, viewport) {
  if (!wanted(view)) return
  for (const theme of THEMES) {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 2,
      colorScheme: theme,
      locale: 'de-DE',
      reducedMotion: 'reduce',
    })
    // No page views in the websites' own statistics.
    await context.route(/\/lx\//, (route) => route.abort())
    const page = await context.newPage()
    await page.goto(url, { waitUntil: 'load', timeout: 60_000 })
    await settle(page)
    await save(page, 'tattoo-sites', view, theme)
    await context.close()
  }
}

if (!existsSync(path.join(tattooSitesDir, 'apps/portal'))) {
  throw new Error(`No tattoo-sites repo at ${tattooSitesDir}.`)
}

const inbox = '?status=offen&area=meine&q=&page=0'
const request = (id, folder = inbox) => `/anfragen/${id}${folder}`

await portalShot('postfach', 'caro-k@example.com', TABLET, (_page, go) =>
  go(request('57821cc1-b3c8-4df5-86c0-eb1c492e555b')),
)
await portalShot('zum-uebernehmen', 'caro-f@example.com', TABLET, (_page, go) =>
  go(request('a730fcd3-7834-42ca-9ade-b6a71c6697fc', '?status=offen&area=eingang&q=&page=0')),
)
await portalShot('eckdaten', 'caro-k@example.com', TABLET, async (page, go) => {
  await go(request('ca3296df-25ba-44ca-92c3-467465f97a15', '?status=alle&area=alle&q=&page=0'))
  // Scrolls the list, and only the list, to the group that mixes own requests and key data.
  await page.evaluate(() => {
    const heading = [...document.querySelectorAll('button')].find((button) =>
      button.innerText.startsWith('In Klärung'),
    )
    let box = heading?.parentElement
    while (
      box &&
      !(
        box.scrollHeight > box.clientHeight + 4 &&
        /auto|scroll/.test(getComputedStyle(box).overflowY)
      )
    )
      box = box.parentElement
    if (box && box !== document.documentElement && box !== document.body)
      box.scrollTop += heading.getBoundingClientRect().top - box.getBoundingClientRect().top - 8
  })
})
await portalShot('postfach-handy', 'jaala@example.com', PHONE, (_page, go) => go(`/${inbox}`))
await portalShot('anfrage-handy', 'jaala@example.com', PHONE, (_page, go) =>
  go(request('5c523eb4-bc86-4029-8141-4b3dd8e4177e')),
)
await portalShot('uebergabe-handy', 'caro-k@example.com', PHONE, async (page, go) => {
  await go(request('9980fd27-42ff-426b-b21f-0513e3e228cc'))
  await page.getByRole('button', { name: 'Mehr' }).click()
  await page.getByRole('menuitem', { name: 'An Artist übergeben' }).click()
})
await portalShot('verwaltung', 'verwaltung@example.com', TABLET, (_page, go) => go('/verwaltung'))

const ENDSTATION = 'https://endstation-tattoo.com'
const GUAJAALA = 'https://www.guajaala.com'
await siteShot('endstation-start', `${ENDSTATION}/`, WINDOW)
await siteShot('guajaala-start', `${GUAJAALA}/`, WINDOW)
await siteShot('endstation-tattoos', `${ENDSTATION}/tattoos`, WINDOW)
await siteShot('guajaala-tattoos', `${GUAJAALA}/tattoos`, WINDOW)
await siteShot('endstation-buchung', `${ENDSTATION}/buchung`, WINDOW)
await siteShot('endstation-handy', `${ENDSTATION}/`, PHONE)
await siteShot('endstation-buchung-handy', `${ENDSTATION}/buchung`, PHONE)
await siteShot('guajaala-handy', `${GUAJAALA}/`, PHONE)
await siteShot('guajaala-termin-handy', `${GUAJAALA}/termin`, PHONE)

await browser.close()
