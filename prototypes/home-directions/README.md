# PROTOTYPE: home-page design directions (throwaway)

Question: what should the rebuilt portfolio look like?
Run: `bun install --cwd prototypes/home-directions && bun run prototype:home` → http://localhost:3333/?variant=J

Rounds:

1. A Editorial, B Index/Terminal, C Résumé split, D Expressive, E Bento → A and D dropped.
2. Added F App shell, G Datasheet, H Changelog → F preferred.
3. App-shell variations: F, I IDE, J Dashboard app, K Launcher, L Light workspace, M Desktop.

**Verdict: J (Dashboard app).** Sidebar shell with an Overview of tiles, light and dark. Every item must still be a real,
server-rendered URL; on phones the shell becomes list → detail with a bottom tab bar. See ADR 0003 on the `rebuild` branch.
Earlier variants are kept in `src/variants/archive/`. Sample content is partly invented (placeholders are dimmed).
