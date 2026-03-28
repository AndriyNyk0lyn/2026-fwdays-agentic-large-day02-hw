---
name: build-verify
description: Runs Yarn build and validation for this Excalidraw monorepo (typecheck, ESLint, Prettier, Vitest, production build). Use when verifying changes before a PR, after refactors, when CI fails, when the user asks to run checks, or when finishing a task that touched TypeScript/React/packages.
---

# Build and verify (Excalidraw monorepo)

## Defaults

- Run commands from the **repository root** with **`yarn`** (not npm/pnpm). See [AGENTS.md](../../../AGENTS.md).
- **While iterating**: use the **smallest** check that matches what you changed.
- **Before handing off** (PR or risky change): run **`yarn test:all`** and, when compile/bundling matters, **`yarn build`** (and **`yarn build:packages`** if you changed publishable packages).

## Quick command map

| Goal | Command |
|------|---------|
| Full gate (preferred finish line) | `yarn test:all` |
| Match PR lint-style checks locally | `yarn test:other` → `yarn test:code` → `yarn test:typecheck` → `yarn test:app --watch=false` |
| Vitest once (no watch) | `yarn test:app --watch=false` |
| Typecheck only | `yarn test:typecheck` |
| ESLint only | `yarn test:code` |
| Prettier check only | `yarn test:other` |
| App production build | `yarn build` |
| Build workspace packages | `yarn build:packages` |
| Coverage (thresholds in `vitest.config.mts`) | `yarn test:coverage` |

Auto-fix when appropriate: `yarn fix`, `yarn fix:code`, `yarn fix:other`.

## What to run by change type

- **Docs / markdown only**: usually no Yarn verify unless CI or hooks disagree.
- **TS/TSX types or imports**: at least `yarn test:typecheck`; add `yarn test:code` after moves/renames.
- **Lint/format failures**: `yarn fix` or targeted `yarn fix:code` / `yarn fix:other`, then re-run the failing check.
- **Behavior, actions, history, scene/store, export, collab**: `yarn test:app --watch=false` minimum; prefer **`yarn test:all`** before finish. Do not treat “build green” as enough for behavior changes ([AGENTS.md](../../../AGENTS.md) testing expectations).
- **Vite app or bundling risk**: add **`yarn build`**.
- **Broad or high-risk edits** (e.g. `App.tsx`, `packages/element/src/store.ts`, `excalidraw-app/collab/Portal.tsx`): **`yarn test:all`** + read related notes in `docs/technical/code-notes.md` first.

## Protected and sensitive paths

Do not edit without explicit approval and full verification pipeline:

- `packages/excalidraw/scene/renderer.ts`
- `packages/excalidraw/data/restore.ts`
- `packages/excalidraw/actions/manager.ts`
- `packages/excalidraw/types.ts`

If those files change: complete test suite understanding, **`yarn test:all`**, and manual QA as required ([do-not-touch.mdc](../../rules/do-not-touch.mdc)).

## Environment

- **Node**: CI uses **20.x**; use Node 20 locally for parity (`engines` allows `>=18`).
- Env files load from repo root; local overrides: `.env*.local` ([AGENTS.md](../../../AGENTS.md)).

## When reporting to the user

Include what you ran and the outcome. For handoffs, also note remaining risks or unverified paths ([AGENTS.md](../../../AGENTS.md) PR notes). PR titles should stay semantic (`feat:`, `fix:`, `chore:`, …).

## More detail

- Onboarding and CI alignment: [docs/technical/dev-setup.md](../../../docs/technical/dev-setup.md) (validation and first-PR flow).
- Test stack and colocation: [testing.mdc](../../rules/testing.mdc).
- Architecture and dependency guardrails: [architecture.mdc](../../rules/architecture.mdc).
