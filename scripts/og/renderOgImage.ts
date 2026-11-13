import { profile } from '../../src/content/data/profile'
import { projects } from '../../src/content/data/projects'
import { inLanguage } from '../../src/content/localized'
import { BASE_LANGUAGE } from '../../src/i18n/language'

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

const escape = (text: string) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

/**
 * The share image (Open Graph and Twitter) as an HTML document of
 * OG_WIDTH × OG_HEIGHT: the Profile's name, role and Availability beside the
 * featured Projects as tiles, echoing the site's Overview. It is shared by both
 * Site languages, so it uses the Base language.
 */
export function renderOgImage(assets: { font: string; photo: string }): string {
  const me = inLanguage(profile, BASE_LANGUAGE)
  const featured = projects
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order)
    .map((project) => inLanguage(project, BASE_LANGUAGE))
  const tile = (project: (typeof featured)[number]) => `
    <div class="tile">
      <span class="swatch" style="background:${project.accent}"></span>
      <div class="body">
        <p class="title">${escape(project.title)}</p>
        <p class="summary">${escape(project.summary)}</p>
        <p class="stack">${project.stack.slice(0, 3).map(escape).join(' · ')}</p>
      </div>
    </div>`
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; src: url('${assets.font}') format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: ${OG_WIDTH}px; height: ${OG_HEIGHT}px; overflow: hidden; }
body { font-family: Inter, sans-serif; background: #f3f3f1; color: #171717; display: flex; padding: 28px; gap: 28px; }
.card { background: #fff; border-radius: 28px; box-shadow: 0 0 0 1px rgb(0 0 0 / .06); }
.intro { flex: 1.1; padding: 56px; display: flex; flex-direction: column; }
.photo { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; }
h1 { margin-top: 36px; font-size: 60px; line-height: 1.04; letter-spacing: -.035em; font-weight: 650; }
.role { margin-top: 14px; font-size: 28px; color: #525252; letter-spacing: -.01em; }
.available { display: flex; align-items: center; gap: 12px; padding: 12px 20px; border-radius: 999px; background: #ecfdf5; box-shadow: 0 0 0 1px #d1fae5; color: #047857; font-size: 22px; font-weight: 550; }
.dot { width: 12px; height: 12px; border-radius: 50%; background: #047857; }
.side { flex: 1; display: flex; flex-direction: column; gap: 20px; }
.tile { flex: 1; padding: 30px 32px; display: flex; gap: 20px; align-items: stretch; background: #fff; border-radius: 28px; box-shadow: 0 0 0 1px rgb(0 0 0 / .06); }
.swatch { flex: none; width: 44px; height: 44px; border-radius: 12px; }
.body { display: flex; flex-direction: column; }
.stack { margin-top: auto; font-size: 17px; color: #666; }
.title { font-size: 28px; font-weight: 600; letter-spacing: -.02em; }
.summary { margin-top: 8px; font-size: 19px; line-height: 1.4; color: #525252; }
.footer { margin-top: auto; display: flex; align-items: center; justify-content: space-between; }
.site { font-size: 22px; font-weight: 550; color: #666; }
</style></head><body>
  <section class="card intro">
    <img class="photo" src="${assets.photo}" alt="">
    <h1>${escape(me.name)}</h1>
    <p class="role">${escape(me.role)} · ${escape(me.location)}</p>
    <div class="footer">
      <p class="available"><span class="dot"></span>${escape(me.availability.headline)}</p>
      <p class="site">gwydion.dev</p>
    </div>
  </section>
  <section class="side">${featured.map(tile).join('')}</section>
</body></html>`
}
