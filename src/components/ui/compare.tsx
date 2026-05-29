// Side-by-side options, no card boxes — just labels above each column
// with a thin vertical rule between.

import * as React from "react";
import { cn } from "@/lib/utils";

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

function Option({
  label,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { label: string }) {
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
