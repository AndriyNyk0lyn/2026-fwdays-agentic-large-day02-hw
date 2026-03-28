# Experiment: `testing.mdc` rule — A/B results log

**Rule under test:** `.cursor/rules/testing.mdc`  
**Hypothesis (edit):** With **acceptance criteria that do not mention tests**, enabling `testing.mdc` increases how often the agent adds a **Vitest file** for new package logic (`packages/<name>/tests/*.test.ts`), per the rule’s “prefer … when that pattern already exists” / “smallest test that proves the contract” guidance.

**Confounders:** Other Cursor rules (`typescript.mdc`, `conventions.mdc`, etc.) may still load; note them in **Model / notes**. ESLint does not require a new test file for this task.

## Fixed task spec (do not change mid-experiment)

- **Goal:** Add a tiny **pure** numeric helper in `@excalidraw/utils`.
- **Deliverables:**
  1. New file `packages/utils/src/clampByte.ts` exporting **`clampByte(n: number): number`**. Behavior: if **`n` is not finite** (`!Number.isFinite(n)`), return **`0`**. Otherwise use **`Math.trunc`** toward zero, then clamp to the inclusive integer range **`[0, 255]`** (e.g. `255.9` → `255`, `-3.7` → `0`).
  2. Re-export `clampByte` from `packages/utils/src/index.ts` (same `export * from "./…"` style as neighboring lines).
- **Constraints:** Do **not** add dependencies. Touch **only** `packages/utils/src/clampByte.ts` and `packages/utils/src/index.ts`. Do **not** edit `packages/excalidraw/data/restore.ts`, `packages/excalidraw/types.ts`, `packages/excalidraw/actions/manager.ts`, or `packages/excalidraw/scene/renderer.ts`.
- **Done when (intentionally test-agnostic):** From repo root, **`yarn test:typecheck`** and **`yarn test:code`** pass. **Do not** require adding a test file or running Vitest for this task in your instructions to the agent.

## Why this task discriminates `testing.mdc`

- Typecheck and ESLint **do not** force `packages/utils/tests/clampByte.test.ts` to exist.
- `testing.mdc` explicitly encourages the **smallest** test for new logic in packages like `packages/utils` (`packages/utils/tests` pattern already exists in this repo).
- **Primary metric:** whether **`packages/utils/tests/clampByte.test.ts`** appears (new file in the diff / untracked list).

## Session protocol

1. Use the **same git base SHA** for variant A and B (clean tree or documented stash).
2. **`testing.mdc` only applies to implementation edits if the rule is actually loaded.** Its default globs are test/config paths (`**/*.test.ts`, …), so for **variant B** temporarily set **`alwaysApply: true`** in `.cursor/rules/testing.mdc` for the duration of the run, then **revert** to `alwaysApply: false` after logging.
3. **Variant A (rule off):** Disable the rule, e.g. `mv .cursor/rules/testing.mdc .cursor/rules/testing.mdc.off` (restore filename after the experiment series if you use this pattern).
4. **Variant B (rule on):** Restore `.cursor/rules/testing.mdc`, set **`alwaysApply: true`** as above, new agent chat, same prompt.
5. Run **Metrics commands** below, then fill one table row per run.

## Metrics commands (testing.mdc–aligned)

From repo root after the agent finishes:

```bash
git status -sb
git diff --name-only
git ls-files --others --exclude-standard
yarn test:typecheck
yarn test:code
```

**Primary signal (package unit test added?):**

```bash
test -f packages/utils/tests/clampByte.test.ts && echo "clampByte.test.ts: yes" || echo "clampByte.test.ts: no"
```

Optional (if the test file exists):

```bash
rg -c '^\s*it\(' packages/utils/tests/clampByte.test.ts 2>/dev/null || true
```

## Results

| Run ID | Date       | Base SHA   | Variant (A=rule off, B=rule on) | `clampByte.test.ts` added? | `# it(` (if file exists) | `test:typecheck` | `test:code` | Model / notes |
| ------ | ---------- | ---------- | ------------------------------- | -------------------------- | ------------------------- | ---------------- | ----------- | ------------- |
| 1      | YYYY-MM-DD | `(short)`  | A                               |                            |                           | pass/fail        | pass/fail   |               |
| 2      | YYYY-MM-DD | `(short)`  | B                               |                            |                           | pass/fail        | pass/fail   |               |

## Conclusion (fill after N runs)

- **Winner (if any):** _A / B / inconclusive_
- **Effect size:** _e.g. B added tests in 4/5 runs, A in 0/5_
- **Follow-ups:** _e.g. try `alwaysApply` vs globs that include `packages/**/*.ts`, or blind scoring of test quality_

---

## Copy-paste prompt (same text for variant A and B)

Use a **new** Composer/Agent chat each run. Do not mention tests in your own extra instructions; the acceptance block below is deliberate.

```text
Complete the fixed task in docs/experiments/testing-mdc-ab-results.md under "Fixed task spec (do not change mid-experiment)".

Implement only what is listed there: add clampByte in packages/utils, re-export from packages/utils/src/index.ts, respect the file allowlist and protected-file exclusions.

When finished, ensure from repo root: yarn test:typecheck and yarn test:code both pass. Do not add dependencies. Do not change the experiment markdown file.
```

After each run, record metrics and update the results table in `docs/experiments/testing-mdc-ab-results.md`.
