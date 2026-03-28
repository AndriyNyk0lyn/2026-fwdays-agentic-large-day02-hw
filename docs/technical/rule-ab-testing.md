# A/B testing Cursor project rules

Use this when you want **evidence** that a rule file (for example `.cursor/rules/typescript.mdc`) changes agent or human outcomes, not just intent.

## Definitions

| Term | Meaning |
| ---- | ------- |
| **Variant A** | Baseline: rule **disabled** or omitted from the session (or instructions say “ignore TypeScript rule file”). |
| **Variant B** | Treatment: rule **enabled** (default when globs match, or rule set to `alwaysApply: true` for the experiment). |
| **Task** | One concrete assignment (same spec for both variants), e.g. “add a small utility and wire it from `excalidraw-app`”. |
| **Run** | One independent completion of the task under one variant (prefer multiple runs per variant to reduce noise). |

Swap A/B labels in your notes if you prefer “with rule” = A; keep the doc consistent within one experiment.

## Design checklist

1. **Freeze the task spec** — same prompt, same acceptance criteria, same files allowed to touch.
2. **Freeze tooling** — same model, same Cursor version, same repo commit (or record SHA).
3. **Blind scoring when possible** — reviewer scores diffs without knowing variant (optional but stronger).
4. **Record environment** — model name, rule on/off, date, operator.

## Metrics (pick what fits the rule)

| Metric | How to collect |
| ------ | ---------------- |
| **CI signal** | `yarn test:typecheck`, `yarn test:code` pass/fail on the branch. |
| **Lint / type errors** | Count from command output or IDE problems. |
| **`any` usage** | `rg ': any' --glob '*.ts' --glob '*.tsx'` on changed files (heuristic). |
| **`@ts-ignore` vs `@ts-expect-error`** | `rg '@ts-ignore'`, `rg '@ts-expect-error'` on changed files. |
| **Import hygiene** | ESLint `import/order`, `consistent-type-imports`, restricted imports (see `.eslintrc.json`). |
| **Time to green** | Wall clock until typecheck + lint clean. |
| **Subjective quality** | 1–5 rubric: readability, boundary typing, consistency with neighbors. |

## Analysis (lightweight)

- Compare pass rate and error counts first (objective).
- Use medians or counts over **N runs per variant** if the process is noisy.
- Note confounders (e.g. model temperature, follow-up prompts).

## Where to log results

- Per-rule log: `docs/experiments/<rule-name>-ab-results.md`
- Optional rubric alignment test: see `packages/utils/tests/typescriptMdcRuleSignals.test.ts` (typescript.mdc example).
