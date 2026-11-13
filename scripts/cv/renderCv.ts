import { careerEntries } from '../../src/content/data/careerEntries'
import { profile } from '../../src/content/data/profile'
import type { Language } from '../../src/i18n/language'
import { inLanguage } from '../../src/content/localized'
import { newestFirst, periodDash } from '../../src/content/period'
import type { CareerEntry, CareerEntrySource, Period, PeriodDate } from '../../src/content/schema'
import { cvText } from './cvText'

const escape = (text: string) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

/** A period as the CV writes it: "Dec 2025 – present", "2017–2018". */
function periodText(period: Period, language: Language, now: string) {
  const date = (value: PeriodDate) =>
    value.length === 4
      ? value
      : new Intl.DateTimeFormat(language, { month: 'short', year: 'numeric', timeZone: 'UTC' })
          .format(new Date(`${value}-01`))
          .replace('.', '')
  const dash = periodDash(period)
  if (dash === null) return date(period.start)
  return `${date(period.start)}${dash}${period.end === null ? now : date(period.end)}`
}

/** Where the CV's files live, as URLs the printing browser can load. */
export interface CvAssets {
  font: string
  photo: string
}

/** The CV in `language` as a complete HTML document, laid out for one A4 page. */
export function renderCv(language: Language, assets: CvAssets): string {
  const t = inLanguage(cvText, language)
  const me = inLanguage(profile, language)
  /** Each Career entry in `language`, newest first, with the English name of its organisation. */
  const entries = [...careerEntries].sort(newestFirst).map((source: CareerEntrySource) => ({
    ...(inLanguage(source, language) as CareerEntry),
    key: typeof source.organisation === 'string' ? source.organisation : source.organisation.en,
  }))
  const link = (kind: string) => profile.links.find((each) => each.kind === kind)?.href ?? ''
  const bare = (href: string) =>
    href.replace(/^(mailto:|https:\/\/(www\.)?)/, '').replace(/\/$/, '')
  const experience = t.experience as Record<string, { highlights: string[] }>
  const isExperience = (entry: { key: string }) => entry.key in experience
  const period = (entry: Period) => periodText(entry, language, t.now)

  const job = (entry: CareerEntry & { key: string }) => {
    const extra = experience[entry.key]
    return `
      <article class="job">
        <div class="row"><h3>${escape(entry.title)}</h3><time>${period(entry)}</time></div>
        <p class="org">${escape(entry.organisation)}</p>
        <ul>${extra.highlights.map((item) => `<li>${item}</li>`).join('')}</ul>
      </article>`
  }

  /** A Career entry as one line: title, organisation, period. */
  const line = (entry: CareerEntry) => `
      <div class="line">
        <div><h4>${escape(entry.title)}</h4><p class="org">${escape(entry.organisation)}</p></div>
        <time>${period(entry)}</time>
      </div>`

  const contact: [text: string, href?: string][] = [
    [me.location],
    [bare(link('email')), link('email')],
    ['gwydion.dev', 'https://gwydion.dev'],
    [bare(link('github')), link('github')],
    ['LinkedIn', link('linkedin')],
  ]

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
<meta charset="utf-8">
<title>${escape(profile.name)} · ${escape(t.title)}</title>
<style>
  @font-face { font-family: Inter; src: url('${assets.font}') format('woff2'); font-weight: 100 900; }
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  /* The site's colours: ink on canvas, and its one accent, the green of the Availability. */
  :root { --ink: #171717; --body: #3a3a3a; --muted: #525252; --subtle: #666666; --line: #dfdfdb;
    --sidebar: #f3f3f1; --accent: #047857; }
  /* A hair under A4: a layout rounded up to the next pixel would spill onto a blank second page. */
  html, body { width: 210mm; height: calc(297mm - 1px); }
  body { font-family: Inter, sans-serif; color: var(--ink); font-size: 9.2pt; line-height: 1.42;
    display: grid; grid-template-columns: 64mm 1fr; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }
  b { font-weight: 650; color: var(--ink); }
  aside { background: var(--sidebar); padding: 13mm 8mm 10mm 10mm; display: flex; flex-direction: column; gap: 6.5mm; }
  main { padding: 13mm 13mm 10mm 11mm; display: flex; flex-direction: column; gap: 6.5mm; }
  .photo { width: 36mm; height: 36mm; border-radius: 50%; object-fit: cover; }
  h1 { font-size: 22pt; line-height: 1.05; font-weight: 700; letter-spacing: -.4px; }
  .headline { color: var(--muted); font-weight: 500; font-size: 10pt; margin-top: 2mm; line-height: 1.35; }
  .availability { margin-top: 4mm; font-size: 8.8pt; color: var(--muted); display: flex; flex-direction: column; gap: .8mm; }
  .availability .open { color: var(--accent); font-weight: 650; font-size: 8.8pt; display: flex; align-items: center; gap: 1.6mm; white-space: nowrap; }
  .availability .open::before { content: ''; width: 1.6mm; height: 1.6mm; border-radius: 50%; background: var(--accent); }
  h2 { font-size: 8pt; letter-spacing: 1.8px; text-transform: uppercase; font-weight: 700; margin-bottom: 2.5mm; }
  main h2 { border-bottom: 1px solid var(--line); padding-bottom: 1.5mm; margin-bottom: 3mm; }
  aside ul { list-style: none; display: flex; flex-direction: column; gap: 1.2mm; font-size: 9pt; color: var(--body); }
  .skills dt { font-weight: 600; font-size: 8.6pt; margin-top: 2mm; }
  .skills dt:first-child { margin-top: 0; }
  .skills dd { font-size: 8.6pt; color: var(--muted); }
  .intro { color: var(--body); font-size: 9.6pt; }
  .row, .line { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
  h3 { font-size: 11pt; font-weight: 650; }
  h4 { font-size: 9.8pt; font-weight: 600; }
  time { font-size: 8.6pt; color: var(--subtle); white-space: nowrap; }
  .org { color: var(--subtle); font-size: 9pt; }
  .job + .job { margin-top: 5mm; }
  .job ul { list-style: none; margin-top: 1.8mm; display: flex; flex-direction: column; gap: 1.4mm; }
  .job li { position: relative; padding-left: 4mm; color: var(--body); }
  .job li::before { content: ''; position: absolute; left: .5mm; top: 1.9mm; width: 1.4mm; height: 1.4mm; border-radius: 50%; background: var(--accent); }
  .line + .line { margin-top: 2mm; }
  .project { color: var(--body); }
  .project + .project { margin-top: 1.4mm; }
  .project .year { color: var(--subtle); font-size: 8.4pt; }
  .courses { margin-top: 2.4mm; color: var(--subtle); font-size: 9pt; }
</style>
</head>
<body>
<aside>
  ${t.photo ? `<img class="photo" src="${assets.photo}" alt="">` : ''}
  <div>
    <h1>${escape(profile.name).replace(' ', '<br>')}</h1>
    <p class="headline">${t.headline.map(escape).join('<br>')}</p>
    <div class="availability">
      <p class="open">${escape(me.availability.headline)}</p>
      ${t.availabilityDetails.map((each) => `<p>${escape(each)}</p>`).join('')}
    </div>
  </div>
  <section>
    <h2>${t.sections.contact}</h2>
    <ul>${contact
      .map(
        ([text, href]) =>
          `<li>${href ? `<a href="${href}">${escape(text)}</a>` : escape(text)}</li>`,
      )
      .join('')}</ul>
  </section>
  <section>
    <h2>${t.sections.skills}</h2>
    <dl class="skills">${me.skills
      .map(
        (group) => `<dt>${escape(group.label)}</dt><dd>${group.items.map(escape).join(', ')}</dd>`,
      )
      .join('')}</dl>
  </section>
  <section>
    <h2>${t.sections.languages}</h2>
    <ul>${t.spokenLanguages.map((each) => `<li>${each.name} · ${each.level}</li>`).join('')}</ul>
  </section>
</aside>
<main>
  <section>
    <h2>${t.sections.profile}</h2>
    <p class="intro">${escape(t.intro)}</p>
  </section>
  <section>
    <h2>${t.sections.experience}</h2>
    ${entries.filter(isExperience).map(job).join('')}
  </section>
  <section>
    <h2>${t.sections.projects}</h2>
    ${t.sideProjects
      .map(
        (each) =>
          `<p class="project"><b>${escape(each.title)}</b> <span class="year">${each.period}</span> · ${escape(each.text)}</p>`,
      )
      .join('')}
  </section>
  <section>
    <h2>${t.sections.education}</h2>
    ${entries
      .filter((entry) => entry.kind === 'education')
      .map(line)
      .join('')}
    <p class="courses">${escape(t.courses)}</p>
  </section>
  <section>
    <h2>${t.sections.otherWork}</h2>
    ${entries
      .filter((entry) => entry.kind !== 'education' && !isExperience(entry))
      .map(line)
      .join('')}
  </section>
</main>
</body>
</html>`
}
