# Experiment: `typescript.mdc` rule — A/B results log

**Rule under test:** `.cursor/rules/typescript.mdc`  
**Hypothesis (edit):** Enabling the rule reduces `any` / `@ts-ignore` and improves first-pass `yarn test:typecheck` + `yarn test:code` success for TypeScript edits in `packages/**` and `excalidraw-app/**`.

## Fixed task spec (do not change mid-experiment)

- **Goal:** Add a small runtime parser in `@excalidraw/utils` that turns **untrusted** input into an optional positive integer.
- **Deliverables:**
  1. New file `packages/utils/src/parsePositiveInt.ts` exporting **`parsePositiveInt(value: unknown): number | undefined`**. It must return a **finite integer `n` with `n > 0`** when `value` is a positive whole number (accept `number` that is an integer `> 0`, and **string** values whose trimmed content is digits only and parse to an integer `> 0`, e.g. `"42"` → `42`; reject `0`, negatives, decimals, `NaN`, `Infinity`, empty string, non-string/non-number types).
  2. New tests `packages/utils/tests/parsePositiveInt.test.ts` covering at least: valid positive number, valid numeric string, reject `0`/negative/decimal/`NaN`/`Infinity`/non-numeric string/wrong types.
  3. Re-export the function from `packages/utils/src/index.ts` (same pattern as other `src/*.ts` exports).
- **Constraints:** Do **not** add dependencies. Touch **only** `packages/utils/src/parsePositiveInt.ts`, `packages/utils/tests/parsePositiveInt.test.ts`, and `packages/utils/src/index.ts`. Do **not** edit `packages/excalidraw/data/restore.ts`, `packages/excalidraw/types.ts`, `packages/excalidraw/actions/manager.ts`, or `packages/excalidraw/scene/renderer.ts`.
- **Done when:** From repo root, `yarn test:typecheck` and `yarn test:code` pass; `yarn test:app --watch=false packages/utils/tests/parsePositiveInt.test.ts` passes.

## Session protocol

1. Check out a clean branch from the same base SHA for each run.
2. **Variant A:** Start a chat without applying `typescript.mdc` (disable the rule, use a Composer mode that does not load it, or prepend: “Ignore `.cursor/rules/typescript.mdc`.”).
3. **Variant B:** Same prompt with the rule active (open files under `packages/**/*.ts` / `excalidraw-app/**/*.ts` so globs apply, or temporarily set `alwaysApply: true` for the test — revert after).
4. Run metrics commands below on the **changed files only** (or whole repo if you prefer consistency).
5. Fill one row per run in the table.

## Metrics commands (typescript.mdc–aligned)

From repo root after the agent finishes:

```bash
git diff --name-only
yarn test:typecheck
yarn test:code
```

Optional heuristics on changed paths (replace `<paths>` with output of `git diff --name-only` filtered to `.ts`/`.tsx`):

```bash
git diff --name-only | rg '\.(tsx?)$' | xargs rg '@ts-ignore' 2>/dev/null || true
git diff --name-only | rg '\.(tsx?)$' | xargs rg ': any\b' 2>/dev/null || true
```

## Results

| Run ID | Date       | Base SHA   | Variant (A=rule off, B=rule on) | Model / notes | `test:typecheck` | `test:code` | `@ts-ignore` in diff | `: any` in diff | Time to green (min) | Subjective 1–5 |
| ------ | ---------- | ---------- | ------------------------------- | ------------- | ---------------- | ----------- | -------------------- | --------------- | ------------------- | -------------- |
| 1      | 2026-03-28 | `6a7c185`  | A                               | Rule off: `.cursor/rules/typescript.mdc` → `typescript.mdc.off` (tracked delete + untracked `.off`). Task artifacts: `packages/utils/src/parsePositiveInt.ts`, `packages/utils/tests/parsePositiveInt.test.ts`, `packages/utils/src/index.ts` re-export. Heuristic `rg` on those paths only. | pass             | pass        | 0                    | 0               | —                   | —              |
| 2      | 2026-03-28 | `6a7c185`  | B                               | Rule on: `.cursor/rules/typescript.mdc` present. Task artifacts: same three files; implementation reordered (positive branch first for `number` / `string`), JSDoc on export; tests overlap spec (e.g. added `"1e2"` case, dropped some A-only cases like `"007"` / `"12 34"`). Heuristic `rg` on task paths only. | pass             | pass        | 0                    | 0               | —                   | —              |

## Conclusion (fill after N runs)

- **Winner (if any):** **Inconclusive** on this single pair — both variants achieved pass/pass typecheck+lint, 0 `@ts-ignore`, 0 `: any` on task files.
- **Effect size:** No measurable difference on the chosen heuristics; the task may be too easy or ESLint/typecheck already constrain outcomes without the Cursor rule.
- **Follow-ups:** _e.g. repeat with a harder task (restricted imports under `packages/excalidraw`), more runs per variant, or log wall-clock / revision rounds._

## Rubric regression test

Strings checked in `packages/utils/tests/typescriptMdcRuleSignals.test.ts` should stay in sync with the bullets in `typescript.mdc` (compiler strictness is not fully encodable in regex; CI commands remain the source of truth).
