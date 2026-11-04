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
      'Diese Datenschutzerklärung informiert dich über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten beim Besuch von gwydion.dev und bei der Nutzung des Kontaktformulars. Außerdem beschreibt sie, wie ich als technischer Dienstleister Daten für die von mir betreuten Tattoo-Studio-Websites verarbeite (Anfragen-Portal und Google-Drive-Anbindung „Terminanfragen“).',
    ],
  },
  {
    id: 'hosting',
    title: 'Hosting',
    paragraphs: [
      'Die Website wird bei Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Seite verarbeitet Vercel technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt des Zugriffs, angeforderte Ressource, übertragene Datenmenge, Referrer, User-Agent), um die Auslieferung und Sicherheit der Website zu gewährleisten. Einige Bilder (Screenshots der Projektseiten) werden aus dem Dateispeicher Vercel Blob (*.public.blob.vercel-storage.com) geladen; dabei fallen dieselben technischen Daten bei Vercel an.',
      'Serverfunktionen, etwa für das Kontaktformular, laufen in der Vercel-Region Frankfurt (fra1). Statische Inhalte liefert Vercel über sein weltweites Netzwerk aus, in der Regel von einem Standort in deiner Nähe.',
      'Die Verarbeitung erfolgt zur Bereitstellung des Onlineangebots (Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse an einem sicheren und stabilen Betrieb). Mit Vercel besteht ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO. Vercel ist unter dem EU-US Data Privacy Framework zertifiziert; soweit Daten in die USA übermittelt werden, stützt sich das auf den entsprechenden Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO).',
      'Weitere Informationen: https://vercel.com/legal/privacy-policy',
    ],
  },
  {
    id: 'analytics',
    title: 'Webanalyse (Vercel Web Analytics)',
    paragraphs: [
      'Diese Website nutzt Vercel Web Analytics, einen Analysedienst der Vercel Inc. (Anschrift siehe Hosting). Erfasst werden pro Seitenaufruf u. a. Zeitpunkt, aufgerufene Seite, Referrer, ungefähre Herkunft (Land, Region, Stadt), Betriebssystem, Browser und Gerätetyp. Besucher:innen werden nicht über Cookies, sondern über einen aus der Anfrage gebildeten Hash-Wert unterschieden, der nach 24 Stunden verworfen wird. Ausgewertet werden nur aggregierte Statistiken; es werden keine individuellen Nutzungsprofile erstellt und keine seitenübergreifende Verfolgung durchgeführt.',
      'Die Verarbeitung dient dazu, die Nutzung der Website in zusammengefasster Form auszuwerten und das Angebot zu verbessern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Optimierung der Website).',
      'Die Übermittlung in die USA stützt sich wie beim Hosting auf den Angemessenheitsbeschluss zum EU-US Data Privacy Framework. Weitere Informationen: https://vercel.com/docs/analytics/privacy-policy',
    ],
  },
  {
    id: 'contact',
    title: 'Kontaktformular und E-Mail',
    paragraphs: [
      'Wenn du das Kontaktformular nutzt oder mir eine E-Mail schreibst, verarbeite ich die von dir angegebenen Daten (beim Formular: Name, E-Mail-Adresse, Nachrichtentext und, falls gewählt, das Thema deiner Anfrage), um deine Anfrage zu bearbeiten und zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit deine Anfrage auf einen Vertrag mit mir abzielt (vorvertragliche Maßnahmen), im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung eingehender Anfragen).',
      'Deine Angaben sind freiwillig. Ohne Name, E-Mail-Adresse und Nachricht kann ich deine Anfrage über das Formular allerdings nicht entgegennehmen.',
      'Der Versand der Formular-Nachricht erfolgt über den E-Mail-Dienst Resend der Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. Dabei werden die genannten Daten zur Zustellung der E-Mail an hello@gwydion.dev verarbeitet. Mit Resend besteht ein Vertrag über Auftragsverarbeitung nach Art. 28 DSGVO. Resend ist unter dem EU-US Data Privacy Framework zertifiziert; die Übermittlung in die USA stützt sich auf den entsprechenden Angemessenheitsbeschluss (Art. 45 DSGVO), ergänzend auf die EU-Standardvertragsklauseln. Weitere Informationen: https://resend.com/legal/privacy-policy',
      'Mein E-Mail-Postfach liegt bei der Proton AG, Route de la Galaise 32, 1228 Plan-les-Ouates, Schweiz. Dort werden Formular-Nachrichten und E-Mails an mich empfangen und gespeichert. Für die Schweiz besteht ein Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO). Weitere Informationen: https://proton.me/legal/privacy',
      'Ich lösche deine Anfrage, sobald sie abschließend bearbeitet ist, spätestens 12 Monate nach dem letzten Kontakt. Führt die Anfrage zu einem Auftrag, bewahre ich geschäftsrelevante Korrespondenz so lange auf, wie es die gesetzlichen Aufbewahrungsfristen verlangen (§ 147 AO; je nach Art des Dokuments 6 bis 10 Jahre).',
    ],
  },
  {
    id: 'rate-limit',
    title: 'Sicherheit und Missbrauchsschutz',
    paragraphs: [
      'Zum Schutz vor Missbrauch des Kontaktformulars wird beim Absenden deine IP-Adresse kurzzeitig im Arbeitsspeicher der Serverfunktion gezählt (Rate-Limit: höchstens 5 Nachrichten pro 10 Minuten). Zweck ist die Abwehr automatisierter oder übermäßiger Anfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden nicht dauerhaft gespeichert und spätestens mit dem Ende der jeweiligen Funktionsinstanz verworfen.',
    ],
  },
  {
    id: 'language',
    title: 'Einstellungen im lokalen Speicher (localStorage)',
    paragraphs: [
      'Wenn du das Farbschema (Hell/Dunkel) umschaltest, wird deine Wahl im Browser mittels localStorage gespeichert, damit sie beim nächsten Besuch erhalten bleibt. Die Sprache folgt der URL und wird nicht gespeichert. Diese Website setzt keine Cookies; der Eintrag wird nicht an mich oder Dritte übermittelt.',
      'Die Speicherung ist für die von dir ausdrücklich gewünschte Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Rechtsgrundlage für die weitere Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (komfortable Nutzung der Website). Du kannst den Eintrag in den Einstellungen deines Browsers jederzeit löschen.',
    ],
  },
  {
    id: 'portal',
    title: 'Anfragen-Portal für Tattoo-Studios (Auftragsverarbeitung)',
    paragraphs: [
      'Für die von mir betreuten Websites von Tattoo-Studios betreibe ich als technischer Dienstleister das „Anfragen-Portal“. Terminanfragen, die Kund:innen über das Formular einer Studio-Website senden (Kontaktdaten, Beschreibung des Wunschmotivs, Referenzbilder und ggf. Gesundheitsangaben), werden dort gespeichert und vom zuständigen Artist bzw. Studio bearbeitet. Außerdem verarbeitet das Portal die Zugänge (E-Mail-Adresse, Anmeldedaten) der Artists.',
      'Verantwortlich für die Terminanfragen ist das jeweilige Studio; nähere Informationen enthält die Datenschutzerklärung der jeweiligen Studio-Website. Ich verarbeite die Daten ausschließlich in dessen Auftrag (Art. 28 DSGVO). Gesundheitsangaben gehören zu den besonderen Kategorien personenbezogener Daten (Art. 9 DSGVO); die dafür erforderliche Einwilligung holt das Studio über seine Website ein. Zugriff auf eine Anfrage haben nur der zuständige Artist bzw. die Studio-Koordination. Ich habe als technischer Administrator keinen Einblick in die Inhalte der Anfragen.',
      'Als Unterauftragsverarbeiter setze ich die Supabase Pte. Ltd., 65 Chulia Street #38-02/03, OCBC Centre, Singapur 049513, ein (Datenbank, Dateispeicher und Anmeldung des Portals). Die Daten werden in der EU gespeichert (AWS-Region eu-west-3, Paris). Zugriffe aus Drittländern, etwa für Wartung und Support, sind über die EU-Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO abgesichert, die Bestandteil des Auftragsverarbeitungsvertrags von Supabase sind. Weitere Informationen: https://supabase.com/privacy',
      'Weitere Unterauftragsverarbeiter sind Vercel Inc. (Anschrift siehe Hosting) für den Betrieb der Portal-Anwendung mit Serverfunktionen in Frankfurt sowie Resend / Plus Five Five, Inc. (Anschrift siehe Kontaktformular) für Einladungs- und Benachrichtigungs-E-Mails, die keine Inhalte der Anfragen enthalten.',
    ],
  },
  {
    id: 'google-drive',
    title: 'Google-Drive-Anbindung „Terminanfragen“ (wird abgelöst)',
    paragraphs: [
      'Bis zur vollständigen Umstellung auf das Anfragen-Portal betreibe ich für einzelne Studio-Websites noch die Google-App „Terminanfragen“. Damit verbindet ein Studio sein eigenes Google Drive mit seiner Website, und Terminanfragen aus dem Formular werden als PDF mit den hochgeladenen Bildern in einem vom Studio gewählten Ordner abgelegt.',
      'Die App fordert ausschließlich die Berechtigung „drive.file“ an. Sie sieht und bearbeitet damit nur Ordner, die das Studio in der Google-Ordnerauswahl ausdrücklich freigibt, und Dateien, die die App selbst angelegt hat. Gespeichert werden die E-Mail-Adresse des Google-Kontos, Name und ID des gewählten Ordners sowie das von Google ausgestellte Zugriffstoken, pro Website verschlüsselt (AES-256-GCM) in einem privaten Speicher bei Vercel in Frankfurt. Daten aus Google Drive werden nicht an Dritte weitergegeben, nicht verkauft, nicht für Werbung und nicht zum Trainieren von KI-Modellen verwendet.',
      'Die Nutzung und Übertragung von Informationen, die über Google-APIs empfangen werden, an andere Apps hält sich an die Google API Services User Data Policy (https://developers.google.com/terms/api-services-user-data-policy), einschließlich der Anforderungen zur eingeschränkten Nutzung (Limited Use).',
      'Auch hier ist das jeweilige Studio verantwortlich; ich verarbeite die Daten in seinem Auftrag (Art. 28 DSGVO). Ein Studio kann den Zugriff jederzeit unter https://myaccount.google.com/permissions widerrufen. Gespeicherte Verbindungen lösche ich auf Wunsch sofort, spätestens mit Abschluss der Umstellung; eine Nachricht an hello@gwydion.dev genügt.',
    ],
  },
  {
    id: 'rights',
    title: 'Deine Rechte',
    paragraphs: [
      'Du hast das Recht auf Auskunft über die dich betreffenden personenbezogenen Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), auf Löschung (Art. 17 DSGVO), auf Einschränkung der Verarbeitung (Art. 18 DSGVO) und auf Datenübertragbarkeit (Art. 20 DSGVO). Eine Nachricht an hello@gwydion.dev genügt.',
      'Sofern die Verarbeitung auf Einwilligung beruht, kannst du diese mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).',
      'Eine automatisierte Entscheidungsfindung einschließlich Profiling (Art. 22 DSGVO) findet nicht statt.',
    ],
  },
  {
    id: 'objection',
    title: 'Widerspruchsrecht (Art. 21 DSGVO)',
    paragraphs: [
      'Soweit ich Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse) verarbeite, kannst du aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit Widerspruch gegen diese Verarbeitung einlegen. Ich verarbeite die Daten dann nicht mehr, es sei denn, ich kann zwingende schutzwürdige Gründe nachweisen, die deine Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.',
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
      'This privacy policy explains the nature, scope, and purpose of processing personal data when you visit gwydion.dev and use the contact form. It also describes how I, as a technical service provider, process data for the tattoo studio websites I build and maintain (the booking request portal and the “Terminanfragen” Google Drive integration).',
    ],
  },
  {
    id: 'hosting',
    title: 'Hosting',
    paragraphs: [
      'This website is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States. When you access the site, Vercel processes technically necessary data (for example IP address, time of access, requested resource, amount of data transferred, referrer, user agent) to deliver and secure the website. Some images (screenshots on the project pages) are loaded from Vercel Blob file storage (*.public.blob.vercel-storage.com); the same technical data is processed by Vercel in that case.',
      'Server functions, for example for the contact form, run in Vercel’s Frankfurt region (fra1). Static content is delivered through Vercel’s global network, usually from a location near you.',
      'Processing is carried out to provide the online service (Art. 6(1)(f) GDPR — legitimate interest in secure and stable operation). A data processing agreement under Art. 28 GDPR is in place with Vercel. Vercel is certified under the EU-U.S. Data Privacy Framework; where data is transferred to the United States, this relies on the corresponding adequacy decision of the EU Commission (Art. 45 GDPR).',
      'More information: https://vercel.com/legal/privacy-policy',
    ],
  },
  {
    id: 'analytics',
    title: 'Web analytics (Vercel Web Analytics)',
    paragraphs: [
      'This website uses Vercel Web Analytics, an analytics service provided by Vercel Inc. (address see Hosting). For each page view it records, among other things, the time, the page visited, the referrer, approximate location (country, region, city), operating system, browser and device type. Visitors are not distinguished by cookies but by a hash derived from the request, which is discarded after 24 hours. Only aggregated statistics are evaluated; no individual user profiles are created and no cross-site tracking takes place.',
      'Processing serves to evaluate how the website is used in aggregated form and to improve it. Legal basis: Art. 6(1)(f) GDPR (legitimate interest in optimising the website).',
      'As with hosting, transfers to the United States rely on the adequacy decision for the EU-U.S. Data Privacy Framework. More information: https://vercel.com/docs/analytics/privacy-policy',
    ],
  },
  {
    id: 'contact',
    title: 'Contact form and email',
    paragraphs: [
      'When you use the contact form or email me, I process the data you provide (for the form: name, email address, message text and, if selected, the topic of your request) to handle and respond to your request. The legal basis is Art. 6(1)(b) GDPR where your request aims at a contract with me (pre-contractual measures), and otherwise Art. 6(1)(f) GDPR (legitimate interest in responding to incoming inquiries).',
      'Providing your details is voluntary. Without a name, email address and message, however, I cannot accept your request through the form.',
      'Form messages are sent via the email service Resend, operated by Plus Five Five, Inc., 2261 Market Street #5039, San Francisco, CA 94114, United States. The data listed above is processed to deliver the email to hello@gwydion.dev. A data processing agreement under Art. 28 GDPR is in place with Resend. Resend is certified under the EU-U.S. Data Privacy Framework; transfers to the United States rely on the corresponding adequacy decision (Art. 45 GDPR) and, in addition, on the EU standard contractual clauses. More information: https://resend.com/legal/privacy-policy',
      'My mailbox is hosted by Proton AG, Route de la Galaise 32, 1228 Plan-les-Ouates, Switzerland, where form messages and emails to me are received and stored. An adequacy decision of the EU Commission exists for Switzerland (Art. 45 GDPR). More information: https://proton.me/legal/privacy',
      'I delete your request once it has been fully handled, at the latest 12 months after our last contact. If the request leads to an engagement, I keep business-relevant correspondence for as long as statutory retention periods require (§ 147 German Fiscal Code; 6 to 10 years depending on the type of document).',
    ],
  },
  {
    id: 'rate-limit',
    title: 'Security and abuse prevention',
    paragraphs: [
      'To protect the contact form from abuse, your IP address is briefly counted in the server function’s memory when you submit the form (rate limit: at most 5 messages per 10 minutes). The purpose is to block automated or excessive requests. Legal basis: Art. 6(1)(f) GDPR. The data is not stored permanently and is discarded at the latest when the function instance ends.',
    ],
  },
  {
    id: 'language',
    title: 'Preferences in local storage',
    paragraphs: [
      'When you switch the colour scheme (light/dark), your choice is stored in the browser using localStorage so it persists on your next visit. The language follows the URL and is not stored. This website sets no cookies; the entry is not transmitted to me or to third parties.',
      'Storing it is strictly necessary for the function you explicitly requested (§ 25(2) no. 2 of the German TDDDG). The legal basis for any further processing is Art. 6(1)(f) GDPR (convenient use of the site). You can delete the entry in your browser settings at any time.',
    ],
  },
  {
    id: 'portal',
    title: 'Booking request portal for tattoo studios (processing on behalf)',
    paragraphs: [
      'For the tattoo studio websites I build and maintain, I operate the booking request portal (“Anfragen-Portal”) as a technical service provider. Booking requests that clients submit through a studio website’s form (contact details, description of the desired design, reference images and, where applicable, health information) are stored there and handled by the responsible artist or studio. The portal also processes the artists’ accounts (email address, login data).',
      'Each studio is the controller for its booking requests; details are provided in the privacy policy of the respective studio website. I process the data solely on the studio’s behalf (Art. 28 GDPR). Health information is a special category of personal data (Art. 9 GDPR); the studio obtains the required consent through its website. Only the responsible artist or the studio coordination can access a request. As the technical administrator, I have no insight into the content of requests.',
      'As a sub-processor I use Supabase Pte. Ltd., 65 Chulia Street #38-02/03, OCBC Centre, Singapore 049513 (database, file storage and sign-in for the portal). Data is stored in the EU (AWS region eu-west-3, Paris). Access from third countries, for example for maintenance and support, is safeguarded by the EU standard contractual clauses under Art. 46(2)(c) GDPR, which are part of Supabase’s data processing agreement. More information: https://supabase.com/privacy',
      'Further sub-processors are Vercel Inc. (address see Hosting) for running the portal application with server functions in Frankfurt, and Resend / Plus Five Five, Inc. (address see Contact form) for invitation and notification emails, which contain no request content.',
    ],
  },
  {
    id: 'google-drive',
    title: '“Terminanfragen” Google Drive integration (being phased out)',
    paragraphs: [
      'Until the move to the booking request portal is complete, I still operate the Google app “Terminanfragen” (booking requests) for some studio websites. It lets a studio connect its own Google Drive to its website, so booking requests submitted through the form are saved as a PDF, together with the uploaded images, in a folder the studio chooses.',
      'The app only requests the “drive.file” scope. It can therefore only see and edit folders the studio explicitly selects in the Google folder picker and files the app created itself. The Google account’s email address, the name and ID of the selected folder, and the token issued by Google are stored per website, encrypted (AES-256-GCM), in a private Vercel store in Frankfurt. Google Drive data is not shared with third parties, not sold, and not used for advertising or to train AI models.',
      'The use and transfer of information received from Google APIs to any other app will adhere to the Google API Services User Data Policy (https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements.',
      'Here too, each studio is the controller; I process the data on its behalf (Art. 28 GDPR). A studio can revoke access at any time at https://myaccount.google.com/permissions. I delete stored connections immediately on request, and at the latest once the move is complete; an email to hello@gwydion.dev is enough.',
    ],
  },
  {
    id: 'rights',
    title: 'Your rights',
    paragraphs: [
      'You have the right to obtain information about personal data concerning you (Art. 15 GDPR), to rectification (Art. 16 GDPR), to erasure (Art. 17 GDPR), to restriction of processing (Art. 18 GDPR) and to data portability (Art. 20 GDPR). An email to hello@gwydion.dev is enough.',
      'Where processing is based on consent, you may withdraw consent with effect for the future (Art. 7(3) GDPR).',
      'No automated decision-making, including profiling (Art. 22 GDPR), takes place.',
    ],
  },
  {
    id: 'objection',
    title: 'Right to object (Art. 21 GDPR)',
    paragraphs: [
      'Where I process data on the basis of Art. 6(1)(f) GDPR (legitimate interest), you may object to this processing at any time on grounds relating to your particular situation. I will then no longer process the data unless I can demonstrate compelling legitimate grounds that override your interests, rights and freedoms, or the processing serves the establishment, exercise or defence of legal claims.',
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
