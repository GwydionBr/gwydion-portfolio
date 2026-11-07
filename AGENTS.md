## Task Completion Requirements

All of bun run check and bun run typecheck must pass before considering tasks completed.

## Commands

**Always use Bun** (never npm/yarn/pnpm).

Tooling is Vite+ (`vp`). Lint, format, and test config all live in `vite.config.ts` — don't add separate `.oxlintrc.json`, `.prettierrc`, or `vitest.config.ts` files. Import test APIs from `vite-plus/test`, not `vitest`.

## Project Snapshot

gwydion.dev: Gwydion's bilingual (English, German) portfolio. TanStack Start with server-rendered routes under `/$lang`, framed as an app shell (ADR 0003). Recruiters are the primary audience; see `GLOSSARY.md` for the domain terms used in code, issues and commits.

- **Content** (Profile, Projects, Career entries, CV, Posts) is typed data in `src/content/data/`, with one MDX story per Project and Site language. Read it only through the content module (`#/content`). The content-integrity test fails on any missing or empty text in either language, so add both languages together.
- **Interface text** goes through Lingui macros; `bun run check` fails on a missing German translation. The README covers the extract workflow.
- **CV PDFs** in `public/cv/` are generated from the content data by `bun run cv:build`. Rebuild and commit them whenever Career entries, Projects or `scripts/cv/` change; the build fails unless each CV fits one page.
- **Self-Engine screenshots** come from the Self-Engine repo via `bun run screenshots:sync`. Never edit Self-Engine's code from here.

## Maintainability

Long term maintainability is a core priority. If you add new functionality, first check if there is shared logic that can be extracted to a separate module. Duplicate logic across multiple files is a code smell and should be avoided. Don't be afraid to change existing code. Don't take shortcuts by just adding local logic to solve a problem.

## MCP

- use the context7 mcp to access documentations of libraries to get the current version
- use the tanstack mcp to access all relevant tanstack docs and information

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues (`GwydionBr/gwydion-portfolio`) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default triage vocabulary, except the human role maps to the existing `needs-human` label. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
