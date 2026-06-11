import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Two-column before/after — red bar on the left side, green on the
 * right. Use for explicit change comparisons; for weighing
 * alternatives that aren't a strict before→after, use <Compare>.
 *
 * @category data
 * @example
 * <Diff
 *   before="Synchronous Stripe call from request handler"
 *   after="Worker reads from SQS, retries with token bucket"
 * />
 */
function Diff({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  /** Left column content (the previous state). */
  before: React.ReactNode;
  /** Right column content (the new state). */
  after: React.ReactNode;
  /** Override the left-column label. */
  beforeLabel?: string;
  /** Override the right-column label. */
  afterLabel?: string;
}) {
  return (
    <div
      data-slot="diff"
      className={cn("my-6 grid gap-4 sm:grid-cols-2", className)}
      {...props}
    >
      <div data-slot="diff-before" className="border-l-2 border-l-red-500/40 pl-4">
        <div className="mb-1 font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {beforeLabel}
        </div>
        <div className="font-serif text-base text-foreground/90">{before}</div>
      </div>
      <div data-slot="diff-after" className="border-l-2 border-l-emerald-500/50 pl-4">
        <div className="mb-1 font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {afterLabel}
        </div>
        <div className="font-serif text-base text-foreground/90">{after}</div>
      </div>
    </div>
  );
}

export { Diff };
