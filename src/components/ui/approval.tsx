// Snapshot of an approval prompt — action + state pill, optional meta.

import * as React from "react";
import { cn } from "@/lib/utils";

type ApprovalState = "approved" | "denied" | "pending";

const stateClass: Record<ApprovalState, string> = {
  approved: "bg-emerald-500/10 text-emerald-500",
  denied: "bg-red-500/10 text-red-500",
  pending: "bg-muted text-muted-foreground",
};

/**
 * Snapshot of an approval decision — what was requested, whether it
 * was approved, who decided, when. Static record, not an interactive
 * widget; for that, fold the decision into the surrounding prose.
 *
 * @category agent
 * @example
 * <Approval
 *   action="Send findings report to evaluation@bsi.bund.de"
 *   approved={true}
 *   by="terra@bitcomplete.io"
 *   at="2026-05-30 14:02 UTC"
 * />
 */
function Approval({
  action,
  approved,
  by,
  at,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** Short description of what was being approved. */
  action: string;
  /** undefined → pending, true → approved, false → denied. */
  approved?: boolean;
  /** Approver identifier (email, handle). */
  by?: string;
  /** Timestamp string. */
  at?: string;
}) {
  const state: ApprovalState =
    approved === undefined ? "pending" : approved ? "approved" : "denied";
  return (
    <div
      data-slot="approval"
      data-state={state}
      className={cn(
        "my-4 rounded-md border border-border bg-card px-4 py-3",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          data-slot="approval-action"
          className="font-mono text-sm text-foreground"
        >
          {action}
        </span>
        <span
          data-slot="approval-state"
          className={cn(
            "shrink-0 rounded-full px-2 py-0.5 font-sans text-[10px] font-medium uppercase tracking-wider",
            stateClass[state],
          )}
        >
          {state}
        </span>
      </div>
      {by || at ? (
        <div className="mt-1 flex gap-3 font-sans text-xs text-muted-foreground">
          {by ? <span>{by}</span> : null}
          {at ? <span>{at}</span> : null}
        </div>
      ) : null}
      {children ? (
        <div className="mt-2 font-serif text-base text-foreground/80">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export { Approval };
