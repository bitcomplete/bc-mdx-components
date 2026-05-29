import * as React from "react";
import { cn } from "@/lib/utils";

function Diff({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
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
