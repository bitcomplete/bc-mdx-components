import { describe, it, expect } from "vitest";
import { compileMDX, renderMDX } from "../src/index.js";

describe("compileMDX", () => {
  it("renders plain markdown", () => {
    const { html } = compileMDX("# Hello\n\nA paragraph.");
    expect(html).toContain("<h1>Hello</h1>");
    expect(html).toContain("<p>A paragraph.</p>");
  });

  it("renders a Callout component", () => {
    const { html } = compileMDX(
      `<Callout type="warning">Heads up</Callout>`,
    );
    expect(html).toContain("bc-callout");
    expect(html).toContain("bc-callout-warning");
    expect(html).toContain("Heads up");
  });

  it("renders nested components", () => {
    const { html } = compileMDX(
      `<KPIGroup><KPI value="42" label="users" /><KPI value="3" label="errors" tone="err" /></KPIGroup>`,
    );
    expect(html).toContain("bc-kpi-group");
    expect(html.match(/bc-kpi-value/g)?.length).toBe(2);
    expect(html).toContain("bc-kpi-err");
  });

  it("renders Steps with statuses", () => {
    const { html } = compileMDX(`
<Steps>
  <Step title="One" status="done">First</Step>
  <Step title="Two" status="doing">Second</Step>
  <Step title="Three" status="todo" />
</Steps>
`);
    expect(html).toContain("bc-step-status-done");
    expect(html).toContain("bc-step-status-doing");
    expect(html).toContain("bc-step-status-todo");
  });

  it("includes a document wrapper with stylesheet", () => {
    const r = compileMDX("# hi");
    expect(r.document).toContain("<!doctype html>");
    expect(r.document).toContain("<style>");
    expect(r.document).toContain(".bc-callout");
    expect(r.document).toContain('class="bc-doc"');
  });

  it("CSS is stable across calls", () => {
    const a = compileMDX("# a");
    const b = compileMDX("# b");
    expect(a.css).toBe(b.css);
  });

  it("renders ToolCall with status", () => {
    const { html } = compileMDX(
      `<ToolCall name="bash" status="ok" timing="0.4s" args="go test ./..." />`,
    );
    expect(html).toContain("bc-tool");
    expect(html).toContain("bc-tool-status-ok");
    expect(html).toContain("bash");
    expect(html).toContain("go test ./...");
  });

  it("renders Finding with severity", () => {
    const { html } = compileMDX(
      `<Finding code="X-1" title="problem" severity="high">desc</Finding>`,
    );
    expect(html).toContain("bc-finding-high");
    expect(html).toContain("X-1");
    expect(html).toContain("problem");
  });
});

describe("renderMDX", () => {
  it("returns just the body html without doc wrapper", () => {
    const html = renderMDX("# Hello");
    expect(html).toContain("<h1>");
    expect(html).not.toContain("<!doctype");
    expect(html).not.toContain("<style>");
  });
});
