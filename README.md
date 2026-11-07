# gwydion-portfolio

The source of [gwydion.dev](https://gwydion.dev), Gwydion Braunsdorf's portfolio: Projects with their stories, the Career, the CV as PDF, writing, and a contact form, in English and German.
It is built like an app (an app shell over real, server-rendered routes, see `docs/adr/0003`) with TanStack Start, React, Tailwind CSS, Base UI, Lingui, MDX, and Bun.
Tooling runs on [Vite+](https://viteplus.dev) (`vp`): Vite, Vitest, Oxlint, and Oxfmt configured together in `vite.config.ts`.

## Setup

```bash
bun install
infisical login   # once per machine (EU instance: https://eu.infisical.com)
```

Secrets are managed in [Infisical](https://eu.infisical.com). The repo is linked to the Infisical project via `.infisical.yaml`; there is no `.env` file to maintain.

## Development

```bash
bun run dev
```

`bun run dev` injects the `dev` secrets from Infisical (`infisical run --env=dev`). The dev server runs on port `3001`.

## Quality Checks

```bash
bun run check      # catalog check + format + lint + type-aware checks (vp check)
bun run check:fix  # same, applying fixes
bun run typecheck  # tsc --noEmit
bun run test       # vp test
```

A pre-commit hook (`.vite-hooks/pre-commit`, installed by `bun install` via `vp config`) runs `vp check --fix` on staged files.

## Production Build

```bash
bun run build
bun run preview
```

This project uses Nitro for production hosting so TanStack Start server routes and SSR can run on Vercel.

To run the built server directly:

```bash
bun run start
```

## Content

All content lives in the repo as typed data (`src/content/data/`), decided in `docs/adr/0004`:

- `profile.ts`: pitch, Availability, "Now", skills, links
- `projects.ts` plus one MDX story per Project and language in `projects/<slug>.<language>.mdx`
- `careerEntries.ts` and `cv.ts`: the Career and the CV
- `posts.ts`: writing

Every text is given in both languages. The content-integrity test (`src/content/integrity.test.ts`, part of `bun run test`) fails on any missing or empty text, malformed periods, and Career entries out of order. Domain terms are defined in `GLOSSARY.md`.

## CV

The CV PDFs in `public/cv/` are generated from the content data, not edited by hand:

```bash
bun run cv:build
```

It renders `scripts/cv/` (layout and CV-only wording) to HTML and prints it with a local Chromium browser (Helium by default; set `CHROME` to use another) to one PDF per language. The build fails unless each PDF has exactly one page. Rebuild and commit the PDFs after changing Career entries, Projects, or the portrait (`public/portrait.webp`, shown in the German CV only).

## Self-Engine Screenshots

The Self-Engine Project shows screenshots that the Self-Engine repo captures and uploads. After they are regenerated there:

```bash
bun run screenshots:sync [path/to/self-engine]   # default: ../self-engine
```

## Internationalization

Interface text is translated with [Lingui](https://lingui.dev), set up like Self-Engine's (ADR 0001): PO catalogs in `src/i18n/locales/`, English as the Base language with the English text as the message id, German falling back to English. Write text with the macros (`useLingui().t`, `<Trans>`, `msg`), then:

```bash
bun run i18n:extract   # add new messages to the catalogs, drop removed ones
bun run i18n:check     # fails on catalogs out of sync, missing German, placeholder mismatches
```

Translate the new `msgstr ""` entries in `src/i18n/locales/de.po`. `bun run check` runs `i18n:check` first, so a missing German translation fails it.

## Contact Form

The Contact view's form posts to `POST /api/contact` (`src/contact/`), which sends the message through Resend. It needs these secrets (see `.env.example`), stored in Infisical in every environment (`dev`, `staging`, `prod`):

- `RESEND_API_KEY`
- `CONTACT_FROM_EMAIL` – e.g. `Portfolio Contact <contact@mail.gwydion.dev>`; the domain must be verified in Resend. Enter the value in Infisical without quotes.
- `CONTACT_TO_EMAIL` – inbox that receives contact form messages

If any of them is unset, the endpoint responds with a 500 and logs the required variable names.

## Deploy To Vercel

This repo is prepared for Vercel Git deployments following the current TanStack Start hosting guide:

- connect the GitHub repository in Vercel
- environment variables are synced from Infisical via Vercel Secret Syncs:
  - Infisical `prod` → Vercel Production
  - Infisical `staging` → Vercel Preview
- change secrets in Infisical, not in the Vercel dashboard. Vercel only picks up new values on the next deployment, so redeploy afterwards (existing deployments keep their old values).

Local development does not use Vercel env vars; `bun run dev` reads Infisical `dev` directly.

Vercel should detect the project from Git. If needed, set the build command to `bun run build`.
