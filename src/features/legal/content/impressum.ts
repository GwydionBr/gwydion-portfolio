import type { Locale } from '#/generated/paraglide/runtime'

/** Structured blocks for the legal notice (Impressum). */
export interface ImpressumBlock {
  title?: string
  paragraphs: string[]
}

const de: ImpressumBlock[] = [
  {
    title: 'Angaben gemäß § 5 DDG',
    paragraphs: ['Gwydion Braunsdorf', 'Schwangauer Str. 3', '87645 Schwangau', 'Deutschland'],
  },
  {
    title: 'Kontakt',
    paragraphs: [
      'E-Mail: hello@gwydion.dev',
      'Kontaktformular: https://gwydion.dev/de/contact',
      'Telefon: [Telefon]',
    ],
  },
  {
    title: 'Umsatzsteuer',
    paragraphs: [
      'Kleinunternehmer im Sinne von § 19 UStG. Es wird keine Umsatzsteuer berechnet und ausgewiesen; eine Umsatzsteuer-Identifikationsnummer ist nicht vorhanden.',
    ],
  },
  {
    title: 'Haftung für Inhalte und Links',
    paragraphs: [
      'Für eigene Inhalte auf dieser Website bin ich nach den allgemeinen Gesetzen verantwortlich (§ 7 Abs. 1 DDG). Für fremde Informationen, die ich nur übermittle oder speichere, gelten die §§ 8 bis 10 DDG; eine allgemeine Pflicht, sie zu überwachen, besteht nicht. Sobald ich von einer konkreten Rechtsverletzung erfahre, entferne ich den betreffenden Inhalt umgehend.',
      'Diese Website verlinkt auf Seiten Dritter, zum Beispiel GitHub und self-engine.com. Für deren Inhalte sind die jeweiligen Betreiber verantwortlich. Bei der Verlinkung waren keine Rechtsverstöße erkennbar. Wenn ich von einem Rechtsverstoß auf einer verlinkten Seite erfahre, entferne ich den Link.',
    ],
  },
  {
    title: 'Urheberrecht und Quellcode',
    paragraphs: [
      'Der Quellcode dieser Website ist öffentlich auf GitHub einsehbar: https://github.com/GwydionBr/gwydion-portfolio [Variante A, Lizenz vorhanden: Er steht unter der Lizenz [LIZENZ, z. B. MIT]; es gelten deren Bedingungen.] [Variante B, keine Lizenz: Einsehbarkeit bedeutet keine Nutzungserlaubnis; wer den Code verwenden möchte, fragt bitte kurz bei mir an.]',
      'Texte, Fotos (insbesondere das Porträt), Grafiken und Projektbeschreibungen auf dieser Website sind urheberrechtlich geschützt. Sofern sie nicht ausdrücklich unter einer offenen Lizenz stehen, dürfen sie nur mit meiner Zustimmung verwendet werden. Inhalte Dritter sind als solche gekennzeichnet. Wenn dir trotzdem eine Urheberrechtsverletzung auffällt, gib mir bitte Bescheid.',
    ],
  },
  {
    title: 'Verbraucherstreitbeilegung',
    paragraphs: [
      'Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ],
  },
]

const en: ImpressumBlock[] = [
  {
    title: 'Information pursuant to § 5 DDG (German Digital Services Act)',
    paragraphs: ['Gwydion Braunsdorf', 'Schwangauer Str. 3', '87645 Schwangau', 'Germany'],
  },
  {
    title: 'Contact',
    paragraphs: [
      'Email: hello@gwydion.dev',
      'Contact form: https://gwydion.dev/contact',
      'Phone: [Telefon]',
    ],
  },
  {
    title: 'VAT',
    paragraphs: [
      'Small business within the meaning of § 19 UStG (German VAT Act). No VAT is charged or shown; there is no VAT identification number.',
    ],
  },
  {
    title: 'Liability for content and links',
    paragraphs: [
      'I am responsible for my own content on this website under general law (§ 7(1) DDG). Third-party information that I merely transmit or store is governed by §§ 8 to 10 DDG; there is no general obligation to monitor it. As soon as I become aware of a specific legal infringement, I will remove the content concerned without delay.',
      'This website links to third-party sites, for example GitHub and self-engine.com. Their operators are responsible for their content. No legal violations were apparent when the links were set. If I become aware of a legal violation on a linked page, I will remove the link.',
    ],
  },
  {
    title: 'Copyright and source code',
    paragraphs: [
      'The source code of this website is publicly available on GitHub: https://github.com/GwydionBr/gwydion-portfolio [Option A, licence exists: It is licensed under [LICENCE, e.g. MIT]; its terms apply.] [Option B, no licence: Being publicly visible does not grant permission to use it; if you would like to use the code, please ask me first.]',
      'Texts, photos (in particular the portrait), graphics and project descriptions on this website are protected by copyright. Unless they are expressly published under an open licence, they may only be used with my permission. Third-party content is marked as such. If you nevertheless notice a copyright infringement, please let me know.',
    ],
  },
  {
    title: 'Consumer dispute resolution',
    paragraphs: [
      'I am neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
    ],
  },
]

export function getImpressumBlocks(locale: Locale): ImpressumBlock[] {
  return locale === 'de' ? de : en
}
