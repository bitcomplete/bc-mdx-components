import type { ComponentChildren } from "preact";

export function Timeline({ children }: { children: ComponentChildren }) {
  return <ol class="bc-timeline">{children}</ol>;
}

export function Event({
  time,
  tone,
  title,
  children,
}: {
  time?: string;
  tone?: "ok" | "warn" | "err" | "info";
  title?: string;
  children?: ComponentChildren;
}) {
  const toneCls = tone ? ` bc-event-${tone}` : "";
  return (
    <li class={`bc-event${toneCls}`}>
      <span class="bc-event-marker" aria-hidden="true" />
      <div class="bc-event-content">
        {time ? <time class="bc-event-time">{time}</time> : null}
        {title ? <div class="bc-event-title">{title}</div> : null}
        {children ? <div class="bc-event-body">{children}</div> : null}
      </div>
    </li>
  );
}
