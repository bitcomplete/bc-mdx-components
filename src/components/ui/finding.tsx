// Agentic Craft renders findings as plain bulleted prose, not boxed
// cards. Format: `• <code>CODE</code> — <strong>title</strong>: body`.
// Severity is signalled by a colored dot, not a pill.
//
// A free-standing <Finding> is wrapped in an <li> + spacing so it can
// be mixed with markdown prose. A `<Findings>` collection groups them
// in a tight list (the standard MDX form).

import * as React from "react";
import { cn } from "@/lib/utils.js";

type Severity = "info" | "low" | "medium" | "high" | "critical";

const sevDotClass: Record<Severity, string> = {
  info: "bg-sky-500",
  low: "bg-muted-foreground/50",
  medium: "bg-amber-500",
  high: "bg-red-500",
  critical: "bg-red-600",
};

/**
 * Single bulleted finding — issue, risk, surprise, or gotcha. Severity
 * colours the bullet. Use a sequence of <Finding>s for review notes,
 * audit results, postmortem observations.
 *
 * @category agent
 * @example
 * <Finding code="BILL-014" title="Retries can DDoS Stripe" severity="high">
 *   3× exponential backoff hits Stripe hardest when it's already
 *   slow. Move retries to the worker with a token bucket.
 * </Finding>
 */
function Finding({
  code,
  title,
  severity = "medium",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** Optional short identifier (e.g. ticket / rule code). */
  code?: string;
  /** Short headline. */
  title: string;
  /** Visual + semantic weight. */
  severity?: Severity;
}) {
  // Render as <div role="listitem"> so a bare <Finding> outside any
  // <ul>/<ol> doesn't pick up the browser's default list marker.
  return (
    <div
      role="listitem"
      data-slot="finding"
      data-severity={severity}
      className={cn(
        "relative my-2 pl-5 font-serif text-base text-foreground/85 leading-relaxed",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-[10px] inline-block size-1.5 rounded-full",
          sevDotClass[severity],
        )}
      />
      {code ? (
        <>
          <code
            data-slot="finding-code"
            className="font-mono text-sm font-medium text-foreground bg-transparent p-0"
          >
            {code}
          </code>{" "}
          <span className="text-muted-foreground">—</span>{" "}
        </>
      ) : null}
      <span className="font-medium text-foreground">{title}</span>
      {children ? (
        <>
          <span className="text-muted-foreground">:</span>{" "}
          <span data-slot="finding-body" className="text-muted-foreground">
            {children}
          </span>
        </>
      ) : null}
    </div>
  );
}

/**
 * Optional grouping wrapper around several <Finding>s. Tightens the
 * vertical spacing so a long list reads as one block.
 *
 * @category agent
 * @example
 * <Findings>
 *   <Finding title="Missing key destruction" severity="high" />
 *   <Finding title="Stale algorithm reference" severity="medium" />
 * </Findings>
 */
function Findings({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="findings"
      className={cn("my-6 space-y-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Finding, Findings };
export type { Severity };
