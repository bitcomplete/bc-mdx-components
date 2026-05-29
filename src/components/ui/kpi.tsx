// Big-number display, agentic-craft style: large light-serif numerals,
// uppercase sans-serif label below, no card. Group lays them out in a
// responsive row.

import * as React from "react";
import { cn } from "@/lib/utils";

type KPITone = "default" | "ok" | "warn" | "err" | "info";

const toneClass: Record<KPITone, string> = {
  default: "text-foreground",
  ok: "text-emerald-500",
  warn: "text-amber-500",
  err: "text-red-500",
  info: "text-sky-500",
};

function KPIGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kpi-group"
      className={cn(
        "my-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function KPI({
  value,
  label,
  trend,
  tone = "default",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  value: string | number;
  label: string;
  trend?: string;
  tone?: KPITone;
}) {
  return (
    <div data-slot="kpi" className={cn("min-w-0", className)} {...props}>
      <div
        data-slot="kpi-value"
        className={cn(
          "font-serif text-3xl font-light leading-none tracking-tight break-words",
          toneClass[tone],
        )}
      >
        {value}
      </div>
      <div
        data-slot="kpi-label"
        className="mt-2 font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground"
      >
        {label}
      </div>
      {trend ? (
        <div
          data-slot="kpi-trend"
          className="mt-1 font-sans text-xs text-muted-foreground"
        >
          {trend}
        </div>
      ) : null}
    </div>
  );
}

export { KPI, KPIGroup };
export type { KPITone };
