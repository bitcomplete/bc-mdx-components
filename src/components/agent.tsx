import type { ComponentChildren } from "preact";

export type ToolStatus = "running" | "ok" | "fail" | "skip";

// Inspired by Agentic Craft's ToolCall — a visual record of an LLM
// tool invocation. Static (no spinners or live updates); the "status"
// is a snapshot at the time of share.
export function ToolCall({
  name,
  status,
  timing,
  args,
  children,
}: {
  name: string;
  status?: ToolStatus;
  timing?: string;
  args?: string;
  children?: ComponentChildren;
}) {
  const statusCls = status ? ` bc-tool-${status}` : "";
  return (
    <div class={`bc-tool${statusCls}`}>
      <div class="bc-tool-head">
        <span class="bc-tool-name">{name}</span>
        {timing ? <span class="bc-tool-timing">{timing}</span> : null}
        {status ? <span class={`bc-tool-status bc-tool-status-${status}`}>{status}</span> : null}
      </div>
      {args ? <pre class="bc-tool-args">{args}</pre> : null}
      {children ? <div class="bc-tool-body">{children}</div> : null}
    </div>
  );
}

// Tree visualization — `<ToolCall>`s nested inside `<ToolTree>` get L-connector
// styling. Style is delivered by CSS so we don't have to know the tree shape.
export function ToolTree({ children }: { children: ComponentChildren }) {
  return <div class="bc-tool-tree">{children}</div>;
}

export type Severity = "info" | "low" | "medium" | "high" | "critical";

export function Finding({
  code,
  title,
  severity = "medium",
  children,
}: {
  code?: string;
  title: string;
  severity?: Severity;
  children?: ComponentChildren;
}) {
  return (
    <article class={`bc-finding bc-finding-${severity}`}>
      <header class="bc-finding-head">
        {code ? <code class="bc-finding-code">{code}</code> : null}
        <h3 class="bc-finding-title">{title}</h3>
        <span class={`bc-finding-sev bc-finding-sev-${severity}`}>{severity}</span>
      </header>
      {children ? <div class="bc-finding-body">{children}</div> : null}
    </article>
  );
}

// Static snapshot of an approval prompt. `approved` is true/false/undefined
// (undefined = "still pending"). The visual indicates which choice was made.
export function Approval({
  action,
  approved,
  by,
  at,
  children,
}: {
  action: string;
  approved?: boolean;
  by?: string;
  at?: string;
  children?: ComponentChildren;
}) {
  const state = approved === undefined ? "pending" : approved ? "approved" : "denied";
  return (
    <div class={`bc-approval bc-approval-${state}`}>
      <div class="bc-approval-head">
        <span class="bc-approval-action">{action}</span>
        <span class={`bc-approval-badge bc-approval-badge-${state}`}>{state}</span>
      </div>
      {(by || at) ? (
        <div class="bc-approval-meta">
          {by ? <span class="bc-approval-by">{by}</span> : null}
          {at ? <span class="bc-approval-at">{at}</span> : null}
        </div>
      ) : null}
      {children ? <div class="bc-approval-body">{children}</div> : null}
    </div>
  );
}
