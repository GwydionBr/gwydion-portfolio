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
