# Command templates (reference)

Copy and adapt. Replace bracketed placeholders. Keep commands **actionable** for the Agent.

---

## Generic workflow

```markdown
# [Title]

[One sentence: what this command does and when to use it.]

## Context

- @AGENTS.md (or other files the user should attach)

## Steps

1. …
2. …
3. …

## Constraints

- …

## Output

Format the final reply as:

- …
```

---

## Code review

```markdown
# Code review

Perform a focused code review of the changes the user indicates (diff, branch, or files).

## Context

- Attach or scope: the files / PR diff under review.
- @AGENTS.md and `.cursor/rules/` for project constraints.

## Steps

1. Summarize intent of the change in one short paragraph.
2. Check correctness, edge cases, and error handling.
3. Check security for touched surfaces (input boundaries, XSS, secrets, collab if relevant).
4. Check consistency with existing patterns in the same directory.
5. Note test gaps; suggest concrete test cases or files to extend.
6. Run the smallest relevant checks if the user wants verification (see AGENTS.md).

## Output

- **Summary**
- **Must fix** (blockers)
- **Should fix** (important)
- **Nits** (optional)
- **Suggested tests**
```

---

## Verify build and quality gates

```markdown
# Verify build

Run the appropriate Yarn checks for the edits in this session.

## Steps

1. Read AGENTS.md for the command map.
2. While iterating: run the smallest check that matches what changed.
3. Before handoff: prefer `yarn test:all`; add `yarn build` / `yarn build:packages` when bundling or packages changed.
4. Report pass/fail with the exact commands run.

## Constraints

- Use `yarn` from the repository root only.
- Do not modify protected files listed in `.cursor/rules/do-not-touch.mdc` without explicit approval.

## Output

- Commands executed (in order)
- Result summary
- If failures: relevant excerpt and proposed fix
```

---

## Run tests (targeted)

```markdown
# Run tests

Run Vitest and related checks for the current change set.

## Steps

1. From repo root: use `yarn test:app --watch=false` for behavior-affecting changes unless a narrower script is clearly sufficient.
2. If types/imports changed: `yarn test:typecheck`.
3. If only lint/format: `yarn test:code` / `yarn test:other` per AGENTS.md.
4. Summarize failures with file paths and assertions.

## Output

- Commands run
- Pass/fail
- Next steps if fail
```

---

## New React / TSX component

```markdown
# New component

Add a new UI component following this repository’s conventions.

## Context

- Target path and component name (ask if missing).
- Similar existing components in the same area for patterns.

## Steps

1. Locate the nearest existing components; match file layout, naming, and styling.
2. Implement minimal props and types; avoid unnecessary abstraction.
3. Keep imports at top of file; follow project ESLint/TypeScript rules.
4. Add or update tests if the repo tests similar components.
5. Run `yarn test:typecheck` and relevant lint/tests.

## Constraints

- No drive-by refactors unrelated to the new component.
- Do not touch protected core files unless the task requires it and the user approved.

## Output

- Files created/changed
- How to use the component
- Commands run and results
```

---

## Optional YAML frontmatter

If your Cursor build supports command metadata, you may add a small frontmatter block **above** the `# Title` (verify in your Cursor version). If unsupported, omit it and use `# Title` only.

```yaml
---
description: Short subtitle for the command picker
---
```
