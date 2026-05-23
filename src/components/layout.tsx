import type { ComponentChildren } from "preact";

export function Section({
  title,
  id,
  children,
}: {
  title?: string;
  id?: string;
  children: ComponentChildren;
}) {
  return (
    <section class="bc-section" id={id}>
      {title ? <h2 class="bc-section-title">{title}</h2> : null}
      <div class="bc-section-body">{children}</div>
    </section>
  );
}

export function TLDR({ children }: { children: ComponentChildren }) {
  return (
    <aside class="bc-tldr" role="note" aria-label="TL;DR">
      <div class="bc-tldr-label">TL;DR</div>
      <div class="bc-tldr-body">{children}</div>
    </aside>
  );
}

export function Compare({ children }: { children: ComponentChildren }) {
  return <div class="bc-compare">{children}</div>;
}

export function Option({
  label,
  children,
}: {
  label: string;
  children: ComponentChildren;
}) {
  return (
    <div class="bc-compare-option">
      <div class="bc-compare-label">{label}</div>
      <div class="bc-compare-body">{children}</div>
    </div>
  );
}

export function Steps({ children }: { children: ComponentChildren }) {
  return <ol class="bc-steps">{children}</ol>;
}

export type StepStatus = "todo" | "doing" | "done" | "blocked";

export function Step({
  title,
  status,
  children,
}: {
  title: string;
  status?: StepStatus;
  children?: ComponentChildren;
}) {
  const cls = `bc-step${status ? ` bc-step-${status}` : ""}`;
  return (
    <li class={cls}>
      <div class="bc-step-head">
        <span class="bc-step-title">{title}</span>
        {status ? <span class={`bc-step-status bc-step-status-${status}`}>{status}</span> : null}
      </div>
      {children ? <div class="bc-step-body">{children}</div> : null}
    </li>
  );
}
