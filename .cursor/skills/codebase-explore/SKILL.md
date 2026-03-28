---
name: codebase-explore
description: Systematically maps unfamiliar code paths, data flow, and ownership before editing. Use when the user says explore, investigate, trace, walk through, or asks how something works (for example how does X work), or when scope is unclear and reading the whole repo would be wasteful.
---

# Codebase explore

## Goal

Produce a **verified** mental model: entry points, call/data flow, owning workspace or module, and risks—without blind repo-wide scans.

## When this applies

- Keywords: **explore**, **investigate**, **trace**, **how does X work**, **where is Y handled**, **walk me through**. And other related.
- You need orientation before a change, not a full implementation.

## Workflow

1. **Anchor the question**  
   Restate the feature, symbol, file, or behavior in one sentence. If the user named “X”, list concrete search terms (camelCase, `kebab-case`, action names, API strings).

2. **Read project truth first (this repo)**  
   Before deep code spelunking, skim [AGENTS.md](../../../AGENTS.md) and the smallest doc set that matches the topic:
   - Architecture and packages: `docs/technical/architecture.md`
   - Product language: `docs/product/domain-glossary.md`, `docs/product/PRD.md`
   - Fragile behavior: `docs/technical/code-notes.md` (required if the area touches editor lifecycle, history, scene/store, collaboration, or module-scope flags)

3. **Locate entry points**  
   Prefer **parallel** searches: semantic search for “how / where”, exact **grep** for symbols, strings, and action names. Start from:
   - User-facing: routes, `package.json` scripts, exported APIs, README in the relevant workspace
   - This monorepo defaults: `excalidraw-app/` (hosted app, collab, Firebase), `packages/excalidraw/` (editor UI, `App.tsx`, actions), `packages/element/` (Scene, Store), `packages/common/`, `packages/math/`, `packages/utils/`

4. **Follow the real chain**  
   Walk **definitions → callers → mutations → persistence/render**. For editor flows, expect the pattern in architecture docs: input in `App.tsx` → `ActionManager` → `syncActionResult()` → scene/store/history → canvas render. For collab: `excalidraw-app/collab/` and `CaptureUpdateAction` semantics.

5. **Stop with evidence**  
   Cite paths and (when reporting to the user) use repository line citations. Label gaps as **unknown** instead of guessing. Note **high-risk** files from AGENTS.md when the trail touches them.

## Output template

Use this structure in the reply (adjust depth to the question):

```markdown
## Question (anchored)
[One sentence]

## Answer (short)
[2–5 sentences, factual]

## Entry points
- [file or export] — role

## Flow
[numbered steps or bullet chain]

## Ownership / boundaries
[workspace or layer: app vs package, UI vs store vs collab]

## Risks / caveats
[link to code-notes or AGENTS high-risk list if relevant]

## Suggested next reads (if changing code)
[specific files + doc sections]
```

## Practices

- **Prefer targeted reads** over loading large files whole; use offset/limit when files are huge.
- **Reuse one terminology** (e.g. Scene vs store vs elements) consistent with docs and code.
- **Do not modify** protected or policy-marked files without explicit approval; exploration is read-only unless the user asked for edits.
- After discovering undocumented but important behavior, the project expects encoding that in `docs/technical/code-notes.md` or `docs/memory/` when you later change behavior—not during a pure exploration turn unless the user asks.

## Quick map (Excalidraw monorepo)

| Area | First places to look |
|------|----------------------|
| Editor orchestration | `packages/excalidraw/components/App.tsx` |
| Actions / mutations | `ActionManager`, `syncActionResult`, `packages/excalidraw/actions/` |
| Scene / elements / history | `packages/element/`, History alongside editor package |
| Hosted app / collab / Firebase | `excalidraw-app/collab/`, `excalidraw-app/data/firebase.ts` |
| Commands / validation | [AGENTS.md](../../../AGENTS.md) “Repo Commands” |

If exploration conflicts with a task-specific instruction, follow the **task-specific** source; use AGENTS.md and docs as the default baseline.
