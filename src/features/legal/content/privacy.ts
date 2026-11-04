import type { Locale } from '#/generated/paraglide/runtime'

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
      'Diese Datenschutzerklärung informiert dich über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten im Zusammenhang mit dem Besuch von gwydion.dev, der Nutzung des Kontaktformulars und der Google-Drive-Anbindung „Terminanfragen“ für die von mir betreuten Studio-Websites.',
    ],
  },
  {
    id: 'hosting',
    title: 'Hosting',
    paragraphs: [
      'Die Website wird bei Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Seite verarbeitet Vercel technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt des Zugriffs, angeforderte Ressource, übertragene Datenmenge, Referrer, User-Agent), um die Auslieferung und Sicherheit der Website zu gewährleisten. Einige Bilder (Screenshots der Projektseiten) werden aus dem Dateispeicher Vercel Blob (*.public.blob.vercel-storage.com) geladen; dabei fallen dieselben technischen Daten bei Vercel an.',
      'Die Verarbeitung erfolgt zur Bereitstellung des Onlineangebots (Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse an einem sicheren und stabilen Betrieb). Mit Vercel besteht ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert; die Übermittlung in die USA stützt sich auf den entsprechenden Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO).',
      'Weitere Informationen: https://vercel.com/legal/privacy-policy',
    ],
  },
  {
    id: 'analytics',
    title: 'Webanalyse (Vercel Analytics)',
    paragraphs: [
      'Diese Website nutzt Vercel Web Analytics, einen Analysedienst der Vercel Inc. (Anschrift siehe Hosting). Erfasst werden pro Seitenaufruf u. a. Zeitpunkt, aufgerufene Seite, Referrer, ungefähre Herkunft (Land, Region, Stadt), Betriebssystem, Browser und Gerätetyp. Besucher:innen werden nicht über Cookies, sondern über einen aus der Anfrage gebildeten Hash-Wert unterschieden, der nach 24 Stunden verworfen wird. Ausgewertet werden nur aggregierte Statistiken; es werden keine individuellen Nutzungsprofile erstellt und keine seitenübergreifende Verfolgung durchgeführt.',
      'Die Verarbeitung dient der Analyse des anonymisierten Nutzungsverhaltens zur Verbesserung des Angebots. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Optimierung der Website). Da keine personenbezogenen Daten dauerhaft gespeichert oder profiliert werden, ist der Eingriff in das Recht auf informationelle Selbstbestimmung minimal.',
      'Die Übermittlung in die USA stützt sich wie beim Hosting auf den Angemessenheitsbeschluss zum EU-US Data Privacy Framework. Weitere Informationen: https://vercel.com/docs/analytics/privacy-policy',
    ],
  },
  {
    id: 'contact',
    title: 'Kontaktformular und E-Mail',
    paragraphs: [
      'Wenn du das Kontaktformular nutzt, werden die von dir eingegebenen Daten (Name, E-Mail-Adresse, Nachrichtentext und, falls gewählt, das Thema deiner Anfrage) verarbeitet, um deine Anfrage zu bearbeiten und zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung eingehender Anfragen).',
      'Der Versand der Nachricht erfolgt über den E-Mail-Dienst Resend der Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. Dabei werden die genannten Daten zur Zustellung der E-Mail an hello@gwydion.dev verarbeitet. Mit Resend besteht ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO. Resend ist unter dem EU-US Data Privacy Framework zertifiziert; die Übermittlung in die USA stützt sich auf den entsprechenden Angemessenheitsbeschluss (Art. 45 DSGVO), ergänzend auf die EU-Standardvertragsklauseln. Weitere Informationen: https://resend.com/legal/privacy-policy',
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
      'Dein bevorzugtes Farbschema (Hell/Dunkel) wird im Browser mittels localStorage gespeichert, damit diese Einstellung beim nächsten Besuch erhalten bleibt. Die Sprache folgt der URL und wird nicht gespeichert. Es werden keine Tracking-Cookies zu Werbezwecken gesetzt und keine Daten an Dritte übermittelt. Rechtsgrundlage für die Speicherung des Farbschemas ist Art. 6 Abs. 1 lit. f DSGVO (komfortable Nutzung der Website). Du kannst den Eintrag in den Einstellungen deines Browsers jederzeit löschen.',
    ],
  },
  {
    id: 'google-drive',
    title: 'Google-Drive-Anbindung „Terminanfragen“',
    paragraphs: [
      'Für die von mir betreuten Websites von Tattoo-Studios betreibe ich die Google-App „Terminanfragen“. Damit verbindet ein Studio sein eigenes Google Drive mit seiner Website, und Terminanfragen aus dem Formular der Website werden als PDF mit den hochgeladenen Bildern in einem vom Studio gewählten Ordner abgelegt.',
      'Die App fordert ausschließlich die Berechtigung „drive.file“ an. Sie sieht und bearbeitet damit nur Ordner, die das Studio in der Google-Ordnerauswahl ausdrücklich freigibt, und Dateien, die die App selbst angelegt hat. Auf andere Inhalte des Google Drive hat sie keinen Zugriff. Bei der Verbindung werden zusätzlich die E-Mail-Adresse des Google-Kontos sowie Name und ID des gewählten Ordners gespeichert, damit das Studio und ich sehen, wohin Anfragen gehen.',
      'Das von Google ausgestellte Zugriffstoken wird pro Website verschlüsselt (AES-256-GCM) in einem privaten Speicher bei Vercel in Frankfurt abgelegt und nur verwendet, um Anfragen abzulegen und regelmäßig zu prüfen, ob der Ordner noch erreichbar ist. Daten aus Google Drive werden nicht an Dritte weitergegeben, nicht verkauft, nicht für Werbung und nicht zum Trainieren von KI-Modellen verwendet.',
      'Die Nutzung und Übertragung von Informationen, die über Google-APIs empfangen werden, an andere Apps hält sich an die Google API Services User Data Policy (https://developers.google.com/terms/api-services-user-data-policy), einschließlich der Anforderungen zur eingeschränkten Nutzung (Limited Use).',
      'Für die Terminanfragen selbst ist das jeweilige Studio verantwortlich; ich verarbeite sie in seinem Auftrag (Art. 28 DSGVO). Rechtsgrundlage für die Verbindung ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung des Vertrags mit dem Studio). Ein Studio kann den Zugriff jederzeit unter https://myaccount.google.com/permissions widerrufen. Auf Wunsch lösche ich die gespeicherte Verbindung sofort; eine Nachricht an hello@gwydion.dev genügt.',
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
      'Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung personenbezogener Daten zu beschweren (Art. 77 DSGVO). Die für den Verantwortlichen zuständige Aufsichtsbehörde ist: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach, https://www.lda.bayern.de',
    ],
  },
  {
    id: 'changes',
    title: 'Änderungen',
    paragraphs: [
      'Diese Erklärung wird bei rechtlichen oder technischen Anpassungen der Website aktualisiert. Es gilt die jeweils auf gwydion.dev veröffentlichte Fassung.',
      'Stand: 4. November 2026',
    ],
  },
]

const en: PrivacySection[] = [
  {
    id: 'controller',
    title: 'Controller',
    paragraphs: [
      'The controller responsible for processing personal data on this website is: Gwydion Braunsdorf, Marktplatz 7, 87724 Ottobeuren, Germany. Contact: hello@gwydion.dev',
      'This privacy policy explains the nature, scope, and purpose of processing personal data in connection with visiting gwydion.dev, using the contact form, and the “Terminanfragen” Google Drive integration for the studio websites I build and maintain.',
    ],
  },
  {
    id: 'hosting',
    title: 'Hosting',
    paragraphs: [
      'This website is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States. When you access the site, Vercel processes technically necessary data (for example IP address, time of access, requested resource, amount of data transferred, referrer, user agent) to deliver and secure the website. Some images (screenshots on the project pages) are loaded from Vercel Blob file storage (*.public.blob.vercel-storage.com); the same technical data is processed by Vercel in that case.',
      'Processing is carried out to provide the online service (Art. 6(1)(f) GDPR — legitimate interest in secure and stable operation). A data processing agreement under Art. 28 GDPR is in place with Vercel. Vercel is certified under the EU-U.S. Data Privacy Framework; transfers to the United States rely on the corresponding adequacy decision of the EU Commission (Art. 45 GDPR).',
      'More information: https://vercel.com/legal/privacy-policy',
    ],
  },
  {
    id: 'analytics',
    title: 'Web analytics (Vercel Analytics)',
    paragraphs: [
      'This website uses Vercel Web Analytics, an analytics service provided by Vercel Inc. (address see Hosting). For each page view it records, among other things, the time, the page visited, the referrer, approximate location (country, region, city), operating system, browser and device type. Visitors are not distinguished by cookies but by a hash derived from the request, which is discarded after 24 hours. Only aggregated statistics are evaluated; no individual user profiles are created and no cross-site tracking takes place.',
      'Processing serves the purpose of analysing anonymised usage behaviour to improve the website. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in optimising the website). As no personal data is stored permanently or profiled, the impact on the right to informational self-determination is minimal.',
      'As with hosting, transfers to the United States rely on the adequacy decision for the EU-U.S. Data Privacy Framework. More information: https://vercel.com/docs/analytics/privacy-policy',
    ],
  },
  {
    id: 'contact',
    title: 'Contact form and email',
    paragraphs: [
      'When you use the contact form, the data you enter (name, email address, message text and, if selected, the topic of your request) is processed to handle and respond to your request. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in responding to incoming inquiries).',
      'Messages are sent via the email service Resend, operated by Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, United States. The data listed above is processed to deliver the email to hello@gwydion.dev. A data processing agreement under Art. 28 GDPR is in place with Resend. Resend is certified under the EU-U.S. Data Privacy Framework; transfers to the United States rely on the corresponding adequacy decision (Art. 45 GDPR) and, in addition, on the EU standard contractual clauses. More information: https://resend.com/legal/privacy-policy',
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
      'Your colour scheme preference (light/dark) may be stored in the browser using localStorage so this setting persists on your next visit. The language follows the URL and is not stored. No tracking cookies are used for advertising and no data is shared with third parties. The legal basis for storing the colour scheme is Art. 6(1)(f) GDPR (convenient use of the site). You can delete the entry in your browser settings at any time.',
    ],
  },
  {
    id: 'google-drive',
    title: '“Terminanfragen” Google Drive integration',
    paragraphs: [
      'For the tattoo studio websites I build and maintain, I operate the Google app “Terminanfragen” (booking requests). It lets a studio connect its own Google Drive to its website, so booking requests submitted through the website form are saved as a PDF, together with the uploaded images, in a folder the studio chooses.',
      'The app only requests the “drive.file” scope. It can therefore only see and edit folders the studio explicitly selects in the Google folder picker and files the app created itself. It has no access to any other content in Google Drive. When connecting, the Google account’s email address and the name and ID of the selected folder are also stored, so the studio and I can see where requests are delivered.',
      'The token issued by Google is stored per website, encrypted (AES-256-GCM), in a private Vercel store in Frankfurt, and is only used to save requests and to check regularly that the folder is still reachable. Google Drive data is not shared with third parties, not sold, and not used for advertising or to train AI models.',
      'The use and transfer of information received from Google APIs to any other app will adhere to the Google API Services User Data Policy (https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.',
      'Each studio is the controller for its booking requests; I process them on its behalf (Art. 28 GDPR). The legal basis for the connection is Art. 6(1)(b) GDPR (performance of the contract with the studio). A studio can revoke access at any time at https://myaccount.google.com/permissions. On request I delete the stored connection immediately; an email to hello@gwydion.dev is enough.',
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
      'You have the right to lodge a complaint with a supervisory authority regarding the processing of personal data (Art. 77 GDPR). The supervisory authority competent for the controller is: Bayerisches Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach, Germany, https://www.lda.bayern.de',
    ],
  },
  {
    id: 'changes',
    title: 'Changes',
    paragraphs: [
      'This policy will be updated when legal or technical aspects of the website change. The version published on gwydion.dev applies.',
      'Last updated: 4 November 2026',
    ],
  },
]

export function getPrivacySections(locale: Locale): PrivacySection[] {
  return locale === 'de' ? de : en
}
