# gwydion-portfolio

Personal portfolio site built with TanStack Start, React, Mantine, Paraglide, and Bun.

## Setup

```bash
bun install
```

## Development

```bash
bun run dev
```

The dev server runs on port `3000`.

## Quality Checks

```bash
bun run lint
bun run typecheck
bun run test
```

## Production Build

```bash
bun run build
bun run preview
```

This project now uses Nitro for production hosting so TanStack Start server routes and SSR can run on Vercel.

To run the built server directly:

```bash
bun run start
```

## Internationalization

Source messages live in `messages/en.json` and `messages/de.json`.
Generated Paraglide output is written to `src/generated/paraglide`:

```bash
bun run i18n
```

The main scripts run `i18n` before typechecking, tests, development, and production builds so generated message functions stay current.

## Contact Form

The contact endpoint uses Resend. Copy `.env.example` to `.env` and set:

```bash
RESEND_API_KEY=re_...
```

Validation is shared between the client and API route in `src/features/contact/model/contact.ts`.

## Feature Flags

The blog is enabled automatically in development and disabled by default in production.

To enable it in a production build, set:

```bash
VITE_ENABLE_BLOG=true
```

## Deploy To Vercel

This repo is prepared for Vercel Git deployments following the current TanStack Start hosting guide:

- connect the GitHub repository in Vercel
- set `RESEND_API_KEY` in the Vercel project environment variables

Vercel should detect the project from Git. If needed, set the build command to `bun run build`.
