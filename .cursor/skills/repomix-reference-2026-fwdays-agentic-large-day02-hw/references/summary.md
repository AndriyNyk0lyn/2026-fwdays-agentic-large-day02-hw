This file is a compact index and metadata summary for the Repomix reference bundle.
It is not the merged source dump. The packed repository contents live in
`references/files.md`, where each source file appears under `## File: <path>`.

# Reference Bundle Summary

## Purpose

Use this file to understand what is included in the reference bundle, how the
bundle is organized, and which companion file to open next.
For actual code, implementation details, and cross-file grep workflows, use
`references/files.md`. For the directory tree and file sizes, use
`references/project-structure.md`.

## File Structure

This skill contains the following reference files:

| File | Contents |
|------|----------|
| `project-structure.md` | Directory tree with line counts per file |
| `files.md` | All file contents (search with `## File: <path>`) |
| `tech-stack.md` | Languages, frameworks, and dependencies |
| `summary.md` | This file - purpose and format explanation |

## Usage Guidelines

- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- Use `references/files.md` when you need merged content; search by exact path
  header `## File: <path>` or by symbol / string.
- Use `references/project-structure.md` first when you need to locate likely
  workspaces or estimate file size before opening a large file.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Search Tips For Excalidraw Agents

- Start from repo truth before deep search: `AGENTS.md`, `docs/technical/architecture.md`,
  and `docs/technical/code-notes.md` for lifecycle, history, scene/store, collab,
  or module-scope behavior.
- For editor flows, begin with `packages/excalidraw/components/App.tsx`, then trace
  `ActionManager` and `syncActionResult()` before following changes into Scene, Store,
  or History.
- For collaboration and remote-update behavior, search `excalidraw-app/collab/Portal.tsx`,
  `Collab.tsx`, and `packages/element/src/store.ts`; verify that remote updates do not
  leak into local undo/redo history.
- Prefer workspace-aware searches in `references/files.md`:
  `## File: packages/excalidraw/components/App.tsx`,
  `## File: packages/element/src/store.ts`,
  `## File: excalidraw-app/collab/Portal.tsx`.
- Search for concrete Excalidraw symbols, not generic words: `selectedLinearElement`,
  `CaptureUpdateAction`, `preferredSelectionTool`, `socketInitialized`,
  `actionManager.dispatch`, `syncActionResult`.
- When a path is high-risk in `AGENTS.md` or `docs/technical/code-notes.md`, treat the
  first read as architectural verification, not just string matching.

## Notes

- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

## Statistics

949 files | 496,277 lines

| Language | Files | Lines |
|----------|------:|------:|
| TypeScript | 313 | 82,392 |
| TypeScript (TSX) | 289 | 84,621 |
| JSON | 91 | 41,932 |
| SCSS | 82 | 9,549 |
| Markdown | 44 | 256,705 |
| MDX | 33 | 3,628 |
| JavaScript | 25 | 3,115 |
| No Extension | 21 | 266 |
| YAML | 14 | 309 |
| SVG | 13 | 85 |
| Other | 24 | 13,675 |

**Largest files:**
- `.cursor/skills/repomix-reference-2026-fwdays-agentic-large-day02-hw/references/files.md` (249,016 lines)
- `packages/excalidraw/components/App.tsx` (12,818 lines)
- `packages/excalidraw/fonts/ComicShanns/ComicShanns-Regular.sfd` (12,221 lines)
- `packages/excalidraw/tests/history.test.tsx` (5,307 lines)
- `packages/excalidraw/subset/woff2/woff2-bindings.ts` (4,049 lines)
- `packages/element/src/binding.ts` (2,940 lines)
- `packages/element/src/linearElementEditor.ts` (2,507 lines)
- `packages/excalidraw/components/icons.tsx` (2,494 lines)
- `packages/excalidraw/CHANGELOG.md` (2,466 lines)
- `packages/element/src/elbowArrow.ts` (2,309 lines)
