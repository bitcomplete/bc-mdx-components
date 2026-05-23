import type { ComponentChildren } from "preact";

export type CalloutType = "info" | "warning" | "danger" | "success" | "note";

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ComponentChildren;
}) {
  return (
    <div class={`bc-callout bc-callout-${type}`} role="note">
      <div class="bc-callout-icon" aria-hidden="true">{iconFor(type)}</div>
      <div class="bc-callout-content">
        {title ? <div class="bc-callout-title">{title}</div> : null}
        <div class="bc-callout-body">{children}</div>
      </div>
    </div>
  );
}

function iconFor(t: CalloutType): string {
  switch (t) {
    case "warning":
      return "▲";
    case "danger":
      return "✕";
    case "success":
      return "✓";
    case "note":
      return "✎";
    default:
      return "ⓘ";
  }
}

export function Quote({
  author,
  children,
}: {
  author?: string;
  children: ComponentChildren;
}) {
  return (
    <figure class="bc-quote">
      <blockquote class="bc-quote-body">{children}</blockquote>
      {author ? <figcaption class="bc-quote-author">— {author}</figcaption> : null}
    </figure>
  );
}

// No syntax highlighting in v0.1 — the output is a plain <pre><code> with
// a language class. Consumers who want highlighting can run prism.js
// client-side; whether that's allowed depends on the host's CSP.
export function Code({
  language,
  children,
}: {
  language?: string;
  children: ComponentChildren;
}) {
  const lang = (language ?? "").toLowerCase();
  return (
    <pre class={`bc-code${lang ? ` language-${lang}` : ""}`}>
      <code class={lang ? `language-${lang}` : undefined}>{children}</code>
    </pre>
  );
}

// Authors pass raw SVG (or any block content) as children. The component
// just provides the figure / caption frame so it looks intentional.
export function Diagram({
  caption,
  children,
}: {
  caption?: string;
  children: ComponentChildren;
}) {
  return (
    <figure class="bc-diagram">
      <div class="bc-diagram-body">{children}</div>
      {caption ? <figcaption class="bc-diagram-caption">{caption}</figcaption> : null}
    </figure>
  );
}
