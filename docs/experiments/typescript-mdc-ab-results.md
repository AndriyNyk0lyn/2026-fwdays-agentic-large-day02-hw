# Experiment: `typescript.mdc` rule — A/B results log

**Rule under test:** `.cursor/rules/typescript.mdc`  
**Hypothesis (edit):** Enabling the rule reduces `any` / `@ts-ignore` and improves first-pass `yarn test:typecheck` + `yarn test:code` success for TypeScript edits in `packages/**` and `excalidraw-app/**`.

## Fixed task spec (do not change mid-experiment)

Describe one repeatable task here, for example:

- **Goal:** _e.g. Add a typed helper in `packages/utils` and call it from one `excalidraw-app` component._
- **Constraints:** _e.g. No new dependencies; follow existing patterns in the touched package._
- **Done when:** _e.g. `yarn test:typecheck` and `yarn test:code` pass; PR-sized diff._

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
| 1      | YYYY-MM-DD | `(short)`  | A                               |               | pass/fail        | pass/fail   | 0                    |                 |                     |                |
| 2      | YYYY-MM-DD | `(short)`  | B                               |               | pass/fail        | pass/fail   | 0                    |                 |                     |                |

## Conclusion (fill after N runs)

- **Winner (if any):** _A / B / inconclusive_
- **Effect size:** _e.g. B had 2 fewer lint-fix rounds on average_
- **Follow-ups:** _e.g. tighten globs, add example to rule, merge with ESLint docs_

## Rubric regression test

Strings checked in `packages/utils/tests/typescriptMdcRuleSignals.test.ts` should stay in sync with the bullets in `typescript.mdc` (compiler strictness is not fully encodable in regex; CI commands remain the source of truth).
