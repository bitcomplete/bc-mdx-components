import type { ComponentChildren } from "preact";

export type StatusState = "ok" | "warn" | "err" | "info";

export function KPIGroup({ children }: { children: ComponentChildren }) {
  return <div class="bc-kpi-group">{children}</div>;
}

export function KPI({
  value,
  label,
  trend,
  tone,
}: {
  value: string | number;
  label: string;
  trend?: string;
  tone?: StatusState;
}) {
  const toneCls = tone ? ` bc-kpi-${tone}` : "";
  return (
    <div class={`bc-kpi${toneCls}`}>
      <div class="bc-kpi-value">{value}</div>
      <div class="bc-kpi-label">{label}</div>
      {trend ? <div class="bc-kpi-trend">{trend}</div> : null}
    </div>
  );
}

export function Tag({
  color,
  children,
}: {
  color?: string;
  children: ComponentChildren;
}) {
  const cls = color ? `bc-tag bc-tag-${color}` : "bc-tag";
  return <span class={cls}>{children}</span>;
}

export function Status({
  state,
  children,
}: {
  state: StatusState;
  children?: ComponentChildren;
}) {
  return (
    <span class={`bc-status bc-status-${state}`}>
      <span class="bc-status-dot" aria-hidden="true" />
      <span class="bc-status-label">{children ?? state}</span>
    </span>
  );
}

export function Diff({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: ComponentChildren;
  after: ComponentChildren;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div class="bc-diff">
      <div class="bc-diff-side bc-diff-before">
        <div class="bc-diff-label">{beforeLabel}</div>
        <div class="bc-diff-body">{before}</div>
      </div>
      <div class="bc-diff-side bc-diff-after">
        <div class="bc-diff-label">{afterLabel}</div>
        <div class="bc-diff-body">{after}</div>
      </div>
    </div>
  );
}
