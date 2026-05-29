// Snapshot of an approval prompt — action + state pill, optional meta.

import * as React from "react";
import { cn } from "@/lib/utils";

type ApprovalState = "approved" | "denied" | "pending";

const stateClass: Record<ApprovalState, string> = {
  approved: "bg-emerald-500/10 text-emerald-500",
  denied: "bg-red-500/10 text-red-500",
  pending: "bg-muted text-muted-foreground",
};

function Approval({
  action,
  approved,
  by,
  at,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  action: string;
  approved?: boolean;
  by?: string;
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
