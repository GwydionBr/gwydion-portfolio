import type { Locale } from '#/app/i18n/LanguageContext'

export interface PrivacySection {
  id: string
  title: string
  paragraphs: string[]
}

const de: PrivacySection[] = [
  {
    id: 'controller',
    title: 'Verantwortlicher',
    paragraphs: [
      'Verantwortlich für die Datenverarbeitung auf dieser Website ist: Gwydion Braunsdorf, Marktplatz 7, 87724 Ottobeuren, Deutschland. Kontakt: hello@gwydion.dev',
      'Diese Datenschutzerklärung informiert dich über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten im Zusammenhang mit dem Besuch von gwydion.dev und der Nutzung des Kontaktformulars.',
    ],
  },
  {
    id: 'hosting',
    title: 'Hosting',
    paragraphs: [
      'Die Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf der Seite verarbeitet Vercel technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt des Zugriffs, angeforderte Ressource, übertragene Datenmenge, Referrer, User-Agent), um die Auslieferung und Sicherheit der Website zu gewährleisten.',
      'Die Verarbeitung erfolgt zur Bereitstellung des Onlineangebots (Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse an einem sicheren und stabilen Betrieb). Soweit ein Vertrag über Auftragsverarbeitung besteht, stützt sich die Übermittlung in Drittländer auf die von der EU-Kommission beschlossenen Standardvertragsklauseln, sofern kein Angemessenheitsbeschluss vorliegt.',
      'Weitere Informationen: https://vercel.com/legal/privacy-policy',
    ],
  },
  {
    id: 'analytics',
    title: 'Webanalyse (Vercel Analytics)',
    paragraphs: [
      'Diese Website nutzt Vercel Analytics, einen datenschutzfreundlichen Analysedienst der Vercel Inc. (USA). Vercel Analytics erhebt aggregierte, nicht personenbezogene Nutzungsdaten (z. B. aufgerufene Seiten, Referrer, grobe geografische Herkunft auf Länderebene, Browser- und Gerätekategorie). Es werden keine Cookies gesetzt und keine individuellen Nutzungsprofile erstellt.',
      'Die Verarbeitung dient der Analyse des anonymisierten Nutzungsverhaltens zur Verbesserung des Angebots. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Optimierung der Website). Da keine personenbezogenen Daten dauerhaft gespeichert oder profiliert werden, ist der Eingriff in das Recht auf informationelle Selbstbestimmung minimal.',
      'Weitere Informationen: https://vercel.com/docs/analytics/privacy-policy',
    ],
  },
  {
    id: 'contact',
    title: 'Kontaktformular und E-Mail',
    paragraphs: [
      'Wenn du das Kontaktformular nutzt, werden die von dir eingegebenen Daten (Name, E-Mail-Adresse, Nachrichtentext) verarbeitet, um deine Anfrage zu bearbeiten und zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung eingehender Anfragen).',
      'Der Versand der Nachricht erfolgt über den Dienst Resend (Resend Inc., USA). Dabei werden die genannten Daten zur Zustellung der E-Mail an hello@gwydion.dev verarbeitet. Mit Resend kann ein Auftragsverarbeitungsvertrag bestehen; die Übermittlung in die USA erfolgt unter den jeweils geltenden Garantien (z. B. Standardvertragsklauseln). Weitere Informationen: https://resend.com/legal/privacy-policy',
      'Die Daten werden gelöscht, sobald sie für die Erreichung des Zwecks nicht mehr erforderlich sind, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
    ],
  },
  {
    id: 'rate-limit',
    title: 'Sicherheit und Missbrauchsschutz',
    paragraphs: [
      'Zum Schutz vor Missbrauch des Kontaktformulars kann die IP-Adresse vorübergehend in einem begrenzten Speicher (In-Memory-Rate-Limit) verarbeitet werden. Zweck ist die Abwehr automatisierter oder übermäßiger Anfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden nach kurzer Zeit automatisch verworfen und nicht dauerhaft gespeichert.',
    ],
  },
  {
    id: 'language',
    title: 'Einstellungen im lokalen Speicher (localStorage)',
    paragraphs: [
      'Deine gewählte Sprache (Deutsch/Englisch) sowie dein bevorzugtes Farbschema (Hell/Dunkel) werden im Browser mittels localStorage gespeichert, damit diese Einstellungen beim nächsten Besuch erhalten bleiben. Es werden keine Tracking-Cookies zu Werbezwecken gesetzt und keine Daten an Dritte übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (komfortable Nutzung der Website). Du kannst die Einträge in den Einstellungen deines Browsers jederzeit löschen.',
    ],
  },
  {
    id: 'rights',
    title: 'Deine Rechte',
    paragraphs: [
      'Du hast das Recht auf Auskunft über die dich betreffenden personenbezogenen Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO), auf Datenübertragbarkeit (Art. 20 DSGVO) sowie, unter bestimmten Voraussetzungen, Widerspruch gegen die Verarbeitung (Art. 21 DSGVO).',
      'Sofern die Verarbeitung auf Einwilligung beruht, kannst du diese mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).',
    ],
  },
  {
    id: 'complaint',
    title: 'Beschwerderecht',
    paragraphs: [
      'Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung personenbezogener Daten zu beschweren (Art. 77 DSGVO). Die für den Verantwortlichen zuständige Aufsichtsbehörde ist: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 27, 91522 Ansbach, https://www.lda.bayern.de',
    ],
  },
  {
    id: 'changes',
    title: 'Änderungen',
    paragraphs: [
      'Diese Erklärung wird bei rechtlichen oder technischen Anpassungen der Website aktualisiert. Es gilt die jeweils auf gwydion.dev veröffentlichte Fassung.',
    ],
  },
]

const en: PrivacySection[] = [
  {
    id: 'controller',
    title: 'Controller',
    paragraphs: [
      'The controller responsible for processing personal data on this website is: Gwydion Braunsdorf, Marktplatz 7, 87724 Ottobeuren, Germany. Contact: hello@gwydion.dev',
      'This privacy policy explains the nature, scope, and purpose of processing personal data in connection with visiting gwydion.dev and using the contact form.',
    ],
  },
  {
    id: 'hosting',
    title: 'Hosting',
    paragraphs: [
      'This website is hosted by Vercel Inc. (United States). When you access the site, Vercel processes technically necessary data (for example IP address, time of access, requested resource, amount of data transferred, referrer, user agent) to deliver and secure the website.',
      'Processing is carried out to provide the online service (Art. 6(1)(f) GDPR — legitimate interest in secure and stable operation). Where a data processing agreement exists, transfers to third countries rely on standard contractual clauses adopted by the EU Commission where no adequacy decision applies.',
      'More information: https://vercel.com/legal/privacy-policy',
    ],
  },
  {
    id: 'analytics',
    title: 'Web analytics (Vercel Analytics)',
    paragraphs: [
      'This website uses Vercel Analytics, a privacy-friendly analytics service provided by Vercel Inc. (United States). Vercel Analytics collects aggregated, non-personal usage data (such as pages visited, referrer, broad geographic origin at country level, browser and device category). No cookies are set and no individual user profiles are created.',
      'Processing serves the purpose of analysing anonymised usage behaviour to improve the website. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in optimising the website). As no personal data is stored permanently or profiled, the impact on the right to informational self-determination is minimal.',
      'More information: https://vercel.com/docs/analytics/privacy-policy',
    ],
  },
  {
    id: 'contact',
    title: 'Contact form and email',
    paragraphs: [
      'When you use the contact form, the data you enter (name, email address, message text) is processed to handle and respond to your request. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in responding to incoming inquiries).',
      'Messages are sent via Resend (Resend Inc., USA). The data listed above is processed to deliver the email to hello@gwydion.dev. A data processing agreement may be in place with Resend; transfers to the United States rely on appropriate safeguards (for example standard contractual clauses). More information: https://resend.com/legal/privacy-policy',
      'Data is deleted when it is no longer needed for the purpose, unless statutory retention obligations apply.',
    ],
  },
  {
    id: 'rate-limit',
    title: 'Security and abuse prevention',
    paragraphs: [
      'To protect the contact form from abuse, your IP address may be processed temporarily in limited in-memory rate limiting. The purpose is to block automated or excessive requests. Legal basis: Art. 6(1)(f) GDPR. Data is discarded automatically after a short time and is not stored permanently.',
    ],
  },
  {
    id: 'language',
    title: 'Preferences in local storage',
    paragraphs: [
      'Your selected language (German/English) and colour scheme preference (light/dark) may be stored in the browser using localStorage so these settings persist on your next visit. No tracking cookies are used for advertising and no data is shared with third parties. Legal basis: Art. 6(1)(f) GDPR (convenient use of the site). You can delete the entries in your browser settings at any time.',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    paragraphs: [
      'You have the right to obtain information about personal data concerning you (Art. 15 GDPR), to rectification (Art. 16 GDPR), to erasure (Art. 17 GDPR), to restriction of processing (Art. 18 GDPR), to data portability (Art. 20 GDPR), and, under certain conditions, to object to processing (Art. 21 GDPR).',
      'Where processing is based on consent, you may withdraw consent with effect for the future (Art. 7(3) GDPR).',
    ],
  },
  {
    id: 'complaint',
    title: 'Right to lodge a complaint',
    paragraphs: [
      'You have the right to lodge a complaint with a supervisory authority regarding the processing of personal data (Art. 77 GDPR). The supervisory authority competent for the controller is: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 27, 91522 Ansbach, Germany, https://www.lda.bayern.de',
    ],
  },
  {
    id: 'changes',
    title: 'Changes',
    paragraphs: [
      'This policy will be updated when legal or technical aspects of the website change. The version published on gwydion.dev applies.',
    ],
  },
]

export function getPrivacySections(locale: Locale): PrivacySection[] {
  return locale === 'de' ? de : en
}
