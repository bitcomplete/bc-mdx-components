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

/**
 * Responsive row of <KPI> children. Use to surface a handful of
 * top-line metrics at the top of a status update or report.
 *
 * @category data
 * @example
 * <KPIGroup>
 *   <KPI value="8.3s" label="p99 today" tone="err" />
 *   <KPI value="42ms" label="p99 after" tone="ok" trend="projected" />
 * </KPIGroup>
 */
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

/**
 * Big-number metric: large light-serif value, uppercase sans label
 * below, optional trend annotation. Lives inside a <KPIGroup>.
 *
 * @category data
 * @example
 * <KPI value="99.95%" label="uptime" tone="ok" trend="↑ 0.02 vs last week" />
 */
function KPI({
  value,
  label,
  trend,
  tone = "default",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  /** The number (or short string) shown large. */
  value: string | number;
  /** Caption under the value. Kept short. */
  label: string;
  /** Optional sub-line — direction, comparison, "projected", etc. */
  trend?: string;
  /** Colour cue for the value. */
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
