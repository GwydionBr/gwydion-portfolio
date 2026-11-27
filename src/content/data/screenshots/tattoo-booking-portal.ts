import { localScreenshotSet } from '../../screenshots'
import type { ScreenshotSource } from '../../schema'

/** The portal on an iPad held sideways, the artists' second device. */
const TABLET = { width: 1180, height: 820 }

/** The portal on a phone, the artists' first device. */
const PHONE = { width: 390, height: 844 }

/**
 * The Tattoo Booking Portal's screenshots, in gallery order. They show the
 * local demo data of the tattoo-sites repo (`bun run db:dev`), never real
 * booking requests, and are kept in `public/screenshots/tattoo-booking-portal`.
 * The portal's interface is German only.
 */
const shots: ScreenshotSource[] = [
  {
    view: 'postfach',
    size: TABLET,
    caption: { en: 'Inbox with an open request', de: 'Postfach mit geöffneter Anfrage' },
    alt: {
      en: "The portal on a tablet: folders on the left, the artist's open booking requests grouped by status in the middle, and the opened request with its status, next step and reference images on the right",
      de: 'Das Portal auf einem Tablet: links die Ordner, in der Mitte die offenen Terminanfragen der Künstlerin nach Status gruppiert, rechts die geöffnete Anfrage mit Status, nächstem Schritt und Referenzbildern',
    },
  },
  {
    view: 'zum-uebernehmen',
    size: TABLET,
    caption: { en: 'Shared inbox: take a request', de: 'Gemeinsamer Eingang: Anfrage übernehmen' },
    alt: {
      en: 'The folder "Zum Übernehmen" with studio requests that name no artist, each showing how many days it has waited, and an open request with a "take over" button',
      de: 'Der Ordner „Zum Übernehmen“ mit Studio-Anfragen ohne Wunschkünstler, jede mit der Zahl der Tage, die sie schon wartet, und eine geöffnete Anfrage mit dem Button „Übernehmen“',
    },
  },
  {
    view: 'eckdaten',
    size: TABLET,
    caption: {
      en: "Studio coordination: other artists' requests as key data only",
      de: 'Studio-Koordination: Anfragen anderer Künstler nur als Eckdaten',
    },
    alt: {
      en: 'The list of all studio requests as the coordinator sees it: her own requests with name and motif, the requests of other artists reduced to date, artist and how they got it, marked "key data only"',
      de: 'Die Liste aller Studio-Anfragen aus Sicht der Koordination: eigene Anfragen mit Name und Motiv, die Anfragen anderer Künstler nur mit Datum, Künstler und Weg der Zuordnung, markiert als „nur Eckdaten“',
    },
  },
  {
    view: 'postfach-handy',
    size: PHONE,
    caption: { en: 'Inbox', de: 'Postfach' },
    alt: {
      en: 'The inbox on a phone: a note that the coordinator moved a request to another artist, then the new requests with name, motif, date and the website they came from',
      de: 'Das Postfach auf dem Handy: ein Hinweis, dass die Koordination eine Anfrage einem anderen Künstler gegeben hat, darunter die neuen Anfragen mit Name, Motiv, Datum und Herkunfts-Website',
    },
  },
  {
    view: 'anfrage-handy',
    size: PHONE,
    caption: { en: 'A request', de: 'Eine Anfrage' },
    alt: {
      en: 'An open request on a phone: buttons to e-mail or call the person, the status from new to completed, the next step "arrange the appointment" and the motif at a glance',
      de: 'Eine geöffnete Anfrage auf dem Handy: Buttons für E-Mail und Anruf, der Status von Neu bis Abgeschlossen, der nächste Schritt „Termin vereinbaren“ und das Motiv auf einen Blick',
    },
  },
  {
    view: 'uebergabe-handy',
    size: PHONE,
    caption: { en: 'Hand-over with consent', de: 'Übergabe mit Zustimmung' },
    alt: {
      en: "The hand-over dialog in two steps: first file the proof of the person's consent, then choose the artist who takes the request",
      de: 'Der Übergabe-Dialog in zwei Schritten: zuerst den Nachweis der Zustimmung ablegen, dann den Künstler wählen, der die Anfrage bekommt',
    },
  },
  {
    view: 'verwaltung',
    size: TABLET,
    caption: {
      en: 'Technical administration: accounts, no requests',
      de: 'Technische Verwaltung: Zugänge, keine Anfragen',
    },
    alt: {
      en: 'The administration view with tabs for people, websites and tests: each person with e-mail address, roles such as artist or studio coordination, and an edit button',
      de: 'Die Verwaltungsansicht mit Reitern für Personen, Websites und Tests: jede Person mit E-Mail-Adresse, Rollen wie Artist oder Studio-Koordination und einem Bearbeiten-Button',
    },
  },
]

export const tattooBookingPortalScreenshots = localScreenshotSet(
  '/screenshots/tattoo-booking-portal',
  'de',
  shots,
)
