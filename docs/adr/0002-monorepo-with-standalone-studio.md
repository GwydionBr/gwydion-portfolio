---
status: superseded by ADR-0004
---

# Bun-workspaces monorepo with a standalone Sanity Studio

The site becomes a Bun-workspaces monorepo: `apps/web` (TanStack Start) and `apps/studio` (Sanity Studio, deployed to `*.sanity.studio`), with shared content schemas, queries, and generated types in a package. We did not embed the Studio in the web app under `/studio`. Studio and site have different dependencies and release cycles, an embedded Studio would bloat the web bundle, and embedding is far less trodden with TanStack Start than with Next.js.

If a Studio is introduced later (see ADR-0004), this reasoning still applies.
