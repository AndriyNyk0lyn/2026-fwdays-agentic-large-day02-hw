# Code review

Perform a focused review of the scoped change (diff, branch, files, or pasted snippets). Goal: catch correctness issues, security risks, and test gaps before merge; align with this monorepo’s architecture and guardrails.

## Context

- Attach what is under review: file paths, selection, PR link/description, or `git diff` output.
- For project rules and commands: @AGENTS.md
- For automated checks after review: @build-verify (optional)

## Steps

1. **Scope** — Confirm what changed; if unclear, ask for the minimal diff or file list.
2. **Intent** — Summarize the change in one short paragraph (what problem it solves).
3. **Correctness** — Logic, edge cases, error handling, lifecycle/order if React/editor code.
4. **Security** — For touched surfaces: untrusted input boundaries, XSS/HTML, secrets in client bundles, collab/Firebase/import paths per `.cursor/rules/security-baseline.mdc` and `.cursor/rules/collab-transport.mdc` when relevant.
5. **Architecture** — Match patterns in the same area; respect boundaries in AGENTS.md (App.tsx, ActionManager, collab in `excalidraw-app/`, etc.). Flag accidental undo/history or remote→local history leaks.
6. **Protected files** — If the diff touches paths in `.cursor/rules/do-not-touch.mdc`, call it out explicitly and treat changes as high-risk unless the user approved them.
7. **Tests** — Note missing coverage; suggest concrete cases or files to extend (see AGENTS.md testing expectations).
8. **Verification** — If the user wants checks run, use the smallest set from AGENTS.md (e.g. `yarn test:typecheck`, `yarn test:code`, `yarn test:app --watch=false`, `yarn test:all` for broad/risky changes).

## Constraints

- Use `yarn` from the repository root; do not suggest `npm`/`pnpm` for this repo.
- Do not propose edits to protected files without explicit user approval.

## Output

Format the final reply as:

- **Summary** — Intent and scope in a few sentences.
- **Must fix** — Blockers (correctness, security, broken contracts).
- **Should fix** — Important quality, maintainability, or consistency issues.
- **Nits** — Optional style or minor suggestions.
- **Suggested tests** — Specific tests or scenarios to add or run.
