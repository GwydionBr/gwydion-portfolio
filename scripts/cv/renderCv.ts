import { careerEntries } from '../../src/content/data/careerEntries'
import { profile } from '../../src/content/data/profile'
import { projects } from '../../src/content/data/projects'
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

const tags = (items: string[]) =>
  `<div class="tags">${items.map((item) => `<span>${escape(item)}</span>`).join('')}</div>`

/** The CV in `language` as a complete HTML document, laid out for one A4 page. */
export function renderCv(language: Language, fontUrl: string): string {
  const t = inLanguage(cvText, language)
  /** Each Career entry in `language`, newest first, with the English name of its organisation. */
  const entries = [...careerEntries].sort(newestFirst).map((source: CareerEntrySource) => ({
    ...(inLanguage(source, language) as CareerEntry),
    key: typeof source.organisation === 'string' ? source.organisation : source.organisation.en,
  }))
  const link = (kind: string) => profile.links.find((each) => each.kind === kind)?.href ?? ''
  const bare = (href: string) =>
    href.replace(/^(mailto:|https:\/\/(www\.)?)/, '').replace(/\/$/, '')
  const experience = t.experience as Record<
    string,
    { stackOf?: string; stack?: string[]; highlights: string[] }
  >

  const job = (entry: CareerEntry & { key: string }) => {
    const extra = experience[entry.key]
    const stack = extra?.stack ?? projects.find((each) => each.slug === extra?.stackOf)?.stack
    return `
      <article class="entry">
        <header><h3>${escape(entry.title)}</h3><time>${periodText(entry, language, t.now)}</time></header>
        <p class="org">${escape(entry.organisation)}</p>
        ${
          extra
            ? `<ul>${extra.highlights.map((item) => `<li>${item}</li>`).join('')}</ul>`
            : `<p class="summary">${escape(entry.summary)}</p>`
        }
        ${stack ? tags(stack) : ''}
      </article>`
  }

  const education = (entry: CareerEntry) => `
      <article class="edu">
        <header><h3>${escape(entry.title)}</h3><time>${periodText(entry, language, t.now)}</time></header>
        <p class="org">${escape(entry.organisation)}</p>
      </article>`

  const contact: [label: string, text: string, href?: string][] = [
    [t.contactLabels.location, t.location],
    [t.contactLabels.email, bare(link('email')), link('email')],
    [t.contactLabels.website, 'gwydion.dev', 'https://gwydion.dev'],
    [t.contactLabels.github, bare(link('github')), link('github')],
    [t.contactLabels.linkedin, bare(link('linkedin')), link('linkedin')],
  ]

  return `<!DOCTYPE html>
<html lang="${language}">
<head>
<meta charset="utf-8">
<title>${escape(profile.name)} · ${escape(t.title)}</title>
<style>
  @font-face { font-family: Inter; src: url('${fontUrl}') format('woff2'); font-weight: 100 900; }
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --navy: #14213d; --gold: #e3a23b; --blue: #2f6db5; --ink: #1d2433; --muted: #5b6475; --line: #dde2ea; }
  html, body { width: 210mm; height: 297mm; }
  body { font-family: Inter, sans-serif; color: var(--ink); font-size: 8.4pt; line-height: 1.4;
    display: grid; grid-template-columns: 66mm 1fr; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  aside { background: var(--navy); color: #e8ecf3; padding: 13mm 8mm 10mm 9mm; display: flex; flex-direction: column; gap: 6mm; }
  main { padding: 11mm 11mm 8mm 10mm; display: flex; flex-direction: column; gap: 3.4mm; }
  .monogram { width: 15mm; height: 15mm; border: 1.2px solid var(--gold); border-radius: 50%; color: var(--gold);
    display: grid; place-items: center; font-weight: 700; font-size: 13pt; letter-spacing: .5px; }
  h1 { font-size: 21pt; line-height: 1.08; font-weight: 700; color: #fff; letter-spacing: -.3px; }
  .headline { color: var(--gold); font-weight: 600; font-size: 9.5pt; line-height: 1.35; margin-top: 2.5mm; }
  aside h2 { font-size: 7.4pt; letter-spacing: 1.6px; text-transform: uppercase; color: #fff; font-weight: 700; margin-bottom: 2mm; }
  dl dt { font-size: 6.6pt; letter-spacing: 1px; text-transform: uppercase; color: #8d98ad; margin-top: 1.6mm; }
  dl dd { font-size: 8.4pt; color: #fff; overflow-wrap: anywhere; }
  a { color: inherit; text-decoration: none; }
  .group { margin-bottom: 2mm; }
  .group h3 { font-size: 7.6pt; font-weight: 600; color: #c9d1de; margin-bottom: 1mm; }
  aside .tags span { background: #26324e; color: #e8ecf3; }
  .langs p { font-size: 8.4pt; } .langs span { color: #8d98ad; }
  .availability { margin-top: auto; font-size: 7.6pt; color: #aab4c5; line-height: 1.5; }
  main h2 { display: flex; align-items: center; gap: 3mm; font-size: 7.6pt; letter-spacing: 1.8px; text-transform: uppercase;
    color: var(--blue); font-weight: 700; margin-bottom: 2mm; }
  main h2::after { content: ''; flex: 1; height: 1px; background: var(--line); }
  .intro { font-size: 8.8pt; color: #364055; line-height: 1.45; }
  .entry { margin-bottom: 2.4mm; } .entry:last-child { margin-bottom: 0; }
  .entry header, .edu header, .side header { display: flex; justify-content: space-between; align-items: baseline; gap: 3mm; }
  h3 { font-size: 10pt; font-weight: 650; }
  .edu h3, .side h3 { font-size: 8.8pt; }
  time { font-size: 7.8pt; color: var(--muted); white-space: nowrap; }
  .org { color: var(--muted); font-size: 8.2pt; margin-bottom: 1mm; }
  .summary { color: #364055; }
  ul { list-style: none; display: flex; flex-direction: column; gap: .8mm; }
  li { position: relative; padding-left: 3.4mm; color: #364055; }
  li::before { content: ''; position: absolute; left: .4mm; top: 1.75mm; width: 1.3mm; height: 1.3mm; border-radius: 50%; background: var(--gold); }
  li b { color: var(--ink); font-weight: 650; }
  .tags { display: flex; flex-wrap: wrap; gap: 1.2mm; margin-top: 1.6mm; }
  .tags span { font-size: 7pt; padding: .5mm 1.8mm; border-radius: 1mm; background: #eaf1fa; color: #24508a; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 2.4mm 7mm; }
  .side p, .edu .org { font-size: 8pt; }
  .side p { color: #364055; }
  .courses { color: var(--muted); font-size: 8pt; margin-top: 2mm; }
  .edu { margin-bottom: 1.4mm; }
</style>
</head>
<body>
<aside>
  <div class="monogram">GB</div>
  <div>
    <h1>${escape(profile.name).replace(' ', '<br>')}</h1>
    <p class="headline">${t.headline.map(escape).join('<br>')}</p>
  </div>
  <section>
    <h2>${t.sections.contact}</h2>
    <dl>${contact
      .map(
        ([label, text, href]) =>
          `<dt>${label}</dt><dd>${href ? `<a href="${href}">${escape(text)}</a>` : escape(text)}</dd>`,
      )
      .join('')}</dl>
  </section>
  <section>
    <h2>${t.sections.skills}</h2>
    ${t.skills.map((group) => `<div class="group"><h3>${group.label}</h3>${tags(group.items)}</div>`).join('')}
  </section>
  <section class="langs">
    <h2>${t.sections.languages}</h2>
    ${t.spokenLanguages.map((each) => `<p>${each.name} <span>${each.level}</span></p>`).join('')}
  </section>
  <p class="availability">${t.availability.join('<br>')}</p>
</aside>
<main>
  <section>
    <h2>${t.sections.profile}</h2>
    <p class="intro">${escape(t.intro)}</p>
  </section>
  <section>
    <h2>${t.sections.experience}</h2>
    ${entries
      .filter((entry) => entry.kind !== 'education')
      .map(job)
      .join('')}
  </section>
  <section>
    <h2>${t.sections.projects}</h2>
    <div class="cols">
      ${t.sideProjects
        .map(
          (each) =>
            `<article class="side"><header><h3>${each.title}</h3><time>${each.period}</time></header><p>${escape(each.text)}</p></article>`,
        )
        .join('')}
    </div>
  </section>
  <section>
    <h2>${t.sections.education}</h2>
    ${entries
      .filter((entry) => entry.kind === 'education')
      .map(education)
      .join('')}
    <p class="courses">${escape(t.courses)}</p>
  </section>
</main>
</body>
</html>`
}
