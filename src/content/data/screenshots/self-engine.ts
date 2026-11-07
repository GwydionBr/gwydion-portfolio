import type { ScreenshotSetSource, ScreenshotSource } from '../../schema'
import urls from './self-engine.urls.json'

/** A whole app window, the size every view has unless it is a close-up. */
const WINDOW = { width: 1440, height: 900 }

/**
 * Self-Engine's screenshots, in gallery order. The Self-Engine repo captures
 * and hosts them; `self-engine.urls.json` holds their URLs, written by
 * `bun run screenshots:sync`. A close-up's `size` is its crop there
 * (`APP_SCREENSHOT_CROPS`).
 */
export const selfEngineShots: ScreenshotSource[] = [
  {
    view: 'dashboard',
    size: WINDOW,
    caption: { en: 'Dashboard', de: 'Dashboard' },
    alt: {
      en: "Self-Engine dashboard with a daily greeting, a running timer, today's appointments, this month's hours and earnings, and the week's time classes",
      de: 'Self-Engine-Dashboard mit Tagesbegrüßung, laufendem Timer, heutigen Terminen, Monatsstunden und Verdienst sowie Zeitklassen der Woche',
    },
  },
  {
    view: 'work-dashboard',
    size: { width: 932, height: 540 },
    caption: { en: 'Work — open payouts', de: 'Arbeit — offene Auszahlungen' },
    alt: {
      en: "Work widget with the last seven days' hours per project and the open work per client, each with a payout button",
      de: 'Arbeits-Widget mit den Stunden der letzten sieben Tage pro Projekt und der offenen Arbeit pro Kunde, jeweils mit Auszahlen-Button',
    },
  },
  {
    view: 'time-tracking-cockpit',
    size: { width: 440, height: 360 },
    caption: { en: 'Time tracking — cockpit', de: 'Zeiterfassung — Cockpit' },
    alt: {
      en: 'Running timer with project, duration, earnings so far, the Deep Work time category and a pause button',
      de: 'Laufender Timer mit Projekt, Dauer, bisherigem Verdienst, der Zeitkategorie Deep Work und einem Pause-Button',
    },
  },
  {
    view: 'work-payout',
    size: { width: 472, height: 660 },
    caption: { en: 'Work — payout', de: 'Arbeit — Auszahlung' },
    alt: {
      en: "Payout dialog with the period's starting value and sessions, final amount, date and bank account",
      de: 'Auszahlungs-Dialog mit Startwert und Sessions des Zeitraums, Endwert, Datum und Bankkonto',
    },
  },
  {
    view: 'tasks-board',
    size: WINDOW,
    caption: { en: 'Tasks — board', de: 'Aufgaben — Board' },
    alt: {
      en: 'Task board with columns for Inbox, Todo, In Progress and Waiting, each task showing its project, plan and deadline',
      de: 'Aufgaben-Board mit Spalten für Inbox, Todo, In Progress und Waiting, jede Aufgabe mit Projekt, Planung und Deadline',
    },
  },
  {
    view: 'calendar',
    size: WINDOW,
    caption: { en: 'Calendar & time tracking', de: 'Kalender & Zeiterfassung' },
    alt: {
      en: 'Calendar week view with appointments, tracked time blocks and a planning sidebar for projects and habits',
      de: 'Wochenansicht des Kalenders mit Terminen, erfassten Zeitblöcken und einer Planungsleiste für Projekte und Habits',
    },
  },
  {
    view: 'finance',
    size: WINDOW,
    caption: { en: 'Finance — payments', de: 'Finanzen — Zahlungen' },
    alt: {
      en: "A month's payments across several accounts and currencies, with a cashflow chart per account",
      de: 'Zahlungsliste eines Monats über mehrere Konten und Währungen mit Cashflow-Diagrammen pro Konto',
    },
  },
  {
    view: 'habits',
    size: WINDOW,
    caption: { en: 'Habits — today', de: 'Gewohnheiten — Heute' },
    alt: {
      en: 'Habits day view with a progress bar, open and planned habits and their streaks',
      de: 'Tagesansicht der Gewohnheiten mit Fortschrittsbalken, offenen und eingeplanten Habits und ihren Streaks',
    },
  },
  {
    view: 'ai-assistant-panel',
    size: { width: 472, height: 760 },
    caption: { en: 'AI assistant', de: 'KI-Assistent' },
    alt: {
      en: 'AI assistant side panel with starter suggestions and a message field',
      de: 'Seitenpanel des KI-Assistenten mit Vorschlägen für den Einstieg und einem Eingabefeld',
    },
  },
]

export const selfEngineScreenshots: ScreenshotSetSource = { shots: selfEngineShots, urls }
