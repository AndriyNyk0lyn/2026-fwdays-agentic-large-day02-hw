# Security audit

Perform a **security-focused** pass on the scoped change or area (files, feature, or diff). Goal: surface secret exposure, unsafe trust boundaries, XSS/collab risks, and logging/UX leak paths before they ship — aligned with this repo’s baseline, not a generic OWASP essay.

## Context

- Attach scope: paths, diff, or description of the surface under audit.
- Baseline checklist: `.cursor/rules/security-baseline.mdc`
- If collab, Firebase, or Portal/socket paths are in scope: `.cursor/rules/collab-transport.mdc` and `docs/technical/code-notes.md` (Portal gate, remote restore ordering).
- Commands and env patterns: @AGENTS.md

## Steps

1. **Scope** — List what is in scope (files or behaviors). If unclear, ask for the minimal set.
2. **Secrets and configuration** — Hardcoded credentials; env misuse; only `VITE_*` (and intentional public mechanisms) in client bundles; no secret values in build logs or Storybook unless placeholders.
3. **Untrusted input** — URL/search params, `postMessage`, collab/WebSocket/Firebase payloads, imports (`.excalidraw` / scene JSON), uploads, storage — verify validation/narrowing at boundaries before scene/store/redirect logic.
4. **Collaboration and persistence** — For `excalidraw-app/collab/` and `excalidraw-app/data/firebase.ts`: encryption gates, origin checks, message validation; no weakening for convenience; remote updates must not pollute local undo/redo (see AGENTS.md).
5. **HTML and XSS** — `dangerouslySetInnerHTML`, raw HTML, user/document-derived strings in DOM, exports, embeds — flag unsafe patterns; expect sanitization or framework-safe rendering if HTML is required.
6. **Auth and permissions** — No production bypasses, mock gates that can ship on, hidden admin flags, or client-only checks that replace expected server/collab-room enforcement.
7. **Logging and errors** — No secrets, tokens, cookies, `Authorization`, keys, live session room IDs, or unnecessary PII in logs/telemetry; user-visible errors must not leak internal paths, stacks with secrets, or token fragments.
8. **High-risk edits** — If the change touches collab, Firebase, redirects, import/export, encryption, or HTML rendering, state explicitly what could go wrong and what invariants must stay true.
9. **Verification** — If the user wants checks, run the smallest relevant Yarn scripts from AGENTS.md (e.g. `yarn test:typecheck`, `yarn test:code`, targeted tests for message handling if collab behavior changed).

## Constraints

- Use `yarn` from the repository root only.
- Prefer citing `.cursor/rules/security-baseline.mdc` and `collab-transport.mdc` over pasting long policy text.
- Do not modify paths listed in `.cursor/rules/do-not-touch.mdc` as part of this audit unless the user explicitly asked for code changes.

## Output

Format the final reply as:

- **Scope** — What was reviewed.
- **Critical** — Exploitable or compliance-breaking issues; immediate fix direction.
- **High** — Serious weaknesses (secret leak, missing validation, trust boundary gaps).
- **Medium** — Defense-in-depth, logging, or consistency gaps.
- **Low / informational** — Hardening nits, documentation, or test suggestions.
- **Residual risk** — What was not exercised (e.g. no runtime collab test) and recommended follow-up.
