// Side-by-side options, no card boxes — just labels above each column
// with a thin vertical rule between.

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Side-by-side panels for weighing 2-3 options. Each child is an
 * <Option>. Use for "should we do X or Y" framing, tradeoff
 * exploration, or before/after comparisons.
 *
 * @category layout
 * @example
 * <Compare>
 *   <Option label="Status quo">Sync call to Stripe. Easy, blocks request.</Option>
 *   <Option label="Async webhook">Queue + worker. Safer p99, more pieces.</Option>
 * </Compare>
 */
function Compare({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="compare"
      className={cn(
        "my-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 sm:divide-x sm:divide-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * One panel inside a <Compare>. The label is the short heading; the
 * children are the supporting argument.
 *
 * @category layout
 * @example
 * <Option label="Async webhook (proposed)">
 *   Request handler queues a job and returns immediately.
 * </Option>
 */
function Option({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** Short heading for this option. */
  label: string;
}) {
  return (
    <div data-slot="compare-option" className={cn("sm:pl-6 sm:first:pl-0", className)} {...props}>
      <div
        data-slot="compare-label"
        className="mb-2 font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground"
      >
        {label}
      </div>
      <div
        data-slot="compare-body"
        className="font-serif text-base text-foreground/90"
      >
        {children}
      </div>
    </div>
  );
}

export { Compare, Option };
