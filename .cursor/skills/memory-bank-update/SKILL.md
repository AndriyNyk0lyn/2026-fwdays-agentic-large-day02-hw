---
name: memory-bank-update
description: Updates the repository memory bank under docs/memory and keeps related docs aligned after significant work. Use after new features, refactors, architecture or dependency changes, or completed milestones; also when the user says update memory bank, sync docs, or refresh project docs.
---

# Memory bank update

## When to run

- User explicitly asks: “update memory bank”, “sync docs”, “refresh project docs”, or similar.
- After **significant** work: new features, refactors, architecture shifts, notable dependency upgrades, collaboration or persistence changes, or milestones you are closing out.

Skip for tiny fixes (typos, one-line bugs) unless the user still wants a sync.

## Scope and boundaries

- **Primary**: `docs/memory/*.md` — working memory for agents and humans.
- **Also touch when behavior or “source of truth” changes** (per root `AGENTS.md`):
  - `docs/product/PRD.md`, `docs/product/domain-glossary.md`
  - `docs/technical/architecture.md`, `docs/technical/dev-setup.md`, `docs/technical/code-notes.md`

Do not invent facts. Prefer **verified** statements (file paths, scripts, dependency versions from `package.json`). Mark speculation clearly or omit it.

## File map — what to update

| File | Purpose | Typical triggers |
|------|---------|------------------|
| `docs/memory/projectbrief.md` | Repo purpose, workspaces, main entrypoints, high-level capabilities | New packages/apps, major capability changes |
| `docs/memory/techContext.md` | Tooling versions, key `yarn` commands, stack split by workspace | Dependency bumps, script changes, CI/tooling |
| `docs/memory/systemPatterns.md` | Orchestration patterns (e.g. App, Scene, Store, ActionManager), integration boundaries | Refactors across editor/collab/store |
| `docs/memory/productContext.md` | UX flows grounded in code (welcome screen, collab UI, paste, share target, etc.) | Observable UX or flow changes |
| `docs/memory/decisionLog.md` | Architectural findings and **decisions** with rationale | Irreversible choices, new boundaries, risk notes |
| `docs/memory/activeContext.md` | Current focus, what you are basing notes on, immediate next steps | Any sync — refresh “current focus” |
| `docs/memory/progress.md` | Completed items and optional next steps | Milestones; append or rewrite “Completed” honestly |

## Workflow

1. **Infer delta** from the conversation or `git` history: what changed, which workspaces (`excalidraw-app/`, `packages/*`, `examples/*`) are affected.
2. **Open only the memory files that delta touches** — avoid rewriting unrelated sections.
3. **Refresh `activeContext.md`** with: current focus (short), bullet list of verified sources you used (paths, manifests), and open questions if any.
4. **Update `progress.md`**: add dated or ordered completed items; trim stale “Next” items or move them to `activeContext.md`.
5. **If versions or commands changed**: reconcile `docs/memory/techContext.md` with root and relevant `package.json` files (and `AGENTS.md` if it lists baseline versions).
6. **If architecture or fragile behavior changed**: update `systemPatterns.md` and/or `docs/technical/code-notes.md`; add a dated entry to `decisionLog.md` when the team made a real decision, not just a code tweak.
7. **Product language or PRD-level scope changed**: align `docs/product/*` and skim `domain-glossary.md` for new terms.

## Style (match existing bank)

- Prefer concise bullets and **verified** headings (this repo’s memory files use “Verified” framing).
- Reference concrete paths: `packages/excalidraw/components/App.tsx`, `excalidraw-app/collab/Portal.tsx`, etc.
- Do not duplicate long prose between memory bank and `docs/technical/architecture.md` — memory can summarize; architecture can stay canonical for big-picture structure.

## Checklist before finishing

- [ ] Every new claim is traceable to repo files or the agreed product spec.
- [ ] `activeContext.md` reflects the latest focus, not an old task.
- [ ] `progress.md` does not claim work incomplete that is already done (or vice versa).
- [ ] Version/command bullets match current `package.json` / `AGENTS.md` where applicable.

## Additional resources

- Canonical agent rules and doc index: [AGENTS.md](../../../AGENTS.md) (repo root).
