---
name: create-command
description: >-
  Authors Cursor slash-command markdown files in `.cursor/commands/` for repeatable
  Agent workflows (code review, build/test, scaffolding, PR prep). Use when the user
  asks to create a custom slash command, add a `/command`, scaffold commands, or
  populate `.cursor/commands/*.md`.
---

# Create Cursor slash commands

Workspace commands are **Markdown prompts** in `.cursor/commands/*.md`. Typing `/` in chat lists them; choosing one injects the file body as the user message so the Agent runs a **consistent, repeatable** workflow.

**Commands vs skills**

| | `.cursor/commands/*.md` | `.cursor/skills/*/SKILL.md` |
|--|-------------------------|------------------------------|
| **Invocation** | User picks `/command-name` in chat | `/skill-name` or `@skill-name` |
| **Best for** | One-shot, user-visible playbooks (“do this now”) | Deeper procedures the model loads as specialized context |
| **Typical length** | Short to medium (clear steps + constraints) | Often longer, multi-file |

They complement each other: a command can say “follow @build-verify” or “read AGENTS.md”.

---

## Before writing a file

1. **Intent** — What should happen every time someone runs this command?
2. **Name** — `kebab-case.md` only (lowercase, hyphens). Filename becomes `/kebab-case` (without `.md`).
3. **Audience** — Default Agent in this repo; mention if Composer vs Ask differs.
4. **Collision** — List `.cursor/commands/`; do not overwrite unless the user asked to replace.
5. **Project truth** — Point to [AGENTS.md](../../../AGENTS.md), `.cursor/rules/`, and relevant `docs/` so commands stay accurate.

---

## Command file quality bar

- **First line**: `# Title` — short, human-readable (shown in UI alongside the slash name).
- **Opening**: One paragraph — goal, when to use, what “done” looks like.
- **Body**: Numbered or bulleted **steps the Agent must execute** (not vague goals).
- **Constraints**: Repo tools (`yarn` not npm), protected paths, security/collab rules — cite paths, do not paste huge policy text.
- **Context**: Tell the user what to `@` (files, folders, skills) when running the command, if needed.
- **Outputs**: Expected format (e.g. review sections, checklist, PR summary).
- **Validation**: Exact scripts to run when applicable (`yarn test:typecheck`, etc.).
- **Concise**: Prefer linking `@AGENTS.md` over duplicating the whole command matrix.

---

## Implementation workflow (for the Agent)

1. Create `.cursor/commands/` if missing.
2. Choose final filename: `kebab-case.md`.
3. Draft content using the structure above; for full examples see [reference.md](reference.md).
4. Save as `.cursor/commands/<name>.md`.
5. Tell the user: run `/<name>` in Agent chat (and optional `@` context).

---

## Naming conventions

- ✅ `code-review.md`, `verify-build.md`, `new-react-component.md`
- ❌ `CodeReview.md`, `review.md` (too vague), `test.md` (ambiguous)

Use a **verb or verb-noun** pattern when it helps discovery: `run-tests`, `fix-ci`, `draft-pr-description`.

---

## Alignment with this repository

When commands touch validation or architecture:

- Root commands and scripts: [AGENTS.md](../../../AGENTS.md)
- Risky areas and testing expectations: same file + `docs/technical/code-notes.md` when relevant
- Optional: reference project skills under `.cursor/skills/` (e.g. `@build-verify`) instead of copying their bodies

---

## Further examples

See [reference.md](reference.md) for starter templates (review, build, tests, new component, generic).
