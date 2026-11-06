## Task Completion Requirements

All of bun run check and bun run typecheck must pass before considering tasks completed.

## Commands

**Always use Bun** (never npm/yarn/pnpm).

Tooling is Vite+ (`vp`). Lint, format, and test config all live in `vite.config.ts` — don't add separate `.oxlintrc.json`, `.prettierrc`, or `vitest.config.ts` files. Import test APIs from `vite-plus/test`, not `vitest`.

## Project Snapshot

Offline-first personal productivity platform (work tracking, finance, calendar, habits). Monorepo with Bun Workspaces: web app (TanStack Start), mobile app (Expo), shared packages, db package.

This repository is a VERY EARLY WIP. Proposing sweeping changes that improve long-term maintainability is encouraged.

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
