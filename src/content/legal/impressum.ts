import type { Locale } from '../../lib/LanguageContext'

/** Structured blocks for the legal notice (Impressum). */
export interface ImpressumBlock {
  title?: string
  paragraphs: string[]
}

const de: ImpressumBlock[] = [
  {
    title: 'Angaben gemäß § 5 TMG',
    paragraphs: [
      'Gwydion Braunsdorf',
      'Deutschland',
      'E-Mail: hello@gwydion.dev',
    ],
  },
  {
    title: 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',
    paragraphs: ['Gwydion Braunsdorf'],
  },
  {
    title: 'Haftung für Inhalte',
    paragraphs: [
      'Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.',
      'Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.',
    ],
  },
  {
    title: 'Haftung für Links',
    paragraphs: [
      'Mein Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.',
      'Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links umgehend entfernen.',
    ],
  },
  {
    title: 'Urheberrecht',
    paragraphs: [
      'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
      'Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Solltest du trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitte ich um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.',
    ],
  },
  {
    title: 'Online-Streitbeilegung',
    paragraphs: [
      'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/',
      'Ich bin nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    ],
  },
]

const en: ImpressumBlock[] = [
  {
    title: 'Information pursuant to German law (§ 5 TMG)',
    paragraphs: [
      'Gwydion Braunsdorf',
      'Germany',
      'Email: hello@gwydion.dev',
    ],
  },
  {
    title: 'Responsible for content (§ 55(2) RStV)',
    paragraphs: ['Gwydion Braunsdorf'],
  },
  {
    title: 'Liability for content',
    paragraphs: [
      'As a service provider, I am responsible for my own content on these pages under general law pursuant to Section 7(1) TMG. However, pursuant to Sections 8 to 10 TMG, I am not obliged as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.',
      'Obligations to remove or block the use of information under general law remain unaffected. Liability in this regard is only possible from the time I become aware of a specific legal infringement. Upon becoming aware of such infringements, I will remove this content immediately.',
    ],
  },
  {
    title: 'Liability for links',
    paragraphs: [
      'This site contains links to external third-party websites whose content I cannot influence. I therefore cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time the links were created; unlawful content was not recognizable at that time.',
      'Permanent monitoring of linked pages without concrete evidence of a legal infringement is not reasonable. If I become aware of legal infringements, I will remove such links immediately.',
    ],
  },
  {
    title: 'Copyright',
    paragraphs: [
      'Content and works created by the site operator on these pages are subject to German copyright law. Duplication, processing, distribution, or any form of commercialization beyond the scope of copyright law requires the written consent of the respective author or creator. Downloads and copies of this site are permitted only for private, non-commercial use.',
      'Where content on this site was not created by the operator, third-party copyrights are respected. Third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please notify me. Upon becoming aware of infringements, I will remove such content immediately.',
    ],
  },
  {
    title: 'Online dispute resolution',
    paragraphs: [
      'The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/',
      'I am neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.',
    ],
  },
]

export function getImpressumBlocks(locale: Locale): ImpressumBlock[] {
  return locale === 'de' ? de : en
}
