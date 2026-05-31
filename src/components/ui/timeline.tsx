// Vertical timeline with spine + marker dots.

import * as React from "react";
import { cn } from "@/lib/utils";

type EventTone = "ok" | "warn" | "err" | "info";

const markerClass: Record<EventTone | "default", string> = {
  default: "border-foreground/30",
  ok: "border-emerald-500",
  warn: "border-amber-500",
  err: "border-red-500",
  info: "border-sky-500",
};

/**
 * Vertical event sequence with a spine and marker dots. Use for
 * milestones, release timelines, postmortem chronologies — anything
 * ordered by when.
 *
 * @category chronological
 * @example
 * <Timeline>
 *   <Event time="Week 1" title="Queue + worker land behind feature flag" />
 *   <Event time="Week 2" title="Cutover ramp begins" tone="ok" />
 * </Timeline>
 */
function Timeline({
  className,
  children,
  ...props
}: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="timeline"
      className={cn(
        "relative my-6 list-none p-0 before:absolute before:left-[6px] before:top-2 before:bottom-2 before:w-px before:bg-border",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

/**
 * One marker on a <Timeline>. Either the time, the title, or both —
 * pick whichever reads cleanly for your sequence.
 *
 * @category chronological
 * @example
 * <Event time="2026-05-30" title="Tag 19 reconciled" tone="ok">
 *   BrowserOrBearer middleware live.
 * </Event>
 */
function Event({
  time,
  tone,
  title,
  className,
  children,
  ...props
}: React.ComponentProps<"li"> & {
  /** When it happened (free-form string). */
  time?: string;
  /** Marker dot colour. */
  tone?: EventTone;
  /** Short headline. */
  title?: string;
}) {
  return (
    <li
      data-slot="event"
      data-tone={tone}
      className={cn("relative pl-7 pb-4", className)}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-[6px] block size-3 rounded-full border-2 bg-background",
          markerClass[tone ?? "default"],
        )}
      />
      {time ? (
        <time className="font-mono text-xs text-muted-foreground">{time}</time>
      ) : null}
      {title ? (
        <div className="mt-0.5 font-sans text-sm font-medium text-foreground">
          {title}
        </div>
      ) : null}
      {children ? (
        <div className="mt-1 font-serif text-base text-foreground/80">
          {children}
        </div>
      ) : null}
    </li>
  );
}

export { Timeline, Event };
export type { EventTone };
