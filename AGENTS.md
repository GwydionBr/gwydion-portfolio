## Task Completion Requirements

All of bun lint and bun typecheck must pass before considering tasks completed.

## Commands

**Always use Bun** (never npm/yarn/pnpm).

## Project Snapshot

Offline-first personal productivity platform (work tracking, finance, calendar, habits). Monorepo with Bun Workspaces: web app (TanStack Start), mobile app (Expo), shared packages, db package.

This repository is a VERY EARLY WIP. Proposing sweeping changes that improve long-term maintainability is encouraged.

## Maintainability

Long term maintainability is a core priority. If you add new functionality, first check if there is shared logic that can be extracted to a separate module. Duplicate logic across multiple files is a code smell and should be avoided. Don't be afraid to change existing code. Don't take shortcuts by just adding local logic to solve a problem.

## MCP

- use the context7 mcp to access documentations of libraries to get the current version
- use the tanstack mcp to access all relevant tanstack docs and information

