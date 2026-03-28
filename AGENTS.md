# AGENT.md

Agent instructions for the Excalidraw monorepo.

This file is intentionally concise and concrete. Prefer repository facts, exact commands, and explicit guardrails over generic advice.

## Project Summary

- This repository is a Yarn v1 workspace monorepo.
- Main workspaces:
  - `excalidraw-app/`: hosted Vite application
  - `packages/*`: publishable libraries such as `@excalidraw/excalidraw`
  - `examples/*`: integration examples
- Runtime and tooling baseline:
  - Node `>=18.0.0`
  - Yarn `1.22.22`
  - TypeScript `5.9.3`
  - Vite `5.0.12`
  - Vitest `3.0.6`

## Source Of Truth

Read these before making non-trivial changes:

- Product and architecture:
  - `docs/product/PRD.md`
  - `docs/product/domain-glossary.md`
  - `docs/technical/architecture.md`
- Memory bank:
  - `docs/memory/projectbrief.md`
  - `docs/memory/techContext.md`
  - `docs/memory/activeContext.md`
  - `docs/memory/decisionLog.md`
  - `docs/memory/systemPatterns.md`
  - `docs/memory/productContext.md`
  - `docs/memory/progress.md`
- Fragile and undocumented behavior:
  - `docs/technical/code-notes.md`

If you touch editor lifecycle, history, scene/store updates, collaboration, or shared module-scope state, review `docs/technical/code-notes.md` first.

## Working Rules

- Use `yarn`, not `npm` or `pnpm`.
- Run commands from the repository root unless there is a clear package-specific reason not to.
- Prefer small, targeted edits over wide refactors.
- Preserve existing architecture unless the task explicitly calls for redesign.
- Do not introduce a new package manager, build system, test runner, or formatter.
- Do not move files or rename public exports without checking for monorepo-wide usage.
- Keep documentation in sync when behavior, architecture, or commands change.

## Repo Commands

Primary commands:

- Install: `yarn install`
- Start app: `yarn start`
- Build app: `yarn build`
- Preview production build: `yarn build:preview`
- Serve production build: `yarn start:production`
- Build packages: `yarn build:packages`

Validation commands:

- Tests: `yarn test:app --watch=false`
- Typecheck: `yarn test:typecheck`
- Lint: `yarn test:code`
- Format check: `yarn test:other`
- Full validation: `yarn test:all`

Auto-fix helpers:

- `yarn fix`
- `yarn fix:code`
- `yarn fix:other`

Use the smallest relevant validation set while iterating, then run the full relevant checks before finishing.

## Environment Notes

- CI uses Node `20.x`; prefer Node 20 locally for parity.
- Environment files are loaded from the repository root.
- Safe local overrides:
  - `.env.local`
  - `.env.development.local`
  - `.env.production.local`
  - `.env.test.local`
- Common env values live in `.env.development` and `.env.production`.

## Architecture Guardrails

- Treat `packages/excalidraw/components/App.tsx` as the editor orchestration layer.
- Treat `ActionManager` + `syncActionResult()` as the central mutation bridge.
- Keep responsibilities separated:
  - `Scene`: element ownership
  - `Store` / `History`: snapshotting and undo/redo
  - React `AppState`: editor interaction and UI state
  - Jotai: scoped UI-only atom state
- Collaboration and persistence boundaries live in `excalidraw-app`, especially:
  - `excalidraw-app/collab/Portal.tsx`
  - `excalidraw-app/data/firebase.ts`
- Remote collaboration updates must not accidentally enter local undo/redo history.

## High-Risk Areas

Be conservative in these areas:

- `packages/excalidraw/components/App.tsx`
  - It contains lifecycle-sensitive orchestration and shared module-scope interaction flags.
- `packages/element/src/store.ts`
  - `CaptureUpdateAction` precedence affects history recording semantics.
- `excalidraw-app/collab/Portal.tsx`
  - Socket initialization and encryption gates are fragile.
- Unmount and initialization order
  - Constructor and teardown ordering matters.

Before changing these areas:

- Read the related section in `docs/technical/code-notes.md`.
- Verify whether behavior is intentional, fragile, or an actual bug.
- Add or update tests when changing observable behavior.

## Change Workflow

1. Identify the owning workspace and nearest architectural boundary.
2. Read the relevant docs and memory-bank notes before editing.
3. Make the smallest coherent change that solves the task.
4. Run targeted checks while iterating.
5. Run the relevant final validation commands before finishing.
6. Update docs when commands, behavior, or architecture changed.

## Testing Expectations

- Do not stop at “build passes” for behavior changes.
- Add or update tests when changing:
  - actions
  - history behavior
  - scene/store synchronization
  - serialization/export behavior
  - collaboration or persistence behavior
- After moving files or changing imports, run lint and typecheck.
- Prefer `yarn test:all` before finalizing broad or risky changes.

## Documentation Expectations

Update documentation in the same change when you alter:

- developer commands or environment setup
- architecture or package responsibilities
- domain language or product behavior
- known caveats, side effects, or risky workflows

Most likely targets:

- `docs/technical/dev-setup.md`
- `docs/technical/architecture.md`
- `docs/technical/code-notes.md`
- files under `docs/memory/`

## Collaboration And Review

- Explain tradeoffs briefly and concretely.
- Call out assumptions when repo evidence is incomplete.
- Prefer verified facts from the codebase over speculation.
- If instructions conflict, follow the most task-specific and most recently verified source.

## PR And Commit Notes

- CI expects semantic PR titles such as `feat: ...`, `fix: ...`, or `chore: ...`.
- Before handing off, report:
  - what changed
  - which validations ran
  - any remaining risks or unverified paths

## Practical Defaults For Agents

- Start by reading the docs above instead of scanning the whole repo blindly.
- Use `rg` for search and targeted file reads.
- Prefer editing existing code paths over creating parallel abstractions.
- Keep new comments sparse and high-signal.
- When a task touches undocumented behavior, encode the learning back into `docs/technical/code-notes.md` or the memory bank.

