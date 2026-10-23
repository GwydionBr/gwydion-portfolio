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
      'Verantwortlich für die Datenverarbeitung auf dieser Website ist: Gwydion Braunsdorf, Schwangauer Str. 3, 87645 Schwangau, Deutschland. E-Mail: hello@gwydion.dev',
      'Diese Erklärung beschreibt, welche personenbezogenen Daten ich verarbeite, wenn du gwydion.dev besuchst, mir über das Kontaktformular oder per E-Mail schreibst (zum Beispiel mit einer Anfrage zu einer Website oder App), und wie die Google-Drive-Anbindung „Terminanfragen“ für die von mir betreuten Studio-Websites funktioniert.',
    ],
  },
  {
    id: 'hosting',
    title: 'Hosting und Auslieferung (Vercel)',
    paragraphs: [
      'Die Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Beim Aufruf verarbeitet Vercel die technisch nötigen Zugriffsdaten: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse, Referrer, Browser und Betriebssystem (User-Agent) und die übertragene Datenmenge. Ohne diese Daten kann die Seite nicht ausgeliefert werden.',
      'Die Seiten werden über das weltweite Netzwerk von Vercel ausgeliefert, in der Regel von einem Standort in deiner Nähe (für Deutschland meist Frankfurt am Main). Serverfunktionen, etwa der Versand des Kontaktformulars, laufen in den USA (Region Washington, D.C., „iad1“). Einige Bilder liefere ich über Vercel Blob aus, den Speicherdienst von Vercel; dabei fallen dieselben Zugriffsdaten an.',
      'Vercel speichert die Zugriffsdaten in Server-Protokollen für [Aufbewahrungsdauer laut Vercel-Plan, z. B. „höchstens X Tage“] und löscht sie danach. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse ist eine sichere, stabile und schnelle Bereitstellung der Website.',
      'Vercel verarbeitet die Daten in meinem Auftrag (Art. 28 DSGVO) [Vertrag zur Auftragsverarbeitung: Vercel DPA, abgeschlossen am …]. Vercel Inc. ist unter dem EU-US Data Privacy Framework zertifiziert; die Übermittlung in die USA stützt sich auf den Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO). Mehr dazu: https://vercel.com/legal/privacy-notice',
    ],
  },
  {
    id: 'analytics',
    title: 'Reichweitenmessung (Vercel Web Analytics)',
    paragraphs: [
      'Ich nutze Vercel Web Analytics, um zu sehen, welche Seiten wie oft aufgerufen werden. Erfasst werden die aufgerufene Seite, der Referrer, Browser, Betriebssystem und Gerätetyp sowie der ungefähre Standort bis auf Ebene der Stadt, abgeleitet aus der IP-Adresse.',
      'Es werden keine Cookies gesetzt und auf deinem Gerät nichts gespeichert. Um Besuche zu zählen, bildet Vercel aus Merkmalen der Anfrage einen Hash-Wert. Dieser Wert gilt nur für 24 Stunden und wird danach verworfen; ein Wiedererkennen über mehrere Tage oder über verschiedene Websites hinweg ist damit nicht möglich. Ich sehe nur zusammengefasste Statistiken, keine einzelnen Personen.',
      'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse ist es, die Reichweite der Website zu messen und das Angebot zu verbessern. Anbieter ist Vercel Inc. (Adresse und Datenübermittlung in die USA wie unter „Hosting“). Gegen diese Verarbeitung kannst du jederzeit widersprechen (siehe „Widerspruchsrecht“). Mehr dazu: https://vercel.com/docs/analytics/privacy-policy',
    ],
  },
  {
    id: 'contact',
    title: 'Kontaktformular',
    paragraphs: [
      "Wenn du mir über das Kontaktformular schreibst, verarbeite ich deinen Namen, deine E-Mail-Adresse, deine Nachricht und, wenn du es auswählst, das Thema aus „Worum geht's?“ (Website, App, Self-Engine oder Sonstiges). Zusätzlich wird die Sprache der Seite übermittelt, damit ich in der passenden Sprache antworte. Ich nutze diese Angaben nur, um deine Anfrage zu bearbeiten und zu beantworten.",
      'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn es um ein mögliches oder bestehendes Projekt mit mir geht (vorvertragliche Maßnahmen), und im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse, Anfragen zu beantworten). Die Angaben sind weder gesetzlich noch vertraglich vorgeschrieben. Ohne Name, E-Mail-Adresse und Nachricht kann ich dir aber nicht antworten; das Thema ist freiwillig.',
      'Die Nachricht wird über den E-Mail-Dienst Resend an mein Postfach zugestellt. Anbieter ist Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. Resend verarbeitet die Daten in meinem Auftrag (Art. 28 DSGVO) [Vertrag zur Auftragsverarbeitung: Resend DPA, abgeschlossen am …] und speichert versendete E-Mails 30 Tage, danach werden sie dort gelöscht. Plus Five Five, Inc. ist unter dem EU-US Data Privacy Framework zertifiziert; die Übermittlung in die USA stützt sich auf den Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO). Mehr dazu: https://resend.com/legal/privacy-policy',
      'Deine Anfrage lösche ich, wenn sie erledigt ist und kein Projekt daraus wird, spätestens [6 Monate] nach dem letzten Kontakt. Wird daraus ein Auftrag, bewahre ich die Korrespondenz auf, solange gesetzliche Aufbewahrungspflichten (insbesondere nach Handels- und Steuerrecht) das verlangen.',
    ],
  },
  {
    id: 'email',
    title: 'Kontakt per E-Mail',
    paragraphs: [
      'Wenn du mir direkt an hello@gwydion.dev schreibst, verarbeite ich deine E-Mail-Adresse, den Inhalt deiner Nachricht und eventuelle Anhänge, um dir zu antworten. Rechtsgrundlage und Speicherdauer sind dieselben wie beim Kontaktformular.',
      'Mein Postfach liegt bei [Mail-Provider, Name und Anschrift]. Der Anbieter verarbeitet die E-Mails in meinem Auftrag (Art. 28 DSGVO). [Falls Sitz außerhalb der EU/des EWR: Angabe zur Übermittlung, z. B. „zertifiziert unter dem EU-US Data Privacy Framework“.]',
    ],
  },
  {
    id: 'rate-limit',
    title: 'Schutz vor Missbrauch des Formulars',
    paragraphs: [
      'Damit das Kontaktformular nicht für Spam missbraucht wird, zählt der Server kurzzeitig, wie viele Nachrichten von einer IP-Adresse kommen (höchstens 5 in 10 Minuten). Dieser Zähler liegt nur im Arbeitsspeicher und wird spätestens nach 10 Minuten verworfen; er wird nicht dauerhaft gespeichert. Außerdem enthält das Formular ein für Menschen unsichtbares Feld, das automatische Einsendungen erkennt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse ist der Schutz vor Spam und Missbrauch.',
    ],
  },
  {
    id: 'language',
    title: 'Einstellungen in deinem Browser (localStorage)',
    paragraphs: [
      'Wenn du das Farbschema (hell, dunkel oder automatisch) selbst umstellst, speichert die Website deine Wahl im lokalen Speicher deines Browsers (localStorage, Eintrag „mantine-color-scheme-value“). So bleibt die Einstellung beim nächsten Besuch erhalten. Der Eintrag verlässt dein Gerät nicht und wird nicht an mich oder Dritte übertragen. Die Sprache ergibt sich aus der Adresse der Seite und wird nicht gespeichert. Cookies setzt die Website nicht.',
      'Die Speicherung ist unbedingt erforderlich, um die von dir ausgewünschte Funktion bereitzustellen (§ 25 Abs. 2 Nr. 2 TDDDG); eine Einwilligung ist dafür nicht nötig. Du kannst den Eintrag jederzeit in den Einstellungen deines Browsers löschen.',
    ],
  },
  {
    id: 'google-drive',
    title: 'Google-Drive-Anbindung „Terminanfragen“',
    paragraphs: [
      'Für die von mir betreuten Websites von Tattoo-Studios betreibe ich die Google-App „Terminanfragen“. Damit verbindet ein Studio sein eigenes Google Drive mit seiner Website, und Terminanfragen aus dem Formular der Website werden als PDF mit den hochgeladenen Bildern in einem vom Studio gewählten Ordner abgelegt.',
      'Die App fordert ausschließlich die Berechtigung „drive.file“ an. Sie sieht und bearbeitet damit nur Ordner, die das Studio in der Google-Ordnerauswahl ausdrücklich freigibt, und Dateien, die die App selbst angelegt hat. Auf andere Inhalte des Google Drive hat sie keinen Zugriff. Bei der Verbindung werden zusätzlich die E-Mail-Adresse des Google-Kontos sowie Name und ID des gewählten Ordners gespeichert, damit das Studio und ich sehen, wohin Anfragen gehen.',
      'Das von Google ausgestellte Zugriffstoken wird pro Website verschlüsselt (AES-256-GCM) in einem privaten Speicher bei Vercel in Frankfurt abgelegt und nur verwendet, um Anfragen abzulegen und regelmäßig zu prüfen, ob der Ordner noch erreichbar ist. Daten aus Google Drive werden nicht an Dritte weitergegeben, nicht verkauft, nicht für Werbung und nicht zum Trainieren von KI-Modellen verwendet.',
      'Die Nutzung und Übertragung von Informationen, die über Google-APIs empfangen werden, an andere Apps hält sich an die Google API Services User Data Policy einschließlich der Anforderungen zur eingeschränkten Nutzung (Limited Use): https://developers.google.com/terms/api-services-user-data-policy',
      'Für die Terminanfragen selbst ist das jeweilige Studio verantwortlich; ich verarbeite sie in seinem Auftrag (Art. 28 DSGVO). Rechtsgrundlage für die Verbindung ist Art. 6 Abs. 1 lit. b DSGVO (Erfüllung des Vertrags mit dem Studio). Auf Wunsch lösche ich die gespeicherte Verbindung sofort; eine Nachricht an hello@gwydion.dev genügt. Ein Studio kann den Zugriff außerdem jederzeit selbst widerrufen: https://myaccount.google.com/permissions',
    ],
  },
  {
    id: 'rights',
    title: 'Deine Rechte',
    paragraphs: [
      'Du hast das Recht auf Auskunft über deine bei mir gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO). Soweit eine Verarbeitung auf deiner Einwilligung beruht, kannst du sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).',
      'Für alle Anliegen genügt eine formlose Nachricht an hello@gwydion.dev.',
    ],
  },
  {
    id: 'objection',
    title: 'Widerspruchsrecht (Art. 21 DSGVO)',
    paragraphs: [
      'WIDERSPRUCHSRECHT: Soweit ich Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) verarbeite, also beim Hosting, bei der Reichweitenmessung, bei Anfragen außerhalb eines Projekts und beim Missbrauchsschutz, kannst du dieser Verarbeitung aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit widersprechen. Ich verarbeite die Daten dann nicht mehr, es sei denn, ich kann zwingende schutzwürdige Gründe nachweisen, die deine Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
      'Der Widerspruch ist formlos möglich, zum Beispiel per E-Mail an hello@gwydion.dev',
    ],
  },
  {
    id: 'complaint',
    title: 'Beschwerderecht',
    paragraphs: [
      'Du kannst dich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Für mich zuständig ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach: https://www.lda.bayern.de',
    ],
  },
  {
    id: 'changes',
    title: 'Stand und Änderungen',
    paragraphs: [
      'Stand: Oktober 2026. Ich passe diese Erklärung an, wenn sich die Website oder die Rechtslage ändert. Es gilt die jeweils auf gwydion.dev veröffentlichte Fassung.',
    ],
  },
]

const en: PrivacySection[] = [
  {
    id: 'controller',
    title: 'Controller',
    paragraphs: [
      'The controller responsible for data processing on this website is: Gwydion Braunsdorf, Schwangauer Str. 3, 87645 Schwangau, Germany. Email: hello@gwydion.dev',
      'This policy explains which personal data I process when you visit gwydion.dev or write to me via the contact form or by email (for example with an enquiry about a website or app), and how the “Terminanfragen” Google Drive integration for the studio websites I maintain works.',
    ],
  },
  {
    id: 'hosting',
    title: 'Hosting and delivery (Vercel)',
    paragraphs: [
      'This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When you visit it, Vercel processes the access data that is technically required: IP address, date and time, requested address, referrer, browser and operating system (user agent) and the amount of data transferred. The site cannot be delivered without this data.',
      'Pages are delivered through Vercel’s global network, usually from a location close to you (for Germany mostly Frankfurt am Main). Server functions, such as sending the contact form, run in the USA (Washington, D.C. region, “iad1”). Some images are delivered via Vercel Blob, Vercel’s storage service; the same access data is processed there.',
      'Vercel keeps this access data in server logs for [retention period according to Vercel plan, e.g. “no more than X days”] and then deletes it. The legal basis is Art. 6(1)(f) GDPR; my legitimate interest is providing the website securely, reliably and quickly.',
      'Vercel processes the data on my behalf (Art. 28 GDPR) [data processing agreement: Vercel DPA, concluded on …]. Vercel Inc. is certified under the EU-US Data Privacy Framework; transfers to the USA are based on the European Commission’s adequacy decision (Art. 45 GDPR). More information: https://vercel.com/legal/privacy-notice',
    ],
  },
  {
    id: 'analytics',
    title: 'Audience measurement (Vercel Web Analytics)',
    paragraphs: [
      'I use Vercel Web Analytics to see which pages are visited and how often. It records the page visited, the referrer, browser, operating system and device type, and an approximate location down to city level derived from the IP address.',
      'No cookies are set and nothing is stored on your device. To count visits, Vercel creates a hash from characteristics of the request. This value is only valid for 24 hours and is then discarded, so you cannot be recognised across several days or across different websites. I only see aggregated statistics, not individual people.',
      'The legal basis is Art. 6(1)(f) GDPR; my legitimate interest is measuring the reach of the website and improving it. The provider is Vercel Inc. (address and transfer to the USA as described under “Hosting”). You can object to this processing at any time (see “Right to object”). More information: https://vercel.com/docs/analytics/privacy-policy',
    ],
  },
  {
    id: 'contact',
    title: 'Contact form',
    paragraphs: [
      'When you write to me via the contact form, I process your name, your email address, your message and, if you select one, the topic from “What is it about?” (website, app, Self-Engine or other). The language of the page is also transmitted so that I can reply in the right language. I only use this information to handle and answer your enquiry.',
      'The legal basis is Art. 6(1)(b) GDPR where your enquiry concerns a possible or existing project with me (pre-contractual steps), and otherwise Art. 6(1)(f) GDPR (legitimate interest in answering enquiries). Providing this information is neither a legal nor a contractual requirement, but without your name, email address and message I cannot reply. The topic is optional.',
      'Your message is delivered to my inbox via the email service Resend, provided by Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. Resend processes the data on my behalf (Art. 28 GDPR) [data processing agreement: Resend DPA, concluded on …] and stores sent emails for 30 days, after which they are deleted there. Plus Five Five, Inc. is certified under the EU-US Data Privacy Framework; transfers to the USA are based on the European Commission’s adequacy decision (Art. 45 GDPR). More information: https://resend.com/legal/privacy-policy',
      'I delete your enquiry once it has been dealt with and no project results from it, at the latest [6 months] after our last contact. If it leads to an assignment, I keep the correspondence for as long as statutory retention obligations (in particular under commercial and tax law) require.',
    ],
  },
  {
    id: 'email',
    title: 'Contact by email',
    paragraphs: [
      'If you write to me directly at hello@gwydion.dev, I process your email address, the content of your message and any attachments in order to reply. Legal basis and retention period are the same as for the contact form.',
      'My mailbox is hosted by [mail provider, name and address]. The provider processes emails on my behalf (Art. 28 GDPR). [If based outside the EU/EEA: transfer mechanism, e.g. “certified under the EU-US Data Privacy Framework”.]',
    ],
  },
  {
    id: 'rate-limit',
    title: 'Protecting the form against abuse',
    paragraphs: [
      'To prevent the contact form from being used for spam, the server briefly counts how many messages come from one IP address (no more than 5 in 10 minutes). This counter is held in memory only and is discarded after 10 minutes at the latest; it is not stored permanently. The form also contains a field that is invisible to humans and detects automated submissions. The legal basis is Art. 6(1)(f) GDPR; my legitimate interest is protection against spam and abuse.',
    ],
  },
  {
    id: 'language',
    title: 'Settings in your browser (localStorage)',
    paragraphs: [
      'If you change the colour scheme (light, dark or automatic) yourself, the website saves your choice in your browser’s local storage (localStorage, entry “mantine-color-scheme-value”) so that it is kept for your next visit. This entry does not leave your device and is not sent to me or to third parties. The language follows the page address and is not stored. The website does not set cookies.',
      'This storage is strictly necessary to provide a function you have explicitly requested (§ 25(2) no. 2 TDDDG, German Telecommunications Digital Services Data Protection Act); no consent is required. You can delete the entry at any time in your browser settings.',
    ],
  },
  {
    id: 'google-drive',
    title: '“Terminanfragen” Google Drive integration',
    paragraphs: [
      'For the tattoo studio websites I maintain, I operate the Google app “Terminanfragen”. It lets a studio connect its own Google Drive to its website, so that appointment requests submitted through the website’s form are saved as a PDF, together with the uploaded images, in a folder chosen by the studio.',
      'The app only requests the “drive.file” scope. This means it can only see and edit folders that the studio explicitly selects in Google’s folder picker and files the app itself has created. It has no access to any other content in the Google Drive. When connecting, the email address of the Google account and the name and ID of the selected folder are also stored, so that the studio and I can see where requests are sent.',
      'The access token issued by Google is stored encrypted (AES-256-GCM) per website in private storage at Vercel in Frankfurt and is only used to save requests and to check regularly that the folder is still reachable. Data from Google Drive is not shared with third parties, not sold, and not used for advertising or to train AI models.',
      'The use and transfer of information received from Google APIs to any other app adheres to the Google API Services User Data Policy, including the Limited Use requirements: https://developers.google.com/terms/api-services-user-data-policy',
      'The respective studio is the controller for the appointment requests themselves; I process them on its behalf (Art. 28 GDPR). The legal basis for the connection is Art. 6(1)(b) GDPR (performance of the contract with the studio). On request I delete the stored connection immediately; a message to hello@gwydion.dev is enough. A studio can also revoke access itself at any time: https://myaccount.google.com/permissions',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    paragraphs: [
      'You have the right of access to the data I hold about you (Art. 15 GDPR), to rectification (Art. 16 GDPR), erasure (Art. 17 GDPR), restriction of processing (Art. 18 GDPR) and data portability (Art. 20 GDPR). Where processing is based on your consent, you can withdraw it at any time with effect for the future (Art. 7(3) GDPR).',
      'An informal message to hello@gwydion.dev is enough for any of these requests.',
    ],
  },
  {
    id: 'objection',
    title: 'Right to object (Art. 21 GDPR)',
    paragraphs: [
      'RIGHT TO OBJECT: Where I process data on the basis of Art. 6(1)(f) GDPR (legitimate interests), i.e. for hosting, audience measurement, enquiries not related to a project and abuse protection, you may object to this processing at any time on grounds relating to your particular situation. I will then stop processing the data unless I can demonstrate compelling legitimate grounds that override your interests, rights and freedoms, or the processing serves the establishment, exercise or defence of legal claims.',
      'You can object informally, for example by email to hello@gwydion.dev',
    ],
  },
  {
    id: 'complaint',
    title: 'Right to lodge a complaint',
    paragraphs: [
      'You can lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). The authority competent for me is the Bavarian Data Protection Authority (Bayerisches Landesamt für Datenschutzaufsicht, BayLDA), Promenade 18, 91522 Ansbach, Germany: https://www.lda.bayern.de',
    ],
  },
  {
    id: 'changes',
    title: 'Version and changes',
    paragraphs: [
      'Last updated: October 2026. I update this policy when the website or the legal situation changes. The version published on gwydion.dev applies.',
    ],
  },
]

export function getPrivacySections(locale: Locale): PrivacySection[] {
  return locale === 'de' ? de : en
}
