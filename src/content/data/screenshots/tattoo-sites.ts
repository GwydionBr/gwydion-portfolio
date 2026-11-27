import { localScreenshotSet } from '../../screenshots'
import type { ScreenshotSource } from '../../schema'

/** A browser window. */
const WINDOW = { width: 1440, height: 900 }

/** A phone screen. */
const PHONE = { width: 390, height: 844 }

/**
 * The Tattoo Sites' screenshots, in gallery order, captured from the live
 * websites and kept in `public/screenshots/tattoo-sites`. The websites are
 * German only.
 */
const shots: ScreenshotSource[] = [
  {
    view: 'endstation-start',
    size: WINDOW,
    caption: { en: 'Endstation Tattoo: home', de: 'Endstation Tattoo: Startseite' },
    alt: {
      en: "The studio's home page: the name Endstation Tattoo in serif capitals, a short introduction, buttons to request an appointment and to see the work, and a photo of the three artists",
      de: 'Die Startseite des Studios: der Name Endstation Tattoo in Serifen-Versalien, eine kurze Vorstellung, Buttons für Terminanfrage und Arbeiten und ein Foto der drei Künstler',
    },
  },
  {
    view: 'guajaala-start',
    size: WINDOW,
    caption: { en: 'Guajaala: home', de: 'Guajaala: Startseite' },
    alt: {
      en: 'The artist\'s home page: his name as a brush-lettered logo, the line "Self love empowering, uplifting vibes", two buttons and one of his paintings in green and red',
      de: 'Die Startseite des Künstlers: sein Name als Pinselschrift-Logo, die Zeile „Self love empowering, uplifting vibes“, zwei Buttons und eines seiner Gemälde in Grün und Rot',
    },
  },
  {
    view: 'endstation-tattoos',
    size: WINDOW,
    caption: {
      en: 'Endstation Tattoo: gallery by artist',
      de: 'Endstation Tattoo: Galerie nach Künstler',
    },
    alt: {
      en: 'The tattoo gallery with a filter for all artists or one of the three, each artist with portrait, style and Instagram name above their tattoo photos',
      de: 'Die Tattoo-Galerie mit einem Filter für alle Künstler oder einen der drei, jeder Künstler mit Porträt, Stil und Instagram-Namen über seinen Tattoo-Fotos',
    },
  },
  {
    view: 'guajaala-tattoos',
    size: WINDOW,
    caption: { en: 'Guajaala: tattoos', de: 'Guajaala: Tattoos' },
    alt: {
      en: 'The tattoo page of the artist website: a hand-lettered heading, a short text, an appointment button and a row of tattoo photos',
      de: 'Die Tattoo-Seite der Künstler-Website: eine handgeschriebene Überschrift, ein kurzer Text, ein Termin-Button und eine Reihe von Tattoo-Fotos',
    },
  },
  {
    view: 'endstation-buchung',
    size: WINDOW,
    caption: { en: 'Endstation Tattoo: booking form', de: 'Endstation Tattoo: Buchungsformular' },
    alt: {
      en: 'The booking form in four steps (your idea, details, time frame, contact): a field to describe the tattoo and an upload area for reference images',
      de: 'Das Buchungsformular in vier Schritten (deine Idee, Details, Zeitraum, Kontakt): ein Feld für die Beschreibung des Tattoos und ein Upload-Bereich für Referenzbilder',
    },
  },
  {
    view: 'endstation-handy',
    size: PHONE,
    caption: { en: 'Endstation: home', de: 'Endstation: Start' },
    alt: {
      en: "The studio's home page on a phone: name, introduction, the two buttons, the address and the photo of the artists",
      de: 'Die Startseite des Studios auf dem Handy: Name, Vorstellung, die beiden Buttons, die Adresse und das Foto der Künstler',
    },
  },
  {
    view: 'endstation-buchung-handy',
    size: PHONE,
    caption: { en: 'Endstation: form', de: 'Endstation: Formular' },
    alt: {
      en: "The studio's booking form on a phone: the first step with the description field and the upload area for reference images",
      de: 'Das Buchungsformular des Studios auf dem Handy: der erste Schritt mit dem Beschreibungsfeld und dem Upload-Bereich für Referenzbilder',
    },
  },
  {
    view: 'guajaala-handy',
    size: PHONE,
    caption: { en: 'Guajaala: home', de: 'Guajaala: Start' },
    alt: {
      en: "The artist's home page on a phone: the painting on top, the brush-lettered logo and the two buttons below it",
      de: 'Die Startseite des Künstlers auf dem Handy: oben das Gemälde, darunter das Pinselschrift-Logo und die beiden Buttons',
    },
  },
  {
    view: 'guajaala-termin-handy',
    size: PHONE,
    caption: { en: 'Guajaala: same form', de: 'Guajaala: gleiches Formular' },
    alt: {
      en: "The artist's appointment form on a phone: the same first step as the studio's form, in the artist's own typeface and colours",
      de: 'Das Terminformular des Künstlers auf dem Handy: derselbe erste Schritt wie im Formular des Studios, in der Schrift und den Farben des Künstlers',
    },
  },
]

export const tattooSitesScreenshots = localScreenshotSet('/screenshots/tattoo-sites', 'de', shots)
