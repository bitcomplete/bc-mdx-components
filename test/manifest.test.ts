import { describe, it, expect } from "vitest";
import { componentManifest } from "../src/components/manifest.js";

describe("componentManifest", () => {
  it("contains all 29 user-facing components", () => {
    expect(componentManifest.length).toBe(29);
  });

  it("includes Subagent in the agent category", () => {
    const s = componentManifest.find((e) => e.name === "Subagent");
    expect(s).toBeDefined();
    expect(s!.category).toBe("agent");
  });

  it("includes a Callout entry with literal-union type", () => {
    const c = componentManifest.find((e) => e.name === "Callout");
    expect(c).toBeDefined();
    expect(c!.category).toBe("emphasis");
    expect(c!.summary).toMatch(/Coloured aside/);
    const typeProp = c!.spec.props.find((p) => p.name === "type")!;
    expect(typeProp.type).toBe(
      `"info" | "warning" | "danger" | "success" | "note"`,
    );
    expect(typeProp.default).toBe(`"info"`);
    expect(c!.examples.length).toBeGreaterThan(0);
  });

  it("every entry has summary + category + valid kind", () => {
    const valid = new Set([
      "layout",
      "emphasis",
      "data",
      "conversation",
      "agent",
      "chronological",
      "code-media",
    ]);
    for (const e of componentManifest) {
      expect(e.kind).toBe("mdx-component");
      expect(e.summary.length).toBeGreaterThan(0);
      expect(valid.has(e.category)).toBe(true);
    }
  });

  it("does not include internal primitives (ToolCallPrimitive, etc.)", () => {
    const names = componentManifest.map((e) => e.name);
    expect(names).not.toContain("ToolCallPrimitive");
    expect(names).not.toContain("ToolTreePrimitive");
    expect(names).not.toContain("ToolCallLabel");
  });
});
