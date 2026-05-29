// Editorial finding card: severity pill + mono code + serif title, with
// a thin coloured left rule.

import * as React from "react";
import { cn } from "@/lib/utils";

type Severity = "info" | "low" | "medium" | "high" | "critical";

const sevBar: Record<Severity, string> = {
  info: "border-l-sky-500/70",
  low: "border-l-border",
  medium: "border-l-amber-500/70",
  high: "border-l-red-500/70",
  critical: "border-l-red-600/80",
};

const sevPill: Record<Severity, string> = {
  info: "bg-sky-500/10 text-sky-500",
  low: "bg-muted text-muted-foreground",
  medium: "bg-amber-500/10 text-amber-500",
  high: "bg-red-500/10 text-red-500",
  critical: "bg-red-600/15 text-red-600",
};

function Finding({
  code,
  title,
  severity = "medium",
  className,
  children,
  ...props
}: React.ComponentProps<"article"> & {
  code?: string;
  title: string;
  severity?: Severity;
}) {
  return (
    <article
      data-slot="finding"
      data-severity={severity}
      className={cn("my-4 border-l-2 pl-4 py-1", sevBar[severity], className)}
      {...props}
    >
      <header className="flex items-baseline gap-3 flex-wrap">
        {code ? (
          <code
            data-slot="finding-code"
            className="font-mono text-xs text-muted-foreground"
          >
            {code}
          </code>
        ) : null}
        <h3
          data-slot="finding-title"
          className="m-0 flex-1 font-serif text-base font-normal text-foreground"
        >
          {title}
        </h3>
        <span
          data-slot="finding-severity"
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider",
            sevPill[severity],
          )}
        >
          {severity}
        </span>
      </header>
      {children ? (
        <div
          data-slot="finding-body"
          className="mt-1 font-serif text-base text-foreground/80"
        >
          {children}
        </div>
      ) : null}
    </article>
  );
}

export { Finding };
export type { Severity };
