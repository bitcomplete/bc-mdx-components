import * as React from "react";
import { cn } from "@/lib/utils";

type TagColor = "default" | "info" | "warning" | "danger" | "success";

const colorClass: Record<TagColor, string> = {
  default: "bg-muted text-muted-foreground",
  info: "bg-sky-500/10 text-sky-500",
  warning: "bg-amber-500/10 text-amber-500",
  danger: "bg-red-500/10 text-red-500",
  success: "bg-emerald-500/10 text-emerald-500",
};

/**
 * Small inline pill for short labels — "v2", "draft", "behind flag".
 * Distinct from <Status> in that there's no dot and the colour is
 * just decorative.
 *
 * @category data
 * @example
 * Status: <Tag color="warning">latency-bound</Tag>.
 */
function Tag({
  color = "default",
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  /** Pill colour. */
  color?: TagColor;
}) {
  return (
    <span
      data-slot="tag"
      className={cn(
        "inline-block rounded-full px-2 py-0.5 font-sans text-xs font-medium",
        colorClass[color],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Inline state indicator: a coloured dot + label. Distinct from
 * <Tag> in that the dot communicates a binary/categorical state at
 * a glance.
 *
 * @category data
 * @example
 * <Status state="ok">In progress</Status>
 */
function Status({
  state,
  className,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  /** Which state colour to show. */
  state: "ok" | "warn" | "err" | "info";
}) {
  const dotClass = {
    ok: "bg-emerald-500",
    warn: "bg-amber-500",
    err: "bg-red-500",
    info: "bg-sky-500",
  }[state];
  return (
    <span
      data-slot="status"
      data-state={state}
      className={cn(
        "inline-flex items-center gap-1.5 font-sans text-sm text-foreground",
        className,
      )}
      {...props}
    >
      <span aria-hidden className={cn("size-2 rounded-full", dotClass)} />
      <span>{children ?? state}</span>
    </span>
  );
}

export { Tag, Status };
export type { TagColor };
