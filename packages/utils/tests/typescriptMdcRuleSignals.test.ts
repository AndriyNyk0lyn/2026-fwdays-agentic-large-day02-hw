/**
 * Encodes a few machine-checkable signals from `.cursor/rules/typescript.mdc`.
 * Used to keep the A/B experiment rubric explicit; not a substitute for
 * `yarn test:typecheck` / `yarn test:code`.
 */
describe("typescript.mdc rubric signals (A/B experiment alignment)", () => {
  it("flags @ts-ignore as the discouraged suppression style", () => {
    const variantB = `// @ts-ignore
legacyCall();`;
    expect(variantB).toMatch(/@ts-ignore\b/);
  });

  it("allows @ts-expect-error with a reason as the preferred suppression style", () => {
    const variantA = `// @ts-expect-error WASM binding exposes non-standard .buffer
legacyCall();`;
    expect(variantA).toMatch(/@ts-expect-error\b/);
    expect(variantA).not.toMatch(/@ts-ignore\b/);
  });

  it("detects direct jotai import (restricted by ESLint in this repo)", () => {
    const variantB = `import { atom } from "jotai";`;
    expect(variantB).toMatch(/from\s+["']jotai["']/);
  });

  it("detects value import from barrel under packages/excalidraw (discouraged for values)", () => {
    const variantB = `import { something } from "@excalidraw/excalidraw";`;
    expect(variantB).toMatch(
      /import\s+\{[^}]+\}\s+from\s+["']@excalidraw\/excalidraw["']/,
    );
  });

  it("type-only import from barrel is a common compliant pattern (type-only)", () => {
    const variantA = `import type { AppState } from "@excalidraw/excalidraw";`;
    expect(variantA).toMatch(/import type /);
  });
});
